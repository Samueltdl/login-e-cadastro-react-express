const pgp = require('pg-promise')(/* options */)
require('dotenv').config();

const db = pgp(process.env.CONNECTION_STRING)

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })