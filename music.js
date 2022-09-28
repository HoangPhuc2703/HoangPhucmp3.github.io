const song = document.getElementById('song');
const playBtn = document.querySelector('.player-inner');

const nextBtn = document.querySelector('.play-forward'); // bài tiếp
const prevBtn = document.querySelector('.play-back'); // lùi bài

const durationTime = document.querySelector('.duration'); //thời gian
const remainingTime = document.querySelector('.remaining'); //thời gian
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicThumbnail = document.querySelector('.music-thumb');
const musicImage = document.querySelector('.music-thumb img');
const playRepeat = document.querySelector('.play-repeat');


let isPlaying = true;  //nhạc có đang phát hay không

let indexSong = 0; //vị trí bài nhạc
let isRepeat = false;
// const musics = ["TicTac_Bray.mp3", "YeuMotNguoiNhuAnh.mp3", "Thang6CuaAnh.mp3", "HoangHon.mp3"];
const musics = [
    {
        id: 1,
        title: "Tíc Tắc",
        file: "TicTac_Bray.mp3",
        image:
            "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Yêu Một Người Như Anh",
        file: "YeuMotNguoiNhuAnh.mp3",
        image: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG92ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Tháng 6 Của Anh",
        file: "Thang6CuaAnh.mp3",
        image: "https://images.unsplash.com/photo-1589726310756-0198bd0d0fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8anVuZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        title: "Hoàng Hôn",
        file: "HoangHon.mp3",
        image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        title: "Tháng 9 Của Anh",
        file: "Tháng9CuaAnh.mp3",
        image: "https://images.unsplash.com/photo-1524254725712-0d14ba4bbc17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bnVtYmVyJTIwOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        title: "Từng Là Tất Cả",
        file: "tunglatatca.mp3",
        image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvdmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        title: "Thuốc lá & Cà Phê",
        file: "thuocla.mp3",
        image: "https://images.unsplash.com/photo-1644621972139-cec33bf68a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmUlMjBhbmQlMjBtb2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        title: "Bệnh Của Anh",
        file: "benhcuaanh.mp3",
        image: "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZGVlcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    }
]


displayTimer();
let timer;
let repeatCount = 0;

playRepeat.addEventListener('click', function () {
    if (isRepeat) {
        isRepeat = false
        playRepeat.removeAttribute("style");

    }
    else {
        (isRepeat = true);
        playRepeat.style.color = "#ffb86c"; // màu vàng khi bấm vào repeat
    }
});

nextBtn.addEventListener("click", function () {
    changeSong(1);
});
prevBtn.addEventListener("click", function () {
    changeSong(-1);
});

//chuyển bài
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        //handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }

}
function changeSong(dir) {
    if (dir === 1) {
        //next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        //prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;

    }
    init(indexSong);
    // song.setAttribute("src", `./assets/music/${musics[indexSong].file}`);
    playPause();

}


playBtn.addEventListener('click', playPause);
function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play(); // nhạc đang chạy
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`; // icon
        isPlaying = false;
        setInterval(displayTimer, 500);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true; // nhạc tắt
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration; //thời gian trên thanh kéo
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime)
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }

}
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// tua thanh kéo
rangeBar.addEventListener('change', handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}
// hình bài hát
function init(indexSong) {
    song.setAttribute("src", `./assets/music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);
