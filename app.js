const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");



client.on("ready", () => {
  console.log(`Bot state: started\n 
	| STATS:\n| LOG: bot started with: ${client.users.cache.size} users.\n| LOG: bot started in: ${client.channels.cache.size} channels.\n| LOG: bot started on: ${client.guilds.cache.size} guilds.`);

client.user.setPresence({ activity: { name: 'beta' }, status: 'online' })
});

client.on("message", async message => {
 
  if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


});


client.login(config.token);