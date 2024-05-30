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

  const transaccion = JSON.parse(event.body);
  const numeroCuenta = transaccion.numeroCuenta;
  const claveActual = transaccion.claveActual;
  const nuevaClave = transaccion.nuevaClave;

  // Validar la clave actual
  connection.query('SELECT claveTarjeta FROM cuenta WHERE numeroCuenta = ? AND claveTarjeta = ?', [numeroCuenta, claveActual], (error, results) => {
    if (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error al validar clave actual' })
      };
    }

    if (results.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Clave actual incorrecta' })
      };
    }

    // Actualizar la clave en la tabla 'cuenta'
    connection.query('UPDATE cuenta SET claveTarjeta = ? WHERE numeroCuenta = ?', [nuevaClave, numeroCuenta], (error) => {
      if (error) {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error al actualizar clave' })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Clave cambiada exitosamente' })
      };
    });
  });
};