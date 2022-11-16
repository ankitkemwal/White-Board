let isMouseDown = false; //initially not clicked

// e is a event which we are taking ie attaches an event handler to the element
board.addEventListener("mousedown", function(e) { //when mouse is clicked for first time
  ctx.beginPath();  //Begins a path or resets the current path
  let top = getLocation();  //take location -top dist
  ctx.moveTo(e.clientX, e.clientY - top); //starting point of the line / clientY is dist from top
  isMouseDown = true;

  //make a dict
  let point = {
    x: e.clientX,
    y: e.clientY - top,
    identifier: "mousedown",
    color: ctx.strokeStyle, //set the color
    width: ctx.lineWidth    //sets the width
  };
  // push values here to enable undo func
  undoStack.push(point);
});

// mmousedown x,y beginPath,moveTo(x,y),color,size
// mouseMove=> x1,y1, lineTo,stroke
board.addEventListener("mousemove", function(e) {
  if (isMouseDown == true) {  //only if mouse is down
    // console.log(ctx);
    let top = getLocation();
    //to track the mouse
    ctx.lineTo(e.clientX, e.clientY - top); //end pt of line
    ctx.stroke(); //inbuild func to actually draw a line
    let point = {
      x: e.clientX,
      y: e.clientY - top,
      identifier: "mousemove",
      color: ctx.strokeStyle,
      width: ctx.lineWidth
    };
    undoStack.push(point);
  }
});

board.addEventListener("mouseup", function(e) {
  isMouseDown = false;  //no more draw
});

//store undo and redo div here
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

let interval = null;
// storing steps at multiple interval if the mouse is down
undo.addEventListener("mousedown", function() {   //call when mouse id clicked and dragging
  interval = setInterval(function() { //call this func after every 50ms
    if (undoMaker()) socket.emit("undo"); //add a event in every 50ms storing track of mouse
  }, 50);
});

undo.addEventListener("mouseup", function() {
  clearInterval(interval);  //stop 50ms timer now ie stop tracking
});

redo.addEventListener("mousedown", function() {
  interval = setInterval(function() {
    if (redoMaker()) socket.emit("redo");
  }, 50);
});

redo.addEventListener("mouseup", function() {
  clearInterval(interval);
});

function redraw() { //from common.js
  ctx.clearRect(0, 0, board.width, board.height); //clear all board and redraw but not visible to us

  for (let i = 0; i < undoStack.length; i++) {
    let { x, y, identifier, color, width } = undoStack[i];
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (identifier == "mousedown") {
      ctx.beginPath();
      ctx.moveTo(x, y); //just move ptr to this position not draw
    } else if (identifier == "mousemove") {
      ctx.lineTo(x, y); //move to this pt
      ctx.stroke(); // and trace the path
    }
  }
}

function getLocation() {    //take coord in form of array inbuilt func
  const { top } = board.getBoundingClientRect();  //top=dist of canvas upper boundary from browser's top boundary
  return top;
}
