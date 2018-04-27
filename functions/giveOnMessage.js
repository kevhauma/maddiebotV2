let findMember = require("./findMember")
let changeCurrency = require("./changeCurrency")
module.exports = function giveOnMessage(message, currencyMembers) {
    if (!message.author.bot) {
        let receiver = findMember(message.author, currencyMembers)
        receiver.stats.messagecount = (receiver.stats.messagecount + 1)
        if (message.channel.name !== "bot_spam") {

            let amount = Math.floor(Math.random() * 10)
            receiver = changeCurrency(receiver, "add", amount)
        }
    }
}
