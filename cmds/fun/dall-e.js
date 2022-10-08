const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const { CommandInteraction, Client } = require("discord.js"),
  Sequelize = require("sequelize");
const Craiyon = require("craiyon");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("craiyon")
    .setDescription(
      "Uses Craiyon to grenerate an image based on a prompt. This can take up to 3 mins to run."
    )
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("prompt to base image off of")
        .setRequired(true)
    ),
  /**
   * Executes the command
   * @param {CommandInteraction} interaction
   * @param {Client} client
   * @param {*} config
   * @param {Sequelize} db
   * @param {Array} allowed
   */
  async execute(interaction, client, config, db, allowed) {
    let msg = interaction;
    let prompt = interaction.options.getString("prompt");

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