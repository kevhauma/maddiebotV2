let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let clocks = config.clocks
    let now = new Date()
    let standardTime = now
    standardTime.setHours(now.getHours() - config.timezone)
    let targetTime = {
        "hour": standardTime.getHours() + config.targettimezone,
        "minutes": standardTime.getMinutes(),
        "AM": "AM",
        "emoji": "⏰"
    }
    if (targetTime.hour > 24) targetTime.hour -= 24
    if (targetTime.hour < 0) targetTime.hour += 24
    if (targetTime.minutes < 10) targetTime.minutes = "0" + targetTime.minutes
    if (targetTime.hour >= 12) {
        targetTime.hour -= 12
        targetTime.AM = "PM"
    }
    targetTime.emoji = clocks[targetTime.hour]
    const embed = new Discord.RichEmbed()
        .setColor(3447003)
        .setTitle(targetTime.emoji)
        .setDescription(config.twitchchannel + "'s current time: \n ```⏰ " + targetTime.hour + ":" + targetTime.minutes + targetTime.AM + " ⏰``` ")
    message.channel.send({
        embed
    })
}
module.exports = {
    name: "time",
    descr: "gives time of owner of the server",
    run: run
}
