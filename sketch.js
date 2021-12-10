var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var imgcar1,imgcar2,imgcar3,imgcar4;

var imgground;

var track;

var form, player, game;

var cars, car1, car2, car3, car4;

var finishline;

var carEnd;

function preload(){
  imgcar1 = loadImage("../images/car1.png");
  imgcar2 = loadImage("../images/car2.png");
  imgcar3 = loadImage("../images/car3.png");
  imgcar4 = loadImage("../images/car4.png");

  imgground = loadImage("../images/ground.png");

  track = loadImage("../images/track.png");

  finishline = loadImage("../images/finishline.png");


  
}


function setup(){
  canvas = createCanvas(displayWidth - 350, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end()
  }

}
