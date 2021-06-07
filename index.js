const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot state: started\n 
	| STATS:\n| LOG: bot started with: ${client.users.cache.size} users.\n| LOG: bot started in: ${client.channels.cache.size} channels.\n| LOG: bot started on: ${client.guilds.cache.size} guilds.`);

client.user.setPresence({ activity: { name: `${client.users.cache.size} users` }, status: 'online' })
 
});

  client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


  if(command === "c") {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("**you are not authorized to use this command.**");

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("provide a number between 1 and 100 for the number of messages to delete");
      
    message.channel.bulkDelete(deleteCount)
      .catch(error => message.reply("${error} "));
  
    }
    else if (command === "flipcoin" ) {
      var facts = ["Heads", "Tails", "lol", "Your coin fell in the ground, pick it up and try again."];
      var fact = Math.floor(Math.random() * facts.length);
      message.channel.send(facts[fact]);
  }

  else if (command === "avatar") {
      const user = message.mentions.users.first() || message.author;
      let avatarEmbed = new Discord.MessageEmbed()
      .setColor("#eb8f34")
      .setImage(user.avatarURL());
      message.channel.send(avatarEmbed);
  }

  else if(command === 'help') {
    const help = new Discord.MessageEmbed()
    .setColor("#eb8f34")
    .setTitle("Help")
    .setDescription(`
    \n**Public Commands**
    ping - Ping Information.
    avatar - Fetch the avatar of a desired user.
    flipcoin - Flip a coin for a random answer.
    \n**Moderation Commands**
    purge - Used for moderation, Purge Command.
    `);
    message.channel.send(help)
}
  });
client.login(config.token);