const mysql = require('mysql');

const conexao = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'rodrigo',
    password:'123',
    database:'agenda-petshop'
})

module.exports = conexao;