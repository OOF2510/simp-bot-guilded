const axios = require("axios");

const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let recipient = msg.options.getUser("user");

    await msg.deferReply();

    try {
      let { data } = await axios.get(
        "https://getpickuplines.herokuapp.com/lines/random"
      );
      let { line } = data;

      return msg.editReply(`${recipient ? recipient : ""} ${line}`);
    } catch (e) {
      return msg.editReply({ content: "Error!", ephemeral: true });
    }
  },
};
