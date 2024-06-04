exports.handler = async (event) => {

    // Conectarse a mysql
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'sql3.freemysqlhosting.net',
        user: 'sql3710437',
        password: 'M4ZS1SNcx4',
        database: 'sql3710437',
        port: 3306
      });

    

    const transaccion = JSON.parse(event.body.numeroCuenta);
    const objCuenta = connection.query(
        'SELECT * FROM cuenta WHERE numeroCuenta = ?',
        [transaccion.cuenta],
        
    );

    if(objCuenta.monto > transaccion.monto) {

    }
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Deposito por realizar" })
    }
}