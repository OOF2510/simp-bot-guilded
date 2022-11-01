const axios = require("axios");

module.exports = {
  async execute(msg, args, client, config) {
    try {
      let response = await axios.get("https://v2.jokeapi.dev/joke/Any");
      let joke = response.data;

      if (joke.setup && joke.delivery) {
        msg.reply(`${joke.setup}\n||${joke.delivery}||`);
      } else if (joke.joke) {
        msg.reply(`${joke.joke}`);
      } else {
        msg.reply({ content: "Error!" });
      }
    } catch (e) {
      msg.reply({ content: "Error!" });
    }
  },
};
