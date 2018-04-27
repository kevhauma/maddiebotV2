let run = function (client, message, words, currencyMembers, axios, cleverbot) => {
    if (message.channel.name != "bot_spam") return
    let words = message.content.split(" ")
    let member = message.member
    let user = message.author
    let command = words[0]
    let role
    let roles = message.guild.roles
    let macaroniPenguin = message.guild.roles.find("name", "Macaroni Penguin")
    let twitchPenguin = message.guild.roles.find("name", "✪ Twitch Penguin ✪")

    if (!member.roles.has(macaroniPenguin.id) && !member.roles.has(twitchPenguin.id)) return
    if (!words[1]) return

    role = message.guild.roles.find("name", user.username)

    if (!role) {
        member.guild.createRole({
            name: user.username,
            color: words[1].toUpperCase().replace("#", ""),
            hoist: false,
            permissions: 104188992,
            mentionable: false
        }).then(function (role) {
            role.setPosition(roles.size - 6)
            member.addRole(role)
            sendColorConfirmation(role, message.channel)
        }).catch(function (error) {
            console.log(error)
        })
    } else if (role) {
        role.setColor(words[1].toUpperCase().replace("#", ""))
            .then(function (role) {
                sendColorConfirmation(role, message.channel)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    let sendColorConfirmation = function (role, channel) {
        let hexStringTEMP = role.hexColor
        let hexString = role.hexColor.substr(1, hexStringTEMP.length - 1)
        axios.get('http://www.thecolorapi.com/id?format=json&hex=' + hexString)
            .then(function (response) {
                let colorname = response.data.name.value
                let embedcolor = parseInt(hexString, 16)
                sendEmbed(message, embedcolor, " you have the color: " + colorname + "(#" + hexString + ") now", "colours provided by TheColorApi.com")
            }).catch(function (error) {
                console.log(error.message)
            })

    }
}

modules.exports ={
    name: "color",
    descr: "gives color to peopple with required rank",
    run: run
}