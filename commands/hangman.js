let findMember = require("../functions/findMember")
let changeCurrency = require("../functions/changeCurrency")
let activeHangmanGames = []
let hangmanWords = require("../data/words.json")
let config = require("../data/config.json")

let emojiAlphabet = config.hangman.emojiAlphabet
let alphabet = config.hangman.alphabet
let forbiddenLetters = config.hangman.forbiddenLetters

let img = config.hangman.img


let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {
    class Hangman {
        constructor(creator) {
            this.creator = {
                name: creator.name,
                color: creator.color
            }
            do {
                let includesFL = false
                this.hangWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)]
                for (let i = 0; i < forbiddenLetters.length; i++) {
                    for (let j = 0; j < this.hangWord.length; j++) {
                        console.log(this.hangWord.charAt(j) + "--" + forbiddenLetters[i])
                        console.log("FL:" + includesFL)
                        if (this.hangWord.charAt(j) === forbiddenLetters[i])
                            includesFL = true
                    }
                }
            }
            while ((this.hangWord.length < 4 || this.hangWord.length > 12) && includesFL)
            this.faults = 0
            this.usedLetters = []
            this.remainingLetters = []
            for (let i = 0; i < alphabet.length; i++)
                this.remainingLetters[i] = alphabet[i]
            this.guessedLetters = []
            for (let i = 0; i < this.getgLetters().length; i++)
                this.guessedLetters.push("_")
            console.log(this)
        }
        guessLetter(letter) {
            let rightguess = false
            if (this.usedLetters.includes(letter)) return
            let gLetters = this.getgLetters()
            for (let i = 0; i < gLetters.length; i++) {
                if (gLetters[i] == letter) {
                    this.guessedLetters[i] = letter
                    rightguess = true
                }
            }
            if (!rightguess) this.faults++
                this.usedLetters.push(letter)
            const index = this.remainingLetters.indexOf(letter);
            if (index !== -1) {
                this.remainingLetters.splice(index, 1);
            }
            console.log(this)
        }

        checkGame() {
            if (this.getguessedLetters() === this.hangWord) return "2" //won
            else if (this.faults >= img.length - 1) return "0" //lost
            else return "1" //ongoing
        }

        getguessedLetters() {
            let GL = ""
            for (let i = 0; i < this.guessedLetters.length; i++) {
                if (this.guessedLetters[i] === "_")
                    GL += "\\" + this.guessedLetters[i] + " "
                else GL += this.guessedLetters[i]
            }
            return GL
        }
        getuLetters() {
            let UL = "-> "
            for (let i = 0; i < this.usedLetters.length; i++)
                UL += this.usedLetters[i] + " "
            return UL
        }
        getremLetterA() {
            return this.remainingLetters
        }
        getgLetters() {
            return this.hangWord.split("")
        }
        gethangword() {
            return this.hangWord
        }
        getname() {
            return this.creator.name
        }
        stop() {
            const index = activeHangmanGames.indexOf(this);
            if (index !== -1) {
                activeHangmanGames.splice(index, 1);
            }
        }
        getEmbed() {
            let embed = new Discord.RichEmbed()
                .setTitle(this.creator.name)
                .setColor(this.creator.color)
                .addField("Guess:", this.getguessedLetters(), true)
                .addField("Used letters:", this.getuLetters(), true)
                .setImage(config.hangman.img[this.faults])
                .setFooter("please wait untill the reaction are complete")
            return embed
        }
    }
    let game = findHMgame(message.member.displayName)
    if (game) {
        game.stop()
    }
    let player = findMember(message.author, currencyMembers)
    if (!player.stats.hangman) player.stats.hangman = {
        gamesPlayed: 0,
        gamesWon: 0
    }
    player.stats.hangman.gamesPlayed = player.stats.hangman.gamesPlayed
    activeHangmanGames.push(new Hangman({
        name: message.member.displayName,
        color: message.member.displayColor
    }))
    game = findHMgame(message.member.displayName)
    let embed = game.getEmbed()
    message.channel.send({
        embed
    }).then((Rmessage) => {
        let remLet = game.getremLetterA()
        for (let i = 0, j = 0; i < remLet.length; i++) {
            setTimeout(() => {
                let em = getEmote(remLet[j])
                if (em) {
                    Rmessage.react(em).catch((err) => {
                        console.log(err.message)
                    })
                }
                j++
            }, i * 500)
        }
    })

    function findHMgame(name) {
        for (let i = 0; i < activeHangmanGames.length; i++) {
            if (activeHangmanGames[i].getname() === name) {
                return activeHangmanGames[i]
            }
        }
    }

    function getEmote(letter) {
        let emote
        for (let i = 0; i < alphabet.length; i++) {
            if (letter === alphabet[i]) return emojiAlphabet[i]
        }
    }
}

let check = function (Discord, client, reaction, user, currencyMembers) {
    if (reaction.message.channel.name !== config.botSpamChat) return
    if (reaction.message.author.id !== client.user.id) return
    if (user.id === client.user.id) return
    if (!reaction.message.embeds[0]) return
    let game = findHMgame(reaction.message.embeds[0].title)
    if (!game) return
    let letter = getLetter(reaction.emoji.name)
    if (!letter) return
    game.guessLetter(letter)
    for (let Ireacion in reaction.message.reactions) {
        if (Ireaction.count > 1) Ireaction.remove()
    }
    let status = game.checkGame()
    reaction.remove()
    reaction.remove(user)
    console.log("status:" + status)
    if (status == 0) {
        let embed = game.getEmbed()
        embed.setDescription("``` you have lost this game. the word was '" + game.gethangword() + "'.```")
        reaction.message.edit({
            embed
        }).catch(err => {
            console.log(err)
        });
        game.stop()
    } else
    if (status == 2) {
        let embed = game.getEmbed()
        let gain = game.gethangword().length * 10
        member = findMember(user, currencyMembers)
        changeCurrency(member, "add", gain)
        member.stats.hangman.gamesWon = member.stats.hangman.gamesWon + 1
        embed.setDescription("``` you have won this game. Congratulations!```\n you have won " + gain + " " + config.currency + "!")
        reaction.message.edit({
            embed
        }).catch(err => {
            console.log(err)
        });
        game.stop()
    } else
    if (status == 1) {
        let embed = game.getEmbed()
        reaction.message.edit({
            embed
        }).catch(err => {
            console.log(err)
        });
    }

    function findHMgame(name) {
        for (let i = 0; i < activeHangmanGames.length; i++) {
            if (activeHangmanGames[i].getname() === name) {
                return activeHangmanGames[i]
            }
        }
    }

    function getLetter(emote) {
        for (let i = 0; i < emojiAlphabet.length; i++) {
            if (emote === emojiAlphabet[i]) return alphabet[i]
        }
    }
}

module.exports = {
    name: "hangman",
    spam: true,
    descr: "play a game of hangman",
    run: run,
    check: check
}
