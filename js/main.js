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
let selectedUnit = null;

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
    const offsetX = (CELL_SIZE - unitSize) / 2;
    const offsetY = (CELL_SIZE - unitSize) / 2;

    const unitXPos = unit.x * CELL_SIZE;
    const unitYPos = unit.y * CELL_SIZE;

    ctx.fillStyle = unit.color;
    ctx.fillRect(
        unitXPos + offsetX,
        unitYPos + offsetY,
        unitSize,
        unitSize
    );

    // Draw selection indicator
    if (selectedUnit && selectedUnit.id === unit.id) {
        ctx.strokeStyle = 'yellow'; // Selection color
        ctx.lineWidth = 2;
        ctx.strokeRect(
            unitXPos + offsetX - ctx.lineWidth, // Adjust for lineWidth to be outside
            unitYPos + offsetY - ctx.lineWidth,
            unitSize + ctx.lineWidth * 2,
            unitSize + ctx.lineWidth * 2
        );
    }
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

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const clickedGridX = Math.floor(clickX / CELL_SIZE);
    const clickedGridY = Math.floor(clickY / CELL_SIZE);

    const currentTurnUnit = getCurrentTurnUnit();
    let madeSelectionThisClick = false;

    if (currentTurnUnit && currentTurnUnit.type === 'player') {
        // Iterate through all player units (MVP has one)
        units.forEach(unit => {
            if (unit.type === 'player' && unit.x === clickedGridX && unit.y === clickedGridY) {
                if (selectedUnit && selectedUnit.id === unit.id) {
                    // Clicked already selected unit - keep selected or deselect?
                    // For now, keep selected. To deselect on re-click: selectedUnit = null;
                    madeSelectionThisClick = true; // Re-confirming selection
                } else {
                    selectedUnit = unit; // Select the new unit
                    madeSelectionThisClick = true;
                }
            }
        });
    }

    if (!madeSelectionThisClick) {
        selectedUnit = null; // Clicked elsewhere or not player's turn to select
    }

    gameLoop(); // Redraw to show selection changes
}

canvas.addEventListener('click', handleCanvasClick);

// Temporary: Press 'n' to advance turn
document.addEventListener('keydown', function(event) {
    if (event.key === 'n') {
        nextTurn();
    }
});
