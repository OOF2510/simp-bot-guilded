const urban = require("relevant-urban");
const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let word = msg.options.getString("word");
    await msg.deferReply();

    try {
      let res = await urban.random(`${word}`);
      res.definition = res.definition.replaceAll(`[`, "").replaceAll("]", "");
      res.example = res.example.replaceAll(`[`, "").replaceAll("]", "");

      let em = new EmbedBuilder();
      em.setTitle(`${word}`)
        .setAuthor({
          name: `Urban Dictionary`,
          iconURL:
            "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-01-11/297387706245_85899a44216ce1604c93_512.jpg",
          url: "https://www.urbandictionary.com/",
        })
        .setURL(`${res.urbanURL}`)
        .setColor(config.embedColor)
        .setDescription(`${res.definition}`)
        .addFields({ name: `example`, value: `${res.example}` })
        .setFooter({ text: `Definition by: ${res.author}` });

      await msg.editReply({ embeds: [em] });
    } catch (e) {
      await msg.editReply("Couldn't find that! Try again!");
    }
  },
};
