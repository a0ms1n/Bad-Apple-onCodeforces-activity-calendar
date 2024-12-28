function setPixel(x,y,color="#216E39"){
  pixelGrid.children[y].children[x].setAttribute("fill",color);
}

function drawPixels(colorMap){
  for(let i = 0;i<colorMap.length && i<height ;i++){
    for(let j=0;j<colorMap[i].length && j<width;j++){
      setPixel(i,j,ColorList[colorMap[i][j]]);
    }
  }
}






