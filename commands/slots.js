let changeCurrency = require("../functions/changecurrency")
let findMember = require("../functions/findMember")
let config = require("../data/config.json")

let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let member = message.member
    let emotes = member.guild.emojis.array()
    let response = ""
    let gambleAmount = 0,
        multiplier
    let slots = new Array()
    let slotemotes = new Array()
    let Aemotes = new Array()
    let isAllowed = false
    let asker = findMember(message.author, currencyMembers)
    if (!isNaN(words[1])) {
        gambleAmount = parseInt(words[1])
        isAllowed = changeCurrency(asker, "sub", gambleAmount)
    } else
    if (words[1] === "all") {
        gambleAmount = asker.currency.points
        isAllowed = changeCurrency(asker, "sub", gambleAmount)
    } else
        return
    if (!isAllowed) {
        message.reply("not enough " + config.currency + ". you only have " + asker.currency + " " + config.currency + ": <:FeelsBadMan:316641210548617216>")
        return
    }
    for (let i = 0, j = 0; i < emotes.length; i++) {
        if (!emotes[i]._roles.length > 0) {
            slotemotes[j] = emotes[i]
            j++
        }
    }
    for (let i = 0; i < 10; i++) {
        Aemotes[i] = slotemotes[Math.floor(Math.random() * (slotemotes.length - 1))]
    }
    for (let i = 0; i < 3; i++) {
        slots[i] = Aemotes[Math.floor(Math.random() * (Aemotes.length - 1))]
        response += "<:" + slots[i].name + ":" + slots[i].id + ">"
        if (i < 2) response += " - "
    }
    let score = 1
    if (slots[0].id === slots[1].id && slots[1].id === slots[2].id) {
        if (slots[0].name === config.festiveIcon) score = 5
        score = 3
    } else if (slots[0].id === slots[1].id) {
        score = 2
    } else if (slots[0].id === slots[2].id) {
        score = 2
    } else if (slots[1].id === slots[2].id) {
        score = 2
    }
    switch (score) {
        case 1:
            response += "\n ```Better luck next time```"
            multiplier = 0
            break
        case 2:
            response += "\n ```Close one!```"
            multiplier = 3
            break
        case 3:
            response += "\n ```JACKPOT```"
            multiplier = 10
            asker.stats.slotJackpots = asker.stats.slotJackpots + 1
            break
        case 5:
            response += "\n ```FESTIVE JACKPOT```"
            multiplier = 100
            break
    }

    asker = changeCurrency(asker, "add", gambleAmount * multiplier)
    let gain = gambleAmount * multiplier - gambleAmount

    let state = "won"
    if (gain < 0) {
        state = "lost"
        gain = gambleAmount
    }
    let embed = new Discord.RichEmbed()
        .setTitle(message.member.displayName)
        .setColor(message.member.displayColor)
        .setDescription(response + "\n you have " + state + " " + gain + " " + config.currency)
    message.channel.send({
        embed
    })
}
module.exports = {
    name: "slots",
    spam: true,
    descr: "slots game!",
    run: run
}
