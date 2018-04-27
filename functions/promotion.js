if (message.channel.name != "shameless_promotion") return
let words = message.content.split(" ")
let member = message.member
let twitchname, twitchData, streamData, gameData
let restofmessage = ''
let imgThumbnail
let containsTwitchLink = false
let shoutout = "Check this cool streamer"
for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith("https://www.twitch.tv/")) {
        twitchname = words[i].substr(22, words[i].length - 22)
        twitchname = twitchname.replace("/", "")
        temp = twitchname.split("?")
        twitchname = temp[0]
        containsTwitchLink = true
    } else {
        restofmessage += words[i] + " "
    }
}
if (!containsTwitchLink) return

twitchData = {
    "display_name": twitchname,
    "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-70x70.jpg"
}
streamData = {
    "title": "Not Live At The Moment",
    "viewer_count": "-",
    "thumbnail_url": "https://i.imgur.com/rlP3MXL.png"
}
gameData = {
    "name": "-"
}
axios.get('https://api.twitch.tv/helix/users?login=' + twitchname, twitchHeader)
    .then(function (channelresponse) {
        if (channelresponse.data.data[0]) {
            twitchData = channelresponse.data.data[0]
            streamData.thumbnail_url = twitchData.offline_image_url
            axios.get('https://api.twitch.tv/helix/streams?user_login=' + twitchname, twitchHeader)
                .then(function (streamresponse) {
                    if (streamresponse.data.data[0]) {
                        streamData = streamresponse.data.data[0]
                        streamData.thumbnail_url = streamData.thumbnail_url.substr(0, 51) + "_" + twitchname + "-500x300.jpg"
                        axios.get('https://api.twitch.tv/helix/games?id=' + streamData.game_id, twitchHeader)
                            .then(function (gameresponse) {
                                if (gameresponse.data.data[0])
                                    gameData = gameresponse.data.data[0]
                            }).catch(function (error) {
                                console.log(error.message)
                            })
                    }
                }).catch(function (error) {
                    console.log(error.message)
                })
        }
    })
    .catch(function (error) {
        console.log(error)
    })
setTimeout(function () {
    for (let i = 0; i < config.shoutouts.length; i++) {
        if (config.shoutouts[i].name === twitchname) shoutout = config.shoutouts[i].message
    }
    if (gameData) game = gameData.name
    let embed = new Discord.RichEmbed()
        .setTitle(twitchData.display_name)
        .setColor(6570404)
        .setDescription(shoutout + "```\n" + streamData.title + "```")
        .setFooter("by " + member.displayName + "| click on the name to visit the stream", member.user.displayAvatarURL)
        .setTimestamp()
        .setURL('https://www.twitch.tv/' + twitchData.display_name)
        .addField("playing", gameData.name, true)
        .addField('Viewers', streamData.viewer_count, true)
        .setImage(streamData.thumbnail_url)
        .setThumbnail(twitchData.profile_image_url)

    message.channel.send(restofmessage, {
        embed
    })
    message.delete()
}, 5000)
