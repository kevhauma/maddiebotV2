
function started(newMember, byPresence) {
    if (newMember.user.id === '316630263541137408') return
    console.log(newMember.displayName)

    let streamingRole = newMember.guild.roles.find("name", "Is Live")
    let promotionChannel = newMember.guild.channels.find("name", "shameless_promotion")
    let streamurl = newMember.presence.game.url
    let streamname = streamurl.substr(22, streamurl.length - 22)

    console.log("started")
    //    if (newMember.roles.has(newMember.guild.roles.find("name", "Macaroni Penguin").id)) {
    //        setTimeout(function () {
    //            promotionChannel.send(streamurl)
    //            console.log("started streaming")
    //        }, 400000)
    //    }

    newMember.addRole(streamingRole)
        .then(function () {
            setTimeout(function () {
                if (!newMember.displayName.startsWith("🔴")) {
                    newMember.setNickname("🔴" + newMember.displayName)
                        .catch(function (error) {
                            console.log(error)
                        })
                }
            }, 1000)
        })
        .then(function () {})
        .catch(function (error) {
            console.log(error.message)
        })
}