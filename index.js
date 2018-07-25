const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const EventEmitter = require('events')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

server.use(cors())
server.use(bodyParser.json())
server.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const sendMessage = new EventEmitter()

sendMessage.on('push', (req, res) => {
    console.log('Push event')
    const body = req.body

    let message = `${body.head_commit.author.name}\n[New Push:](${body.compare}) "${body.head_commit.message}"`

    axios
        .post(
            `https://api.telegram.org/bot${process.env.BOT_KEY}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: message,
                parse_mode: "Markdown",
                disable_web_page_preview: true
            }
        )
        .then(response => {
            console.log('Message posted')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('Error :', err)
            res.sendStatus(500)
        })

})

server.get('/', (req, res) => {
    res.sendStatus(200)
})

server.get('/web-hook', (req, res) => {
    res.sendStatus(200)
})

server.post('/web-hook', (req, res) => {
    const event = req.headers["x-github-event"]
    sendMessage.emit(event, req, res)

})

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})