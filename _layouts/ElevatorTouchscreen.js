
let screenWidth = 668, screenHeight = 818;

//Initialize button position variables and dimensions
let groundFloorX, groundFloorY, secondFloorX, secondFloorY, thirdFloorX, thirdFloorY;
let openDoorsX, openDoorsY, closeDoorsX, closeDoorsY, closingDoorsX, closingDoorsY, holdingDoorsX, holdingDoorsY;
let floorButtonWidth = 315, floorButtonHeight = 94;
let doorButtonWidth = 120, doorButtonHeight = 113;
let textDisplayWidth = 173, textDisplayHeight = 23;

//Initialize time and wait variables
let time;
let wait = 3000;

//Initialize over and clicked boolean flags
let groundButtonOver = false;
let secondButtonOver = false;
let thirdButtonOver = false;
let closeButtonOver = false;
let openButtonOver = false;
let clickedSecond = false;
let clickedThird = false;
let clickedOpen = false;

//Initialize timed message flag
let message = false;

function preload() {
    //Load images
    screen = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Elevator Panel.png");
    groundFloor = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Ground Floor.png");
    groundFloorPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Ground Floor Pressed.png");
    secondFloor = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/2nd Floor.png");
    secondFloorPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/2nd Floor Pressed.png");
    thirdFloor = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/3rd Floor.png");
    thirdFloorPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/3rd Floor Pressed.png");
    closeDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Close Doors.png");
    closeDoorsPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Close Doors Pressed.png");
    openDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Open Doors.png");
    openDoorsPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Open Doors Pressed.png");
    holdingDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Holding Doors.png");
    closingDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@2b0cf58/Project%20Images/Closing Doors.png");
}

function setup() {
    //Create canvas
    let canvas = createCanvas(screenWidth, screenHeight);
    canvas.parent('screenHolder');

    //Set image positions
    groundFloorX = 130;
    groundFloorY = 413;
    secondFloorX = 130;
    secondFloorY = 311;
    thirdFloorX = 130;
    thirdFloorY = 210;
    closeDoorsX = 130;
    closeDoorsY = 514;
    openDoorsX = 130;
    openDoorsY = 634;
    closingDoorsX = 270;
    closingDoorsY = 570;
    holdingDoorsX = 270;
    holdingDoorsY = 690;
}

function draw() {
    background(0);
    update();
    //Display screen, ground floor, open, and close door buttons
    image(screen, 0, 0, screenWidth, screenHeight);
    image(groundFloor, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
    image(openDoors, openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight);
    image(closeDoors, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);

    //Handle timed message
    if (message) {
        if (millis() - time <= wait && clickedOpen == false) {
            image(closingDoors, closingDoorsX, closingDoorsY, textDisplayWidth, textDisplayHeight);
            image(closeDoorsPressed, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);
        } else {
            message = false;
        }
    }

    //Display button image according to clicked button flag
    if (clickedSecond) {
        image(secondFloorPressed, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);
    } else image(secondFloor, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);

    if (clickedThird) {
        image(thirdFloorPressed, thirdFloorX, thirdFloorY, floorButtonWidth, floorButtonHeight);
    } else image(thirdFloor, thirdFloorX, thirdFloorY, floorButtonWidth, floorButtonHeight);

    //For ground floor and open doors, show pressed only while holding mouse button
    if (mouseIsPressed) {
        if (isOverGroundButton(groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight)) {
            image(groundFloorPressed, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
        } else if (isOverOpenButton(openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight)) {
            image(openDoorsPressed, openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight);
            image(holdingDoors, holdingDoorsX, holdingDoorsY, textDisplayWidth, textDisplayHeight);
            clickedOpen = true;
            //For close doors, show pressed while holding and then save time for timer
        } else if (isOverCloseButton(closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight)) {
            image(closeDoorsPressed, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);
            image(closingDoors, closingDoorsX, closingDoorsY, textDisplayWidth, textDisplayHeight);
            message = true;
            clickedOpen = false;
            time = millis();
        }
    }
}
function update() {
    /* Update mouse position to check for button hover */

    if (isOverSecondButton(secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight)) {
        groundButtonOver = false;
        secondButtonOver = true;
        thirdButtonOver = false;
        openButtonOver = false;
        closeButtonOver = false;
    } else if (isOverThirdButton(thirdFloorX, thirdFloorY, floorButtonWidth, floorButtonHeight)) {
        groundButtonOver = false;
        secondButtonOver = false;
        thirdButtonOver = true;
        openButtonOver = false;
        closeButtonOver = false;
    } else if (isOverOpenButton(openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight)) {
        groundButtonOver = false;
        secondButtonOver = false;
        thirdButtonOver = false;
        openButtonOver = true;
        closeButtonOver = false;
    } else if (isOverCloseButton(closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight)) {
        groundButtonOver = false;
        secondButtonOver = false;
        thirdButtonOver = false;
        openButtonOver = false;
        closeButtonOver = true;
    } else {
        groundButtonOver = false;
        secondButtonOver = false;
        thirdButtonOver = false;
        openButtonOver = false;
        closeButtonOver = false;
    }
}
function mousePressed() {
    //If mouse is clicked on button, raise clicked flag
    if (secondButtonOver) {
        clickedSecond = true;
    } else if (thirdButtonOver) {
        clickedThird = true;
    }
}
/* The following functions return a boolean value to raise a flag when the mouse is over a button */
function isOverGroundButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
        return true;
    } else {
        return false;
    }
}
function isOverSecondButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
        return true;
    } else {
        return false;
    }
}
function isOverThirdButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
        return true;
    } else {
        return false;
    }
}
function isOverOpenButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
        return true;
    } else {
        return false;
    }
}
function isOverCloseButton(x, y, width, height) {
    if (mouseX >= x && mouseX <= x + width &&
        mouseY >= y && mouseY <= y + height) {
        return true;
    } else {
        return false;
    }
}


