exports = function (member) {
    const channel = member.guild.channels.find("name", "mod_logs")
    const role = member.guild.roles.find('name', 'Penguin egg')
    member.addRole(role)
    channel.send(member.displayName + " has joined the server.")
        .catch(function (error) {
            console.log(error)
        })
}
