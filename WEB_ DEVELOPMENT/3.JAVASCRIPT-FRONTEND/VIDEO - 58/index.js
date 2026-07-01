function nice(name) {
    console.log("Hey " + name + " you are nice!")
    console.log("Hey " + name + " you are good")
}

nice("krish")

function sum(a, b, c = 3) {
    // console.log(a + b)
    console.log(a, b, c)
    return a + b + c
}

result = sum(3,5)
console.log("The sum of the numbers is ", result)

const fun = (x)=> {
        console.log("I am an arrow function", x)
}

fun(32)