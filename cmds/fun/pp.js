const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let recipient = msg.options.getUser("user") || msg.author;

    let response;
    let recMem = msg.guild.members.cache.get(recipient.id);

    let recNick = recMem ? recMem.displayName : recipient.username;

    let responses = [
      "8D",
      "8=D",
      "8==D",
      "8===D",
      "8====D",
      "8=====D",
      "8======D",
      "8=======D",
      "8========D",
      "8=========D",
      "8==========D",
      "8===========D",
    ];

    if (recipient.id == "463119138500378624") {
      //me
      response = "8======================================================D";
      const ppEm = new EmbedBuilder()
        .setColor(config.embedColor)
        .addFields({ name: `${recNick}'s pp`, value: `${response}` });

      msg.reply({ embeds: [ppEm] });
    } else if (recipient.id == "463119267832004620") {
      //noah
      response = ".";
      const ppEm = new EmbedBuilder()
        .setColor(config.embedColor)
        .addFields({ name: `${recNick}'s pp`, value: `${response}` });

      msg.reply({ embeds: [ppEm] });
    } else if (recipient.id == "763480802511945789") {
      //gerrardo
      response = "8===================================================D";
      const ppEm = new EmbedBuilder()
        .setColor(config.embedColor)
        .addFields({ name: `${recNick}'s pp`, value: `${response}` });

      msg.reply({ embeds: [ppEm] });
    } else {
      response = responses[Math.floor(Math.random() * responses.length)];

      const ppEm = new EmbedBuilder()
        .setColor(config.embedColor)
        .addFields({ name: `${recNick}'s pp`, value: `${response}` });

      msg.reply({ embeds: [ppEm] });
    }
  },
};
