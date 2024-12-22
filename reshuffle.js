let creditImg = document.getElementsByClassName("credit-img");
let creditTitle = document.getElementsByClassName("credit-title");
let creditInfo = document.getElementsByClassName("credit-info");

let search = document.getElementsByClassName("search-tool");

let searchIcon = document.getElementById('clickBtn');

let audioPlay = document.getElementsByClassName("audio-play");

let keyword = "";

searchIcon.addEventListener("click", () => {
  keyword = search[0].value;
  console.log(keyword);
  openSlide();
  getTracks();
  search[0].value = "";
});

function openSlide() {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("closeSlider");
}

async function getTracks() {
  let data = await fetch(
    `https://v1.nocodeapi.com/nish/spotify/isgyHDwlrrGKgrUt/search?q=${keyword}&type=track`
  );
  let convertedData = await data.json();

  let newData = await fetch(
    `https://v1.nocodeapi.com/nish/spotify/isgyHDwlrrGKgrUt/search?q=${keyword}&type=album`
  );
  let newConvertedData = await newData.json();

  const music = convertedData.tracks.items[0].preview_url;

  let currenStart = document.getElementById("current-time");
  let totalTime = document.getElementById("total-time");

  let seek = document.getElementsByClassName("seek")[0];
  let bar = document.getElementById("bar");
  let dot = document.getElementById("dot");

  let play = document.getElementById("play-pause");
  const song = new Audio(`${music}.mp3`);

  play.addEventListener("click", () => {
    if (song.paused || song.currenTime <= 0) {
      song.play();
      play.innerText = "pause";
    } else {
      song.pause();
      play.innerText = "play_arrow";
    }
  });

  song.addEventListener("timeupdate", () => {
    let music_curr = song.currentTime;
    let music_time = song.duration;

    let min1 = Math.floor(music_time / 60);
    let sec1 = Math.floor(music_time % 60);

    totalTime.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if (sec2 < 10) {
      sec2 = `0${sec2}`;
    }

    currenStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_time) * 90);
    seek.value = progressBar;
    seekbar = seek.value;

    bar.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
  });

  // img change

  let image = convertedData.tracks.items[0].album.images[0].url;
  creditImg[0].src = image;

  // title change

  let title = convertedData.tracks.items[0].name;
  if (title.length > 15) {
    title = title.slice(0, 15);
    title = title.trim();
    title = `${title}...`;
  }
  creditTitle[0].innerText = title;

  // Info change

  if (convertedData.tracks.items[0].album.artists.length == 1) {
    let info = convertedData.tracks.items[0].album.artists[0].name;
    creditInfo[0].innerText = `${info}`;
  } else if (convertedData.tracks.items[0].album.artists.length == 2) {
    let info = convertedData.tracks.items[0].album.artists[0].name;
    let info2 = convertedData.tracks.items[0].album.artists[1].name;
    creditInfo[0].innerText = `${info}, ${info2}`;
  } else if (convertedData.tracks.items[0].album.artists.length == 3) {
    let info = convertedData.tracks.items[0].album.artists[0].name;
    let info2 = convertedData.tracks.items[0].album.artists[1].name;
    let info3 = convertedData.tracks.items[0].album.artists[2].name;
    creditInfo[0].innerText = `${info}, ${info2} & ${info3}`;
  }

  let imgSeven = document.getElementById("img-seven");
  let imgEight = document.getElementById("img-eight");
  let imgNine = document.getElementById("img-nine");

  let titleSeven = document.getElementById("title-seven");
  let titleEight = document.getElementById("title-eight");
  let titleNine = document.getElementById("title-nine");

  let infoSeven = document.getElementById("info-seven");
  let infoEight = document.getElementById("info-eight");
  let infoNine = document.getElementById("info-nine");

  imgSeven.src = convertedData.tracks.items[1].album.images[0].url;
  imgEight.src = convertedData.tracks.items[2].album.images[0].url;
  imgNine.src = convertedData.tracks.items[3].album.images[0].url;

  titleSeven.innerText = convertedData.tracks.items[1].name;
  titleEight.innerText = convertedData.tracks.items[2].name;
  titleNine.innerText = convertedData.tracks.items[3].name;

  infoSeven.innerText = convertedData.tracks.items[1].album.artists[0].name;
  infoEight.innerText = convertedData.tracks.items[2].album.artists[0].name;
  infoNine.innerText = convertedData.tracks.items[3].album.artists[0].name;

  let arr = [];
  for (let i = 0; i < 6; i++) {
    let pageImg = document.getElementsByClassName("page-img")[i];
    arr.push(pageImg);
    arr[i].src = convertedData.tracks.items[i+1].album.images[0].url;
  }

  let arr2 = [];
  for (let i = 0; i < 6; i++) {
    let pageTitle = document.getElementsByClassName("page-title")[i];
    arr2.push(pageTitle);
  let heading = convertedData.tracks.items[i+1].name;
  if (heading.length > 13) {
    heading = heading.slice(0, 13);
    heading = heading.trim();
    heading = `${heading}...`;
  }
    arr2[i].innerText = heading;
  }

  let arr3 = [];
  for (let i = 0; i < 6; i++) {
    let pageInfo = document.getElementsByClassName("page-info")[i];
    arr3.push(pageInfo);
    arr3[i].innerText = convertedData.tracks.items[i+1].album.artists[0].name;
  }

  let arr4 = [];
  for (let i = 0; i < 6; i++) {
    let albumImg = document.getElementsByClassName("album-img")[i];
    arr4.push(albumImg);
    arr4[i].src = newConvertedData.albums.items[i+1].images[0].url;
  }

  let arr5 = [];
  for (let i = 0; i < 6; i++) {
    let albumTitle = document.getElementsByClassName("album-title")[i];
    arr5.push(albumTitle);
    let heading2 = newConvertedData.albums.items[i+1].name;
    if (heading2.length > 13) {
      heading2 = heading2.slice(0, 13);
      heading2 = heading2.trim();
      heading2 = `${heading2}...`;
    }
    arr5[i].innerText = heading2;
  }

  let arr6 = [];
  for (let i = 0; i < 6; i++) {
    let albumInfo = document.getElementsByClassName("album-info")[i];
    arr6.push(albumInfo);
    arr6[i].innerText = newConvertedData.albums.items[i+1].artists[0].name;
  }

}

//===============================================>

// Sliders

let scrollLeftOne = document.getElementById("scrollLeftOne");
let scrollRightOne = document.getElementById("scrollRightOne");
let sliderOne = document.getElementById("scrollOne");

scrollLeftOne.addEventListener("click", () => {
  sliderOne.scrollLeft -= 300;
});

scrollRightOne.addEventListener("click", () => {
  sliderOne.scrollLeft += 300;
});

let scrollLeftTwo = document.getElementById("scrollLeftTwo");
let scrollRightTwo = document.getElementById("scrollRightTwo");
let sliderTwo = document.getElementById("scrollTwo");

scrollLeftTwo.addEventListener("click", () => {
  sliderTwo.scrollLeft -= 300;
});

scrollRightTwo.addEventListener("click", () => {
  sliderTwo.scrollLeft += 300;

  // let cards = document.getElementsByClassName('page-play-icon');

});

//========================================>
