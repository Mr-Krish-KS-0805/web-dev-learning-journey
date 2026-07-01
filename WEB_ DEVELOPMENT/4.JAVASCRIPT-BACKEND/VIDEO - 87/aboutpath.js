import path from "path" 

let mypath = "C:\\Users\\kkshr\\OneDrive\\WEB DEVELOPMENT\\4.JAVASCRIPT-BACKEND\\VIDEO - 87\\krish.txt"

console.log(path.extname(mypath))
console.log(path.dirname(mypath))
console.log(path.basename(mypath))

console.log(path.join("c:/"), "programs\\krish.txt")