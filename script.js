let currentTrackIndex = 0;
let isPlaying = false;
let shuffleMode = false;
let loopMode = true;

const tracks = [
  { title: "Deep Focus", artist: "LoFi Artist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", img: "assets/album1.jpg" },
  { title: "Work Flow", artist: "Ambient Artist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", img: "assets/album2.jpg" },
  { title: "Chill Night", artist: "Chill Artist", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", img: "assets/album3.jpg" }
];

const player = document.getElementById("player");
const playPauseBtn = document.getElementById("playPause");
const currentTrackElem = document.getElementById("currentTrack");
const currentArt = document.getElementById("currentArt");
const playlistContainer = document.getElementById("playlistContainer");

function renderPlaylist() {
  playlistContainer.innerHTML = "";
  tracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerHTML = `<img src="${track.img}" alt="${track.title}"><div><strong>${track.title}</strong><br>${track.artist}</div>`;
    div.onclick = () => playTrack(index);
    playlistContainer.appendChild(div);
  });
}

function playTrack(index) {
  currentTrackIndex = index;
  const track = tracks[index];
  player.src = track.src;
  currentTrackElem.innerText = `${track.title} - ${track.artist}`;
  currentArt.src = track.img;
  player.play();
  isPlaying = true;
  updatePlayButton();
  highlightCurrentCard();
}

function updatePlayButton() {
  playPauseBtn.textContent = isPlaying ? "⏸️" : "▶️";
}

function highlightCurrentCard() {
  document.querySelectorAll(".track").forEach((el, i) => {
    el.classList.toggle("active", i === currentTrackIndex);
  });
}

// プレイヤーコントロール
playPauseBtn.onclick = () => {
  if (isPlaying) player.pause();
  else player.play();
  isPlaying = !isPlaying;
  updatePlayButton();
};

document.getElementById("nextTrack").onclick = () => {
  nextTrack();
};

document.getElementById("prevTrack").onclick = () => {
  prevTrack();
};

document.getElementById("shuffle").onclick = () => {
  shuffleMode = !shuffleMode;
  document.getElementById("shuffle").style.color = shuffleMode ? "#1db954" : "#fff";
};

document.getElementById("loop").onclick = () => {
  loopMode = !loopMode;
  player.loop = loopMode;
  document.getElementById("loop").style.color = loopMode ? "#1db954" : "#fff";
};

player.onended = () => nextTrack();

function nextTrack() {
  if (shuffleMode) currentTrackIndex = Math.floor(Math.random() * tracks.length);
  else currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack(currentTrackIndex);
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentTrackIndex);
}

// サイドバー切替
document.querySelectorAll(".sidebar li").forEach(li => {
  li.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(x => x.classList.remove("active"));
    li.classList.add("active");
    const target = li.dataset.target;
    ["home", "search", "library"].forEach(id => {
      document.getElementById(id).classList.toggle("hidden", id !== target);
    });
  });
});

// 初回ロード
renderPlaylist();
playTrack(0);
