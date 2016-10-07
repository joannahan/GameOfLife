#An Implementation of Conway's Game of Life
*Joanna Han*

#Design
I used the Model-View-Controller pattern to implement this user interface. I split the web app into different components: conwaymodel.js, conwayview.js, and conwaycontroller.js. The model file stores the data; the view file generates the output based on the model; the controller sends commands to the model to update its state. 
The modularity between model and view is maintained in that both are updated without having to pass one into the other as a parameter. 

I used closures in all the objects to manage the scopes of the functions. The functions in the objects can access the object's parameters and variables, while not having its own exposed unnecessarily. I also froze the objects to prevent further modifications. 
With regards to functionals - most of my for loops included indices necessary to reference a cell's position, so having for loops that kept track of indices seemed more reasonable and intuitive. In conwaymodel.js, I used the forEach method on line 168. I also added a double for loop abstraction.

#Graphical User Interface
I decided to use HTML5 Canvas to make the grid. I could've used div or table in HTML to make the grid, but went with Canvas because of the provided Javascript library and the ease of drawing a grid. 

For the parallel grid structure that the model works with, I used an array of objects to represent the board. The game of life logic was mainly done in this board, and the view that the user sees gets update along with it. 

