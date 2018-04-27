//let config = require("../data/config.json")
//var emotes = require('../data/emoteList.json')
//var messageCounter = 0
//var pagesize = 15
//
//client.on('message', function (message) {
//    if (message.channel.name !== "suggest_emotes") return
//    if (!message.content.startsWith("!")) return
//    var words = message.content.split(" ")
//    var member = message.member
//    if (words[0] === "!suggest") {
//        if (!words[1]) return
//        emotes.push({
//            "emote": words[1],
//            "by": member.displayName
//        })
//    } else
//    if (words[0] === "!emotelist") {
//        sendList(0, true, {})
//    } else
//    if (words[0] === "!save") {
//        realWrite()
//    } else
//    if (words[0] === "!pagesize" && words[1]) {
//        if (words[1] < 25)
//            pagesize = words[1]
//    } else
//    if (words[0] === "!getfile") {
//        writeSCV()
//        message.channel.send({
//            "files": ["./emotes.csv"]
//        })
//    }
//})
//client.on('messageReactionAdd', (reaction, user) => {
//    if (reaction.message.channel.name !== "suggest_emotes") return
//    if (reaction.message.author.id !== client.user.id) return
//    if (user.id === client.user.id) return
//    var number = getNumber(reaction.emoji.name)
//    sendList(number, false, reaction.message)
//    reaction.remove(user).catch((err) => {
//        return
//    })
//})
//
//function sendList(page, send, message) {
//    var embed = getList(page)
//    if (send) {
//        cChannel.send({
//            embed
//        }).then(function (message) {
//            for (var i = 0, j = 0; i < emotes.length / pagesize; i++) {
//                setTimeout(() => {
//                    message.react(getEmote(j)).catch((err) => {
//                        console.log("rip emote")
//                    })
//                    j++
//                }, i * 500)
//            }
//        }).catch((err) => {
//            console.log("rip message")
//        })
//    } else {
//        message.edit({
//            embed
//        })
//    }
//}
//
//function getList(page) {
//    var lEmbed = new Discord.RichEmbed()
//        .setTitle("emotes - page: " + (page + 1))
//        .setColor(15660098)
//        .setFooter("you can change pages by clicked the page number down below")
//    for (var i = page * pagesize; i < page * pagesize + pagesize; i++) {
//        if (emotes[i])
//            lEmbed.addField(emotes[i].emote, "by " + emotes[i].by, true)
//    }
//    return lEmbed
//}
//
//function getEmote(number) {
//    var emote = "0⃣"
//    switch (number) {
//        case 0:
//            emote = "1⃣";
//            break;
//        case 1:
//            emote = "2⃣";
//            break;
//        case 2:
//            emote = "3⃣";
//            break;
//        case 3:
//            emote = "4⃣";
//            break;
//        case 4:
//            emote = "5⃣";
//            break;
//        case 5:
//            emote = "6⃣";
//            break;
//        case 6:
//            emote = "7⃣";
//            break;
//        case 7:
//            emote = "8⃣";
//            break;
//        case 8:
//            emote = "9⃣";
//            break;
//        case 9:
//            emote = "🔟";
//            break;
//    }
//    return emote;
//}
//
//function getNumber(emote) {
//    var number = 0
//    switch (emote) {
//        case "1⃣":
//            number = 0;
//            break;
//        case "2⃣":
//            number = 1;
//            break;
//        case "3⃣":
//            number = 2;
//            break;
//        case "4⃣":
//            number = 3;
//            break;
//        case "5⃣":
//            number = 4;
//            break;
//        case "6⃣":
//            number = 5;
//            break;
//        case "7⃣":
//            number = 6;
//            break;
//        case "8⃣":
//            number = 7;
//            break;
//        case "9⃣":
//            number = 8;
//            break;
//        case "🔟":
//            number = 9;
//            break;
//    }
//    return number;
//}
//
//function write() {
//    setTimeout(() => {
//        realWrite()
//    }, 60 * 30 * 1000)
//}
//
//function realWrite() {
//    try {
//        var transformStream = JSONStream.stringify()
//        var outputStream = fs.createWriteStream(__dirname + "/emoteList.json")
//        transformStream.pipe(outputStream)
//        emotes.forEach(transformStream.write)
//        transformStream.end()
//        outputStream.on(
//            "finish",
//            function handleFinish() {
//                //finish
//            }
//        )
//        outputStream.on(
//            "finish",
//            function handleFinish() {
//                var transformStream = JSONStream.parse("*")
//                var inputStream = fs.createReadStream(__dirname + "/emoteList.json")
//                inputStream
//                    .pipe(transformStream)
//                    .on(
//                        "data",
//                        function handleRecord(data) {
//                            //writing
//                        }
//                    )
//                    .on(
//                        "end",
//                        function handleEnd() {
//                            console.log("JSONStream parsing complete!")
//                        }
//                    )
//
//            }
//        )
//    } catch (err) {
//        console.log(err.message)
//    }
//    write()
//}
//
//function writeSCV() {
//    var stream = fs.createWriteStream("emotes.csv");
//    stream.once('open', function (fd) {
//        for (var i = 0; i < emotes.length; i++)
//            stream.write(emotes[i].emote + ";" + emotes[i].by + "; \n");
//        stream.end();
//    })
//
//};
//
//
//client.login(config.token);