const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let startX,startY;

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}