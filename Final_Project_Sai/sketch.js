/*
Final Project by Sai Liu

The goal of this project is to help normal people get a 
better understanding of blind by creating an experience 
of walking in highly blurred or black environment only 
with the help of sound. You can control the movement of 
your character with arrow key in the keyboard. The story 
is about a person who suddenly become blind and need to 
go to the hospital nearby and finally go back home safely.

Reference:
https://github.com/IDMNYU/p5.js-speech/blob/master/examples/05continuousrecognition.html
https://www.openprocessing.org/sketch/418019
*/

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

// declare sprites
var obstacles;
var role;
var door;
var dx, dy; //increment of location

var hp = 3;

var stage = 0;
var winBg = 0;
var loseBg = 0;

//image
var life_3;
var life_2;
var life_1;

  function preload() {
    soundFormats('mp3', 'wav');
    // ouchSound = loadSound('ouch1.wav');
    ouchSound = loadSound('assets/ouch1.wav');
    // collideSound = loadSound('collide_with_objects.wav');
    collideSound = loadSound('assets/collide_with_objects.wav');
    // winSound = loadSound('win.wav');
    winSound = loadSound('assets/win.wav');
    // loseSound = loadSound('lose.wav');
    loseSound = loadSound('assets/lose.wav');
    // walkSound = loadSound('walkIndoor.wav');
    walkSound = loadSound('assets/walkIndoor.wav');
    
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
    role = createSprite(width/2,height/2+100);
    // role.addAnimation('normal','role.png');
    //in sublime
    role.addAnimation('normal','assets/role.png');
    //role.setCollider('circle', 0, 0, 15);
    dx = 0;
    dy = 0;
    
    // create obstacle group
    obstacles = new Group();
    for(var i = 0; i < 11; i++) {
      var bx = [250,250,5,495,130,30,30,150,350,width-70,130];
      var by = [5,695,350,350,310,205,415,height-60,130,height/2+100,height-135];
      var box = createSprite(bx[i],by[i]);
      // var picString = 'obstacle'+i+'.png'
      //in sublime
      var picString = 'assets/obstacle'+i+'.png';
      box.addAnimation('normal',picString);
      obstacles.add(box);
    }
    
    //create a door
    door = createSprite(width-100,10);
    // door.addAnimation('normal','door.png');
    //in sublime
    door.addAnimation('normal','assets/door.png');
    
    myRec.onResult = parseResult; // recognition callback
    myRec.start(); // start engine
  
  }

  function draw() {
    background(0);
    
    if (stage == 0) {
    fill(255);
    textSize(18);
    textAlign(CENTER);
    text("You are a GPS App designed for blind people", width/2, height/2-24);
    text("Your goal is to help your owner arrive destination safely", width/2, height/2 + 0);
    text("Hope you do good job!", width/2, height/2 + 24);
    fill(255,255,100);
    textSize(20);
    text("Say 'Link Start' to start your jouney", width/2, height/2 + 48);
    }else {
    //role
    //movement
    role.position.x+=dx;
    role.position.y+=dy;
    
    //test-mouse control
    // role.velocity.x = (mouseX-role.position.x)/10;
    // role.velocity.y = (mouseY-role.position.y)/10;
      
    //detect collide and overlap with sprites
    role.collide(obstacles,collideWithObstacles);
    role.collide(door,win);
    
    //display sprites
    drawSprites();
    
    //black background
    fill(0);
    noStroke();
    rect(0,0,500,700);
    
    // instructions:
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Instruction: go,back,left,right,stay", 20, 30);
        
    //HP
    if(hp == 3) {
    image(life_3, 350,10);
    }else if(hp == 2) {
    image(life_2, 350,10);
    }else if(hp == 1) {
    image(life_1, 350,10);
    }
    }
    
    //show text when you win
    if (winBg == 1) {
    background(0);
    fill(255,255,100);
    textSize(24);
    textAlign(CENTER);
    text("You did a great job!", width/2, height/2);
    }
    
    //show text when you lose
    if (loseBg == 1) {
    background(0);
    fill(255,255,100);
    textSize(20);
    textAlign(CENTER);
    text("Your owner doesn't trust you any more!", width/2, height/2);
    }
  }

  function parseResult() {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    if(mostrecentword.indexOf("start")!==-1) {
      stage = 1;
    }
    if(winBg != 1 && loseBg != 1) {
    if(mostrecentword.indexOf("left")!==-1) { 
      dx=-0.6;
      dy=0;     
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("right")!==-1) { 
      dx=0.6;
      dy=0;     
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("go")!==-1) { 
      dx=0;
      dy=-0.6;    
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("back")!==-1) { 
      dx=0;
      dy=0.6;     
      walkSound.playMode('restart');
      walkSound.play();
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("stay")!==-1) { 
      dx=0;
      dy=0; 
      walkSound.stop();
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
    loseSound.playMode('restart');
    loseSound.play();
  }

  function collideWithObstacles() {
    dx=0;
    dy=0;
    if (hp > 1){
    hp--;
    }else {
    lose();
    }
    ouchSound.playMode('restart');
    ouchSound.play();
    collideSound.playMode('restart');
    collideSound.play();
    walkSound.stop();
  }

/* 
bug:
1.can't recognize voice if you don't speak for a long time
2.can't load sound in files I uploaded to github with the same code

progress:
sound(done) - ripples - HP（done）- your statues? - time/distance - street


Part4. Write a program to create echo effect when you 
speak, and the strength of the echo depends on the 
volume of your voice. 

Pseudocode:
-Create an array for circles to visualize echo. 
-If you offer any voice prompt, such as “Go”, “Keep Going”, 
“Left”, “Right”, and “Stay”, a set of concentric circles 
will display at the location of character. The louder 
your voice, the more the number of circles. 
-The size of circles will become bigger with time
-The transparency of the circle decreases with time.

Part5. Write a program to test if “echo” intersects 
with objects or boundaries in maps. It will display 
a new echo with weaker effect at the point where they 
intersect. When the echo collides with boundaries or 
objects, it reflects. Hence the echo is used to indicate 
if there are obstacles in the direction of echo goes.

Pseudocode:
Subparts
  Part 5.1. Test if any circle in array intersects 
  with boundaries.
  
  Pseudocode:
  -Create a boolean variable to update status when 
  they collide.
  -Calculate the distance between the circle and 
  boundaries.
  -Return TRUE if the distance is less than the radius 
  of circle.
  -Draw a new echo in the location where they collide, 
  but the transparency and duration will be reduced 
  based on the number of collisions between circle 
  and boundaries.

  Part 5.2. Test if the any circle in array intersects 
  with other objects.
  
  Pseudocode:
  -Create a boolean variable to update status when any 
  circle in echo collides with other objects.
  -Calculate the distance between the circle and other 
  objects.
  -Return TRUE if the distance is less than the sum of 
  radius of circle and radius of objects.
  -Draw a new echo in the location where they collide, 
  but the transparency and duration will be reduced 
  based on the number of collisions between circle and 
  objects.

//challenge
Part 7. Write a program to create a map of street with 
different obstacles. You should help the character pass 
these obstacles and arrive the hospital safely.  

The map of a street, which contains boxes, bike, tree, 
garbage can, other people(move), car(move), ambulance(move) 
and traffic light.

Pseudocode:
-Draw the outline of map to create boundaries as walls.
-Draw objects in map with basic shapes.
-Add movement in certain objects.
-Go to the next map when the “character” arrives the 
end point of this map.

//End
Part 10. Write a program to show how much time did you 
use before arriving hospital.

Pseudocode:
-Create a variable to calculate the time period between 
the point when character enter the map of street and the 
point when character arrive the end of the street.
-Display the value of variable when character die or 
arrive the destination.

//Extra
Part 11. Write a program to create a scene of hospital 
using images. In the hospital, you could learn some new 
skills, such as using white cane.

Pseudocode:
-Create an interface like store in a game.
-Create variables to store whether the character learns 
new skill or not.

Part 12. Write a program to create visualization of 
another echo. This echo is used to simulate how the 
“character” use a white cane. When the “character” 
moves, display an echo (a set of outwardly spreading 
concentric circles) at the point where the “character” 
hits the ground using white cane.

Pseudocode:
-Create an array for circles to simulate echo. 
-If key is pressed and keycode is “UP_ARROW”, the x 
value of the location of concentric circles equals to 
the x value of “character”; the y value of the location 
of concentric circles equals to the sum of the y value 
of “character” and a negative number.
-The size of circles will become bigger with time
-The transparency of the circle decreases with time.
-Test if “echo” intersects with objects or boundaries 
in maps.

Part 13. Choose the number of players. The player acts 
as GPS app in one player mode; while in two player mode, 
one player will be the GPS app(speak), and another will 
be the “character” with a white cane(use arrow keys).
*/