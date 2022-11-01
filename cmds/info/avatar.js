const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    console.log(`---------------------\n${msg.author}\n---------------------`);
    if (msg.mentions?.users?.length > 0) console.log(msg.mentions.users[0]);
    // use '?' syntax to get msg.mentions.users[0] if it exists, then use client.users.cache.get to get the user, otherwise use msg.author
    let user = msg.mentions?.users[0] ? client.users.cache.get(msg.mentions.users[0].id) : msg.author;

    let av = user.avatar? user.avatar : "https://cdn.discordapp.com/embed/avatars/0.png";

    let avEm = new Embed()
      .setTitle(`${user.name}'s Avatar`)
      .setImage(av)
      .setColor(config.embedColor)
      .setTimestamp();

    await msg.reply({ embeds: [avEm] });
  },
};
