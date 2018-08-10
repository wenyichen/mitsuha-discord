const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// const AWS = require('aws-sdk');

//setup aws bucket
// AWS.config.update({region: process.env.S3_REGION});
// var s3 = new AWS.S3();
// var params = {Bucket: process.env.S3_BUCKET, Key: 'myfile'};
// s3.headObject(params).on('success', function(response) {
//   console.log("Key was", response.request.params.Key);
// }).on('error',function(error){
//      //error return a object with status code 404
// }).send();

//initialize commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//log ready on bot startup
client.on('ready', () => {
    console.log('Ready!');
});

//
// client.on('guildMemberUpdate', (oldMember, newMember) => {

// });

//handle messages
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply("I don't know what you mean by that!");
    }
});

client.login(process.env.DISCORD_TOKEN);