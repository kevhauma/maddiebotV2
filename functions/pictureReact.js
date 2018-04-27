let config = require("../data/config.json")
module.exports = function (message) {
    let isPicture = false
    if (message.attachments.size < 1 && message.embeds.length < 1) return
    config.emojisList.forEach(function (emoji) {
        if (Math.random() >= 0.6) {
            message.react(emoji)
                .catch(function (error) {
                    return
                })
        }
    })
}
