module.exports = function (memberC, AddOrSub, amount) {
    amount = Math.abs(amount)
    if (AddOrSub === "add") {
        memberC.currency.points += amount
        if (memberC.currency.points > memberC.stats.maxpoints)
            memberC.stats.maxpoints = memberC.currency.points
    } else
    if (AddOrSub === "sub") {
        if ((memberC.currency.points - amount) >= 0)
            memberC.currency.points -= amount
    }
    return memberC
}
