let ex = {
    setTime: function (client) {
        setTimeout(function () {
            let cdChannel = client.guilds.first().channels.get("361841035783176192")
            let today = new Date()
            let dayOfWeek = today.getDay()
            let nextStream = setNextStream(dayOfWeek, false)
            if (today > nextStream) { //if day of stream (after start)
                if (today.getUTCHours() >= 20 && today.getUTCHours() <= 21) { //an hour-ish after stream
                    setPresence(client, "is over", 1)
                    cdChannel.setName("Stream_is_over")
                    console.log("set to 'is over'")
                    interval = 1000 * 60 * 15 //check every 15 minutes when stream is over
                    setTime(client)
                    return
                }
                if (today.getUTCHours() < 20) { //now streaming
                    setPresence(client, " the stream!", 3)
                    cdChannel.setName("Stream_is_live_now")
                    console.log("set to 'now!'")
                    interval = 1000 * 60 * 60 //check every hour when live
                    setTime(client)
                    return
                }
                let tomorrow = dayOfWeek + 1 //next stream after this one
                if (tomorrow > 6) tomorrow -= 7
                nextStream = setNextStream(tomorrow, true)
            }
            let distance = nextStream - today
            //gets days, hours and minutes between now and next stream
            let msec = distance
            let dd = Math.floor(msec / 24 / 1000 / 60 / 60)
            msec -= dd * 24 * 1000 * 60 * 60
            let hh = Math.floor(msec / 1000 / 60 / 60)
            msec -= hh * 1000 * 60 * 60
            let mm = Math.floor(msec / 1000 / 60)
            msec -= mm * 1000 * 60
            //puts day and hour in string
            let timeLeft = " in"
            if (dd != 0) {
                if (dd == 1 && hh == 0) timeLeft += " 24h"
                else timeLeft += " " + dd + "d"
            }
            if (hh != 0) timeLeft += " " + hh + "h"
            if (mm != 0) timeLeft += " " + mm + "m"
            //if less than an hour, display minutes 
            if (dd == 0 && hh == 0) {
                interval = 1000 * 60 * 5 //check every 5 minutes
                timeLeft = " in less than " + mm + "minutes"
            } else interval = 1000 * 60 * 30 //check every 30minutes

            setPresence(client, timeLeft, 1)
            cdChannel.setName("Is_live" + timeLeft.replace(/ /g, "_"))
                .catch(error => {
                    console.log(error)
                })
            console.log("set to " + timeLeft)
            ex.setTime(client) //loop (call function again)
        }, interval)

        function setNextStream(dayOfWeekS, tomorrow) {
            let difference
            let today = new Date()

            switch (dayOfWeekS) {
                case 2: //tuesday
                    difference = 1
                    break
                case 3: //wednesday
                    difference = 0
                    break
                case 4: //thursday
                    difference = 1
                    break
                case 5: //friday
                    difference = 0
                    break
                case 6: //saturday
                    difference = 2
                    break
                case 0: //sunday
                    difference = 1
                    break
                case 1: //monday
                    difference = 0
                    break
            }

            let nextStreamDate = new Date()
            nextStreamDate.setUTCHours("13") //set next stream hours
            nextStreamDate.setMinutes("31")
            nextStreamDate.setSeconds("0")
            nextStreamDate.setMilliseconds("0")
            //set next stream day
            if (tomorrow) nextStreamDate.setDate(today.getDate() + difference + 1)
            else nextStreamDate.setDate(today.getDate() + difference)

            return nextStreamDate

        }

        function setPresence(client, game, type) {
            client.user.setPresence({
                    'status': 'online',
                    'game': {
                        'name': game,
                        'type': type,
                        'url': 'https://www.twitch.tv/madeleineink'
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
modules.export = ex.setTime
