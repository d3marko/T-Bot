const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot state: started\n 
	| STATS:\n| LOG: bot started with: ${client.users.cache.size} users.\n| LOG: bot started in: ${client.channels.cache.size} channels.\n| LOG: bot started on: ${client.guilds.cache.size} guilds.`);

client.user.setPresence({ activity: { name: `${client.users.cache.size}` }, status: 'online' })

 
});

client.login(config.token);