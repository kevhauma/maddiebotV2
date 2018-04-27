modules.exports = function (member) {
    const channel = member.guild.channels.find("name", "mod_logs")
    channel.send(member.displayName + " has left the server. joined at: " + member.joinedAt.toDateString())
        .catch(function (error) {
            console.log(error)
        })
}
