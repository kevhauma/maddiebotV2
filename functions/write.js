let writecounter = 0
module.exports = function (file, array, fs, JSONStream) {
    if (writecounter > 10) {
        try {
            let transformStream = JSONStream.stringify()
            let outputStream = fileSystem.createWriteStream(__dirname + file)
            transformStream.pipe(outputStream)
            currencyMembers.forEach(transformStream.write)
            transformStream.end()
            outputStream.on(
                "finish",
                function handleFinish() {
                    //finish
                }
            )
            outputStream.on(
                "finish",
                function handleFinish() {
                    let transformStream = JSONStream.parse("*")
                    let inputStream = fileSystem.createReadStream(__dirname + file)
                    inputStream
                        .pipe(transformStream)
                        .on(
                            "data",
                            function handleRecord(data) {
                                //writing
                            }
                        )
                        .on(
                            "end",
                            function handleEnd() {
                                console.log("JSONStream parsing complete!")
                            }
                        )

                }
            )
        } catch (err) {
            console.log("writing went wrong")
        }
        writecounter = 0
    }
    writecounter++
}
