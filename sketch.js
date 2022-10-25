//    Eu meio que reaproveitei um projeto que eu ja fiz pq eu não tava comseguindo achar um fundo
//    ai eu tambem não tava comseguindo fazer o fundo voltar e parecer que era infinito (nao e pq eu  
//    não sei fazer, e que eu não tava achando UM fundo que ficase legal) i eu peguei esse fundo nada
//    aver, so que finje que eles sao foguetes de papel e umas crianças tao apostando corrida.
//    Pelo menos esse ficou bom kkkk

var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadImage("mainPlayer1.png");

  
  oppPink1Img = loadImage("opponent1.png");

  oppYellow1Img = loadImage("opponent4.png");

  
  oppRed1Img = loadImage("opponent7.png");

  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,550);
// Moving background
path=createSprite(100,258);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addImage(mainRacerImg1);
mainCyclist.scale= 0.20;

  
//set collider for mainCyclist

mainCyclist.setCollider("rectangle",0,0,40,40);


  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.25;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addImage(oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addImage(OppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addImage(oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addImage(mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
 
     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 490)));
        player1.scale =0.35;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addImage(oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 490)));
        player2.scale =0.35;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addImage(oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 490)));
        player3.scale =0.35;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addImage(oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addImage(mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
 }



