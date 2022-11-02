const { Embed } = require('guilded.js');

module.exports = {
  async execute(msg, args, client, config) {
    let cmdArray = Array.from(client.commands.keys());
    const embed = new Embed()
      .setTitle("Help")
      .setDescription(`Here is a list of all my commands!`)
      .addField("Commands", cmdArray.join(", "))
      .setColor(config.embedColor);

    await msg.reply({ embeds: [embed] });
  },
};
