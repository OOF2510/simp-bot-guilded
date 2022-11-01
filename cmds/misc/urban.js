const urban = require("relevant-urban");
const { Embed } = require("guilded.ts");

module.exports = {
  async execute(msg, args, client, config) {
    let word = args.join(" ");
    
    try {
      let res = await urban.random(`${word}`);
      res.definition = res.definition.replaceAll(`[`, "").replaceAll("]", "");
      res.example = res.example.replaceAll(`[`, "").replaceAll("]", "");

      let em = new Embed()
        .setTitle(`${word}`)
        .setUrl(`${res.urbanURL}`)
        .setColor(config.embedColor)
        .setDescription(`${res.definition}`)
        .addField(`example`, `${res.example}`)

      await msg.reply({ embeds: [em] });
    } catch (e) {
      await msg.reply("Couldn't find that! Try again!");
    }
  },
};
