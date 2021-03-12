const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const {MessageEmbed} = require('discord.js');
const guildInvites = new Map();


client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
  client.user.setActivity("you invite members and tracking them!", {
    type: "WATCHING",
   });
   client.channels.cache.find(channel => channel.name === 'invites-logs').send("yo dawg my is status: ``online`` "); // for discord v12
    console.log(`${client.user.tag} has logged in.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
        .setColor('#802d16')
        .addFields(
            { name: 'Username:', value: `${member.user.tag}`, inline: true },
            { name: 'Invited by:', value: `${usedInvite.inviter.tag}`, inline: true },
            { name: 'Invitation Link:', value: `${usedInvite.url}`, inline: true },
            { name: 'Join Count:', value: `${member.guild.memberCount}`, inline: true },
            { name: 'User ID:', value: `${member.user.id}`, inline: true },
            { name: 'Created At:', value: `${member.user.createdAt}`, inline: true },

                          )
         
            .setTimestamp()
            .setTitle(`Member just Joined `);
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'invites-logs');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
    if (message.content === "oii") {
        message.channel.send(`I am Active in ${client.guilds.cache.size} Servers`);
    }
    if (message.content === "yo") {
        message.channel.send(`I am Active in ${client.guilds.cache.size} Servers`);
    }
    if (message.content === "ola") {
        message.channel.send(`I am Active in ${client.guilds.cache.size} Servers`);
    }
});
client.login(config.token);