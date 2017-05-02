const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const server = app.listen(3000, () => {console.log('Listening on port 3000...')})

app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'))
})
