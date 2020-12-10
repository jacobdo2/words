import { Pool } from 'pg'
import dbConfig from '../../constants/dbConfig'


export default (req, res) => {
  const pool = new Pool(dbConfig)
  pool.query(`SELECT value FROM words`, (err, result) => {

    if (!result) {
      res.send({status: 'error'})
    }

    res.send({status: 'done', data: Array.from(new Set(result.rows.map(({ value}) => value)))});
    pool.end()
})
}
