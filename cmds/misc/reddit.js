const { getPost } = require("random-reddit");
const { Client, Message } = require("guilded.ts");

module.exports = {
  /**
   * Executes the command
   * @param {Message} msg
   * @param {Client} client
   * @param {*} config
   */
  async execute(msg, client, config) {
    let sub = msg.options.getString("subreddit");

    try {
      let post = await getPost(`${sub}`);

      let em = new EmbedBuilder()
        .setTitle(`${post.title ? post.title : "Error getting title"}`)
        .setColor(config.embedColor)
        .setFooter({
          text: `${post.subreddit_name_prefixed}`,
          iconURL:
            "https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png",
        })
        .setURL(`https://www.reddit.com${post.permalink}`);

      if (post.over_18 && !msg.channel.nsfw)
        return msg.reply({
          content: `Oops! That post is NSFW, and this channel is not!`,
          ephemeral: true,
        });
      switch (post.selftext) {
        case "":
          em.setImage(`${post.url}`);

          msg.reply({ embeds: [em] });
          break;
        default:
          em.setDescription(
            `${post.selftext ? post.selftext : "Error getting post content"}`
          );

          msg.reply({ embeds: [em] });
          break;
      }
    } catch (e) {
      msg.reply({
        content: `Are you sure that subreddit exists?`,
        ephemeral: true,
      });
    }
  },
};
