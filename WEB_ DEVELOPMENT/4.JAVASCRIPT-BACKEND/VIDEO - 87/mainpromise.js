import fs from "fs/promises"

let a = await fs.readFile("krish.txt")

let b = await fs.appendFile("krish.txt","\n\n\nthis is amazing promise")

console.log(a.toString(), b)