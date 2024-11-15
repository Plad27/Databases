const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ber_02',
  password: '12345',
  port: 5432,
})

const getIntermediary = (request, response) => {
    pool.query('SELECT * FROM hypo_common.intermediary', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getIntermediaryById = (request, response) => {
    const id = parseInt(request.params.id)
     
    pool.query('select * FROM hypo_common.intermediary WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createIntermediary = (request, response) => {
    const { name, shortName, schemaName, status } = request.body
  
    pool.query('INSERT INTO hypo_common.intermediary (name, short_name, schema_name, status) VALUES ($1, $2, $3, $4) RETURNING *', [name, shortName, schemaName, status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`intermediary added with ID: ${results.rows[0].id}`)
    })
  }

  const updateIntemediary  = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, shortName, schemaName, status } = request.body
  
    pool.query(
      'UPDATE hypo_common.intermediary SET name = $1, short_name = $2, schema_name = $3, status = $4 WHERE id = $5 ',
      [name, shortName, schemaName, status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Intermediary modified with ID: ${id}`)
      }
    )
  }  



const deleteIntermediary = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM hypo_common.intermediary WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }



module.exports = {
    getIntermediary,
    deleteIntermediary,
    createIntermediary,
    updateIntemediary,
    getIntermediaryById,
  
}




