const config = require("../data/config.json")
const quizData = require("../data/quiz.json")



activeQuizGames = []
let run = function (client, message, words, currencyMembers, axios, cleverbot, he) {
    class Quiz {
        constructor(creator) {
            this.creator = creator
            this.settings = {
                diff: "",
                cat: ""
            }
            this.answers = []
            this.score = 0
            this.started = false
            this.round = 0
            this.activeQuestion = {}
            activeQuizGames.push(this)
        }
        setDifficulty(diff) {
            this.settings.diff = diff
        }
        setCategory(cat) {
            this.settings.cat = cat
        }
        startQuiz() {
            this.started = true
            var url = "https://opentdb.com/api.php?amount=5&type=multiple&difficulty=" + this.settings.diff.name
            if (this.settings.cat.id != 0) url += "&category=" + this.settings.cat.id[Math.floor(Math.random() * this.settings.cat.id.length)]
            axios.get(url)
                .then(res => {
                    this.questions = res.data.results
                    console.log(this.questions)
                }).catch(err => {
                    console.log(err.message)
                })
        }
        setActiveQuestion() {
            this.activeQuestion = this.questions[this.round]
            this.activeQuestion.answers = [this.activeQuestion.correct_answer]
            for (var i = 0; i < this.activeQuestion.incorrect_answers.length; i++)
                this.activeQuestion.answers.push(this.activeQuestion.incorrect_answers[i])
            this.shuffle(this.activeQuestion.answers)
        }
        getEmbed() {
            this.setActiveQuestion()
            var qEmbed = new Discord.RichEmbed()
                .setTitle(this.creator.name)
                .setColor(this.creator.color)
                .setFooter("choose answer below")
            var descr = "round: " + (this.round + 1) + "/5\npoints: " + this.score + "/5\nCategory: " + this.activeQuestion.category + " " + this.settings.cat.emoji + "\n**Q:**\n```" + he.decode(this.activeQuestion.question) + "```\n**A:**\n```"
            for (var i = 0; i < this.activeQuestion.answers.length; i++) {
                descr += (i + 1) + ": " + he.decode(this.activeQuestion.answers[i]) + "\n"
            }
            descr += "```"
            qEmbed.setDescription(descr)
            return qEmbed
        }
        stop() {
            const index = activeQuizGames.indexOf(this);
            if (index !== -1) {
                activeQuizGames.splice(index, 1);
            }
        }

        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }


    }
    var quizF = findQuizgame(message.member.displayName)
    if (quizF) quizF.stop()

    var quiz = new Quiz({
        id: message.author.id,
        name: message.member.displayName,
        color: message.member.displayColor
    })
    var r = []
    var embed = new Discord.RichEmbed()
        .setTitle(message.member.displayName)
        .setColor(message.member.displayColor)
        .setFooter("please select one category and one difficulty")
        .addField("🇨 🇦 🇹 🇪 🇬 🇴 🇷 🇮 🇪 🇸", "⚫")
    var descr = "**__Settings__**"

    for (var i = 0; i < quizData.categories.length; i++) {
        embed.addField(quizData.categories[i].name, quizData.categories[i].emoji, true)
        r.push(quizData.categories[i].emoji)
    }
    embed.addBlankField(true)
    embed.addBlankField(false)
    embed.addField("🇩 🇮 🇫 🇫 🇮 🇨 🇺 🇱 🇹 🇮 🇪 🇸", "⚫")

    for (var i = 0; i < quizData.difficulties.length; i++) {
        embed.addField(quizData.difficulties[i].name, quizData.difficulties[i].emoji, true)
        r.push(quizData.difficulties[i].emoji)
    }

    message.channel.send({
        embed
    }).then(m => {

        for (var i = 0, j = 0; i < r.length; i++) {
            setTimeout(() => {
                m.react(r[j]).catch((err) => {
                    console.log(err.message)
                })
                j++
            }, i * 500)
        }
    })

    function findQuizgame(name) {
        for (var i = 0; i < activeQuizGames.length; i++) {
            if (activeQuizGames[i].creator.name === name) {
                return activeQuizGames[i]
            }
        }
        return null
    }


}


let check = function (reaction, user) {
    if (reaction.message.channel.name !== config.botSpamChat) return
    if (reaction.message.author.id !== client.user.id) return
    if (user.id === client.user.id) return
    if (!reaction.message.embeds[0]) return
    var quiz = findQuizgame(reaction.message.embeds[0].title)

    if (!quiz) return
    if (!quiz.started) {
        var category = findCategory(reaction.emoji.name)
        console.log(category)
        if (category) quiz.setCategory(category)
        var diff = findDiff(reaction.emoji.name)
        console.log(diff)
        if (diff) quiz.setDifficulty(diff)
        if (quiz.settings.diff && quiz.settings.cat) {
            reaction.message.delete()
            quiz.startQuiz()
            setTimeout(() => {
                var embed = quiz.getEmbed()
                reaction.message.channel.send({
                    embed
                }).then((m) => {
                    var n = ["1⃣", "2⃣", "3⃣", "4⃣"]
                    for (var i = 0, j = 0; i < n.length; i++) {
                        setTimeout(() => {
                            m.react(n[j]).catch((err) => {
                                console.log(err.message)
                            })
                            j++
                        }, i * 500)
                    }
                })
            }, 3000)

        }
    } else {
        var answered = getNumber(reaction.emoji.name)
        if (answered > 3) return
        if (quiz.activeQuestion.answers[answered] === quiz.activeQuestion.correct_answer) {
            quiz.score = quiz.score + 1
            reaction.message.channel.send("you answered right! Woohoo").then(m => {
                nextQ(m, quiz, reaction.message)
            })
        } else
            reaction.message.channel.send("you answered wrong :( The correct answer was: " + quiz.activeQuestion.correct_answer).then(m => {
                nextQ(m, quiz, reaction.message)
            })

    }

    function nextQ(m, quizm, rm) {
        setTimeout(() => {
            m.delete()
            if (quizm.round < 4)
                quizm.round = quizm.round + 1
            else quizm.stop()
            embed = quizm.getEmbed()
            rm.edit({
                embed
            })
        }, 5000)
    }
    reaction.remove(user)
    console.log(quiz)

    function findCategory(emoji) {
        for (var i = 0; i < quizData.categories.length; i++) {
            if (quizData.categories[i].emoji === emoji) {
                return quizData.categories[i]
            }
        }
        return null
    }

    function findDiff(emoji) {
        for (var i = 0; i < quizData.difficulties.length; i++) {
            if (quizData.difficulties[i].emoji === emoji) {
                return quizData.difficulties[i]
            }
        }
        return null
    }

    function findQuizgame(name) {
        for (var i = 0; i < activeQuizGames.length; i++) {
            if (activeQuizGames[i].creator.name === name) {
                return activeQuizGames[i]
            }
        }
        return null
    }

    function getNumber(emote) {
        var number = 11
        switch (emote) {
            case "1⃣":
                number = 0;
                break;
            case "2⃣":
                number = 1;
                break;
            case "3⃣":
                number = 2;
                break;
            case "4⃣":
                number = 3;
                break;
            case "5⃣":
                number = 4;
                break;
            case "6⃣":
                number = 5;
                break;
            case "7⃣":
                number = 6;
                break;
            case "8⃣":
                number = 7;
                break;
            case "9⃣":
                number = 8;
                break;
            case "🔟":
                number = 9;
                break;
        }
        return number
    }

}
module.exports = {
    name: "quiz",
    spam: true,
    descr: "play a game of quiz",
    run: run,
    check: check
}
