const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    let invEm = new Embed()
      .setTitle(`Invite me to your server!`)
      .setUrl(
        `https://discord.com/api/oauth2/authorize?client_id=${config.clientID}&permissions=8&scope=bot%20applications.commands`
      )
      .setColor(config.embedColor)
      .setTimestamp();
    msg.reply({ embeds: [invEm] });
  },
};
