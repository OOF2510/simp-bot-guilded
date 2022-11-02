const { Embed } = require("guilded.js");

module.exports = {
  async execute(msg, args, client, config) {
    // check ping
    let ping = await msg.reply("Pinging...");
    let pingEm = new Embed()
      .setTitle("Ping")
      .setColor(config.embedColor)
      .addField("API Latency", `\`${ping.createdAt - msg.createdAt}ms\``, true)
      .addField("Bot Latency", `\`${client.ws.ping?? 'error'}\`ms`, true)

    await ping.edit({ embeds: [pingEm] });
  },
};
