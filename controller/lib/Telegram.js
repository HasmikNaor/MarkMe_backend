const { axiosInstance } = require("./axios");
const Template = require("../../models/template");

function sendMsgToUser(msgObj, msgTxt) {
  return axiosInstance.get("sendMessage", {
    chat_id: msgObj.chat.id,
    text: msgTxt,
  });
}

async function fetchAllTemplates() {
  try {
    return await Template.find();
  } catch (err) {
    console.error("Error fetching templates:", err);
    throw err;
  }
}

const displayNamesList = (names) => {
  if (names.length > 0) {
    return names.map((t, index) => `${index}: ${t.name}`).join("\n");
  }
  return "the templates list is empety";
};

async function handleMsg(msgObj) {
  // handles messages from telegram bot
  const msgTxt = msgObj?.text || "";
  let templates = await fetchAllTemplates();
  templates = templates.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  if (msgTxt[0] === "/") {
    const command = msgTxt.substr(1);
    switch (command) {
      case "start":
        return sendMsgToUser(
          msgObj,
          `Hi ${msgObj?.chat?.first_name}, I can Help you to get started. enter /templates to get the list`
        );
      case "templates":
        return sendMsgToUser(
          msgObj,
          `choose number:\n${displayNamesList(templates)}`
        );
      default:
        return sendMsgToUser(msgObj, "Hi I do not know command ");
    }
  } else {
    if (templates[msgTxt]) {
      return sendMsgToUser(msgObj, templates[msgTxt].content);
    } else {
      return sendMsgToUser(
        msgObj,
        "could not find the name. please try again. enter /start to get started"
      );
    }
  }
}

module.exports = { handleMsg };
