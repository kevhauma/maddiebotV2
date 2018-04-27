let config = require("../config.json")
modules.exports = function (message) {
    let isPicture = false
    if (!config.channelList.includes(message.channel.name)) return
    if (message.attachments.size < 1 && message.embeds.length < 1) return

    emojisList.forEach(function (emoji) {
        if (Math.random() >= 0.6) {
            message.react(emoji)
                .catch(function (error) {
                    return
                })
        }
    })
}
