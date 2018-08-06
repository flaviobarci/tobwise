const server = require('./server')
const routes = require('./routes')
const dotenv = require('dotenv')

const result = dotenv.config()

if (result.error) {
    throw result.error
}

routes(server)

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})