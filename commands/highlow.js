let activeHLGames = []
let config = require("../data/config.json")
let findMember = require("../functions/findmember")
let changeCurrency = require("../functions/changeCurrency")
let cardLinks = config.cards

let run = function (Discord, client, message, words, currencyMembers, axios, cleverbot) {

    class HighLow {
        constructor(creator, bet) {
            this.creator = {
                name: creator.name,
                color: creator.color,
                id: creator.id
            }
            this.remainingCards = []
            for (let i = 0; i < cardLinks.length; i++) {
                for (let j = 0; j < cardLinks[i].length; j++) {
                    this.remainingCards.push(new Card(j + 1, cardLinks[i][j]))
                }
            }
            this.previousCard = {}
            this.multiplier = 0
            this.bet = bet

        }
        getCard() {
            let card = this.remainingCards[Math.floor(Math.random() * this.remainingCards.length)]
            const index = this.remainingCards.indexOf(card);
            if (index !== -1) {
                this.remainingCards.splice(index, 1);
            }
            this.previousCard = card
            return card
        }
        checkGame(highlow) {
            let prevCard = this.previousCard
            let newCard = this.getCard()
            if (this.remainingCards.length == 0) return 0
            if (newCard.getValue() == prevCard.getValue()) {
                return 1
            }
            if (highlow === "high") {
                if (newCard.getValue() > prevCard.getValue()) {
                    this.multiplier = this.multiplier + 0.5
                    return 1
                } else return 0

            } else if (highlow === "low") {
                if (newCard.getValue() < prevCard.getValue()) {
                    this.multiplier = this.multiplier + 0.5
                    return 1
                } else return 0

            }
        }
        getname() {
            return this.creator.name
        }
        getid() {
            return this.creator.id
        }

        stop() {
            const index = activeHLGames.indexOf(this);
            if (index !== -1) {
                activeHLGames.splice(index, 1);
            }
        }
        getEmbed() {
            let embed = new Discord.RichEmbed()
                .setTitle(this.creator.name)
                .setColor(this.creator.color)
                .setDescription("``` HIGHER OR LOWER```")
                .addField("Bet:", this.bet, true)
                .addField("Multiplier:", this.multiplier, true)
                .setImage(this.previousCard.getImg())
                .setFooter("click up for higher and down for lower")
            return embed
        }

    }
    class Card {
        constructor(value, img) {
            this.value = value
            this.img = img
        }
        getValue() {
            return this.value
        }
        getImg() {
            return this.img
        }
    }
    let bet = 0
    let isAllowed = false
    asker = findMember(message.member.user, currencyMembers)
    if (words[1]) {
        if (!isNaN(words[1])) {
            bet = parseInt(words[1])
            isAllowed = changeCurrency(asker, "sub", bet)
        } else
        if (words[1] === "all") {
            bet = asker.currency.points
            isAllowed = changeCurrency(asker, "sub", bet)
        } else
            return
        if (!isAllowed) {
            message.reply("not enough " + config.currency + ". you only have " + asker.currency.points + " " + config.currency + ": <:FeelsBadMan:316641210548617216>")
            return
        }
    }
    if (!asker.stats.highlow) asker.stats.highlow = {
        gamesPlayed: 0,
        gamesWon: 0,
        highestMultiplier: 0
    }
    asker.stats.highlow.gamesPlayed = asker.stats.highlow.gamesPlayed + 1
    let game = findHLgame(message.member.displayName)
    if (game) {
        game.stop()
    }
    game = new HighLow({
        name: message.member.displayName,
        color: message.member.displayColor,
        id: message.member.user.id
    }, bet)
    activeHLGames.push(game)
    let card = game.getCard()
    let embed = game.getEmbed(card)
    message.channel.send({
        embed
    }).then((Rmessage) => {
        Rmessage.react("🔺").catch((err) => {
            console.log(err.message)
        })
        setTimeout(() => {
            Rmessage.react("🔻").catch((err) => {
                console.log(err.message)
            })
        }, 500)
    })

    function findHLgame(name) {
        for (let i = 0; i < activeHLGames.length; i++) {
            if (activeHLGames[i].getname() === name) {
                return activeHLGames[i]
            }
        }
        return null
    }
}




let check = function (Discord, client, reaction, user, currencyMembers) {
    if (reaction.message.channel.name !== config.botSpamChat) return
    if (reaction.message.author.id !== client.user.id) return
    if (user.id === client.user.id) return
    if (!reaction.message.embeds[0]) return
    let game = findHLgame(reaction.message.embeds[0].title)
    if (!game) return
    let embed
    let r
    if (reaction.emoji.name === "🔺") {
        r = game.checkGame("high")
    }
    if (reaction.emoji.name === "🔻") {
        r = game.checkGame("low")
    }
    if (r == 1) {
        embed = game.getEmbed()
    } else {
        embed = game.getEmbed()
        embed.setDescription("```you have won " + (game.bet * game.multiplier) + " " + config.currency + "```")
        let member = findMember(user, currencyMembers)
        changeCurrency(member, "add", (game.bet * game.multiplier))
        member.stats.highlow.gamesWon = member.stats.highlow.gamesWon + 1
        if (member.stats.highlow.highestMultiplier < game.multiplier) member.stats.highlow.highestMultiplier = game.multiplier
        reaction.message.react("❌").catch(err => {
            console.log(err.message)
        })
        game.stop()
    }
    reaction.remove(user)
    reaction.message.edit({
        embed
    })

    function findHLgame(name) {
        for (let i = 0; i < activeHLGames.length; i++) {
            if (activeHLGames[i].getname() === name) {
                return activeHLGames[i]
            }
        }
        return null
    }
}

module.exports = {
    name: "highlow",
    spam: true,
    descr: "play a card game of high-low",
    run: run,
    check: check
}
