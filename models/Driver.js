const driver = {
    fetchData: (db, callback) => {
        db.query('select * from drivers order by id desc', callback);
    },
    getById: (db, id, callback) => {
        db.query('select * from drivers where id = ', id, callback);
    },
    insertData: (db, data, callback) => {
        db.query(`insert into drivers (name, phone, address, status, photo, created_at) VALUES ('${data.name}', '${data.phone}', '${data.address}', '${data.status}', '${data.file}', '${data.created_at}')`, callback);
    },
    updateData: (db, data, callback) => {
        db.query(`update drivers set name = '${data.name}', phone = '${data.phone}', address = '${data.address}', photo = '${data.file}', updated_at = '${data.updated_at}' where id = ${data.id}`, callback);
    },
    deleteData: (db, id, callback) => {
        console.log(id)
        db.query(`delete from drivers where id = ${id}`, callback);
    },
};

module.exports = driver;