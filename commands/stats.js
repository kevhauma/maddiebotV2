let config = require("../data/config.json")
let run = function (client, message, words, currencyMembers, axios, cleverbot) {
    currencyMembers.sort((a, b) => {
        return a.currency.points - a.currency.points
    })
    let asker
    let mentioned = message.mentions.users.first()
    isMod = false
    if (mentioned) {
        for (let i = 0; i < modroles.length; i++) {
            let role = message.guild.roles.find("name", modroles[i])
            if (member.roles.has(role.id)) isMod = true
        }
        if (!isMod) {
            message.reply("you cannot check other people's stats.")
            return
        }
        member = message.mentions.members.first()
        asker = findMember(mentioned)
    }

    let startDate = new Date(2017, 11, 18, 00, 00, 0, 0)
    let embed = new Discord.RichEmbed()
        .setTitle(member.displayName)
        .setColor(member.displayColor)
        .setThumbnail(member.user.displayAvatarURL)
        .addField("Feathers", asker.currency.points, true)
        .addField("Max feathers at one time", asker.stats.maxpoints, true)
        .addField("Ranking", asker.currency.place + "/" + currencyMembers.length, true)
        .addField("Gambling", "count: " + (asker.stats.gamblelosses + asker.stats.gamblewins) + "\nwinrate: " + Math.floor(asker.stats.gamblewins / (asker.stats.gamblelosses + asker.stats.gamblewins) * 100) + "%", true)
        .addField("Jackpots", asker.stats.slotJackpots, true)
    if (asker.stats.hangman) {
        embed.addField("hangman", "games played: " + asker.stats.hangman.gamesPlayed + "\ngames won: " + asker.stats.hangman.gamesWon, true)
    }
    if (asker.stats.highlow) {
        embed.addField("High/Low", "games played: " + asker.stats.highlow.gamesPlayed + "\nhighest multiplier: " + asker.stats.highlow.highestMultiplier, true)
    }
    embed.addField("Messagecount", asker.stats.messagecount, true)
    embed.addField("joined at", member.joinedAt.toDateString(), true)
    embed.setFooter("Stats started tracking from " + startDate.toDateString() + ".", client.user.displayAvatarURL)

    message.channel.send({
        embed
    })
}
exports = {
    name: "stats",
    descr: "gives stats in the server",
    run: run
}
