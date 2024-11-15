const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./CRUD')
const db2 = require('./funding')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/intermediary', db.getIntermediary)
app.get('/intermediary/:id', db.getIntermediaryById)
app.post('/intermediary',db.createIntermediary)
app.put('/intermediary/:id',db.updateIntemediary)
app.delete('/intermediary/:id', db.deleteIntermediary)
app.get('/fundreq', db2.getFundrequests)
app.get('/fundinq',db2.fundingInquires)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })