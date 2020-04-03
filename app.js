const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Started.`); 
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
  if(command === "new") {
    message.delete()

    var a = message.guild.channels.create('ticket-' + message.author.username, 'text').then(a => {
        a.setParent('694582022210977832');
        a.updateOverwrite(message.guild.roles.everyone, {VIEW_CHANNEL: false, SEND_MESSAGES: false});
        a.updateOverwrite(message.author, {VIEW_CHANNEL: true, SEND_MESSAGES: true});

        var rolePick = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(config.name + " | Tickets")
        .setDescription(`Please select one of the following services by reacting below.`)
        .addField(config.a, ':regional_indicator_a:', true)
        .addField(config.b, ':regional_indicator_b:', true)
        .addField(config.c, ':regional_indicator_c:', true)
        .addField(config.d, ':regional_indicator_d:', true)
        .addField(config.e, ':regional_indicator_e:', true)
        .addField(config.f, ':regional_indicator_f:', true)
        .addField(config.g, ':regional_indicator_g:', true)
        .addField(config.h, ':regional_indicator_h:', true)
        a.send(rolePick).then(c => {
            let arole = message.guild.roles.cache.find(x => x.name === config.a);
            let brole = message.guild.roles.cache.find(x => x.name === config.b);
            let crole = message.guild.roles.cache.find(x => x.name === config.c);
            let drole = message.guild.roles.cache.find(x => x.name === config.d);
            let erole = message.guild.roles.cache.find(x => x.name === config.e);
            let frole = message.guild.roles.cache.find(x => x.name === config.f);
            let grole = message.guild.roles.cache.find(x => x.name === config.g);
            let hrole = message.guild.roles.cache.find(x => x.name === config.h);
        
            c.react('🇦');
            c.react('🇧');
            c.react('🇨');
            c.react('🇩');
            c.react('🇪');
            c.react('🇫');
            c.react('🇬');
            c.react('🇭');

            let filter = (reaction, user) => ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭'].includes(reaction.emoji.name) && user.id === message.author.id;

            let secondMessage = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(config.name + " | Tickets")

                c.awaitReactions(filter, {max: 1, time: 60000}).then(collected => {
                    var reaction = collected.first();
                    switch (reaction.emoji.name) {
                        case '🇦':
                            a.updateOverwrite(arole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${arole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇧':
                            a.updateOverwrite(brole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });       
                            
                            secondMessage.setDescription(`${brole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇨':
                            a.updateOverwrite(crole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${crole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇩':
                            a.updateOverwrite(drole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${drole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇪':
                            a.updateOverwrite(erole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${erole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇫':
                            a.updateOverwrite(frole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${frole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇬':
                            a.updateOverwrite(grole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${grole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                        case '🇭':
                            a.updateOverwrite(hrole, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

                            secondMessage.setDescription(`${hrole} group has been added to the ticket!`)
                            a.send(secondMessage);
                            break;
                    }
                });
            });
        });
    }

    if(command === "close") {
        message.delete()

        if(message.channel.parent.id === "694582022210977832") {
            message.channel.delete();
        } else {
            let noEmbed = new Discord.MessageEmbed()
            .setTitle(config.name + " | Error")
            .setDescription(`You cannot delete this channel!`)
            .setColor(config.error)
            message.channel.send(noEmbed).then(b => {
                b.delete({ timeout: 5000 });
            });
        }
    }

    if(command === "add") {
        message.delete()

        let user = message.mentions.members.first();

        if(message.channel.parent.id === "694582022210977832") {
            if(!user) {
                let noEmbed = new Discord.MessageEmbed()
                .setTitle(config.name + " | Error")
                .setDescription(`Please mention a user!`)
                .setColor(config.error)
                message.channel.send(noEmbed).then(c => {
                    c.delete({ timeout: 10000 });
                });   
            } else {
                message.channel.createOverwrite(user, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                  });
            }
        } else {
            let noEmbed = new Discord.MessageEmbed()
            .setTitle(config.name + " | Error")
            .setDescription(`You cannot delete this channel!`)
            .setColor(config.error)
            message.channel.send(noEmbed).then(d => {
                d.delete({ timeout: 5000 });
            });
        }
    }

    if(command === "remove") {
        message.delete()

        let user = message.mentions.members.first();

        if(message.channel.parent.id === "694582022210977832") {
            if(!user) {
                let noEmbed = new Discord.MessageEmbed()
                .setTitle(config.name + " | Error")
                .setDescription(`Please mention a user!`)
                .setColor(config.error)
                message.channel.send(noEmbed).then(c => {
                    c.delete({ timeout: 10000 });
                });   
            } else {
                message.channel.overwritePermissions([
                        {
                            id: user.id,
                            deny: ['VIEW_CHANNEL'],
                            deny: ['SEND_MESSAGES']
                        }
                    ], 'Needed to change permissions');
            }
        } else {
            let noEmbed = new Discord.MessageEmbed()
            .setTitle(config.name + " | Error")
            .setDescription(`You cannot delete this channel!`)
            .setColor(config.error)
            message.channel.send(noEmbed).then(d => {
                d.delete({ timeout: 5000 });
            });
        }
    }

    if(command === "kick") {
        message.delete()

        if(!message.member.roles.cache.some(r=>["[Support]", "[Freelancer]",  "[Developer]", "[Administrator]", "[Manager]"].includes(r.name)) )
          return (await message.reply("Sorry, you don't have permissions to use this!")).then(a => {
              a.delete({timeout: 5000})
          });

        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Please mention someone!").then(a => {
            a.delete({timeout: 5000})
        });
        if(!member.kickable) 
          return message.reply("I cannot kick this user!").then(a => {
            a.delete({timeout: 5000})
        });
        
        await member.kick()
        message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag}.`).then(a => {
            a.delete({timeout: 20000})
        });
      }
      
      if(command === "ban") {
          message.delete()

        if(!message.member.roles.cache.some(r=>["[Support]", "[Freelancer]",  "[Developer]", "[Administrator]", "[Manager]"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!").then(a => {
            a.delete({timeout: 5000})
        });
        
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Please mention someone!").then(a => {
            a.delete({timeout: 5000})
        });
        if(!member.bannable) 
          return message.reply("I cannot ban this user!").then(a => {
            a.delete({timeout: 5000})
        });
        
        await member.ban()
        message.channel.send(`${member.user.tag} has been banned by ${message.author.tag}.`).then(a => {
            a.delete({timeout: 20000})
        });
      }
      
      if(command === "purge") {
        const args = message.content.split(' ').slice(1);
        const amount = args.join(' ');
        
        if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); 
        
        if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!');
        if (amount < 1) return message.reply('You have to delete at least 1 message!'); 
        
        await message.channel.messages.fetch({ limit: amount }).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }

    if(command === "msg") {
        message.delete()

        let text = args.join(" ");

        let textEmbed = new Discord.MessageEmbed()
        .setTitle('Hostile Announcement')
        .setDescription(text)
        .setColor(config.color)
        message.channel.send(textEmbed);
    }
});

client.on(`message`, async message => {
    if(message.channel.id != '691692717360807938') {
        if(!message.member.roles.cache.some(r => ["[Administrator]", "[Manager]"].includes(r.name)) ) {
            const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, `http`]
            try {
                if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
                    if (message.author.id === message.guild.ownerID) return;
                    await message.delete();
                    await message.channel.send(`You cannot send links in this server, ${message.author}!`);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
});

client.on(`guildMemberAdd`, member => {
    let autoRole = member.guild.roles.cache.find(x => x.name === "[User]");
    member.roles.add(autoRole);
});

client.login(config.token);
