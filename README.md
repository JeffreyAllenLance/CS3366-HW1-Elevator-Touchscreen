## Elevator Touchscreen Concept

When an average user steps into an elevator, they have exactly one goal: to find the floor they need, select it, and travel. To this end, the best control panel designs present the available floor options in a clear and simple way that sensibly corresponds with the layout of the building. The panel is not unnecessarily cluttered, the buttons are clearly marked, and they provide some kind of feedback when pressed. In this project, we'll take a look at a design that could stand to be improved, propose some solutions, and offer an example for how those solutions might be implemented on a touch interface.

### Panel With Design Issues

The following elevator can be found in the Philadelphia International Airport in Terminal B:

![Image of PHL Elevator](https://cdn.jsdelivr.net/gh/jeffreyallenlance/CS3366-HW1-Elevator-Touchscreen@0fd9d30/Project%20Images/PHL-Elevator.png)
![Gif of PHL Elevator](https://cdn.jsdelivr.net/gh/jeffreyallenlance/CS3366-HW1-Elevator-Touchscreen@306c8a6/Project%20Images/PHL-Elevator.gif)

There are two major issues with this design. The first is that there are, for no discernible reason, two different sets of buttons to open and close the elevator doors, and neither gives any meaningful feedback when pressed. The second is that, although the floor buttons are simply marked and light up when pressed, they are laid out horizontally rather than vertically. 

There are also other more minor issues, such as no visual indicator of the current floor and no real information about what the numbers for the floors actually mean. Since this is an airport rather than, say, an apartment building, using numbers for the floors doesn't really tell us much. And while the first floor is locked off by key card, there is no indication of that on the control panel itself.

### Possible Design Improvements

This design could be improved with a few simple changes. First, we can lay out the buttons for the floors vertically. This way, they match the layout of the building and correspond to the way the average user expects to see the floors listed. We can also take advantage of the display space provided by the touchscreen to write a description of the floors on the actual buttons, so that the user will know exactly which floor they need to choose.

Next, we can have just one set of open and close buttons, placed right underneath the floor selection buttons. All of the buttons can light up when pressed, providing feedback to the user. For extra feedback, we can also indicate on the screen which floor the user is currently on, which direction the elevator is traveling, and indicate directly on the control surface that the bottom floor requires a key card.

Here is a simple sketch of the revised layout with the extra information:

![Image of Screen Sketch](https://cdn.jsdelivr.net/gh/jeffreyallenlance/CS3366-HW1-Elevator-Touchscreen@b8e0826/Project%20Images/ScreenSketchRevised2.png)

### Implementation

Here is a possible implementation of the proposed solution. All of the proposed solutions from the sketch are implemented, with a few small changes. Rather than using the minimalist symbols for the open/close door buttons, which might be confusing at first glance, a picture representation and text description are provided to eliminate any possible confusion.

Also, to accomodate occupants with visual impairments, braille descriptions have been placed next to each button and a braille directive at the top tells users to touch the screen directly to the right. Moreover, a real-world implementation could provide auditory feedback for each action (selecting a floor, holding the doors, etc.), as well as force feedback in the form of vibration from the screen when pressed.

With these changes, any potential user should be able to step into the elevator, immediately see which floor they are on, find the floor they need, select that floor and receive feedback on the selection, and finally receive feedback that the elevator is moving to the selected floor.
