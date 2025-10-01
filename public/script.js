const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

const socket = io();

const pathParts = window.location.pathname.split("/");
const boardId = pathParts[pathParts.length - 1];

socket.emit("join_board",boardId);

let isDrawing = false;
let startX,startY;
let drawings = [];

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

    drawings.forEach(drawing => drawRect(drawing));
}

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    // Clear the entire canvas to remove the previous frame's rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    socket.emit("draw_event",drawingData);
})

window.addEventListener('resize', resizeCanvas);
resizeCanvas();