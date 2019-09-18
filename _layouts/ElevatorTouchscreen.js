    //Initialize Screen Dimensions
    let screenWidth=664, screenHeight=736;

    //Initialize button position variables and dimensions
    let basementX, basementY, groundFloorX, groundFloorY, secondFloorX, secondFloorY;
    let openDoorsX, openDoorsY, closeDoorsX, closeDoorsY, closingDoorsX, closingDoorsY, holdingDoorsX, holdingDoorsY;
    let personGroundX, personGroundY, personSecondX, personSecondY, goingUpX, goingUpY, goingDownX, goingDownY;
    let floorButtonWidth=281, floorButtonHeight=94;
    let doorButtonWidth=120, doorButtonHeight=109;
    let goingButtonWidth=133, goingButtonHeight=179;
    let textDisplayWidth=135, textDisplayHeight=20;
    let personWidth = 33, personHeight = 75;

    //Initialize time and wait variables
    let timeClose;
    let waitClose = 3000;
    let timeMove;
    let waitMove = 5000;

    //Initialize over and clicked boolean flags
    let basementButtonOver = false;
    let groundButtonOver = false;
    let secondButtonOver = false;
    let closeButtonOver = false;
    let openButtonOver = false;
    let clickedOpen = false;

    //Initialize current floor flags
    let onGround = true;
    let onSecond = false;

    //Initialize last floor string
    let lastFloor = "ground";

    //Initialize timed message and moving flag
    let message = false;
    let moving = false;

    function preload(){
        //Load images
        screen = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/ElevatorPanel.png");
        basement = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/Basement.png");
        basementPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/BasementPressed.png");
        groundFloor = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/Ground.png");
        groundFloorPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/GroundPressed.png");
        secondFloor = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/2nd.png");
        secondFloorPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/2ndPressed.png");
        closeDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/Close.png");
        closeDoorsPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/ClosePressed.png");
        openDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/Open.png");
        openDoorsPressed = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/OpenPressed.png");
        holdingDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/HoldingDoors.png");
        closingDoors = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/ClosingDoors.png");
        person = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/PersonIcon.png");
        goingUp = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/GoingUp.png");
        goingDown = loadImage("https://cdn.jsdelivr.net/gh/jeffreyallenlance/Elevator-Touchscreen@ae249ef/Project%20Images/GoingDown.png");
    }

     function setup() {
        //Create canvas
        let canvas = createCanvas(screenWidth, screenHeight);
        canvas.parent('screenHolder');

        //Set image positions
        basementX = 133;
        basementY = 355;
        groundFloorX = 133;
        groundFloorY = 256;
        secondFloorX = 133;
        secondFloorY = 157;
        closeDoorsX = 133;
        closeDoorsY = 454;
        openDoorsX = 133;
        openDoorsY = 568;
        closingDoorsX = 270;
        closingDoorsY = 505;
        holdingDoorsX = 270;
        holdingDoorsY = 615;
        personGroundX = 450;
        personGroundY = 270;
        personSecondX = 450;
        personSecondY = 168;
        goingUpX = 350;
        goingUpY = 480;
        goingDownX = 350;
        goingDownY = 480;
    }

    function draw(){
        background(0);
        update();

        //Display screen, ground floor, open, and close door buttons
        image(screen,0,0, screenWidth,screenHeight);
        image(basement, basementX, basementY, floorButtonWidth, floorButtonHeight);
        image(groundFloor, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
        image(secondFloor, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);
        image(openDoors, openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight);
        image(closeDoors, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);

        if(moving){
            /*Process if moving*/

            //Set current floor flags to false
            onGround = false;
            onSecond = false;
            //If in moving wait period, display pressed button according to last floor
            if(millis() - timeMove <= waitMove && lastFloor == "ground"){
                image(secondFloorPressed, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);
                image(goingUp, goingUpX, goingUpY, goingButtonWidth, goingButtonHeight);
            } else if(millis() - timeMove <= waitMove && lastFloor == "second"){
                image(groundFloorPressed, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
                image(goingDown, goingDownX, goingDownY, goingButtonWidth, goingButtonHeight);
            } else{
                //When moving has stopped, set flag to false and switch last floor
                moving = false;
                if(lastFloor == "ground"){
                    lastFloor = "second";
                    onSecond = true;
                } else{
                    lastFloor = "ground";
                    onGround = true;
                }
            }
        } else {
            /*Process if not currently moving*/

            //Handle timed message for closing doors
            if(message){
                if(millis() - timeClose <= waitClose && clickedOpen == false){
                    image(closingDoors, closingDoorsX, closingDoorsY, textDisplayWidth, textDisplayHeight);
                    image(closeDoorsPressed, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);
                } else{
                    message = false;
                }
            }

            //Display button image and floor icon according to clicked button flag and current floor
            if(onGround == true){
                image(person, personGroundX, personGroundY, personWidth, personHeight);
                if(mousePressed){
                    if(isOverGroundButton(groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight)){
                        image(groundFloorPressed, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
                    } else if (isOverSecondButton(secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight)){
                        image(secondFloorPressed, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);
                        moving = true;
                        timeMove = millis();
                    }
                }
            } else if (onSecond == true){
                image(person, personSecondX, personSecondY, personWidth, personHeight);
                if(mousePressed){
                    if(isOverSecondButton(secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight)){
                        image(secondFloorPressed, secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight);
                    } else if (isOverGroundButton(groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight)){
                        image(groundFloorPressed, groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight);
                        moving = true;
                        timeMove = millis();
                    }
                }
            }

            //For ground floor and open doors, show pressed only while holding mouse button
            if(mousePressed){
                if (isOverBasementButton(basementX, basementY, floorButtonWidth, floorButtonHeight)){
                    image(basementPressed, basementX, basementY, floorButtonWidth, floorButtonHeight);
                } else if (isOverOpenButton(openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight)){
                    image(openDoorsPressed, openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight);
                    image(holdingDoors, holdingDoorsX, holdingDoorsY, textDisplayWidth, textDisplayHeight);
                    clickedOpen = true;
                    //For close doors, show pressed while holding and then save time for timer
                } else if (isOverCloseButton(closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight)){
                    image(closeDoorsPressed, closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight);
                    image(closingDoors, closingDoorsX, closingDoorsY, textDisplayWidth, textDisplayHeight);
                    message = true;
                    clickedOpen = false;
                    timeClose = millis();
                }
            }
        }
    }
    function update() {
        /* Update mouse position to check for button hover */

        if ( isOverGroundButton(groundFloorX, groundFloorY, floorButtonWidth, floorButtonHeight) ) {
            basementButtonOver = false;
            groundButtonOver = true;
            secondButtonOver = false;
            openButtonOver = false;
            closeButtonOver = false;
        } else if ( isOverSecondButton(secondFloorX, secondFloorY, floorButtonWidth, floorButtonHeight) ) {
            basementButtonOver = false;
            groundButtonOver = false;
            secondButtonOver = true;
            openButtonOver = false;
            closeButtonOver = false;
        } else if ( isOverOpenButton(openDoorsX, openDoorsY, doorButtonWidth, doorButtonHeight) ) {
            basementButtonOver = false;
            groundButtonOver = false;
            secondButtonOver = false;
            openButtonOver = true;
            closeButtonOver = false;
        } else if ( isOverCloseButton(closeDoorsX, closeDoorsY, doorButtonWidth, doorButtonHeight) ) {
            basementButtonOver = false;
            groundButtonOver = false;
            secondButtonOver = false;
            openButtonOver = false;
            closeButtonOver = true;
        } else {
            basementButtonOver = false;
            groundButtonOver = false;
            secondButtonOver = false;
            openButtonOver = false;
            closeButtonOver = false;
        }
    }

    /* The following functions return a boolean value to raise a flag when the mouse is over a button */
    function isOverBasementButton(x, y, width, height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }
    function isOverGroundButton(x, y, width, height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }
    function isOverSecondButton(x, y, width, height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }
    function isOverOpenButton(x, y, width, height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }
    function isOverCloseButton(x, y, width, height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }

