const Guilded = require("guilded.js");
const { Collection } = require("discord.js");

let config;
var startupArgs = process.argv.slice(2);
if (startupArgs[0] == "--dev") config = require("./config.dev.json");
else config = require("./config.json");

const client = new Guilded.Client({ token: config.token });

client.commands = new Collection();

const cmdFiles = require("./util/getAllFiles")("./cmds/").filter((file) =>
  file.endsWith(".js")
);

for (const file of cmdFiles) {
  const cmd = require(`${file}`);
  // get command name from file name
  const cmdName = file.split("/")[file.split("/").length - 1].split(".")[0];
  client.commands.set(cmdName, cmd);
}

client.on("ready", () => {
  console.log("Ready!");
  console.log(`Logged in as ${client.user.name}!`);
  console.log(client);
  console.log(client.user.name);
});

client.on("messageCreated", async (msg) => {
  if (!msg.content.startsWith(config.prefix)) return;

  const commandName = msg.content.split(" ")[0].slice(config.prefix.length);
  const args = msg.content.split(" ").slice(1);

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(msg, args, client, config).catch(async (error) => {
      msg.reply(`${error}`);
      console.log(error);
    });
  } catch (error) {
    msg.reply(`${error}`);
    console.log(error);
  }
});

client.on('error', () => {
  console.log('oopsie');
});

client.login()
