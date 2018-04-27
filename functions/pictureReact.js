    let isPicture = false
    if (!channelList.includes(message.channel.name)) return
    if (message.attachments.size < 1 && message.embeds.length < 1) return
    let words = message.content.split(" ")

    emojisList.forEach(function (emoji) {
        if (Math.random() >= 0.8) {
            message.react(emoji)
                .catch(function (error) {
                    return
                })
        }
    })