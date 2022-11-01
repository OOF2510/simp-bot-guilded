const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    msg.reply(`https://github.com/OOF2510/simp-bot-guilded`);
  },
};
