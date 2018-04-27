let config = require("../data/config.json")
let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let command = words[0] //first word
    let role
    let roleExists = false
    let member = message.member //user who sent messages              


    if (words.length < 2) return

    for (let i = 0; i < config.saroles.length; i++) {
        if (words[1] === config.saroles[i]) { //if second word is one of the pre-defined
            roleExists = true
        }
    }
    if (roleExists) { //if second word is one of the pre-defined words
        role = message.guild.roles.find("name", words[1]) //gets role collection from api
    } else {
        sendIAMresponse(member + ",This role does not exists.", 16711680)
        return
    }

    if (command === "!iamnot") {
        if (message.member.roles.has(role.id)) {
            member.removeRole(role)
            console.log('removed ' + message.author.username + " the role: " + words[1])
            sendIAMresponse(member + ", succesfully removed " + role.name + " from you.", 65280)

        } else {
            sendIAMresponse(member + ", you don't have that role yet.", 16711680)
            return
        }
    }

    function sendIAMresponse(descr, color) {
        message.channel.send({
            embed: {
                color: color,
                description: descr
            }
        })
    }

}



module.exports = {
    name: "iamnot",
    spam: true,
    descr: "gives roles for hidden channels",
    run: run
}
