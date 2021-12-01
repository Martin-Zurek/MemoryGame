window.timeBlocksShows = 4.5; //4.5sec
window.timeUntilLose = 12; //12sec
window.correctBlocksNum = 14;
window.maxIncorrectBlocksNum = 3;
window.allBlocksNum = 36;

$(document.body).on("click", ".block", onBlockClick);
$(document.body).on("click", ".restart-button, .grid.won, .grid.lost", restartGame);

function generateRandomNumberBetween(min=1,max=window.allBlocksNum,length = window.correctBlocksNum){
  var arr = [];
  while(arr.length < length){
      var r = Math.floor(Math.random() * (max+1-min)) + min;
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function onBlockClick(e){
  if(!activateClicking){
    return;
  }

  let clickedBlock = e.target;
  
  let blockNum = clickedBlock.classList.value.match(/(?:block-)(\d+)/)[1];
  blockNum = Number(blockNum);
  let correctBlocks = window.gridCorrectBlocks;

  

  let correct = correctBlocks.indexOf(blockNum) !== -1;
  clickedBlock.classList.add("clicked");
  console.log(blockNum, correct, correctBlocks);
  if(correct){
    clickedBlock.classList.remove("incorrect");
    clickedBlock.classList.add("correct");
  }
  else{
    clickedBlock.classList.add("incorrect");
    clickedBlock.classList.remove("correct");
  }
  
  checkWinOrLost();
  
}

function showCorrectBlocks(){
  
  $(".block").each((i,ele)=>{
    let blockNum = ele.classList.value.match(/(?:block-)(\d+)/)[1];
    blockNum = Number(blockNum);
    let correctBlocks = window.gridCorrectBlocks;
    let correct = correctBlocks.indexOf(blockNum) !== -1;
    if(correct){
      ele.classList.add("show");
    }
  });
}
function hideAllBlocks(){
  $(".block").each((i,ele)=>{
    ele.classList.remove("show");
    ele.classList.remove("correct");
    ele.classList.remove("incorrect");
    ele.classList.remove("clicked");
  });
}

function restartGame(){
  $(".grid").removeClass("won");
  $(".grid").removeClass("lost");
  hideAllBlocks();
  window.gridCorrectBlocks = generateRandomNumberBetween();
  window.activateClicking = false;
  showCorrectBlocks();
  setTimeout(()=>{
    hideAllBlocks();
    window.activateClicking = true;
    console.log("Restarted")
  }, timeBlocksShows*1000);
}

function checkWinOrLost(){
  if(isGameWon()){
    $(".grid").addClass("won");
    window.activateClicking = false;
    return "won";
  }
  if(isGameLost()){
    $(".grid").addClass("lost");
    showCorrectBlocks();
    window.activateClicking = false;
    return "lost";
  }
}

function isGameWon(){
  return $(".correct").length >= window.correctBlocksNum;
}

function isGameLost(){
  return $(".incorrect").length >= window.maxIncorrectBlocksNum;
}

restartGame();
