const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql3.freemysqlhosting.net',
  user: 'sql3710437',
  password: 'M4ZS1SNcx4',
  database: 'sql3710437',
  port: 3306
});

exports.handler = async (event) => {
  // ... (resto del código de la función)

  // Consultar saldo actual
  connection.query('SELECT saldo FROM cuenta WHERE numeroCuenta = ?', [transaccion.cuenta], (error, results)) => {
    if (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error al consultar saldo' })
      };
    }
  }
    const saldoActual = results[0].saldo;
}
    // Validar si hay suficiente saldo
    if (saldoActual < transaccion.monto) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No tiene suficiente saldo' })
      };
    }

    // Actualizar saldo en la cuenta
    connection.query('UPDATE cuenta SET saldo = ? WHERE numeroCuenta = ?', [saldoActual - transaccion.monto, transaccion.cuenta], (error)) => {
      if (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error al actualizar saldo' })
        };
      }
    }
      // Registrar transacción en la tabla 'Transaccion'
      connection.query('INSERT INTO transaccion (tipo, monto, fecha, idcuenta) VALUES (?, ?, ?, ?)', ['Retiro', transaccion.monto, new Date().toISOString(), transaccion.cuenta], (error)) => {
        if (error) {
          console.error(error);
          return {
            statusCode: 500,
          }
        }