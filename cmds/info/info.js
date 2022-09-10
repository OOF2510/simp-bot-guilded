const { SlashCommandBuilder } = require("discord.js");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
let os = require("os");
const millisecondsToStr = require("./../../util/convertMilsec.js");
const formatBytes = require("./../../util/formatBytes.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Info about the bot and server"),
  async execute(interaction, client, config, db, Discord, allowed) {
    let msg = interaction;
    let guild = msg.guild;

    var uptimeMilsec = os.uptime() * 1000,
      uptime = millisecondsToStr(uptimeMilsec),
      botUptimeMilsec = process.uptime() * 1000,
      botUptime = millisecondsToStr(botUptimeMilsec),
      memUsageB = process.memoryUsage().heapUsed,
      memUsage = formatBytes(memUsageB),
      totalSysMem = os.totalmem(),
      freeSysMem = os.freemem(),
      usedSysMem = totalSysMem - freeSysMem,
      sysMemUsage = formatBytes(usedSysMem);

    let NodeV = await exec("node -v"),
      nodeV = NodeV.stdout.trim();

    let DjsV = require("../../package.json").dependencies["discord.js"],
      djsV = DjsV.replace("^", "v");

    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
      ServerCreated = guild.createdAt,
      serverCreated = ServerCreated.toLocaleDateString("en-US", options),
      today = new Date();
    (ServerAge = today.getTime() - ServerCreated.getTime()),
      (serverAge = millisecondsToStr(ServerAge));

    let serverOwner = await msg.guild.fetchOwner();

    let infoEm = new Discord.EmbedBuilder()
      .setTitle("Info")
      .addFields(
        { name: "Server Info", value: "Information about the server" },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
        {
          name: "Channels",
          value: `${guild.channels.cache.size}`,
          inline: true,
        },
        {
          name: "Emojis",
          value: `${guild.emojis.cache.size}`,
          inline: true,
        },
        {
          name: "Stickers",
          value: `${guild.stickers.cache.size}`,
          inline: true,
        },
        { name: "Server ID", value: `${guild.id}`, inline: true },
        {
          name: "Server Owner",
          value: `${serverOwner}`,
          inline: true,
        },
        {
          name: `Server Created`,
          value: `${serverCreated} (${serverAge} ago)`,
          inline: true,
        },
        {
          name: "OS Info",
          value: `Information about the bot's OS`,
          inline: false,
        },
        { name: "Platform", value: "`" + os.platform() + "`", inline: true },
        { name: "Arch", value: "`" + os.arch() + "`", inline: true },
        { name: "Release", value: "`" + os.release() + "`", inline: true },
        { name: "Version", value: "`" + os.version() + "`", inline: true },
        { name: "Bot RAM Usage", value: "`" + memUsage + "`", inline: true },
        {
          name: "System RAM Usage",
          value: "`" + sysMemUsage + "`",
          inline: true,
        },
        { name: `NodeJS Version`, value: "`" + nodeV + "`", inline: true },
        { name: `Discord.js Version`, value: "`" + djsV + "`", inline: true },
        { name: `System Uptime`, value: "`" + uptime + "`", inline: true },
        { name: `Bot Uptime`, value: "`" + botUptime + "`", inline: true }
      )
      .setThumbnail(guild.iconURL())
      .setColor(config.embedColor);

    msg.reply({ embeds: [infoEm] });
  },
};
