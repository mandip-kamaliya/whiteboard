// Get the canvas and its 2D rendering context
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Global variables to track drawing state
let isDrawing = false;
let startX, startY;

// Function to resize the canvas to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Function to draw a rectangle on the canvas
function drawRect(x, y, width, height) {
    ctx.strokeStyle = 'black'; // Color of the rectangle's border
    ctx.lineWidth = 2;         // Width of the border
    ctx.strokeRect(x, y, width, height);
}

// --- Event Listeners for Mouse Actions ---

// When the mouse button is pressed down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

// When the mouse is moved
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

// When the mouse button is released
canvas.addEventListener('mouseup', (e) => {
    if (!isDrawing) return;
    isDrawing = false;

    // The rectangle is already drawn by the last mousemove event
});

// Resize the canvas when the window is resized and on initial load
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call it once to set the initial size