let findMember = require("./findMember")  

const channel = member.guild.channels.find("name", "mod_logs")
  const role = member.guild.roles.find('name', 'Penguin egg')
  member.addRole(role)
  let temp = findMember(member.user)
  channel.send(member.displayName + " has joined the server.")
      .catch(function (error) {
          console.log(error)
      })
