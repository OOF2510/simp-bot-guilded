const whois = require("whois-light");

/**
 * Checks if the string is a valid domain
 * @param {string} domain
 * @returns {boolean}
 */
function checkDomain(domain) {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return regex.test(domain);
}
const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let domain = msg.options.getString("domain");

    if (!checkDomain(domain)) return msg.reply("That is not a valid domain!");
    let tld = domain.split(".")[1];

    let domainInfo = await whois
      .lookup({ format: true }, domain)
      .catch((error) => {
        let message = `Error executing: ||\`${error}\`||`;
        if (message.length > 1980) return msg.reply(`Error executing`);
        return msg.reply(message);
      });

    let domainName = domainInfo["Domain Name"];
    let regDomainID = domainInfo["Registry Domain ID"];
    let registrar = domainInfo["Registrar"];
    let lastUpdated = domainInfo["Updated Date"];
    let registered = domainInfo["Creation Date"];
    let expiryDate = domainInfo["Registry Expiry Date"];
    let abuseEmail = domainInfo["Registrar Abuse Contact Email"];
    let regOrg = domainInfo["Registrant Organization"];

    let widEm = new EmbedBuilder()
      .setTitle(`Domain info for ${domainName}`)
      .setColor(config.embedColor)
      .addFields(
        { name: `Registry Domain ID`, value: `${regDomainID}`, inline: true },
        { name: `Registrar`, value: `${registrar}`, inline: true },
        { name: `Last Updated`, value: `${lastUpdated}`, inline: true },
        { name: `Registered`, value: `${registered}`, inline: true },
        { name: `Expiry Date`, value: `${expiryDate}`, inline: true },
        { name: `Registrar Abuse Email`, value: `${abuseEmail}`, inline: true },
        { name: `Registrant Organization`, value: `${regOrg}`, inline: true }
      )
      .setTimestamp();

    msg.reply({ embeds: [widEm] });
  },
};
