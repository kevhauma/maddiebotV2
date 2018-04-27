let writecounter = 0
module.exports = function (file, array, fs, JSONStream) {
    if (writecounter > 5) {
        try {
            let transformStream = JSONStream.stringify()
            let outputStream = fs.createWriteStream(__dirname + file)
            transformStream.pipe(outputStream)
            array.forEach(transformStream.write)
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
                    let inputStream = fs.createReadStream(__dirname + file)
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
            console.log(err)
        }

        writecounter = 0
    }
    console.log("writing: " + writecounter)
    writecounter++
}
