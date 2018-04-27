let config = require("../data/config.json")
let run = function (client, message, words, currencyMembers, axios, cleverbot) {
    if (message.channel.name != "bot_spam") return
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

    if (command === "!iam") {
        if (message.member.roles.has(role.id)) {
            sendIAMresponse(member + ", you already have this role.", 16711680)
            return
        }
        member.addRole(role)
        console.log('gave ' + message.author.username + " the role: " + words[1])
        sendIAMresponse(member + ", succesfully added " + role.name + " to you.", 65280)

    } else
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



exports = {
    name: "iam",
    descr: "gives roles for hidden channels",
    run: run
}
