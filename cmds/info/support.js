const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    let supEm = new Embed()
      .setTitle(`Join Simp Bot Support!`)
      .setUrl("https://guilded.gg/Simp-Bot")
      .setColor(config.embedColor)

    msg.reply({ embeds: [supEm] });
  },
};
