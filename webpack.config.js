var webpack = require('webpack')

module.exports = {
  entry: './public/js/game.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  }
}