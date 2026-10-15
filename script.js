
const songImg = document.getElementById("song_image");
const songName =  document.getElementById("song_name");
const songArtist = document.getElementById("song_artist");

const songSlider = document.getElementById("slider_song");

const playpauseButton = document.getElementById("playpause_song");
const prevSongButton = document.getElementById("prev_song");
const nextSongButton = document.getElementById("next_song");

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
        name: "",
        artist: "",
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
updateSong();

prevSongButton.addEventListener("click,", function() {
    if(currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong()
});

nextSongButton.addEventListener("click", function() {
    if (currentSongIndex== songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong()
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
    }
    audio.play();
})

function updateSong() {
    const song = songs[currentSongIndex];
    songImg.src= song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    songSlider.value = 0;
    songSlider.max = audio.duration;
}

