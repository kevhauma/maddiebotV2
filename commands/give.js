let changeCurrency = require("../functions/changecurrency")
let findMember = require("../functions/findMember")
let config = require("../data/config.json")
let run = function (client, message, words, currencyMembers, axios, cleverbot) {
    if (!message.mentions.users.first()) {
        message.reply("You can't give penguins to no one. Please tag someone.")
        return
    }
    let isAllowed = false
    let gifterU = message.author
    let gifter = findMember(gifterU, currencyMembers)
    let gifteeU = message.mentions.users.first()
    let giftee = findMember(gifteeU, currencyMembers)
    let amount = 0
    for (let i = 0; i < config.modroles.length; i++) {
        let role = message.guild.roles.find("name", config.modroles[i])
        if (message.member.roles.has(role.id)) {
            isMod = true
        }
    }
    if (!isNaN(words[2])) {
        amount = parseInt(words[2])
        if (!isMod) {
            isAllowed = changeCurrency(gifter, "sub", amount)
        }
    } else return
    if (!isAllowed) {
        message.reply("not enough " + config.currency + ". You only have " + gifter.currency + " " + config.currency + ": <:FeelsBadMan:316641210548617216>")
    } else {
        giftee = changeCurrency(giftee, "add", amount)

        message.channel.send(gifteeU + ", you have received " + amount + " " + config.currency + " from " + gifterU)
    }
}

module.exports = {
    name: "give",
    spam: true,
    descr: "give your " + config.currency + " away!",
    run: run
}
