
const songImg = document.getElementById("song_image");
const songName =  document.getElementById("song_name");
const songArtist = document.getElementById("song_artist");

const songSlider = document.getElementById("slider_song");

const playpauseButton = document.getElementById("playpause_song");
const prevSongButton = document.getElementById("prev_song");
const nextSongButton = document.getElementById("next_song");
const shuffleButton = document.getElementById("shuffle_song");
const repeatButton = document.getElementById("repeat_song");
const playpauseIcon = playpauseButton.querySelector("i");

const songs = [
    {
        image: "Assets/love-you-to-death-type-o-negative-inspired-record.svg",
        name: "Love You To Death",
        artist: "Type O' Negative",
        audio: "Assets/Type O Negative - Love You To Death [OFFICIAL VIDEO].mp3"
    },
    {
        image: "Assets/bite-my-hip-bauhaus-inspired-record.svg",
        name: "Bite my hip",
        artist: "Bauhaus",
        audio: "Assets/Bite My Hip.mp3"
    },
    {
        image: "Assets/deftones-CD.svg",
        name: "My Own Summer (Shove It)",
        artist: "Deftones",
        audio: "Assets/My_Own_Summer.mp3"
    },
    { 
        image: "Assets/i-dont-wanna-be-me-type-o-negative-inspired-record.svg",
        name: "I don't wanna be me",
        artist: "Type O' Negative",
        audio: "Assets/I Don't Wanna Be Me.mp3",
    },
    {
        image: "Assets/spellbound-siouxsie-inspired-record.svg",
        name: "Spellbound",
        artist: "Siouxsie And The Banshees",
        audio: "Assets/Siouxsie And The Banshees - Spellbound (Official Music Video).mp3"
    },
    {
        image: "Assets/your-name-wisp-inspired-record.svg",
        name: "Your Name",
        artist: "Wisp",
        audio: "Assets/Your_face.mp3",
    },
]

const audio = document.createElement("audio");
let currentSongIndex = 0;
let isShuffling = false;
let isRepeating = false;

prevSongButton.addEventListener("click", function() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    if (currentSongIndex > 0) {
        changeSong(currentSongIndex - 1);
    }
});

nextSongButton.addEventListener("click", function() {
    if (isShuffling) {
        changeSong(getRandomSongIndex());
        return;
    }
    if (currentSongIndex === songs.length - 1) {
        return;
    }
    changeSong(currentSongIndex + 1);
});

playpauseButton.addEventListener("click", async function() {
    if (audio.paused) {
        try {
            await audio.play();
        } catch (error) {
            console.error("Unable to play the selected song:", error);
        }
    } else {
        audio.pause();
    }
});

shuffleButton.addEventListener("click", function() {
    isShuffling = !isShuffling;
});

repeatButton.addEventListener("click", function() {
    isRepeating = !isRepeating;
});

songSlider.addEventListener("input", function() {
    if (Number.isFinite(audio.duration)) {
        audio.currentTime = Number(songSlider.value);
    }
});

audio.addEventListener("loadedmetadata", function() {
    songSlider.max = String(audio.duration);
});

audio.addEventListener("timeupdate", function() {
    songSlider.value = String(audio.currentTime);
});

audio.addEventListener("play", function() {
    playpauseIcon.classList.replace("fa-circle-play", "fa-circle-pause");
});

audio.addEventListener("pause", function() {
    playpauseIcon.classList.replace("fa-circle-pause", "fa-circle-play");
});

audio.addEventListener("ended", function() {
    playpauseIcon.classList.replace("fa-circle-pause", "fa-circle-play");
    if (isShuffling) {
        currentSongIndex = getRandomSongIndex();
    } else if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else if (isRepeating) {
        currentSongIndex = 0;
    } else {
        return;
    }
    updateSong(true);
});

function getRandomSongIndex() {
    if (songs.length < 2) {
        return currentSongIndex;
    }
    const offset = Math.floor(Math.random() * (songs.length - 1)) + 1;
    return (currentSongIndex + offset) % songs.length;
}

function changeSong(songIndex) {
    const shouldPlay = !audio.paused;
    currentSongIndex = songIndex;
    updateSong(shouldPlay);
}

function updateSong(autoplay = false) {
    const song = songs[currentSongIndex];
    audio.pause();
    songImg.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;
    renderPlayList();

    audio.src = song.audio;
    audio.load();
    songSlider.value = 0;
    songSlider.max = "0";
    if (autoplay) {
        audio.play().catch(function(error) {
            console.error("Unable to play the selected song:", error);
        });
    }
}

function moveSlider(){
    songSlider.value = audio.currentTime;
};
 setInterval(moveSlider,1000);


const playlistItems = document.getElementById("playlist_items");
const audioFilesInput = document.getElementById("audio_files");

function renderPlayList() {
    playlistItems.replaceChildren();

    songs.forEach((song,index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "playlist-track";
        button.textContent = `${song.name} - ${song.artist}`;
        button.setAttribute("aria-pressed", String(index === currentSongIndex));

        button.addEventListener("click", function() {
            currentSongIndex = index;
            updateSong(true);
        });

        playlistItems.appendChild(button);
    });
}

audioFilesInput.addEventListener("change", function() {
    for (const file of audioFilesInput.files) {
        songs.push({
            image: "Assets/deftones-CD.svg",
            name: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Local file",
            audio: URL.createObjectURL(file)
        });
    }

    renderPlayList();
    audioFilesInput.value = "";
});

updateSong();
