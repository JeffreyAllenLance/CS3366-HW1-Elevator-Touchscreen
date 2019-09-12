/* @pjs preload="Elevator Touchscreen.jpg", "Ground Floor.jpg", "Ground Floor Pressed.jpg"; */

    PImage screen, groundButton, groundButtonPressed;

    int screenWidth=431, screenHeight=632;
    int groundButtonX, groundButtonY;
    int groundButtonWidth=253, groundButtonHeight=57;
    boolean groundButtonOver = false;
    boolean clickedGround = false;

    void setup(){
        size(431, 632);
        textAlign(CENTER,CENTER);
        fill(255,0,0);
        textSize(28);
        screen = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Elevator%20Screen.jpg");
        groundButton = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Ground%20Floor.jpg");
        groundButtonPressed = loadImage("https://raw.githubusercontent.com/JeffreyAllenLance/Elevator-Touchscreen/master/Images/Ground%20Floor%20Pressed.jpg");
        groundButtonX = 0;
        groundButtonY = 400;
    }

    void draw(){
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
    void update() {
        if ( isOverGroundButton(groundButtonX, groundButtonY, groundButtonWidth, groundButtonHeight) ) {
            groundButtonOver = true;
        } else {
            groundButtonOver = false;
        }
    }
    void mousePressed(){
        if(groundButtonOver){
            clickedGround = true;
        }
    }
    boolean isOverGroundButton(int x, int y, int width, int height)  {
        if (mouseX >= x && mouseX <= x+width &&
                mouseY >= y && mouseY <= y+height) {
            return true;
        } else {
            return false;
        }
    }

