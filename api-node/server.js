const http = require('http')
const app = require('./app')
const database = require('./configuration/database')
const port = process.env.PORT || 3000

database.initDatabase()
const server = http.createServer(app)

server.listen(port)
