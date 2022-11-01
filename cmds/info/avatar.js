const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let user = msg.options.getUser("user") || msg.author;
    let mem = msg.guild.members.cache.get(user.id);

    let userNick = mem ? mem.displayName : user.username;

    let av = user.displayAvatarURL({ size: 512 });

    let avEm = new EmbedBuilder()
      .setTitle(`${userNick}'s Avatar`)
      .setImage(av)
      .setColor(config.embedColor)
      .setTimestamp();

    await msg.reply({ embeds: [avEm] });
  },
};
