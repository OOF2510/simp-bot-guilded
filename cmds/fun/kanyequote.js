const kanye = require("kanye.js");

const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    let { quote } = await kanye();
    let quoteEm = new Embed()
      .setTitle(`"${quote}"`)
      .setColor(config.embedColor);
    msg.reply({ embeds: [quoteEm] });
  },
};
