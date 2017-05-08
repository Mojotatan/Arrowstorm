const Sequelize = require('sequelize')
let db = new Sequelize('postgres://localhost:5432/ddot', {logging: false})

let Map = db.define('map', {
  name: Sequelize.STRING,
  creator: Sequelize.STRING,
  json: Sequelize.JSON
})

module.exports = {db, Map}