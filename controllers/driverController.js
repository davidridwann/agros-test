const Driver = require('../models/Driver');
const fileUpload = require('../middleware/uploadMiddleware');
var multer = require('multer');

const upload = multer({ storage: fileUpload.files.storage(), allowedFile: fileUpload.files.allowedFile }).single("file");

module.exports = {
    index: (req, res) => {
        Driver.fetchData(req.db, (err, rows) => {
            if (err) {
                req.flash('error', `${err.message}`)
                res.render('driver/index', { data: '', layout: 'main' })
            } else {
                res.render('driver/index', { data: rows.rows, layout: 'main' })
            }
        })
    },
    store: (req, res,) => {
        upload(req, res, function (err) {
            if (err) {
                req.flash('error', `${err}`)
                res.redirect('/drivers')
            } else {
                const timeElapsed = Date.now();
                const now = new Date(timeElapsed);

                const { name, phone, address, status = 'available', created_at = now.toISOString() } = req.body;
                const file = req.file.filename;

                var data = {
                    name,
                    phone,
                    address,
                    status,
                    file,
                    created_at
                }
        
                Driver.insertData(req.db, data, (err, result) => {
                    if (err) {
                        req.flash('error', `${err.message}`)
                        res.redirect('/drivers')
                    } else {
                        req.flash('success', 'Berhasil menambah data driver')
                        res.redirect('/drivers')
                    }
                })
            }
        })
    },
    update: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                req.flash('error', `${err}`)
                res.redirect('/drivers')
            } else {
                const timeElapsed = Date.now();
                const now = new Date(timeElapsed);
        
                const { name, phone, address, id, updated_at = now.toISOString(), current_photo } = req.body;
                var file = req.file;

                if (file) {
                    file = req.file.filename;
                } else {
                    file = current_photo;
                }
        
                var data = {
                    name,
                    phone,
                    address,
                    id,
                    updated_at,
                    file
                }
        
                Driver.updateData(req.db, data, (err) => {
                    if (err) {
                        req.flash('error', `${err.message}`)
                        res.redirect('/drivers')
                    } else {
                        req.flash('success', 'Berhasil mengubah data driver')
                        res.redirect('/drivers')
                    }
                })
            }
        })
    },
    destroy: (req, res) => {
        const { id } = req.params;
        console.log(id);

        Driver.deleteData(req.db, id, (err) => {
            if (err) {
                req.flash('error', `${err.message}`)
                res.redirect('/drivers')
            } else {
                req.flash('success', 'Berhasil menghapus data driver')
                res.redirect('/drivers')
            }
        })
    }
}