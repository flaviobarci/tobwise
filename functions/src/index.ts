import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

const app = express()
app.use(cors({ origin: true }))

app.post('/', async (req, res) => {
  const isTelegramMessage = req.body
                          && req.body.message
                          && req.body.message.chat
                          && req.body.message.chat.id
                          && req.body.message.from
                          && req.body.message.from.first_name

  if (isTelegramMessage) {
    const chat_id = req.body.message.chat.id
    const { first_name } = req.body.message.from
    const message = req.body.message.text
    
    console.log(req.body.message);
    return res.status(200).send({
      method: 'sendMessage',
      chat_id,
      text: `Hello ${first_name} ${message} `
    })
  }

  return res.status(200).send({ status: 'not a telegram message' })
})

export const msg = functions.https.onRequest(app)
