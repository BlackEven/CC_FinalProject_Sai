/*
Final Project by Sai Liu
 
 The goal of this project is to help normal people get a 
 better understanding of blind by creating an experience 
 of walking in a black environment only with the help of 
 sound. The game is about a blind who need to go to the 
 hospital. You will act as the GPS App which could help 
 blind find the destination. You could control the 
 movement of your character by saying “Go”, “Back”, 
 “Left” , “Right”and "Stay".
   
 */

//p5.SpeechRec
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

//p5.AudioIn
var mic;

// declare sprites
var obstacles;
var role;
var exitDoor;
var t0 = 100; //duration of exit sign
var car;

//properties of role
var dx, dy; //increment of location
var hp = 3; //life
var d; //distance between your role and exit

//scenes management
var stage = 0;
var gameMode = 0;
var winBg = 0;
var loseBg = 0;
var dieBg = 0;

//image
var life_3;
var life_2;
var life_1;

//Ripples
var ripples = []
var waveSpeed = 1;
const LIFE_TIME = 150;

function preload() {
  soundFormats('mp3','wav');
  //ouchSound = loadSound('ouch.mp3');
  ouchSound = loadSound('assets/ouch.mp3');
  //collideSound = loadSound('collide_with_objects.wav');
  collideSound = loadSound('assets/collide_with_objects.wav');
  //winSound = loadSound('win.wav');
  winSound = loadSound('assets/win.wav');
  //loseSound = loadSound('lose.wav');
  loseSound = loadSound('assets/lose.wav');
  //walkSound = loadSound('walkIndoor.wav');
  walkSound = loadSound('assets/walkIndoor.wav');
  //streetSound = loadSound('street.wav');
  streetSound = loadSound('assets/street.wav');
  //carSound = loadSound('car.wav');
  carSound = loadSound('assets/car.wav');
  //carCrashSound = loadSound('carCrash.mp3');
  carCrashSound = loadSound('assets/carCrash.mp3');
  
  // life_3 = loadImage('3_life.png');
  // life_2 = loadImage('2_life.png');
  // life_1 = loadImage('1_life.png');
  life_3 = loadImage('assets/3_life.png');
  life_2 = loadImage('assets/2_life.png');
  life_1 = loadImage('assets/1_life.png');
}

function setup() {
  // graphics stuff:
  createCanvas(500, 700);

  // create a user controlled sprite
  role = createSprite(50,650);
  // role.addAnimation('normal', 'role.png');
  //in sublime
  role.addAnimation('normal','assets/role.png');
  //role.setCollider('circle', 0, 0, 15);
  dx = 0;
  dy = 0;
  
    // create obstacle group
  obstacles = new Group();
  for (var i = 0; i < 10; i++) {
    var bx = [250, 250, 5, 495, 330, 110, 330, 150, 390, 130];
    var by = [5, 695, 350, 350, 650, 540, 360, 300, 60, 100];
    var bw = [500, 500, 10, 10, 60, 200, 200, 60, 200, 60];
    var bh = [10, 10, 700, 700, 60, 100, 100, 60, 100, 60];
    var box = createSprite(bx[i], by[i], bw[i], bh[i]);
    // var picString = 'street_obstacle'+i+'.png'
      //in sublime
      var picString = 'assets/street_obstacle'+i+'.png';
      box.addAnimation('normal', picString);
    obstacles.add(box);
  }

  //create a door
  exitDoor = createSprite(200, 10, 80, 20);
  // exitDoor.addAnimation('normal', 'exit.png');
  //in sublime
  exitDoor.addAnimation('normal','assets/exit.png');
  
  // create a car
  car = createSprite(-25,200,50,40);
  // car.addAnimation('normal', 'car.png');
  //in sublime
  car.addAnimation('normal', 'assets/car.png');

  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine

  //get audio from microphone.
  mic = new p5.AudioIn();
  mic.start();
  
  streetSound.setVolume(0.2);
  streetSound.playMode('restart');
  streetSound.play();
  streetSound.loop();

}

