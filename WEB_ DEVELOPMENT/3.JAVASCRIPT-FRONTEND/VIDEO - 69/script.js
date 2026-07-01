let a = 5 ;

function factorial(number){
    let arr = Array.from(Array(number+1).keys())
    let c = arr.slice(1,).reduce((a,b) => a*b)
    return c
}

// function factorial(number){
//     let fac = 1 ;
//     for (let index = 1; index <= number ; index++) {
//         fac = fac * index 
//     }
//     return fac 
// }

console.log(factorial(a))
