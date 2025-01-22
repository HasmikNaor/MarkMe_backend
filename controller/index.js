const { handleMsg } = require("./lib/Telegram");

async function handler(req, method) {
  const { body } = req;

  if (body) {
    const msgObj = body.message;
    await handleMsg(msgObj);
  }
  return;
}

module.exports = { handler };
