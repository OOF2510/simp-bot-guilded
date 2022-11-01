const axios = require("axios");

module.exports = {
  async execute(msg, args, client, config) {
    let recipient
    if (msg.mentions) {
      recipient = client.users.cache.get(msg.mentions.users[0])
    } else {
      recipient = msg.author
    }

    try {
      let { data } = await axios.get(
        "https://getpickuplines.herokuapp.com/lines/random"
      );
      let { line } = data;

      return msg.reply(`${recipient ? recipient : ""} ${line}`);
    } catch (e) {
      return msg.reply({ content: "Error!" });
    }
  },
};
