const QUERY_API = "https://acnhapi.com/v1/"
const MODAL = document.querySelector("#modal");
const MODAL_CONTENT = document.querySelector("#modal-content");
const MODAL_OVERLAY = document.querySelector(".modal-overlay")
const HOURS = document.querySelector("#hours");
const MINUTES = document.querySelector("#minutes");
const MAIN = document.querySelector("main");
const FISH_BUTTON = document.querySelector("#fish-button");
const BUG_BUTTON = document.querySelector("#bug-button");
const SEA_BUTTON = document.querySelector("#sea-button");
const TIME = document.querySelector("#time");
const CLOSE_BUTTON = document.querySelector("#close-button");
const MUSIC_BUTTON = document.querySelector("#music-button");
const AUDIO = document.querySelector("audio");
const NORTHERN_BUTTON = document.querySelector("#northern");
const SOUTHERN_BUTTON = document.querySelector("#southern");


let militaryHour = 0;
let month = 0;
let hemisphere = "northern";
let musicIsPlaying = false;

initializeSite();


function initializeSite() {
    updateTime();
    setInterval(updateTime, 1000);
    document.querySelector("#music-image").src = "imgs/music-note.svg";
}

function updateTime() {
    let date = new Date();
    month = date.getMonth() + 1;
    militaryHour = date.getHours();
    if (militaryHour > 12) {
        HOURS.innerText = militaryHour - 12;
    } else {
        if (militaryHour == 0) {
            HOURS.innerText = 12;
        } else {
            HOURS.innerText = militaryHour;
        }
    }
    document.querySelector(".am-pm").innerText = militaryHour > 12 ? "PM" : "AM";
    if (date.getMinutes() < 10) {
        MINUTES.innerText = ("0" + date.getMinutes());
    } else {
        MINUTES.innerText = date.getMinutes();
    }
    updateBackgroundClass();
}

function updateBackgroundClass() {
    switch (militaryHour) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 20:
        case 21:
        case 22:
        case 23:
            TIME.style.color = "white";
            if (!MAIN.classList.contains("night")) {
                MAIN.classList.remove("evening");
                MAIN.classList.add("night");
            }
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            TIME.style.color = "212121";
            if (!MAIN.classList.contains("morning")) {
                MAIN.classList.remove("night");
                MAIN.classList.add("morning");
            }
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            TIME.style.color = "#212121";
            if (!MAIN.classList.contains("day")) {
                MAIN.classList.remove("morning");
                MAIN.classList.add("day");
            }
            break;
        case 16:
        case 17:
        case 18:
        case 19:
            TIME.style.color = "white";
            if (!MAIN.classList.contains("evening")) {
                MAIN.classList.remove("day");
                MAIN.classList.add("evening");
            }

    }
}

