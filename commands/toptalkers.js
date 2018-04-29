let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    currencyMembers.sort(comp)
    let member = message.member
    let embed = new Discord.RichEmbed()
        .setTitle("🐧 TOP CHATTERS 🐧")
        .setDescription("```All the messages!```")
        .setThumbnail(member.guild.iconURL)
        .setColor(member.displayColor)
    for (let i = 0; i < 10; i++) {
        embed.addField((i + 1) + '. ' + currencyMembers[i].name, currencyMembers[i].stats.messagecount + " messages.", true)
    }
    message.channel.send({
        embed
    })

    function comp(a, b) {
        return b.stats.messagecount > a.stats.messagecount ? 1 : -1
    }
}
module.exports = {
    name: "toptalkers",
    spam: true,
    descr: "gives top 10 of sent messages",
    run: run
}
