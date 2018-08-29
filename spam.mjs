const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require("./info.json");

console.log(Info);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  for(i = 0; i < 100; i++)
  {
    return msg.channel.send(`${Info.spamcommand}`);
  }
});

client.login(Info.token);
