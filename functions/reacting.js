exports = function (message) {
    let words = message.content.split(" ")

    words.forEach(function (word) {
        let chance = Math.random()
        if (word.codePointAt(0) >= 5000 && word.codePointAt(0) >= 20000) {
            if (chance < .4) {
                return
            }
            message.react(word).catch(function () {
                return
            })
        }
        if (word.charAt(0) == "<" && word.charAt(word.length - 1) == ">") {
            if (word.charAt(1) == "@" || word.charAt(1) == "#") return
            let emojistring = word.split(":")
            if (!emojistring[2]) return
            let emoji = emojistring[2].substring(0, emojistring[2].length - 1)
            if (chance < .4) return
            message.react(emoji)
                .catch(function () {
                    return
                })
        }
    })
}
