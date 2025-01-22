require("dotenv").config();
const express = require("express");
const { PORT = 4040, DATABASE, NODE_ENV } = process.env;
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const axios = require("axios");
const ResourceNotFoundErr = require("./errors/resourceNotFound");
const cors = require("cors");
mongoose.connect("mongodb://127.0.0.1:27017/telegram_bot");
const app = express();
app.use(express.json());
const { handler } = require("./controller/index");
const templates = require("./routes/template");
const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(templates);

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).send({ name: err.name, message: err.message });
});

app.post("*", async (req, res) => {
  console.log(req.body);

  res.send(await handler(req));
});

const init = async () => {
  try {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${SERVER_URL}`);
    console.log("Webhook set successfully:", res.data);
  } catch (error) {
    console.error(
      "Error setting the webhook:",
      error.message,
      TELEGRAM_API,
      SERVER_URL
    );
  }
};

app.listen(PORT, async function (err) {
  if (err) console.log(err);
  console.log("Server listening on Port ", PORT);
  await init();
});
