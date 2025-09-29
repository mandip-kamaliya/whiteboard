const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let startX,startY;

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawRect(x,y,width,height){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2; 
    ctx.strokeRect(x, y, width, height);
}

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