function draw() {
  background(0);
  
  //scene 0: Introduction before game start
  if (stage == 0) {
    intro();
  } else if (stage == 1){
    
    //role
    //move
    roleMove();
    //detect collision with sprites
    role.collide(obstacles, collideWithObstacles);
    role.collide(exitDoor, win);
    role.collide(car, die);
    
    //car
    //move
    car.setSpeed(2.5);
    //loop
    if (car.position.x > width + 25) {
      car.position.x = -400;
      var vol_car = map(role.position.y,200,700,0.7,0);
      if (winBg != 1 && loseBg != 1 && dieBg != 1) {
      carSound.setVolume(vol_car);
      carSound.playMode('restart');
      carSound.play();
      }
    }
    
    //display sprites
    drawSprites();

    //black background
    fill(0);
    noStroke();
    rect(0, 0, 500, 700);

    //Ripples
    drawRipple();

    //display the door when the role is nearby the soor
    showExit();

    // instruction and UI elements
    showUI();
  }

  //show text when you win
  if (winBg == 1) {
    background(0);
    fill(255, 255, 100);
    textSize(24);
    textAlign(CENTER);
    textStyle(BOLD);
    text("You did a great job!", width/2, height/2);
  }

  //show text when you lose
  if (loseBg == 1) {
    background(0);
    fill(255, 255, 100);
    textSize(20);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Your owner doesn't trust you any more!", width/2, height/2);
  }
  
  //show text when you die
  if (dieBg == 1) {
    background(255,0,0);
    fill(0);
    textSize(36);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Your owner died", width/2, height/2);
  }
}

function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var mostrecentword = myRec.resultString.split(' ').pop();
  if (mostrecentword.indexOf("easy")!==-1) {
    stage = 1;
    gameMode = 0;
  }
  if (mostrecentword.indexOf("hard")!==-1) {
    stage = 1;
    gameMode = 1;
  }
  if (stage == 1 && winBg != 1 && loseBg != 1 && dieBg != 1) {
    if (mostrecentword.indexOf("left")!==-1) { 
      dx=-0.6;
      dy=0;       
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();
      //add a new ripple when you say instruction
      ripples.push(new Ripple(role.position.x, role.position.y, waveSpeed));
      t0=0;
    } else if (mostrecentword.indexOf("right")!==-1) { 
      dx=0.6;
      dy=0;       
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();

      ripples.push(new Ripple(role.position.x, role.position.y, waveSpeed));
      t0=0;
    } else if (mostrecentword.indexOf("go")!==-1) { 
      dx=0;
      dy=-0.6;        
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();

      ripples.push(new Ripple(role.position.x, role.position.y, waveSpeed));
      t0=0;
    } else if (mostrecentword.indexOf("back")!==-1) { 
      dx=0;
      dy=0.6;         
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();

      ripples.push(new Ripple(role.position.x, role.position.y, waveSpeed));
      t0=0;
    } else if (mostrecentword.indexOf("stay")!==-1) { 
      dx=0;
      dy=0; 
      walkSound.stop();

      ripples.push(new Ripple(role.position.x, role.position.y, waveSpeed));
      t0=0;
    }
  }
  console.log(mostrecentword);
}

function win() {
  dx=0;
  dy=0;
  winBg = 1;
  walkSound.stop();
  ouchSound.stop();
  collideSound.stop();
  streetSound.stop();
  carSound.stop();
  winSound.setVolume(0.6);
  winSound.playMode('restart');
  winSound.play();
}

function lose() {
  dx=0;
  dy=0;
  loseBg = 1;
  walkSound.stop();
  ouchSound.stop();
  collideSound.stop();
  streetSound.stop();
  carSound.stop();
  loseSound.playMode('restart');
  loseSound.play();
}

function die() {
  dx=0;
  dy=0;
  car.remove();
  dieBg = 1;
  walkSound.stop();
  ouchSound.stop();
  collideSound.stop();
  streetSound.stop();
  carSound.stop();
  carCrashSound.playMode('restart');
  carCrashSound.play();
}

