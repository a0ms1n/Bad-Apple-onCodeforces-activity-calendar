async function start(){
    const yearSelect = document.querySelector('select[name="yearSelect"]');
    const newOption = document.createElement('option');
    newOption.value = '2024';
    newOption.text = '????';
    yearSelect.appendChild(newOption);
    yearSelect.addEventListener('change', async (event) => {
      if (event.target.value === '2024') {
        await initBackground();
        Music.play();
        playAnimation();
      }
    });
  }
  
  async function playAnimation(){
    console.log("START");
    function loop() {
      const current_frame = Math.round(Music.currentTime * frame_rate);
      setTimeout(loop, 0);
      drawPixels(frames.frames[current_frame]);
    }
    loop();

  }

  start();