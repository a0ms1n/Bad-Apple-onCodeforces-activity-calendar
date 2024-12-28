const height = 35;
const ColorList = ["#EBEDF0","#91DA9E","#40C463","#30A14E","#216E39"];
const audio_url = chrome.runtime.getURL('assets/animation/audio.mp3');
const Music = new Audio(audio_url);
var frame_number;
var frames;
var frame_rate = 0;
let width = 0
let screenGrid;
let pixelGrid;
let pixel;

async function initBackground(){
  screenGrid = document.getElementById('userActivityGraph').children[0]
  pixelGrid = screenGrid.children[0]
  pixel = pixelGrid.children[0].children[0];
  width = 0;
  for(let i=0;i<pixelGrid.childElementCount;i++){
    if(pixelGrid.children[i].tagName != 'g')continue;
    width++;
    pixelGrid.children[i].replaceChildren();
  }
  console.log(width);
  const svgTips = document.querySelectorAll('.svg-tip.svg-tip-one-line');
  console.log(svgTips);
  svgTips.forEach((element) => {
    element.remove();
  });
  for(let i=0;i<pixelGrid.childElementCount;i++){
    if(pixelGrid.children[i].tagName != 'g')continue;
    for(let j=0;j<height;j++){
        const new_pixel = pixel.cloneNode(true);
        new_pixel.setAttribute("y",`${j*13}`)
        new_pixel.setAttribute("fill","#216E39")
        pixelGrid.children[i].appendChild(new_pixel);
    }
    
  }
  for(let i=0;i<=height;i++){
    screenGrid.setAttribute("viewBox",`0 0 721 ${22+13*i}`);
    await new Promise(res=>setTimeout(res,1100/height));
  }
}

async function loadJSON(){
  frames = (await fetch(chrome.runtime.getURL("assets/animation/frame.json"))
    .then((res) => {
    if (!res.ok) {
        throw new Error
            (`HTTP error! Status: ${res.status}`);
    }
    return res.json();
    }))
  Music.volume = 0.5;
  frame_number = frames.number;
  frame_rate = frame_number/Music.duration;
  console.log(frame_rate)
}

loadJSON()