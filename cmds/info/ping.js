const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    const embed = new Embed()
      .setTitle("Pong!")
      .addField("Bot Ping", `\`${client.ws.ping}\`ms`)
      .setColor(config.embedColor);

    await msg.reply({ embeds: [embed] });
  },
};
