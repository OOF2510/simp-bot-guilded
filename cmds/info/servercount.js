module.exports = {
  async execute(msg, args, client, config) {
    msg.reply(`Simp Bot is in ${client.servers.cache.size} servers!`);
  },
};
