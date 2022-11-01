var shortUrl = require("node-url-shortener");
const isURL = require("../../util/isURL");
const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let url = msg.options.getString("url");
    if (!isURL(url))
      return msg.reply("That is not a valid URL!", { ephemeral: true });

    shortUrl.short(url, function (err, url) {
      msg.reply(`<${url}>`);
    });
  },
};
