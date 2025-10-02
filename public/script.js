const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

const clearBtn = document.getElementById('clearBtn');

const socket = io();

const pathParts = window.location.pathname.split("/");
const boardId = pathParts[pathParts.length - 1];

socket.emit("join_board",boardId);

let isDrawing = false;
let startX,startY;
let drawings = [];

socket.on('draw_event_received', (data) => {
    
    drawings.push(data);
    redrawCanvas();
});

socket.on('board_cleared', () => {
    drawings = [];
    redrawCanvas(); 
});

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawRect(x,y,width,height){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2; 
    ctx.strokeRect(x, y, width, height);
}

function redrawCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawings.forEach(drawing => {drawRect(drawing.x, drawing.y, drawing.width, drawing.height);});
}

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

clearBtn.addEventListener('click', () => {
    
    socket.emit('clear_board', boardId);
});
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    redrawCanvas();

    // Clear the entire canvas to remove the previous frame's rectangle
    

    const currentX = e.offsetX;
    const currentY = e.offsetY;
    const width = currentX - startX;
    const height = currentY - startY;
    
    drawRect(startX, startY, width, height);
});

canvas.addEventListener("mouseup",(e)=>{
    if(!isDrawing) return;
    isDrawing = false ;

    const currentX = e.offsetX;
    const currentY = e.offsetY;
    const width = currentX - startX;
    const height = currentY - startY;

    const drawingData = {
        boardId:boardId,
        x:startX,
        y:startY,
        width:width,
        height:height 
    };
    console.log("Sending drawing data:", drawingData);
    drawings.push(drawingData);
    redrawCanvas();
    socket.emit("draw_event",drawingData);
})

window.addEventListener('resize', resizeCanvas);
resizeCanvas();