const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
let os = require("os");
const millisecondsToStr = require("./../../util/convertMilsec.js");
const formatBytes = require("./../../util/formatBytes.js");
const { Embed } = require("guilded.js");

module.exports = {
  async execute(msg, args, client, config) {

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

    let DjsV = require("../../package.json").dependencies["guilded.js"],
      djsV = DjsV.replace("^", "v");

    let infoEm = new Embed()
      .addField('Platform', os.platform(), true)
      .addField('OS Release', os.release(), true)
      .addField('OS Version', os.version(), true)
      .addField('Uptime', uptime, true)
      .addField('Bot Uptime', botUptime, true)
      .addField('Bot RAM Usage', memUsage, true)
      .addField('System RAM Usage', sysMemUsage, true)
      .addField('Node Version', nodeV, true)
      .addField('Guilded.js Version', djsV, true)
      .setColor(config.embedColor)
      .setTitle("Info")

    msg.reply({ embeds: [infoEm] });
  },
};
