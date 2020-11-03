import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({ origin: true }));

app.post("/", async (req, res) => {
  console.log(req);
});

export default app;
