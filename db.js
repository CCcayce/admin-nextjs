const mysql = require('mysql2');

// 创建连接池
const pool = mysql.createPool({
  host: '192.168.217.128',
  user: 'root',
  password: 'Mysqlpassword1!',
  database: 'sys',
  port: 3306,
});

const login = (email, password, callback) => {
  pool.query(
    'SELECT * FROM user WHERE name = ? AND password = ?',
    [email, password],
    (err, results) => {
      console.log(err)
      if (err) {
        return callback(err);
      }
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    }
  );
};

const getFormData = (startDate, endDate, offset, perPage, callback) => {
  console.log(startDate, endDate, offset, perPage);

  // Convert offset and perPage to integers
  offset = parseInt(offset, 10);
  perPage = parseInt(perPage, 10);

  pool.query(
    `SELECT *
     FROM dk_form
     WHERE time BETWEEN ? AND ?
     ORDER BY id
     LIMIT ? OFFSET ?`,
    [startDate, endDate, perPage, offset],
    (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return callback(err);
      }
      callback(null, results);
    }
  );
};


module.exports = { login, getFormData };
