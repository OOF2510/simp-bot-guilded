const { Embed } = require("guilded.js");

module.exports = {
  async execute(msg, args, client, config) {
    // check if a user was mentioned, make it a boolean
    const mentioned = msg.mentions?.users?.length > 0;
    // if a user was mentioned, get the user object with client.users.fetch, otherwise get the author
    const user = mentioned ? client.users.fetch(msg.serverId, msg.mentions.users[0].id) : msg.author;

    let av = user.avatar? user.avatar : "https://cdn.discordapp.com/embed/avatars/0.png";

    let avEm = new Embed()
      .setTitle(`${user.name}'s Avatar`)
      .setImage(av)
      .setColor(config.embedColor)
      .setTimestamp();

    await msg.reply({ embeds: [avEm] });
  },
};
