let changeCurrency = require("../functions/changecurrency")
let findMember = require("../functions/findMember")
let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let isAllowed
    if (!words[1]) {
        message.reply("you can't gamble 0 " + config.currency)
        return
    }
    let asker = findMember(message.member, currencyMembers)
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
        message.reply("not enough " + config.currency + ". you only have " + asker.currency.points + " " + config.currency + ": <:FeelsBadMan:316641210548617216>")
        return
    }
    console.log("chance: " + asker.currency.gamechance)
    if (Math.random() * 100 > asker.currency.gamechance) {
        changeCurrency(message.member, "add", gambleAmount * 2)
        asker.currency.gamechance = 55
        asker.stats.gamblewins = asker.stats.gamblewins + 1
        message.reply("you have won " + gambleAmount + " " + config.currency + ", you now have " + asker.currency.points + " " + config.currency)

    } else {
        asker.currency.gamechance -= 5
        asker.stats.gamblelosses = asker.stats.gamblelosses + 1
        message.reply("you have lost " + gambleAmount + " " + config.currency + ", you now have " + asker.currency.points + " " + config.currency)
    }
}

module.exports = {
    name: "gamble",
    spam: true,
    descr: "gamble your " + config.currency + " away!",
    run: run
}
