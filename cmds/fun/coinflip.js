const { Embed } = require('guilded.ts');

module.exports = {
 async execute(msg, args, client, config) {
    let sides = ["Heads", "Tails"];
    let result = sides[Math.floor(Math.random() * sides.length)];
    let img;

    switch (result) {
      case "Heads":
        img =
          "https://media.discordapp.net/attachments/1021763955099717664/1021768326504005735/Heads.png";
        break;

      case "Tails":
        img =
          "https://media.discordapp.net/attachments/1021763955099717664/1021768326860525728/Tails.png";
        break;

      default:
        break;
    }

    let embed = new Embed()
      .setTitle(`${result}`)
      .setImage(`${img}`)
      .setColor(config.embedColor);

    msg.reply({ embeds: [embed] });
  },
};
