//packages
const Discord = require('discord.js')
const axios = require('axios')
let fs = require("fs")
let JSONStream = require("JSONStream")
let he = require('he');
const config = require("./data/config.json")
var currencyMembers = require("./data/members.json")

const client = new Discord.Client()
var file = "/members.json"

var react = require("./functions/reacting")
var countDown = require("./functions/countdown")
var giveOnMessage = require("./functions/giveOnMessage")
var isLive = require("./functions/isLive")
var onJoin = require("./functions/onJoin")
var onLeave = require("./functions/onLeave")
var pictureReact = require("./functions/pictureReact")
var write = require("./functions/write")
console.log(write)

let commands = [];
fs.readdir("./commands/", (err, files) => {
    for (let t = 0; t < files.length; t++) {
        console.log(files[t])
        if (files[t].endsWith('.js')) {
            let command = require("./commands/" + files[t])
            console.log(command)
            commands.push(command)
        }
    }
})
console.log(commands)



client.on('ready', () => {
    console.log('I am ready!')
})
client.on('message', function (message) {
    console.log(message.channel.name + '|' + message.author.username + ": " + message.content)
    giveOnMessage(message, currencyMembers)

    //functions in general chat
    if (message.channel.name == config.generalChat) {
        react(message)
    }


    //functions in bot_spam chat
    if (message.channel.name == config.botSpamChat) {


    }



})

client.login(config.token).catch(function (error) {
    console.log(error)
})
