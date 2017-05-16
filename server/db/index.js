const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/ddot'
let db = new Sequelize(dbUrl, {logging: false})

let Map = db.define('map', {
  name: Sequelize.STRING,
  creator: Sequelize.STRING,
  json: Sequelize.JSON
})

module.exports = {db, Map}
