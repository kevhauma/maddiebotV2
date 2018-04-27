module.exports = function (client, message) {
    let words = message.content.split(" ")
    if (words[0].replace("'", "").toLowerCase() === "im") {
        words.shift();
        message.channel.send("Hi " + words.join(" ") + ". i'm " + client.user.username)
    }
}
