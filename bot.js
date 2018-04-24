// Just login stuff for bot you should not mess with this!

const Discord = require(`discord.js`);
const bot = new Discord.Client();
const fs = require(`fs`);
const config = JSON.parse(fs.readFileSync(`./Config/config.json`, `utf8`));
var ping = require(`ping`);
var repeat = require(`repeat`);

var client = new Discord.Client();
// List of jokes add them or edit as you wish.

bot.login(config.token);

bot.on(`ready`, function(start) {
  // You can change that if you want but.. why?
  console.log(config.botname + ` , Online and ready.`);
  bot.user.setGame(config.prefix + config.command)


})

// Send msg to member-log channel when member joins & leaves

bot.on(`guildMemberAdd`, member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(`name`, config.memberlog);
  // Do nothing if the channel wasn`t found on this server
  if (!channel) {
    console.log(`CHANNEL NOT FOUND`);
  return;
  }
  // Send the message, mentioning the member
  
  const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - WELCOME!", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField(`Welcome to ` + config.servername + `, ${member}`, config.welcomemsg, true)

	channel.send({embed});
});

bot.on(`guildMemberRemove`, member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(`name`, config.memberlog);
  // Do nothing if the channel wasn`t found on this server
  if (!channel) {
    console.log(`CHANNEL NOT FOUND`);
  return;
  }
  // Send the message, mentioning the member
  const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - WELCOME!", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField(`${member}`, config.leavemsg, true)

	channel.send({embed});
});

// Now this is where the commands start.

bot.on(`message`, function(msg) {
	
	// anti-swear / advertisment
  
  for (var i = 0; i < config.bannedwords.length; i++) {
  if (msg.content.includes(config.bannedwords[i])) {
		msg.channel.send(`**HEY!** ` + msg.author + ` Go do that somewhere else!`)
		msg.delete(1);
    break;
  }
  }
  
	// Prevent bots from using the command and prevent usage of other prefixes then one defined.
	
  if(msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return;
  }
  
	// Define command variable
  
  var command = msg.content.split(` `)[0].slice(config.prefix.length).toLowerCase()
  var args = msg.content.split(` `).slice(1);
  var msgs = 0;
  msgs++
  let suffix = args.join(` `)
  
	// Main help command
  
  if(command === config.command) {
	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - HELP MENU", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)
	.setDescription("This is the main help command, everything is displayed here.")
  
	.setFooter("Legend: [A] = Admin only", "https://i.imgur.com/mgac1kc.png")

	.setTimestamp()

	.addField("Command: __" + config.prefix + config.command + "__" , "This is the help menu command. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "vote" + "__" , "Displays server vote links. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "joke" + "__" , "Tells you a funny joke. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "coinflip" + "__" , "Flip a coin, Heads or tails. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "8ball" + "__" , "This summons the mighty 8ball. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "purge" + "__" , "[A] Deletes messages. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "announce <msg>" + "__" , "[A] Announces message. \n", true)
		.addBlankField(true).addBlankField(true)
	.addField("Command: __" + config.prefix + "tempmute <@user>" + "__" , "[A] Mutes user for 30 minutes. \n", true)

	msg.channel.send({embed});
	
	
  }
  
	
	// Vote link command
	
  if (config.enablevote) {
	  var votel = "**>>** ";
	 if(command === "vote") {
		for (var i = 0; i < config.votelinks.length; i++) {
			
			var votel = votel + " [" + i + "] " + config.votelinks[i];
			
		}
		
	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - VOTE", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField("Thanks very much for voting!", votel, true)

	msg.channel.send({embed});

	 }

  }
	
	// Normal commands
	
	// generate random number and select joke based on that number
  if (command === "joke") {
    var i = Math.floor(Math.random() * config.jokes.length);
	var joke = config.jokes[i];

	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - JOKES", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField("LOL, You will like this one!", joke, true)

	msg.channel.send({embed});

  }	
  
	// generate random number and based on that determine heads or tails
  if(command === "coinflip") {
	var msgs = "null";
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      var msgs = "The coin landed on heads";
    } else if (result == 2) {
	  var msgs = "The coin landed on tails";
    }
	
	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - COIN FLIP", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField("That was a close one!", msgs, true)

	msg.channel.send({embed});

  }
  
	// generate random number and based on that generate random response
  if(command === "8ball") {
	var i = Math.floor((Math.random() * config.eightballsayings.length) + 0);
	
	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - MAGIC 8BALL", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField("8Ball has spoken!", config.eightballsayings[i], true)

	msg.channel.send({embed});
  }
  
  if(command === "website") {
	
	const embed = new Discord.RichEmbed()
	.setAuthor(config.botname + " v1.1 - WEBSITE", "https://i.imgur.com/mgac1kc.png")

	.setColor(0x00AE86)

	.addField("Our website link:", config.websitelink, true)

	msg.channel.send({embed});
  }
  
  // admin commands
  
  // chat purge
  if(command === "purge") {
	  let admin = msg.member.roles.find("name", config.adminrole); 
	  if (admin) {
		
		msg.channel.bulkDelete(25).catch(console.error);

		const embed = new Discord.RichEmbed()
		.setAuthor(config.botname + " v1.1 - PURGE", "https://i.imgur.com/mgac1kc.png")

		.setColor(0x00AE86)

		.addField("Removed 25 messages in channel.", "By: " + msg.author)
	
		msg.channel.send({embed});
		
	} else {
	  return msg.channel.send("You are not an admin!")
	}
  }
  
  // send announcment to specified channel
  if (command === "announce") {
	  let admin = msg.member.roles.find("name", config.adminrole); 
	  if (admin) {
	  const announcment =  msg.guild.channels.find(`name`, config.annoucmentschannel);
	  announcment.send(`@everyone **Announcment!** \n` + suffix);
	  }
  }
  
  // mute command
  
  if (command === "tempmute") {
	  let admin = msg.member.roles.find("name", config.adminrole); 
	  if (admin) {
		let mutedrole = msg.guild.roles.find("name", config.mutedrole);
		let member = msg.mentions.members.first();
		member.addRole(mutedrole).catch(console.error); // Give muted role to user
		const embed = new Discord.RichEmbed()
		.setAuthor(config.botname + " v1.1 - MUTE", "https://i.imgur.com/mgac1kc.png")

		.setColor(0x00AE86)

		.addField("User muted for 30 Min", "User: " + member.toString() + " By: " + msg.author)
	
		msg.channel.send({embed});
		setTimeout(() => { member.removeRole(mutedrole).catch(console.error); }, 60000); // Set the role back to online after 1 min.
	  }
  }

})
