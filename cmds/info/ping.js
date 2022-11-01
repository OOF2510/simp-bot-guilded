const { Client, Message, Embed } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    const embed = new Embed()
      .setTitle("Pong!")
      .addField("Bot Ping", `\`${client.ws.ping}\`ms`)
      .setColor(config.embedColor)
    
    await msg.reply({embeds: [embed]});
  },
};
