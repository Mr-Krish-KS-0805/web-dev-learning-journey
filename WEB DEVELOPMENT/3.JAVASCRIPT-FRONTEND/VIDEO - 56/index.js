console.log("Hello I am conditional tutorial")

let age = 1
grace = 2;

// age += grace
// console.log(age)
// console.log(age+grace)
// console.log(age-grace)
// console.log(age*grace)
// console.log(age/grace)
// console.log(age**grace)
// console.log(age%grace)


/* I am
a multiline
comment
*/

if(age == 18) {
    console.log("You can drive")
}

else if (age == 0) {
    console.log("Are you kidding")
}

else if (age == 1) {
    console.log("Are you again kidding")
}
else{
    console.log("You can not drive")
}


a = 7
b = 10
let c = a > b ? (a - b) : (b - a)
console.log(c)


/*
translates to:
if(a>b){
    let c = a - b;
}
else {
    let c = a - b;
}

*/