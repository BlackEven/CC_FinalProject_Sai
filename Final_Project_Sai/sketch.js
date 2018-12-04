/*
Final Project by Sai Liu

The goal of this project is to help normal people get a 
better understanding of blind by creating an experience 
of walking in highly blurred or black environment only 
with the help of sound. You can control the movement of 
your character with arrow key in the keyboard. The story 
is about a person who suddenly become blind and need to 
go to the hospital nearby and finally go back home safely.
*/

//variable of the location of character
var x,y;

function setup() {
  createCanvas(400, 400);
  
  //set the value of character's location
  x = width/2;
  y = height/2;
}

function draw() {
  background(0);
  
  //display character
  ellipse(x,y,20,20);
}

function keyPressed() {
  //move upside
  if (keyCode === UP_ARROW) {
    y = y - 5;
  }
  //move downside
  if (keyCode === DOWN_ARROW) {
    y = y + 5;
  }
  //move towards left
  if (keyCode === LEFT_ARROW) {
    x = x - 5;
  }
  //move towards right
  if (keyCode === RIGHT_ARROW) {
    x = x + 5;
  }
}

/* 
//Tutorial
Part 1. Develop a program with a circle controlled by 
your voice. This circle will be the user-controlled 
“character”.

Pseudocode:
-Erase background
-Draw an ellipse at a set location
-Change its location based on your voice. If you say 
“Go”, the y value of circle’s location adds a negative 
value. If you say “Keep going”, the y value of circle’s 
location adds a negative value each frame until the 
next voice prompt. If you say “Left”, the x value of 
circle’s location adds a negative value. If you say 
“Right”, the x value of circle’s location adds a 
positive value. If you say “Stay”, the location of 
circle will remains unchanged.

Part 2. Write a program to create a map of one room 
of home using shapes and images. You will learn the 
tutorial about how to control the character at home. 

The map of a room in home contains bed, chair, desk, 
boxes, closet, floor lamp, door, and walls.

Pseudocode:
-Draw the outline of map to create boundaries as 
walls.
-Draw objects in map with basic shapes.
-Go to the next map when the “character” arrives 
the end point (door) of this map.

Part 3. Write a program to test if “character” 
intersects with objects or boundaries in maps. This 
will be used to determine if the “character” collides 
with the object or boundaries.

Subparts
  Part 3.1. Test if the “character” intersects with 
  boundaries.
  
  Pseudocode:
  -Create a boolean variable to update status when 
  they collide.
  -Calculate the distance between the circle and 
  boundaries.
  -Return TRUE if the distance is less than the 
  radius of circle.
  -Change the location of “character” once they 
  collide to make sure it doesn't cross the border.

  Part 3.2. Test if the “character” intersects with 
  other objects.
  
  Pseudocode:
  -Create a boolean variable to update status when 
  “character” collides with other objects (except 
  car/ambulance). Create another boolean variable 
  to update status when “character” collides with 
  car or ambulance.
  -Calculate the distance between the circle and 
  other objects.
  -Return TRUE if the distance is less than the sum 
  of radius of circle and radius of objects.
  -Change the location of character once they collide 
  to make sure they will not overlap.

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

Part 9. Write a program to integrate sound (Knock on the 
wall, Tripped by an object, Hit by a car, Car, Ambulance, 
(White Cane), Traffic light, People, Character, Doctor).

Pseudocode:
-Use sound library to integrate sound

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