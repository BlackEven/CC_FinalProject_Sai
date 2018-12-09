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
*/

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

// declare sprites
var obstacles;
var role;
var door;

var dx, dy; //increment of location
  function preload() {
    soundFormats('mp3', 'wav');
    //ouchSound = loadSound('ouch1.wav');
    ouchSound = loadSound('assets/ouch1.wav');
    //collideSound = loadSound('collide_with_objects.wav');
    collideSound = loadSound('assets/collide_with_objects.wav');
    //winSound = loadSound('win.wav');
    winSound = loadSound('assets/win.wav');
    //clockSound = loadSound('clock_tick.mp3');
    clockSound = loadSound('assets/clock_tick.mp3');
    //walkSound = loadSound('walk.mp3');
    walkSound = loadSound('assets/walk.mp3');
  }

  function setup() {
    // graphics stuff:
    createCanvas(500, 700);
    
    // create a user controlled sprite
    role = createSprite(width/2,height/2+100);
    //role.addAnimation('normal','role.png');
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
      //var picString = 'obstacle'+i+'.png'
      //in sublime
      var picString = 'assets/obstacle'+i+'.png';
      box.addAnimation('normal',picString);
      obstacles.add(box);
    }
    
    //create a door
    door = createSprite(width-100,10);
    //door.addAnimation('normal','door.png');
    //in sublime
    door.addAnimation('normal','assets/door.png');
    
    myRec.onResult = parseResult; // recognition callback
    myRec.start(); // start engine
    
    //play clocksound
    clockSound.play();
    clockSound.loop();
    
  }

  function draw() {
    background(0);
    
    //role
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
    // fill(0);
    // noStroke();
    // rect(0,0,500,700);
    
    // instructions:
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Instruction: go,back,left,right,stay", 20, 30);
  }

  function parseResult() {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    if(mostrecentword.indexOf("left")!==-1) { 
      dx=-0.6;
      dy=0;     
      walkSound.playMode('restart');
      walkSound.play(0,1.8);
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("right")!==-1) { 
      dx=0.6;
      dy=0;     
      walkSound.playMode('restart');
      walkSound.play(0,1.8);
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("go")!==-1) { 
      dx=0;
      dy=-0.6;    
      walkSound.playMode('restart');
      walkSound.play(0,1.8);
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("back")!==-1) { 
      dx=0;
      dy=0.6;     
      walkSound.playMode('restart');
      walkSound.play(0,1.8);
      walkSound.loop();
    }
    else if(mostrecentword.indexOf("stay")!==-1) { 
      dx=0;
      dy=0; 
      walkSound.setLoop(false);
    }
    console.log(mostrecentword);
  }
  
  function win() {
    dx=0;
    dy=0;
    clockSound.setLoop(false);
    winSound.playMode('restart');
    winSound.play();
    walkSound.setLoop(false);
  }

  function collideWithObstacles() {
    dx=0;
    dy=0;
    ouchSound.playMode('restart');
    ouchSound.play();
    collideSound.playMode('restart');
    collideSound.play();
    walkSound.setLoop(false);
  }

/* 
bug:
1.can't recognize voice if you don't speak for a long time
2.can't load sound in files I uploaded to github with the same code
3.walk sound seems not natural

progress:
sound(done) - ripples - HP - time/distance - black snow - street


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

Part 6. Write a program to display a dark picture with 
effect of crafted randomness and changes of light. This 
will be used to simulate blind. The variation of picture 
will be determined by the movement of “character”.

Pseudocode:
-Apply crafted randomness to the display of dark picture 
to simulate visual snow
-Create a bunch of rectangles with low transparency to 
simulate light

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

Part 8. Write a program to change HP of “character”. 
The HP will decrease by 1 once the “character” collides 
with objects (except car). When the HP equals to 0, the 
scene will change (enter tutorial mode or restart). If 
“character” is collided by a car, the circle will become 
a bunch of small circles and change their color to red.

Pseudocode:
-Create a variable to restore the value of HP.
-HP plus -1 once the “character” collides with boundaries 
or objects (except car/ambulance).
-HP turns to 0 once the “character” collides with 
car/ambulance.
-If the HP equals to 0 and the “character” collide with 
a car/ambulance, the circle will become a bunch of small 
circles and change their color to red. You cannot control 
it anymore.
-If the HP equals to 0 and the “character” doesn’t collide
with a car/ambulance, the game will restart from map of home.


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