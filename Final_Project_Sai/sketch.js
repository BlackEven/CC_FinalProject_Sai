/*
Final Project by Sai Liu

The goal of this project is to help normal people get a 
better understanding of blind by creating an experience 
of walking in highly blurred or black environment only 
with the help of sound. 
*/

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

/* 
Part 1. Develop a program with a circle controlled by arrow key. 
This circle will be the user-controlled “character”.

Pseudocode:
-Erase background
-Draw an ellipse at a set location
-Change its location based on arrow key. If key is pressed and 
the keyCode is “DOWN_ARROW”, the y value of circle’s location 
plus 1. If key is pressed and the keyCode is “UP_ARROW”, the y 
value of circle’s location plus -1. If key is pressed and the 
keyCode is “RIGHT_ARROW”, the x value of circle’s location 
plus 1. If key is pressed and the keyCode is “LEFT_ARROW”, the 
x value of circle’s location plus -1. 

*/

/* 
Part 2. Write a program to create 3 maps (one room of home, 
street, one room of hospital) using shapes and images. The 
scenes will change with conditional statement.

Subparts:
  Part 2.1. The map of a room in home, which contains bed, chair, 
  desk, boxes, closet, floor lamp, door, and walls.
  Part 2.2. The map of a street, which contains boxes, bike, tree, 
  garbage can, other people(move), and traffic light.
  Part 2.3. The map of a room in hospital, which contains desk, 
  chair, and doctor.
  
Pseudocode:
-Draw the outline of map to create boundaries and walls.
-Draw objects in map with basic shapes.
-Go to the next map when the “character” arrive the end point of 
this map.

*/

/* 
Part 3. Write a program to test if “character” intersects with 
objects or boundaries in maps. This will be used to determine 
if the “character” collides with the object or boundaries.

Subparts
  Part 3.1. Test if the “character” intersects with boundaries.
  Pseudocode:
  -Create a boolean variable to update status when they collide.
  -Calculate the distance between the circle and boundaries.
  -Return TRUE if the distance is less than the radius of circle.
  -Change the location of “character” once they collide to make 
  sure it doesn't cross the border.

  Part 3.2. Test if the “character” intersects with other objects.
  Pseudocode:
  -Create a boolean variable to update status when “character” 
  collides with other objects (except car/ambulance). Create another 
  boolean variable to update status when “character” collides with 
  car or ambulance.
  -Calculate the distance between the circle and other objects.
  -Return TRUE if the distance is less than the sum of radius of 
  circle and radius of objects.
  -Change the location of character once they collide to make sure 
  they will not overlap.

*/

/*
Part 4. Write a program to change HP of “character”. The HP will 
decrease by 1 once the “character” collides with objects (except 
car). When the HP equals to 0, the scene will change (enter tutorial 
mode or restart). If “character” is collided by a car, the circle 
will become a bunch of small circles and change their color to red.

Pseudocode:
-Create a variable to restore the value of HP.
-HP plus -1 once the “character” collides with boundaries or objects 
(except car/ambulance).
-HP turns to 0 once the “character” collides with car/ambulance.
-If the HP equals to 0 and the “character” collide with a car/ambulance, 
the circle will become a bunch of small circles and change their color 
to red. You cannot control it anymore.

Before you arrive hospital:
-If the HP equals to 0 and the “character” doesn’t collide with a 
car/ambulance, you will enter the map of hospital directly.

After you arrive hospital:
-If the HP equals to 0 and the “character” doesn’t collide with a 
car/ambulance, you will go back to the map of hospital and restart.

*/

/*
Part 5. Write a program to integrate sound (Knock on the wall, 
Tripped by an object, Hit by a car, Car, Ambulance, White Cane, 
Traffic light, People, Character, Doctor).

Pseudocode:
-Use sound library to integrate sound

*/

/*
Part 6. Write a program to create visualization of echo. The echo 
is used to simulate how the “character” use a white cane. When the 
“character” moves, display an echo (a set of outwardly spreading 
concentric circles) in the direction of the movement of “character”.

Pseudocode:
-Create an array for circles in echo. 
-If key is pressed and keycode is “UP_ARROW”, the x value of the 
location of first circle in an echo equals to the x value of 
“character”; the y value of the location of first circle equals 
to the sum of the y value of “character” and a negative number.
-Display other circles one by one. The later it displays, the 
bigger its radius is.
-The transparency of the circle decreases with time.

*/

/*
Part 7. Write a program to test if “echo” intersects with objects 
or boundaries in maps. It will display a new echo with weaker 
effect in the site where they intersect.

Subparts
  Part 7.1. Test if any circle in array intersects with boundaries.
  Pseudocode:
  -Create a boolean variable to update status when they collide.
  -Calculate the distance between the circle and boundaries.
  -Return TRUE if the distance is less than the radius of circle.
  -Draw a new echo in the location where they collide, but the 
  duration will be reduced based on the number of collisions between 
  circle and boundaries.

  Part 7.2. Test if the any circle in array intersects with other 
  objects.
  Pseudocode:
  -Create a boolean variable to update status when any circle in 
  echo collides with other objects.
  -Calculate the distance between the circle and other objects.
  -Return TRUE if the distance is less than the sum of radius of 
  circle and radius of objects.
  -Draw a new echo in the location where they collide, but the 
  duration will be reduced based on the number of collisions between 
  circle and objects.

*/

/* 
Part 8. Write a program to create blur effect in display window. 
This will be used to simulate low vision.

Pseudocode:
-Apply blur filter to map

*/

/*
Part 9. Write a program to display a dark picture with effect of 
crafted randomness and changes of light. This will be used to 
simulate blind. The variation of picture will be determined by 
the movement of “character”.

Pseudocode:
-Apply crafted randomness to the display of dark picture to simulate 
visual snow
-Create a bunch of rectangles with low transparency to simulate light

*/
