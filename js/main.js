const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 8; // 8x8 grid
const CELL_SIZE = 50; // Each cell is 50x50 pixels

function initializeCanvas() {
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
}

function clearCanvas() {
    ctx.fillStyle = '#333'; // Dark grey background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    ctx.strokeStyle = '#555'; // Lighter grey for grid lines
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 0; j <= GRID_SIZE; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * CELL_SIZE);
        ctx.lineTo(canvas.width, j * CELL_SIZE);
        ctx.stroke();
    }
}

function gameLoop() {
    clearCanvas();
    drawGrid();
    // Other game drawing and logic will go here in future tasks
}

// Initialize and start the game loop
initializeCanvas();
gameLoop(); // For now, just draw the grid once. Later this might be part of a requestAnimationFrame loop.

console.log('Tactics Saga MVP - Grid Initialized');
