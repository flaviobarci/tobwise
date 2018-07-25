const server = require('./server')
const routes = require('./routes')

require('dotenv').config()

routes(server)

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})