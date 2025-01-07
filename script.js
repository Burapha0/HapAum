let playBtn = document.getElementById('play_btn');
let audioPlayer = document.getElementById('audioPlayer');
let songTitle = document.getElementById('songTitle');
let songArtist = document.getElementById('songArtist');
let songTime = document.getElementById('songTime');
let slider = document.getElementById('slider');
let img = document.querySelector('.playing_part .img img');
let playlist = document.querySelector('.playlist');
let options = document.querySelector('.options');
let volumeControl = document.getElementById('volumeControl');

document.querySelectorAll('.polaroid img').forEach(img => {
    img.addEventListener('click', () => {
        img.classList.toggle('wiggle');
    });
});

img.addEventListener('click', () => {
    img.classList.toggle('wiggle');
});


// การปรับระดับเสียง
volumeControl.addEventListener('input', function () {
    audioPlayer.volume = volumeControl.value;
});

function open_p() {
    playlist.classList.toggle('active');
}

function sidebar() {
    options.classList.toggle('active2');
}

// ฟังก์ชันสำหรับเล่นเพลงและหมุนรูป
playBtn.addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = "<i class='bx bx-pause'></i>";
        img.classList.add('rotate');
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = "<i class='bx bx-play'></i>";
        img.classList.remove('rotate');
    }
});

// อัปเดตเวลาในเพลง
audioPlayer.addEventListener('timeupdate', function () {
    let currentTime = audioPlayer.currentTime;
    let duration = audioPlayer.duration;
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    songTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    slider.value = (currentTime / duration) * 100;
});

// ควบคุมสไลด์เลื่อน
slider.addEventListener('input', function () {
    let seekTime = (slider.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

const photos = document.querySelectorAll('.photo');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function showPhoto(index) {
    photos.forEach((photo, i) => {
        photo.style.display = i === index ? 'block' : 'none';
        photo.style.transform = `translateX(0)`;
    });
}

showPhoto(currentIndex);

const startDrag = (x) => {
    startX = x;
    isDragging = true;
};

const moveDrag = (x) => {
    if (!isDragging) return;
    let diffX = x - startX;
    photos[currentIndex].style.transform = `translateX(${diffX}px)`;
};

const endDrag = (x) => {
    if (!isDragging) return;
    let diffX = x - startX;
    isDragging = false;

    if (diffX < -100 && currentIndex < photos.length - 1) {
        photos[currentIndex].style.transform = `translateX(-100%)`;
        currentIndex++;
        showPhoto(currentIndex);
    } else if (diffX > 100 && currentIndex > 0) {
        photos[currentIndex].style.transform = `translateX(100%)`;
        currentIndex--;
        showPhoto(currentIndex);
    } else {
        photos[currentIndex].style.transform = `translateX(0)`;
    }
};

photos.forEach((photo) => {
    photo.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    photo.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    photo.addEventListener('touchend', (e) => endDrag(e.changedTouches[0].clientX));

    photo.addEventListener('mousedown', (e) => startDrag(e.clientX));
    photo.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    photo.addEventListener('mouseup', (e) => endDrag(e.clientX));

    photo.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            photo.style.transform = `translateX(0)`;
        }
    });
});

photos.forEach((photo, index) => {
    photo.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        modal.style.display = 'flex';
        modalImg.src = photo.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/g, '');
    });
});

document.getElementById('modal').addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    if (event.target === modal) {
        modal.style.display = 'none';
        modalImg.src = '';
    }
});
