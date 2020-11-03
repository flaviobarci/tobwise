import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({ origin: true }));

type TelegramMessage = {
  body: {
    message: {
      chat: { id: number };
      from: { first_name: string };
      text: string;
      entities?: Array<{
        offset: number;
        length: number;
        type: string;
      }>;
    };
  };
};

app.post("/", async (req: TelegramMessage, res) => {
  const entities = req.body.message?.entities;
  if (entities != null) {
    const [{ type, offset, length }] = entities;
    if (type === "bot_command") {
      const chat_id = req.body.message.chat.id;
      const message = req.body.message.text;
      const url = message.substring(offset + length + 1, message.length);
      //Check if URL is a github repo
      const reg = /^https?:\/\/github.com\/[a-zA-Z-0-9]+\/[a-zA-Z-0-9]+$/;

      let isGihubRepo = reg.test(url);
      if (isGihubRepo) {
        return res.status(200).send({
          method: "sendMessage",
          chat_id,
          text: `Do you wish to add this?`,
        });
      } else {
        return res.status(200).send({
          method: "sendMessage",
          chat_id,
          text: `This is not a Github Repo.`,
        });
      }
    }
  }
  return res.status(200).send({ status: "not a telegram message" });
});

export default app;
