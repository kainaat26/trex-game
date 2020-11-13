var trex,trexanimation,ground,invisibleground,score;

function preload(){
trexanimation = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png")
   ob1 = loadImage("obstacle1.png");
   ob2 = loadImage("obstacle2.png");
   ob3 = loadImage("obstacle3.png");
   ob4 = loadImage("obstacle4.png");
   ob5 = loadImage("obstacle5.png");
   ob6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,150,20,20);
  trex.addAnimation("t1",trexanimation);
  trex.scale = 0.5;
  
  ground=createSprite(300,170,600,5);
  ground.addImage(groundimg);
  
  invisibleground = createSprite(300,180,600,10);
  invisibleground.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  score = 0;
  
    gameover = createSprite(200,120,50,50);  
    gameover.scale=0.8;
    gameover.addImage(gameoverimg);
    gameover.visible = false;
    
    restart = createSprite(200,80,50,50);
    restart.scale = 0.5;
    restart.addImage(restartimg);
    restart.visible = false;

} 
function draw() {
  background("black");
  drawSprites();
  
  if (gameState === PLAY){
  if (keyDown("space") && (trex.y > 144)){
    trex.velocityY = -14;
      
}
  //    console.log(trex.y);
  
  trex.velocityY = trex. velocityY + 0.8;
    
  score = score + Math.round(getFrameRate()/30);
 
  ground.velocityX = -5;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
    
    if(ObstaclesGroup.isTouching(trex)){
  gameState = END;
  }
  }
  
  else if (gameState === END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    
  ObstaclesGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    
    CloudsGroup.setVelocityXEach(0);
    CloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
  }
  
    trex.collide(invisibleground);
  text("Score: "+ score, 510, 30);
}
 
 function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(80,120);
    cloud.scale = 0.5;
     cloud.addImage(cloudimg);
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    var rand = Math.round( random(1,6));
    switch(rand){
        case 1:obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
        case 3:obstacle.addImage(ob3);
        break;
        case 4:obstacle.addImage(ob4);
        break;
        case 5:obstacle.addImage(ob5);
        break;
        case 6:obstacle.addImage(ob6);
        break;
        default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}