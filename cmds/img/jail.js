const { SlashCommandBuilder } = require("discord.js");
const { Canvacord } = require("canvacord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jail")
    .setDescription("[IMG] puts specified user in jail")
    .addUserOption((option) =>
      option.setName("user").setDescription("user to jail").setRequired(true)
    ),
  async execute(interaction, client, config, db, Discord, allowed) {
    let msg = interaction;
    let user = interaction.options.getUser("user");
    await msg.deferReply();

    let av = user.displayAvatarURL();

    let image = await Canvacord.jail(av, true);
    let file = new Discord.AttachmentBuilder(image, {
      name: `${user.tag}-jail.png`,
    });

    msg.editReply({ files: [file] });
  },
};
