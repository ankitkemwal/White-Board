// Setting up the canvas: its color, improving quality of the drawing line.
// Changing width of pencil and color of pencil

// *********************************Basic Setup
const board = document.querySelector(".board");
board.height = window.innerHeight;  //screen dimn
board.width = window.innerWidth;

// canvasRenderingContext2d=> tool or ctx 
const ctx = board.getContext("2d"); 
// built-in HTML object, with properties and methods for drawing on the canvas

// ctx.fillStyle = "yellow"
// ctx.fillRect(0, 0, board.width, board.height);
// Start at the upper-left corner (0,0) and draw a 150x75 pixels rectangle.

ctx.strokeStyle = "blue"; 
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round"; // rounded shape will come at the intersection of two lines
ctx.lineCap = "round"; // rounded cap will come at the endpoints of a line
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;  //sets line width

// ************************Change Size**************************//
function sizeChange(value) {
  ctx.lineWidth = value;
}

// ******************handle color****************************
function handleColorChange(color) {
  ctx.strokeStyle = color;
}
