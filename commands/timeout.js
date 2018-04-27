let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let command = words[0]
    let timeouttime = 10
    let isMod = false
    let member = message.member

    for (let i = 0; i < config.modroles.length; i++) {
        let role = message.guild.roles.find("name", config.modroles[i])
        if (member.roles.has(role.id)) {
            isMod = true
        }
    }
    if (!isMod) return
    if (message.mentions.size < 1) return
    if (words.length < 1) return
    if (command !== "!timeout") return
    let timeoutrole = message.guild.roles.find("name", "timeout")
    let modChannel = message.guild.channels.find("name", "mod_logs")

    let mentioned = message.mentions.users.first()
    let mentionedmember = message.guild.members.find('id', mentioned.id)


    if (mentionedmember.roles.has(timeoutrole.id)) {
        sendtimeOut(modChannel, 16711680, mentionedmember + " is already timed out. ")
        return
    }

    mentionedmember.addRole(timeoutrole).catch((err) => console.log(err))

    if (words.length > 2) timeouttime = words[2]

    sendtimeOut(modChannel, 65280, mentionedmember + " has been timed out for " + timeouttime + " minutes.")

    message.delete()

    setTimeout(function () {
        if (!mentionedmember.roles.has(timeoutrole.id)) return
        mentionedmember.removeRole(timeoutrole)
        sendtimeOut(modChannel, 65280, mentionedmember + "'s timeout has expired")
    }, timeouttime * 60000)

    function sendtimeOut(channel, color, sentence) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(sentence)
        channel.send({
                embed
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}
module.exports = {
    name: "timeout",
    descr: "timesout someone (mod-only)",
    run: run
}
