let config = require("../data/config.json")
let eightballresponses = config.eightballresponses
let questionWordsResponses = config.questionWordsReponses
let questionWords = ["why", "where", "how", "what", "when", "who"]

let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    let questionword = ""
    let isQ = false
    let isYesNo = true
    let isOr = false
    let lowercaseContent = message.content.toLowerCase()
    let restofmessage = ""
    for (let i = 1; i < words.length; i++) {
        restofmessage += words[i] + " "
    }
    if (lowercaseContent.endsWith("?"))
        isQ = true
    if (isQ) {
        if (lowercaseContent.includes(" or ")) {
            isYesNo = false
            isOr = true
        }
        for (let i = 0; i < questionWords.length; i++) {
            if (lowercaseContent.includes(questionWords[i])) {
                isYesNo = false
                questionword = questionWords[i]
            }
        }
        if (isYesNo) {
            let index = Math.floor(Math.random() * (eightballresponses.length - 1))
            let response = eightballresponses[index]
            sendAnswer(message, response, restofmessage)
        } else if (isOr) {
            let chance = Math.random()
            if (chance > 0.3) sendAnswer(message, "hmmm... the first option looks fine.", restofmessage)
            else if (chance > 0.6) sendAnswer(message, "Why not both?", restofmessage)
            else sendAnswer(message, "hmmm... i'd go with the latter.", restofmessage)
        } else {
            response = getResponse(questionword)
            sendAnswer(message, response, restofmessage)
        }
    } else {
        cleverbot.write(restofmessage, responseCl => {
            sendAnswer(message, responseCl.output, restofmessage)
        })
    }

    function sendAnswer(message, sentence, restofmessage) {
        let embed = new Discord.RichEmbed()
            .setTitle(message.member.displayName)
            .setColor(message.member.displayColor)
            .setDescription("❓ ``` " + restofmessage + "```\n 📢 ```" + sentence + "```")
            .setFooter("Ask a question with !ask", message.member.user.displayAvatarURL)
        message.channel.send({
                embed
            })
            .then(function () {
                message.delete()
            }).catch(function (error) {
                console.log(error.message)
            })
    }

    function getResponse(questionWord) {
        let returnValue
        switch (questionWord) {
            case "when":
                returnValue = questionWordsResponses.when[Math.floor(Math.random() * (questionWordsResponses.when.length - 1))]
                break
            case "what":
                returnValue = questionWordsResponses.what[Math.floor(Math.random() * (questionWordsResponses.what.length - 1))]
                break
            case "how":
                returnValue = questionWordsResponses.how[Math.floor(Math.random() * (questionWordsResponses.how.length - 1))]
                break
            case "who":
                returnValue = questionWordsResponses.who[Math.floor(Math.random() * (questionWordsResponses.who.length - 1))]
                break
            case "where":
                returnValue = questionWordsResponses.where[Math.floor(Math.random() * (questionWordsResponses.where.length - 1))]
                break
            case "why":
                returnValue = questionWordsResponses.why[Math.floor(Math.random() * (questionWordsResponses.why.length - 1))]
                break
        }
        return returnValue
    }
}




module.exports = {
    name: "ask",
    descr: "answers questions",
    run: run
}
