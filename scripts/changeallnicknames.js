    const Discord = require('discord.js');
    const client = new Discord.Client();
    var emote = ["🌠", "🌟", "❄", "☃️", "🎆", "🎄", "🎇", "✨", "🎉", "🎊", "✴️"]
    client.on('ready', () => {
        console.log('I am ready!');

        var guild = client.guilds.first();
        var members = guild.members
        console.log(members)
        var t = 0;
        members.forEach(function (member) {

            console.log(member.user.username)
            if (!member) return
            setTimeout(function () {
                var mockup = member.displayName.replace(/🌠|🌟|❄|☃️|🎆|🎄|🎇|✨|🎉|🎊|✴️/g, "");
                member.setNickname(mockup);
                console.log("set to " + mockup);
            }, t++ * 2000);
        })
    });









    client.login("MzE2NjMwMjYzNTQxMTM3NDA4.DAYEdw.J2U6LaLIv4dTemcONU7Z9DEA6SE");
