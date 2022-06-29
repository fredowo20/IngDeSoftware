const Pool = require('pg').Pool
const pool = new Pool({
  user: 'software_user',
  host: 'localhost',
  database: 'software_db',
  password: 'software_pass',
  port: 5432,
});

const getPresupuestos = (usuario) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM presupuestos WHERE usuario = $1 ORDER BY name ASC', [usuario], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createPresupuesto = (body) => {
  return new Promise(function(resolve, reject) {
    const { usuario, name, id, partida, unidad, cantidad, valorunitario } = body
    pool.query('INSERT INTO presupuestos (usuario, name, id, partida, unidad, cantidad, valorunitario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [usuario, name, id, partida, unidad, cantidad, valorunitario], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added`)
    })
  })
}

const deletePresupuesto = (name) => {
  return new Promise(function(resolve, reject) {
    pool.query("DELETE FROM presupuestos WHERE name = $1", [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rowCount.toString()/*`Merchant deleted with Name: ${name}`*/)
    })
  })
}

const getPresupuestos2 = (name) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM presupuestos WHERE name = $1 ORDER BY name ASC', [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows.length.toString());
    })
  }) 
}

const getPresupuestos3 = (name) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT id,partida,unidad,cantidad,valorunitario FROM presupuestos WHERE name = $1 ORDER BY name ASC', [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getPresupuestos4 = (usuario) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT name FROM presupuestos WHERE usuario = $1 GROUP BY name ORDER BY name ASC', [usuario], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
    getPresupuestos,
    createPresupuesto,
    deletePresupuesto,
    getPresupuestos2,
    getPresupuestos3,
    getPresupuestos4
}