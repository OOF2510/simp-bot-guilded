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
    try {
      let response = await axios.get("https://v2.jokeapi.dev/joke/Any");
      let joke = response.data;

      if (joke.setup && joke.delivery) {
        msg.reply(`${joke.setup}\n||${joke.delivery}||`);
      } else if (joke.joke) {
        msg.reply(`${joke.joke}`);
      } else {
        msg.reply({ content: "Error!", ephemeral: true });
      }
    } catch (e) {
      msg.reply({ content: "Error!", ephemeral: true });
    }
  },
};
