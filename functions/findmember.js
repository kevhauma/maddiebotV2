modules.exports = function (Fuser, currencyMembers) {
    for (let i = 0; i < currencyMembers.length; i++) {
        if (currencyMembers[i].id === Fuser.id) {
            if (Fuser.username !== currencyMembers[i].name)
                currencyMembers[i].name = Fuser.username
            console.log("found " + currencyMembers[i].name + " | " + currencyMembers[i].currency.place)
            return currencyMembers[i]
        }
    }
    console.log("new added")
    let Nuser = addCurrencyMember(Fuser)
    return Nuser

    function addCurrencyMember(addU) {
        let Nmember = {
            "name": addU.username,
            "id": addU.id,
            "stats": {
                "messagecount": 0,
                "gamblewins": 0,
                "gamblelosses": 0,
                "slotJackpots": 0,
                "maxpoints": 100
            },
            "seasonal": {
                "points": 0,
                "place": currencyMembers.length
            },
            "currency": {
                "points": 100,
                "place": currencyMembers.length,
                "gamechance": 50
            }
        }
        currencyMembers.push(Nmember)
        console.log("added " + Nmember.name)
        return Nmember
    }
}
