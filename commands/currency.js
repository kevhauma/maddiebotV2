let findMember = require("../functions/findMember")
let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {

    let member = message.member
    currencyMembers.sort(comp)
    isMod = false
    let asker = findMember(message.author, currencyMembers)
    if (message.mentions.users.first()) {
        for (let i = 0; i < config.modroles.length; i++) {
            let role = message.guild.roles.find("name", config.modroles[i])
            if (member.roles.has(role.id)) {
                isMod = true
            }
        }
        if (!isMod) {
            message.reply("you cannot check other people's currency.")
            return
        }
        asker = findMember(message.mentions.users.first(), currencyMembers)

    }
    message.reply(asker.name + " has " + asker.currency.points + " " + config.currency + ". [" + asker.currency.place + "/" + currencyMembers.length + "]")

    function comp(a, b) {
        b.currency.points - a.currency.points
    }
}


module.exports = {
    name: config.currency,
    spam: true,
    descr: "returns your amount of " + config.currency,
    run: run
}
