const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();
var fileSystem = require("fs");
var JSONStream = require("JSONStream");

var currencyMembers = require("./members.json")
var images = ["https://i.imgur.com/FnftREb.png", "https://i.imgur.com/1Z362if.png", "https://i.imgur.com/lKsnoO6.png", "https://i.imgur.com/jjmVHVp.png", "https://i.imgur.com/7dXCaZu.png", "https://i.imgur.com/vpFzuxH.png", "https://i.imgur.com/Tpy0DsY.png", "https://i.imgur.com/tUzVNWE.png"]
var channels = ["317615388852748288", "318288670178279424", "336794218523787264", "319246904817090561", "317982646510682112", "317670459862810625", "317336347855683585", "321665642782654464", "327565575524057089", "327565575524057089", "338125899113168896", "339463938523791361"]
var messages = new Array()
var leaderboard
var logC
var messageCounter = 0
var emoji = "🥚"

//leaderboard
//info panel
client.on('ready', () => {
    console.log('I am ready!');
    var guild = client.guilds.first();
    var cChannel = guild.channels.get("392765031172800522")
    logC = guild.channels.get("392765057559429139")
    var embed = getLeaderboard();

    cChannel.send({
            embed
        })
        .then(message => {
            leaderboard = message
        })
    sendMessage(guild)

    function sendMessage(sGuild) {
        setTimeout(() => {
                //message in random channel  (store message)
                //var channel = sGuild.channels.get("343334032727080960");
                var channel = sGuild.channels.get(channels[Math.floor(Math.random() * (channels.length))])

                var embed = new Discord.RichEmbed()
                    .setTitle("You have found an easter egg!")
                    .setImage(images[Math.floor(Math.random() * images.length)])
                    .setDescription("quick! click on the egg down below (reaction) to participate in the egg-hunt and gain points!")
                    .setColor(Math.floor(Math.random() * 16777215))
                    .setFooter("Egg-hunt by Maddybot", client.user.displayAvatarURL)

                channel.send({
                        embed
                    })
                    .then(message => {
                        messageCounter++
                        message.react(emoji)
                        messages[messages.length] = (message)
                        console.log(channel.name)
                        //message.delete()
                    })
                sendMessage(sGuild);
            },Math.floor(Math.random() * 30 + 45) * 60 * 1000) //every 45min - 1h15) 
    }

});
client.on('messageReactionAdd', (reaction, user) => {
    var isHuntMes = false

    if (user.id === client.user.id) return
    if (reaction.emoji.name !== emoji) return
    console.log(reaction.message.id)
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].id === reaction.message.id) isHuntMes = true
    }
    console.log("huntmes: " + isHuntMes)
    if (!isHuntMes) return

    removeMessage(reaction.message)
    var mesC = new Array();

    for (var i = 0; i < messages.length; i++)
        mesC[i] = messages[i].id
    console.log(mesC)


    var hunter = findMember(user)
    console.log(hunter.name)

    hunter.seasonal.points = hunter.seasonal.points + 1

    logC.send(user + " has found an egg and now has " + hunter.seasonal.points + " points.")

    var embed = getLeaderboard();
    leaderboard.edit({
        embed
    })
    reaction.message.delete();
    write();


})

function getLeaderboard() {
    var lEmbed = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setColor(15660098)
        .setThumbnail(client.guilds.first().iconURL)
    sort("eggs");
    for (var i = 0; i < 10; i++) {
        if (currencyMembers[i].seasonal.points > 0)
            lEmbed.addField(currencyMembers[i].seasonal.place + ". " + currencyMembers[i].name, " eggs: " + currencyMembers[i].seasonal.points, true)
    }
    return lEmbed
}



function removeMessage(message) {
    const index = messages.indexOf(message);

    if (index !== -1) {
        messages.splice(index, 1);
    }

}

function findMember(Fuser) {
    for (var i = 0; i < currencyMembers.length; i++) {
        if (currencyMembers[i].id === Fuser.id) {
            return currencyMembers[i]
        }
    }
    console.log("new added")
    var Nuser = addCurrencyMember(Fuser)
    return Nuser

}

function write() {
    sort("feathers")

    try {
        var transformStream = JSONStream.stringify()
        var outputStream = fileSystem.createWriteStream(__dirname + file)
        transformStream.pipe(outputStream)
        currencyMembers.forEach(transformStream.write)
        transformStream.end()
        outputStream.on(
            "finish",
            function handleFinish() {
                //finish
            }
        )
        outputStream.on(
            "finish",
            function handleFinish() {
                var transformStream = JSONStream.parse("*")
                var inputStream = fileSystem.createReadStream(__dirname + file)
                inputStream
                    .pipe(transformStream)
                    .on(
                        "data",
                        function handleRecord(data) {
                            //writing
                        }
                    )
                    .on(
                        "end",
                        function handleEnd() {
                            console.log("JSONStream parsing complete!")
                        }
                    )

            }
        )
    } catch (err) {
        console.log("writing went wrong")
    }

}


function sort(type) {
    if (type === "feathers") {
        currencyMembers = currencyMembers.sort(compareF)
        for (var i = 0; i < currencyMembers.length; i++)
            currencyMembers[i].currency.place = i + 1
    }
    if (type === "eggs") {
        currencyMembers = currencyMembers.sort(compare)
        for (var i = 0; i < currencyMembers.length; i++)
            currencyMembers[i].seasonal.place = i + 1
    }

    function compareF(a, b) {
        if (a.currency.points < b.currency.points)
            return 1
        if (a.currency.points > b.currency.points)
            return -1
        return 0
    }

    function compare(a, b) {
        if (a.seasonal.points < b.seasonal.points)
            return 1
        if (a.seasonal.points > b.seasonal.points)
            return -1
        return 0
    }
}


client.login(config.token);
