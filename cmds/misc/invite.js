const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let invEm = new EmbedBuilder()
      .setTitle(`Invite me to your server!`)
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${config.clientID}&permissions=8&scope=bot%20applications.commands`
      )
      .setColor(config.embedColor)
      .setTimestamp();
    msg.reply({ embeds: [invEm] });
  },
};
