const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 8; // 8x8 grid
const CELL_SIZE = 50; // Each cell is 50x50 pixels

// Unit definitions
const PLAYER_COLOR = 'blue';
const ENEMY_COLOR = 'red';
const UNIT_SIZE_FACTOR = 0.8; // Make unit smaller than cell

let units = [
    { x: 1, y: 1, color: PLAYER_COLOR, hp: 3, type: 'player' }, // Player unit
    { x: 5, y: 5, color: ENEMY_COLOR, hp: 2, type: 'enemy' },   // Enemy 1
    { x: 6, y: 2, color: ENEMY_COLOR, hp: 2, type: 'enemy' }    // Enemy 2
];

let currentPlayerIndex = 0;
let enemyCounter = 0; // To give unique names like "Enemy 1", "Enemy 2"

function initializeCanvas() {
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    // Populate turnOrder and assign descriptive names for turn indicator
    // Also assign an id to each unit for easier reference if needed later
    enemyCounter = 0; // Reset for name assignment
    units.forEach((unit, index) => {
        unit.id = index;
        if (unit.type === 'player') {
            unit.turnDisplayName = "Player's Turn";
        } else {
            enemyCounter++;
            unit.turnDisplayName = `Enemy ${enemyCounter}'s Turn`;
        }
    });
    currentPlayerIndex = 0; // Player unit is at index 0
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

function drawUnit(unit) {
    const unitSize = CELL_SIZE * UNIT_SIZE_FACTOR;
    const offsetX = (CELL_SIZE - unitSize) / 2; // Center unit in cell
    const offsetY = (CELL_SIZE - unitSize) / 2;

    ctx.fillStyle = unit.color;
    ctx.fillRect(
        unit.x * CELL_SIZE + offsetX,
        unit.y * CELL_SIZE + offsetY,
        unitSize,
        unitSize
    );
}

function drawUnits() {
    units.forEach(unit => drawUnit(unit));
}

function getCurrentTurnUnit() {
    return units[currentPlayerIndex];
}

function drawTurnIndicator() {
    const currentUnit = getCurrentTurnUnit();
    if (!currentUnit || !currentUnit.turnDisplayName) return; // Safety check

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(currentUnit.turnDisplayName, 10, 20); // Display in top-left corner
}

function gameLoop() {
    clearCanvas();
    drawGrid();
    drawUnits();
    drawTurnIndicator(); // Add this line
}

function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % units.length;
    console.log(getCurrentTurnUnit().turnDisplayName); // Log to console for testing
    gameLoop(); // Redraw the game state to update turn indicator
}

// Initialize and start the game loop
initializeCanvas();
gameLoop(); // For now, just draw the grid once. Later this might be part of a requestAnimationFrame loop.

console.log('Tactics Saga MVP - Grid Initialized');

// Temporary: Press 'n' to advance turn
document.addEventListener('keydown', function(event) {
    if (event.key === 'n') {
        nextTurn();
    }
});
