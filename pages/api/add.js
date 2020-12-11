import { Pool } from 'pg'
import dbConfig from '../../constants/dbConfig'


export default (req, res) => {
  const { word } = req.query;

  if (!/^[a-zA-Z\s$]+$/.test(word)) {
    res.send({status: 'error', message: 'Dont be terrible, letters and spaces only'})
    res.end()
    return;
  }

  const pool = new Pool(dbConfig)
  pool.query(`INSERT INTO words ("value") VALUES ('${word}')`, (err, result) => {

    if (!result) {
      res.send({status: 'error'})
    }

    res.send({status: 'done'});
    pool.end()
})
}