function getCreatures(query) {
    fetch(`${QUERY_API}${query}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let creatureArray = Object.keys(data).map(key => data[key]);
            console.log("Data:", data);
            creatureArray = filterCreatures(creatureArray);
            createCards(creatureArray);
        }).catch(error => {
        console.log("Something went wrong", error);
    });
}

function createCards(array) {
    const template = document.querySelector('#card');
    for (let i = 0; i < array.length; i++) {
        const clone = template.content.cloneNode(true);
        const image = clone.querySelector('img');
        // console.log(array[0]);
        image.src = array[i].icon_uri;
        const name = clone.querySelector("#name");
        name.innerText = array[i].name["name-USen"];
        const middle = clone.querySelector("#middle");
        if (array[i].availability.location == undefined) {
            middle.innerText = `Speed: ${array[i].speed}`;
        } else {
            middle.innerText = array[i].availability.location;
        }
        const price = clone.querySelector("#price");
        price.innerText = array[i].price;
        MODAL_CONTENT.appendChild(clone);
    }
}

function clearModal() {
    MODAL_CONTENT.innerHTML = "";
}

function filterCreatures(array) {
    return array.filter((creature) => {
        switch (hemisphere) {
            case "northern":
                return (creature.availability["month-array-northern"].includes(month) &&
                creature.availability["time-array"].includes(militaryHour));
            case "southern":
                return (creature.availability["month-array-southern"].includes(month) &&
                    creature.availability["time-array"].includes(militaryHour));
        }
    });
}

function toggleMusic() {
    const musicImage = document.querySelector("#music-image");
    switch (musicIsPlaying) {
        case false:
            musicImage.src = "imgs/no-music.svg";
            musicIsPlaying = true;
            AUDIO.volume = 0.2;
            AUDIO.src = `${QUERY_API}hourly/${pickMusicId()}`;
            AUDIO.loop = true;
            AUDIO.play();
            break;
        case true:
            musicImage.src = "imgs/music-note.svg";
            musicIsPlaying = false;
            AUDIO.pause();
            AUDIO.currentTime = 0;
    }
}

function pickMusicId() {
    let musicId = 0;
    switch (militaryHour) {
        case 0:
            musicId = getRandomNumber(1, 4);
            break;
        case 1:
            musicId = getRandomNumber(4, 7);
            break;
        case 2:
            musicId = getRandomNumber(7, 10);
            break;
        case 3:
            musicId = getRandomNumber(10, 13);
            break;
        case 4:
            musicId = getRandomNumber(13, 16);
            break;
        case 5:
            musicId = getRandomNumber(16, 19);
            break;
        case 6:
            musicId = getRandomNumber(19, 20);
            break;
        case 7:
            musicId = getRandomNumber(22, 25);
            break;
        case 8:
            musicId = getRandomNumber(25, 28);
            break;
        case 9:
            musicId = getRandomNumber(28, 31);
            break;
        case 10:
            musicId = getRandomNumber(31, 34);
            console.log(musicId);
            break;
        case 11:
            musicId = getRandomNumber(34, 37);
            break;
        case 12:
            musicId = getRandomNumber(37, 40);
            break;
        case 13:
            musicId = getRandomNumber(40, 43);
            break;
        case 14:
            musicId = getRandomNumber(43, 46);
            break;
        case 15:
            musicId = getRandomNumber(46, 49);
            break;
        case 16:
            musicId = getRandomNumber(49, 52);
            break;
        case 17:
            musicId = getRandomNumber(52, 55);
            break;
        case 18:
            musicId = getRandomNumber(55, 58);
            break;
        case 19:
            musicId = getRandomNumber(58, 61);
            break;
        case 20:
            musicId = getRandomNumber(61, 64);
            break;
        case 21:
            musicId = getRandomNumber(64, 67);
            break;
        case 22:
            musicId = getRandomNumber(67, 70);
            break;
        case 23:
            musicId = getRandomNumber(70, 73);
            break;
    }
    return musicId;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

FISH_BUTTON.addEventListener("click", () => {
    getCreatures("fish");
    MODAL.classList.toggle("closed");
    MODAL_OVERLAY.classList.toggle("closed");
});

BUG_BUTTON.addEventListener("click", () => {
    getCreatures("bugs");
    MODAL.classList.toggle("closed");
    MODAL_OVERLAY.classList.toggle("closed");
});

SEA_BUTTON.addEventListener("click", () => {
    getCreatures("sea");
    MODAL.classList.toggle("closed");
    MODAL_OVERLAY.classList.toggle("closed");
});

MUSIC_BUTTON.addEventListener("click", () => {
    toggleMusic();
})

CLOSE_BUTTON.addEventListener("click", () => {
    clearModal();
    MODAL.classList.toggle("closed");
    MODAL_OVERLAY.classList.toggle("closed");
});

NORTHERN_BUTTON.addEventListener("click", function() {
    if (hemisphere != "northern") {
        this.classList.toggle("selected");
        hemisphere = "northern";
        SOUTHERN_BUTTON.classList.toggle("selected");
    }
});

SOUTHERN_BUTTON.addEventListener("click", function() {
    if (hemisphere != "southern") {
        this.classList.toggle("selected");
        hemisphere = "southern";
        NORTHERN_BUTTON.classList.toggle("selected");
    }
});

