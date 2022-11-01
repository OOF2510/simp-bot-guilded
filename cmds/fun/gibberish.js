const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
let path = require("path");

const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let Gibberish = await exec(
        `python3 ${path.join(
          __dirname,
          "/../../",
          "util",
          "/",
          "gibberish.py"
        )}`
      ),
      gibberish = Gibberish.stdout.trim();

    msg.reply(`${gibberish}`);
  },
};
