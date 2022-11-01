const got = require("got");
const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let user = msg.options.getUser("user");

    try {
      let response = await got(
        "https://evilinsult.com/generate_insult.php?lang=en&type=text"
      );
      let insult = response.body;

      if (user) {
        msg.reply(`${user} ${insult}`);
      } else {
        msg.reply(`${insult}`);
      }
    } catch (e) {
      msg.reply({ content: "Error!", ephemeral: true });
    }
  },
};
