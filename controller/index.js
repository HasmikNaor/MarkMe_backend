const { handleMsg } = require("./lib/Telegram");

async function handler(req, method) {
  //takes all the input requests that we are getting to the server and handle them appropriately
  const { body } = req;

  if (body) {
    const msgObj = body.message;
    await handleMsg(msgObj);
  }
  return;
}

module.exports = { handler };
