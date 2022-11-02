const { getPost } = require("random-reddit");
const { Embed } = require("guilded.js");

module.exports = {
  async execute(msg, args, client, config) {
    let sub = args[0];

    try {
      let post = await getPost(`${sub}`);

      let em = new Embed()
        .setTitle(`${post.title ? post.title : "Error getting title"}`)
        .setColor(config.embedColor)
        .setUrl(`https://www.reddit.com${post.permalink}`);

      if (post.over_18)
        return msg.reply({
          content: `Oops! That post is NSFW, and this channel is not!`,
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
      });
    }
  },
};
