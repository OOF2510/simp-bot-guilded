const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
let path = require("path");

module.exports = {
  async execute(msg, args, client, config) {
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
