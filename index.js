const Discord = require('discord.js');
const Random = require('random');   
const fs = require('fs');
const jsonfile = require('jsonfile');
const { cachedDataVersionTag } = require('v8');


const bot = new Discord.Client();

var stats = {};
if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json')
}


bot.on('message', (message) => {

if(message.author.id == bot.user.id)
    return;

if(message.guild.id in stats === false){
    stats[message.guild.id] = {};
}


const guildstats = stats[message.guild.id];
if(message.author.id in guildstats === false){
    guildstats[message.author.id] = {
        xp: 0,
        level: 0,
        last_message: 0,
        coins: 0
    };
}

    const userStats = guildstats[message.author.id];
    if(Date.now() - userStats.last_message > 60000){
        userStats.xp += Random.int(10, 20);
        userStats.last_message = Date.now();
        userStats.coins += Random.int(1, 5)


        const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if(userStats.xp >= xpToNextLevel){
                userStats.level++;
                userStats.xp = userStats.xp - xpToNextLevel;
                message.reply('you have reached level ' + userStats.level);
            }

            jsonfile.writeFileSync('stats.json', stats);

            console.log(message.author.username + ' now has ' + userStats.xp + ' XP');
            console.log(xpToNextLevel + ' XP needed for next level.');
            console.log(message.author.username + ' now has ' + userStats.coins + ' coins');
    }

    
    // TODO: Add blocked channel XP gain
    // TODO: Finish leaderboard so user can grab anothers persons rank
    // TODO: Add any custom commands from staff team


    // Commands
    const parts = message.content.split(' ');
    const user = message.mentions.users.first();  


    if(message.content.startsWith('-rank')){
        message.reply('You are level ' + userStats.level);
    }

    

    if(parts[0] == '-bal'){
        message.reply('you have ' + userStats.coins + ' coins avalible');
    }


    if(parts[0] === '-online'){
        message.reply('Online sir');
    }
    if(parts[0] === 'ping'){
        message.reply('pong');
    }

    


})

bot.login('NzMxNzE3MDAyMTQxNDk5NDg0.XwqM_w.uIClgZaPLk9IFmVnBO6tvrJVIpk');
