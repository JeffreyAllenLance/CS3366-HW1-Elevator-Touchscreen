    let screen, groundButton, groundButtonPressed;
    let screenWidth=431, screenHeight=632;
    let groundButtonX, groundButtonY;
    let groundButtonWidth=253, groundButtonHeight=57;
    let groundButtonOver = false;
    let clickedGround = false;

    function preload(){
        screen = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Elevator%20Screen.jpg");
        groundButton = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Ground%20Floor.jpg");
        groundButtonPressed = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Ground%20Floor%20Pressed.jpg");
    }

    function setup() {
        let canvas = createCanvas(431, 632);
        canvas.parent('screenHolder');
        groundButtonX = 0;
        groundButtonY = 400;
    }

    function draw() {
        background(0);
        update();
        image(screen,0,0, screenWidth,screenHeight);
        if(clickedGround){
            image(groundButtonPressed, 0, 400, groundButtonWidth, groundButtonHeight);
        }
        else {
            image(groundButton, 0, 400, groundButtonWidth, groundButtonHeight);
        }
    }
    function update() {
        if ( isOverGroundButton(groundButtonX, groundButtonY, groundButtonWidth, groundButtonHeight) ) {
            groundButtonOver = true;
        } else {
            groundButtonOver = false;
        }
    }
    function mousePressed(){
        if(groundButtonOver){
            clickedGround = true;
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