function collideWithObstacles() {
  //stop movement when you collide
  dx=0;
  dy=0;
  walkSound.stop();

  if (hp > 1) {
    //reduce hp every time you collide with obstacles
    if (gameMode == 1) {
    hp--;
    }
  } else {
    //call lose() function when hp<1
    lose();
  }
  //play ouch sound and collide sound every time you collide with obstacles
  ouchSound.playMode('restart');
  ouchSound.play();
  collideSound.playMode('restart');
  collideSound.play();
}

function intro() {
  fill(255);
  textSize(18);
  textAlign(CENTER);
  textStyle(NORMAL);
  text("You are a GPS App designed for blind people", width/2, height/2-24);
  text("Your goal is to help your owner arrive destination safely", width/2, height/2 + 0);
  text("Hope you do good job!", width/2, height/2 + 24);
  fill(255, 255, 100);
  textSize(20);
  textStyle(BOLD);
  text("Say 'Easy' or 'Hard' to start your jouney", width/2, height/2 + 54);
}

function roleMove() {
  role.position.x+=dx;
  role.position.y+=dy;
  //calculate the distance between you role and the exit
  d = int(dist(role.position.x, role.position.y, 200, 10));

  //test only-mouse control
  // role.velocity.x = (mouseX-role.position.x)/10;
  // role.velocity.y = (mouseY-role.position.y)/10;
}

function drawRipple() {
  //change wave speed according to the level of your voice
  var vol = mic.getLevel();
  waveSpeed = constrain(map(vol, 0, 0.13, 1, 2), 1, 2);

  //fade
  for (let i = ripples.length-1; i> 0; i--) {
    if (ripples[i].t > LIFE_TIME) {
      //Remove 1 element from index i
      ripples.splice(i, 1);
      continue;
    }

    ripples[i].move();
    ripples[i].display();

    //reflect when ripples encounter obstacles and car
    for (let c of ripples[i].reflect(car)){
     ripples.push(c);
     }
    for (var j = 0; j < obstacles.length; j++) {
      for (let r of ripples[i].reflect(obstacles[j])){
        ripples.push(r);
      }
      }

      //cover
      for (var k = 0; k < 10; k++) {
        var cx = [250, 250, 5, 495, 330, 110, 330, 150, 390, 130];
        var cy = [5, 695, 350, 350, 650, 540, 360, 300, 60, 100];
        var cw = [500, 500, 10, 10, 60, 200, 200, 60, 200, 60];
        var ch = [10, 10, 700, 700, 60, 100, 100, 60, 100, 60];
        fill(0);
        noStroke();
        rectMode(CENTER);
        rect(cx[k], cy[k], cw[k], ch[k]);
      }
    rect(car.position.x,car.position.y,50,40);
  }
}

function showExit() {
  t0++;
  t1 = constrain(t0, 0, 100);
  //display the door when the role is nearby the soor
    if (role.position.x > exitDoor.position.x -150 && role.position.x < exitDoor.position.x + 100) {
      if (d<200) {
        //the transparency is reduced as time goes by
        fill(100, 255, 100, 255*sq((100-t1)/100));
        noStroke();
        rectMode(CENTER);
        rect(200, 10, 80, 20);
        fill(255, 200*sq((100-t1)/100));
        textSize(16);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Exit", 200, 15);
      }
   }
}

function showUI() {
  fill(255);
  textSize(18);
  textAlign(LEFT);
  textStyle(BOLD);
  noStroke();
  text("Instruction: Say 'Go','Back','Left','Right','Stay'", 20, 650);
  fill(100, 255, 100);
  text("Distance: "+ d, 300, 60);

  //HP
  if (gameMode == 1) {
  if (hp == 3) {
    image(life_3, 20, 40);
  } else if (hp == 2) {
    image(life_2, 20, 40);
  } else if (hp == 1) {
    image(life_1, 20, 40);
  }
  }
}
/* 
 bug:
 1.can't recognize voice if you don't speak for a long time
 2.can't load sound in files I uploaded to github with the same code
 3.the indicate of distance is not accurate
 */