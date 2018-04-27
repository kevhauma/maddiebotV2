let intervalSet = false
module.exports = function (oldMember, newMember, client) {
    if (!intervalSet) {
        checkLive(newMember)
        setInterval(checkLive, 900000, newMember)
        intervalSet = true
    }

    if (newMember.presence.game) { //if playing a game
        if (newMember.presence.game.url) { //if streaming
            if (oldMember.presence.game) { //was playing a game
                if (!oldMember.presence.game.url) { //if not streaming before                    
                    started(newMember, true)
                }
            } else(started(newMember, true))

        }
    }
    if (oldMember.presence.game) { //WAS playing a game
        if (oldMember.presence.game.url) { //was streaming
            if (newMember.presence.game) { //IS playing a game
                if (!newMember.presence.game.url) { //is not streaming anymore
                    stopped(newMember, oldMember)
                }
            } else(stopped(newMember, oldMember))
        }
    }

    function checkLive(member) {
        let guild = member.guild
        let members = guild.members
        let counter
        let liveRole = guild.roles.find('name', "Is Live")
        let isLive = true
        counter = 2
        for ([key, value] of members) {
            checkValue(value, counter, isLive, liveRole)
        }

        function checkValue(value, counter, isLive, liveRole) {
            if (value.roles.has(liveRole.id)) {
                if (value.presence.game) {
                    if (!value.presence.game.url) isLive = false
                } else isLive = false

                if (!isLive) {
                    setTimeout(function () {
                        console.log("stopped by checkup:" + value.displayName)
                        stopped(value)
                    }, counter++ * 2000)
                }
            }
            if (!value.roles.has(liveRole.id)) {
                if (value.presence.game) {
                    if (value.presence.game.url) {
                        setTimeout(function () {
                            console.log("started by checkup:" + value.displayName)
                            started(value, false)
                        }, counter++ * 2000)
                    }
                }
            }
        }
    }

    function started(newMember, byPresence) {
        if (newMember.author.id === client.user.id) return
        console.log(newMember.displayName)

        let streamingRole = newMember.guild.roles.find("name", "Is Live")
        let promotionChannel = newMember.guild.channels.find("name", "shameless_promotion")
        let streamurl = newMember.presence.game.url
        let streamname = streamurl.substr(22, streamurl.length - 22)

        console.log("started")

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
            .catch(function (error) {
                console.log(error.message)
            })
    }

    function stopped(newMember) {
        console.log(newMember.displayName)
        console.log("stopped streaming")
        let streamingRole = newMember.guild.roles.find("name", "Is Live")

        newMember.removeRole(streamingRole)
            .then(function () {
                setTimeout(function () {
                    newMember.setNickname(newMember.displayName.replace("🔴", ""))
                        .catch(function (error) {
                            console.log(error)
                        })
                }, 1000)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

}
