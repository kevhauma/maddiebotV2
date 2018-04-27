let run = function (client, message, words, currencyMembers, axios, cleverbot) => {
    let mentioned = message.mentions.users.first()
    if (mentioned) {
        if (Math.random() > 0.5) response = " you have hit " + mentioned + " with a snowball"
        else response = " you have missed " + mentioned + "."

        message.reply(response)
    }
}
