const Discord = require('discord.js');
const logA = require("./log.json");
var logO = logA[0]

var fs = require("fs")

var statsPerDay = [
    {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    },
    {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }]

var log = logO.log
for (var i = 0; i < logO.log.length; i++) {
    statsPerDay[log[i].day].usersjoined = statsPerDay[log[i].day].usersjoined + log[i].data.usersjoined;
    statsPerDay[log[i].day].messageCounts = statsPerDay[log[i].day].messageCounts + log[i].data.messageCounts;
    statsPerDay[log[i].day].artShared = statsPerDay[log[i].day].artShared + log[i].data.artShared;
    statsPerDay[log[i].day].usersOnline = statsPerDay[log[i].day].usersOnline + log[i].data.usersOnline;
    statsPerDay[log[i].day].botUsage = statsPerDay[log[i].day].botUsage + log[i].data.botUsage;
    statsPerDay[log[i].day].emotes = statsPerDay[log[i].day].emotes + log[i].data.emotes;
    statsPerDay[log[i].day].reactionsAdded = statsPerDay[log[i].day].reactionsAdded + log[i].data.reactionsAdded;
    statsPerDay[log[i].day].peoplePromoted = statsPerDay[log[i].day].peoplePromoted + log[i].data.peoplePromoted;
}
var statsPerHour = [
    {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    },
    {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }, {
        "usersjoined": 0,
        "messageCounts": 0,
        "usersOnline": 0,
        "artShared": 0,
        "botUsage": 0,
        "emotes": 0,
        "reactionsAdded": 0,
        "peoplePromoted": 0
    }

]


for (var i = 0; i < logO.log.length; i++) {
    console.log(log[i].hour)
    statsPerHour[log[i].hours].usersjoined = statsPerHour[log[i].hours].usersjoined + log[i].data.usersjoined;
    statsPerHour[log[i].hours].messageCounts = statsPerHour[log[i].hours].messageCounts + log[i].data.messageCounts;
    statsPerHour[log[i].hours].artShared = statsPerHour[log[i].hours].artShared + log[i].data.artShared;
    statsPerHour[log[i].hours].usersOnline = statsPerHour[log[i].hours].usersOnline + log[i].data.usersOnline;
    statsPerHour[log[i].hours].botUsage = statsPerHour[log[i].hours].botUsage + log[i].data.botUsage;
    statsPerHour[log[i].hours].emotes = statsPerHour[log[i].hours].emotes + log[i].data.emotes;
    statsPerHour[log[i].hours].reactionsAdded = statsPerHour[log[i].hours].reactionsAdded + log[i].data.reactionsAdded;
    statsPerHour[log[i].hours].peoplePromoted = statsPerHour[log[i].hours].peoplePromoted + log[i].data.peoplePromoted;
}
console.log(statsPerDay)
console.log(statsPerHour)
var stream = fs.createWriteStream("stats.csv");
stream.once('open', function (fd) {
    stream.write("days\n-;mon;tue;wed;thur;fri;sat;sun;\n")
    stream.write("users joined;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].usersjoined + ";");
    }
    stream.write("\n")
    stream.write("messagecount;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].messageCounts + ";");
    }
    stream.write("\n")
    stream.write("users online;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].usersOnline + ";");
    }
    stream.write("\n")
    stream.write("art shared;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].artShared + ";");
    }
    stream.write("\n")
    stream.write("botusage;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].botUsage + ";");
    }
    stream.write("\n")
    stream.write("emotes;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].emotes + ";");
    }
    stream.write("\n")
    stream.write("reactions added;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].reactionsAdded + ";");
    }
    stream.write("\n")
    stream.write("people promoted;")
    for (var i = 0; i < statsPerDay.length; i++) {
        stream.write(statsPerDay[i].peoplePromoted + ";");
    }
    stream.write("\n")
    stream.write("\n hours:;\n-;1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;\n")
    stream.write("users joined;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].usersjoined + ";");
    }
    stream.write("\n")
    stream.write("messagecount;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].messageCounts + ";");
    }
    stream.write("\n")
    stream.write("users online;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].usersOnline + ";");
    }
    stream.write("\n")
    stream.write("art shared;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].artShared + ";");
    }
    stream.write("\n")
    stream.write("botusage;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].botUsage + ";");
    }
    stream.write("\n")
    stream.write("emotes;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].emotes + ";");
    }
    stream.write("\n")
    stream.write("reactions added;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].reactionsAdded + ";");
    }
    stream.write("\n")
    stream.write("people promoted;")
    for (var i = 0; i < statsPerHour.length; i++) {
        stream.write(statsPerHour[i].peoplePromoted + ";");
    }
    stream.write("\n")
    stream.end();
})



stream.once('open', function (fd) {


})
