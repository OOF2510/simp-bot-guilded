const kanye = require("kanye.js");

const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let { quote } = await kanye();
    let quoteEm = new EmbedBuilder()
      .setTitle(`"${quote}"`)
      .setFooter({ text: `- Ye` })
      .setColor(config.embedColor);
    msg.reply({ embeds: [quoteEm] });
  },
};
