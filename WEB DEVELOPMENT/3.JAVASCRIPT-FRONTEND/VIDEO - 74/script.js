let button = document.getElementById("btn")


button.addEventListener("dblclick", () => {
    document.querySelector(".box").innerHTML = "<b>yaah you were clicked</b> Enjoy your click"
})

button.addEventListener("contextmenu", () => {
    alert("Don't hack us by Right click please")
})

button.addEventListener("keydown", (e) => {
    console.log(e, e.key, e.keyCode)
})