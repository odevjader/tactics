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

function isCellOccupied(x, y) {
    return units.some(unit => unit.x === x && unit.y === y);
}

function isValidMoveTarget(unit, targetX, targetY) {
    if (targetX < 0 || targetX >= GRID_SIZE || targetY < 0 || targetY >= GRID_SIZE) {
        return false; // Out of bounds
    }
    if (isCellOccupied(targetX, targetY)) {
        return false; // Cell is occupied
    }

    const dx = Math.abs(unit.x - targetX);
    const dy = Math.abs(unit.y - targetY);

    // Allow only horizontal or vertical movement of 1 cell
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function getUnitAt(x, y) {
    return units.find(unit => unit.x === x && unit.y === y);
}

function isAdjacent(unit1, unit2OrX, y) {
    let x2, y2;
    if (typeof unit2OrX === 'object' && unit2OrX !== null && 'x' in unit2OrX && 'y' in unit2OrX) {
        x2 = unit2OrX.x;
        y2 = unit2OrX.y;
    } else if (typeof unit2OrX === 'number' && typeof y === 'number') {
        x2 = unit2OrX;
        y2 = y;
    } else {
        return false; // Invalid arguments
    }

    const dx = Math.abs(unit1.x - x2);
    const dy = Math.abs(unit1.y - y2);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function findPlayerUnit() {
    return units.find(unit => unit.type === 'player');
}

function executeEnemyTurn(enemyUnit) {
    console.log(`Executing turn for ${enemyUnit.turnDisplayName}`);
    const playerUnit = findPlayerUnit();

    if (!playerUnit) {
        console.log(`No player unit found. Enemy ${enemyUnit.turnDisplayName} does nothing.`);
        setTimeout(nextTurn, 500);
        return;
    }

    if (isAdjacent(enemyUnit, playerUnit)) {
        // Enemy is adjacent, so ATTACK
        console.log(`${enemyUnit.turnDisplayName} attacks ${playerUnit.turnDisplayName}!`);
        playerUnit.hp -= 1; // MVP fixed damage
        if (playerUnit.hp < 0) {
            playerUnit.hp = 0; // Corrected line
        }
        console.log(`${playerUnit.turnDisplayName} HP is now ${playerUnit.hp}`); // Log potentially clamped HP
        // Attack action taken, then end turn
        setTimeout(nextTurn, 500);
        return;
    }

    // If not adjacent, proceed with movement logic (this part remains unchanged)
    let moved = false;
    const dx = playerUnit.x - enemyUnit.x;
    const dy = playerUnit.y - enemyUnit.y;

    if (dx !== 0) { // Try X movement first
        const stepX = Math.sign(dx);
        if (isValidMoveTarget(enemyUnit, enemyUnit.x + stepX, enemyUnit.y)) {
            enemyUnit.x += stepX;
            moved = true;
            console.log(`${enemyUnit.turnDisplayName} moves to (${enemyUnit.x},${enemyUnit.y})`);
        }
    }

    if (!moved && dy !== 0) { // Else try Y movement
        const stepY = Math.sign(dy);
        if (isValidMoveTarget(enemyUnit, enemyUnit.x, enemyUnit.y + stepY)) {
            enemyUnit.y += stepY;
            moved = true;
            console.log(`${enemyUnit.turnDisplayName} moves to (${enemyUnit.x},${enemyUnit.y})`);
        }
    }

    if (!moved) {
        console.log(`${enemyUnit.turnDisplayName} could not move or chose to hold.`);
    }
    // gameLoop(); // Redraw immediately after potential move - REMOVED, nextTurn will call gameLoop
    setTimeout(nextTurn, 500); // End turn after a delay
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
    const currentUnit = getCurrentTurnUnit();
    console.log(`Turn advanced to: ${currentUnit.turnDisplayName}`);

    selectedUnit = null;

    gameLoop(); // Redraw for the new turn (e.g. turn indicator update)

    if (currentUnit.type === 'enemy') {
        setTimeout(() => executeEnemyTurn(currentUnit), 250); // Short delay for AI "thinking"
    }
    // For player's turn, gameLoop() already called, waiting for input.
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
    let actionTakenThisClick = false;

    if (currentTurnUnit && currentTurnUnit.type === 'player') {
        if (selectedUnit && selectedUnit.id === currentTurnUnit.id) {
            // Player unit is selected, check for MOVEMENT first
            if (isValidMoveTarget(selectedUnit, clickedGridX, clickedGridY)) {
                console.log(`Moving ${selectedUnit.turnDisplayName} from (${selectedUnit.x},${selectedUnit.y}) to (${clickedGridX},${clickedGridY})`);
                selectedUnit.x = clickedGridX;
                selectedUnit.y = clickedGridY;
                actionTakenThisClick = true;
                selectedUnit = null; // Deselect after move
                nextTurn();
            } else {
                // Not a valid move. Check for ATTACK.
                const targetUnit = getUnitAt(clickedGridX, clickedGridY);
                if (targetUnit && targetUnit.type === 'enemy' && isAdjacent(selectedUnit, targetUnit)) {
                    console.log(`${selectedUnit.turnDisplayName} attacks ${targetUnit.turnDisplayName} at (${targetUnit.x},${targetUnit.y})`);
                    targetUnit.hp -= 1; // MVP fixed damage
                    if (targetUnit.hp < 0) {
                        targetUnit.hp = 0;
                    }
                    console.log(`${targetUnit.turnDisplayName} HP is now ${targetUnit.hp}`); // Log potentially clamped HP
                    actionTakenThisClick = true;
                    selectedUnit = null; // Deselect after attack
                    nextTurn();
                } else {
                    // Not a valid move or a valid attack.
                    // If click is on selected unit, keep selected. Otherwise, deselect.
                    if (selectedUnit.x === clickedGridX && selectedUnit.y === clickedGridY) {
                        actionTakenThisClick = true; // Kept selection
                    } else {
                        selectedUnit = null; // Clicked elsewhere
                    }
                }
            }
        } else {
            // No unit selected (or not the current player's unit), try to SELECT a player unit.
            units.forEach(unit => {
                if (unit.type === 'player' && unit.id === currentTurnUnit.id && unit.x === clickedGridX && unit.y === clickedGridY) {
                    selectedUnit = unit;
                    actionTakenThisClick = true;
                }
            });
            if (!actionTakenThisClick) { // If no selection was made
                selectedUnit = null;
            }
        }
    } else {
        // Not player's turn. Any click deselects.
        selectedUnit = null;
    }

    // If no specific action (move, attack, select, re-select) was confirmed, deselect.
    if (!actionTakenThisClick) {
         selectedUnit = null;
    }

    gameLoop(); // Redraw to show changes
}

canvas.addEventListener('click', handleCanvasClick);

// Temporary: Press 'n' to advance turn
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'n') {
//         nextTurn();
//     }
// });
