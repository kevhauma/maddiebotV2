client.on('presenceUpdate', (oldMember, newMember) => {
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
})
