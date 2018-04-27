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
