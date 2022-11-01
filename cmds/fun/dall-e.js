const Craiyon = require("craiyon");

const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let prompt = msg.options.getString("prompt");

    await msg.deferReply();

    try {
      const craiyon = new Craiyon.Client();

      let result = await craiyon.generate({ prompt: `${prompt}` });
      let buffer = result.images[0].asBuffer();

      let attachment = new AttachmentBuilder(buffer, { name: `${prompt}.jpg` });

      await msg.editReply({
        content: `Prompt: **${prompt}**`,
        files: [attachment],
      });
    } catch (e) {
      return console.log(e);
    }
  },
};
