const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

let type = 2
function switchType(num) {
  type = num
}

// webcam功能
function getVideo() {
  // navigator 存取使用者的瀏覽器資訊 詳細:https://www.fooish.com/javascript/navigator.html
  // .mediaDevices 访问连接媒体输入的设备 .getUserMedia 存取 ↓ 權限
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      // 可以看看這個log
      console.log(localMediaStream);

      //  DEPRECIATION : 
      //       The following has been depreceated by major browsers as of Chrome and Firefox.
      //       video.src = window.URL.createObjectURL(localMediaStream);
      //       Please refer to these:
      //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

      // 這還只是video的畫面
      video.srcObject = localMediaStream;
      video.play();
    })
    // 存取拒絕的話
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  // 取寬高
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // 看面積 Area跟Pixels會差4倍 因為Pixels拆成 rgba 4個單位 所以4倍
  let pixels = ctx.getImageData(0, 0, width, height)
  console.log(`Area:${width * height}, Pixels: ${pixels.data.length}`);

  // 要先畫才有第一個點顏色
  // ctx.drawImage(video, 0, 0, width, height);
  // 第一個點顏色
  console.log(pixels.data[0],pixels.data[1],pixels.data[2],pixels.data[3]);
  // video 會一直更新
  return setInterval(() => {
    //      畫的對象↓    ↓從[0,0]畫 ↓畫[寬,高]
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them

    // put them back
    switch (type) {
      case 1:
        pixels = redEffect(pixels);
        break
      case 2:
        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
        break
      case 3:
        pixels = greenEffect(pixels);
        break
    }
    if (type === 1) {
    }

    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(pixels, 0, 0);
  // 更新頻率16 
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  // canvas截圖
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  // 用 .setAttribute('download', 'handsome') 串成 base 64 就可以下載
  link.setAttribute('download', 'handsome');
  // 拍下來的放這邊
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  // 放在最前面 strip.firstChild    放在後面 now
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  // pixels.data 要先過data 在length          ↓ 4倍的道理 rgba
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED + 很多會很紅
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN 降低
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue 砍半
  }
  return pixels;
}

function rgbSplit(pixels) {
  // rgb位置位移
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED   把紅色的值往前設定到150的位置
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  // 會一直更新
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
  // 可以用 OpenCV 運算
}
// 起始從這邊開始
getVideo();
// 監聽video後畫canvas
video.addEventListener('canplay', paintToCanvas);
