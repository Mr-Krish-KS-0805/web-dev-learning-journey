console.log("Harry is a hacker")
console.log("Krish is a hacker")

setTimeout(() => {
  console.log("i am inside settimeout")
}, 0)

setTimeout(() => {
  console.log("I am inside settimeout 2")
}, 0);

console.log("The end")

const fn = () => {
  console.log("Nothing")
}

const callback = (arg,fn) => {
  console.log(arg)
  fn()
}

const loadScript = (src, callback) => {
  let sc = document.createElement("script")
  sc.src = src
  sc.onload = callback("Krish", fn)
  document.head.append(sc)
}
loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callback)


