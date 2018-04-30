 let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    currencyMembers.sort(comp)
    let member = message.member
    let embed = new Discord.RichEmbed()
        .setTitle("🐧 LEADERBOARD 🐧")
        .setDescription("```All the feathers!```")
        .setThumbnail(member.guild.iconURL)
        .setColor(member.displayColor)
    for (let i = 0; i < 10; i++) {
        embed.addField((i + 1) + '. ' + currencyMembers[i].name, currencyMembers[i].currency.points, true)
    }
    message.channel.send({
        embed
    })

    function comp(a, b) {
        return b.currency.points > a.currency.points ? 1 : -1
    }
}
module.exports = {
    name: "leaderboard",
    spam: true,
    descr: "gives top 10 of feather-owners",
    run: run
}
