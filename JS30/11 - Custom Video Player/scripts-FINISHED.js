/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  //中括號取值 key-value
  video[method]();
  // 上面的取代下面的
  // if (video.paused) {
  //   video.play()
  // }else{
  //   video.paused()
  // }

}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // 算百分比座標
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */ // 觸發更新
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); // 影片改變了才更新畫面
video.addEventListener('pause', updateButton); // 影片改變了才更新畫面
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay); // 影片改變了才更新畫面
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// 拖曳時間軸
let mousedown = false;
progress.addEventListener('click', scrub);
// AA && BB →AAtrue的時候再來看BB  AA || BB →AAfalse的時候再來看BB
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
