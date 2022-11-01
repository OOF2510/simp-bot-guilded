const got = require("got");

module.exports = {
  async execute(msg, args, client, config) {
    let recipient
    if (msg.mentions) {
      recipient = client.users.cache.get(msg.mentions.users[0])
    } else {
      recipient = msg.author
    }

    try {
      let response = await got(
        "https://evilinsult.com/generate_insult.php?lang=en&type=text"
      );
      let insult = response.body;

      if (user) {
        msg.reply(`${user} ${insult}`);
      } else {
        msg.reply(`${insult}`);
      }
    } catch (e) {
      msg.reply({ content: "Error!" });
    }
  },
};
