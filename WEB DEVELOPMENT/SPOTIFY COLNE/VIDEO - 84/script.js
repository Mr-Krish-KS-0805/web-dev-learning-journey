console.log("Lets write javascript")

document.title = "Spotify - Web music player"
let currentsong = new Audio();
let currfolder;
let songs;


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // console.log(element.href)
            // songs.push(element.href.split("/").pop())
            let clean = (element.href).replaceAll("%5C", "/").split(`/${folder}/`).pop()
            songs.push(clean)
        }
    }

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ").replaceAll("%5C", " ").replaceAll("music", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <img width="30px" height="30px" src="img/play.svg" class="invert" alt="">
                            </div></li>`
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    });

    return songs

}

const playMusic = (track, pause = false) => {
    currentsong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        play.src = "img/pause.svg";
    }

    currentsong.onpause = () => {
        play.src = "img/play.svg";
    }

    currentsong.onplay = () => {
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track).replaceAll(".mp3", "")
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/music/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)

        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        
        if (e.href.includes("%5C")) {
            let folder = e.href.replaceAll("%5C", "/").split("/").slice(-2)[0]
            // Get the metadata of the folder 
            let a = await fetch(`http://127.0.0.1:3000/music/${folder}/info.json`)
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card border">
                        <img src="/music/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
            
        }
    }

    //Load the playlisty whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`music/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })

}

async function main() {
    await getsongs("music/Krish")
    playMusic(songs[0], true)

    // display all the albums on the page 
    await displayAlbums()



    // Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listen for timeupdate event

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-250%"
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentsong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])

        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        // currentsong.pause()
        console.log("Next clicked")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])

        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("'setting volume to", e.target.value, "/100")
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }

        else if (currentsong.volume == 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("volume.svg", "mute.svg")

        }
    })
    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }

        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentsong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })



}


main()



