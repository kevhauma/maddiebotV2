module.exports = function (Fuser, currencyMembers) {
    let nUser = currencyMembers.find(x => x.id === Fuser.id)
    if (nUser) {
        console.log("found " + currencyMembers[i].name + " | " + currencyMembers[i].currency.place)
        return nUser
    }
    else return addCurrencyMember(Fuser)

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
