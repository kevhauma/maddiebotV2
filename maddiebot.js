//packages
const Discord = require('discord.js')
const axios = require('axios')
let fs = require("fs")
let JSONStream = require("JSONStream")
let he = require('he');
let Cleverbot = require('cleverbot-node');


const config = require("./data/config.json")
let currencyMembers = require("./data/members.json")
let membersFile = "/data/members.json"
const client = new Discord.Client()
let cleverbot = new Cleverbot;
cleverbot.configure({
    botapi: config.clevertoken
});


//loading functions
var react = require("./functions/reacting")
var countDown = require("./functions/countdown")
var dadJoke = require("./functions/dadJoke")
var giveOnMessage = require("./functions/giveOnMessage")
var isLive = require("./functions/isLive")
var onJoin = require("./functions/onJoin")
var onLeave = require("./functions/onLeave")
var pictureReact = require("./functions/pictureReact")
var write = require("./write")

//load commands
let generalCommands = []
let spamCommands = []
let reactionCommands = []
fs.readdir("./commands/", (err, files) => {
    for (let t = 0; t < files.length; t++) {
        if (files[t].endsWith('.js')) {
            let command = require("./commands/" + files[t])
            if (!command.spam)
                generalCommands.push(command)
            if (command.check)
                reactionCommands.push(command)
            if (command.spam)
                spamCommands.push(command)
        }
    }
})



client.on('ready', () => {
    console.log('I am ready!')
    countDown(client)
})
client.on('message', function (message) {
    if (message.channel.type == 'dm') {
        if (message.author.id !== client.user.id) {
            cleverbot.write(message.content, response => {
                message.reply(response.output)
            })
        }
        console.log(message.author.username + " sent something \n \t " + message.content)
    } else {
        console.log(message.channel.name + '|' + message.author.username + ": " + message.content)
        giveOnMessage(message, currencyMembers)

        //functions in general chat
        if (message.channel.name == config.generalChat) {
            react(message)
            dadJoke(client, message)
        }
        //commands for bot_spam
        if (message.channel.name == config.botSpamChat) {
            if (message.content.startsWith(config.prefix)) {
                let words = message.content.split(" ")
                for (let i = 0; i < generalCommands.length; i++) {
                    if (words[0].replace("!", "") == generalCommands[i].name) {
                        generalCommands[i].run(Discord, client, message, words, currencyMembers, axios, cleverbot, he)
                    }
                }
            }
        }
        //general commands
        if (message.content.startsWith(config.prefix)) {
            let words = message.content.split(" ")
            for (let i = 0; i < spamCommands.length; i++) {
                if (words[0].replace("!", "") == spamCommands[i].name) {
                    spamCommands[i].run(Discord, client, message, words, currencyMembers, axios, cleverbot, he)
                }
            }
        }

        //for art channels
        if (config.channelList.includes(message.channel.name))
            pictureReact(message)

        write(membersFile, currencyMembers, fs, JSONStream)
    }
})
client.on('presenceUpdate', (oldMember, newMember) => {
    isLive(oldMember, newMember, client)
})
client.on('guildMemberAdd', member => {
    onJoin(member)
})
client.on('guildMemberRemove', member => {
    onLeave(member)
})
client.on('messageReactionAdd', (reaction, user) => {
    for (let i = 0; i < reactionCommands.length; i++) {
        reactionCommands[i].check(Discord, client, reaction, user, currencyMembers)

    }
})

client.login(config.token).catch(function (error) {
    console.log(error)
})
