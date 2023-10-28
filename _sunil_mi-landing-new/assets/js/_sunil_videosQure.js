// Get all video player elements
    const videoPlayers = document.querySelectorAll('.player');

    videoPlayers.forEach(initVideoPlayer);

    function initVideoPlayer(player) {
      const myVid = player.querySelector('video.player__video');
      const controlPlay = player.querySelector('.player__button');
      const controlVol = player.querySelector('.player__slider[name="volume"]');
      const controlRate = player.querySelector('.player__slider[name="playbackRate"]');
      const controlSkip = player.querySelectorAll('.player__button[data-skip]');
      const controlFullScreen = player.querySelector('.player__fullscreen');
      const controlProgress = player.querySelector('.progress');
      const progressBar = controlProgress.querySelector('.progress__filled');

      let drag;
      let grap;
      let progression;

      myVid.addEventListener('click', toggleVideo);
      controlPlay.addEventListener('click', toggleVideo);
      controlVol.addEventListener('change', updateVol);
      controlRate.addEventListener('change', updateRate);
      controlFullScreen.addEventListener('click', goFullScreen);
      controlSkip.forEach(control => control.addEventListener('click', forward));
      controlProgress.addEventListener('mouseover', () => { drag = true });
      controlProgress.addEventListener('mouseout', () => { drag = false; grap = false });
      controlProgress.addEventListener('mousedown', () => { grap = drag });
      controlProgress.addEventListener('mouseup', () => { grap = false });
      controlProgress.addEventListener('click', updateCurrentPos);
      controlProgress.addEventListener('mousemove', e => { if (drag && grap) { updateCurrentPos(e) } });

      function toggleVideo() {
        if (myVid.paused) {
          myVid.play();
          controlPlay.innerHTML = "❚ ❚";
          updateProgress();
          progression = window.setInterval(updateProgress, 200);
          myVid.closest(".player").classList.add("video_playing");
        } else {
          myVid.pause();
          // controlPlay.innerHTML = "ttt";
          controlPlay.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
          clearInterval(progression);
          myVid.closest(".player").classList.remove("video_playing");
        }
      }

      function updateVol() {
        const volume = controlVol.value;
        myVid.volume = volume;
      }

      function updateRate() {
        const rate = controlRate.value;
        myVid.playbackRate = rate;
      }

      function goFullScreen() {
        if (myVid.webkitSupportsFullscreen) {
          myVid.webkitEnterFullScreen();
        }
      }

      function forward() {
        const value = Number(this.dataset.skip);
        myVid.currentTime = myVid.currentTime + value;
      }

      function updateProgress() {
        const progress = myVid.currentTime / myVid.duration;
        progressBar.style.flexBasis = `${Math.floor(progress * 1000) / 10}%`;
      }

      function updateCurrentPos(e) {
        const newProgress = (e.clientX - controlProgress.offsetLeft) / controlProgress.clientWidth;
        progressBar.style.flexBasis = `${Math.floor(newProgress * 1000) / 10}%`;
        myVid.currentTime = newProgress * myVid.duration;
      }
    }