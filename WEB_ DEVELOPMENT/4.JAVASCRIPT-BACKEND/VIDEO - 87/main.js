const fs  = require("fs")
// const fs = require("fs/promises")

// console.log(fs)

console.log("starting")
// fs.writeFileSync("krish.txt", "krish is a good boy ")
fs.writeFile("krish2.txt", "Krish is a good boy2", () => {
    console.log("done")
    fs.readFile("krish2.txt", (error, data) => {
        console.log(error ,data.toString())
    })
})

fs.appendFile("krish.txt", "vashu robo", (e, d) =>{
    console.log(d)
})
console.log("ending")