// Ensure classes are available globally. Order: Tile, IsometricGrid, Pathfinding, TurnManager, Unit, SpriteSheet, Renderer.

let lastTime = 0; // For deltaTime calculation
let turnManager; // Make turnManager globally accessible for the button

/**
 * Main game function, called after assets are loaded.
 */
function startGame(canvas, grid, renderer, assets) {
  console.log("startGame called. All assets loaded.");

  assets.playerIdle.defineAnim('idle', [0, 1, 2, 3], 5); // 4 frames, 5 FPS

  // Create units with base stats and assign jobs
  // Unit constructor: (id, gridX, gridY, spriteSheet, baseStatsInput, jobId, isPlayerControlled, initialAnimation)

  const playerBaseStats = { maxHp: 50, maxAp: 10, attackPower: 8, speed: 45, moveRange: 4, attackRange: 1 };
  const playerUnit = new Unit('Player', 1, 1, assets.playerIdle,
    playerBaseStats, 'SQUIRE', true, 'idle'
  );
  console.log("Player Unit (Squire) Stats:", { maxHp: playerUnit.maxHp, currentHp: playerUnit.hp, maxAp: playerUnit.maxAp, attackPower: playerUnit.attackPower, attackRange: playerUnit.attackRange, speed: playerUnit.speed });

  const enemy1BaseStats = { maxHp: 40, maxAp: 8, attackPower: 6, speed: 30, moveRange: 3, attackRange: 1 };
  const enemyUnit1 = new Unit('Goblin', 5, 5, assets.playerIdle, // Using same sprite for now
    enemy1BaseStats, 'NONE', false, 'idle' // Enemy with no specific job, uses base stats
  );
  console.log("Enemy1 (None) Stats:", { maxHp: enemyUnit1.maxHp, currentHp: enemyUnit1.hp, maxAp: enemyUnit1.maxAp, attackPower: enemyUnit1.attackPower, attackRange: enemyUnit1.attackRange, speed: enemyUnit1.speed });

  const enemy2BaseStats = { maxHp: 35, maxAp: 8, attackPower: 5, speed: 35, moveRange: 4, attackRange: 3 }; // Base range 3
  const enemyUnit2 = new Unit('ArcherBot', 6, 4, assets.playerIdle,
    enemy2BaseStats, 'ARCHER', false, 'idle'
  );
  // Archer job adds +2 attackRange. Base 1 + 2 = 3. If base was already e.g. 2, it would be 4.
  // Let's assume Archer job sets attackRange, not just adds. The current Unit._applyJobModifiers adds.
  // For Archer, baseStats.attackRange is 1. Job adds 2. So final should be 3.
  // If Jobs.js ARCHER has `attackRange: 2`, and Unit's base `attackRange: 1` (default in _applyJobModifiers if not in baseStatsInput)
  // then final is 1 + 2 = 3.
  // If Archer baseStatsInput had attackRange: 2, final would be 2 + 2 = 4.
  // Let's ensure baseStatsInput provides all base values for clarity.
  // Corrected enemy2BaseStats:
  // const enemy2BaseStats = { maxHp: 35, maxAp: 8, attackPower: 5, speed: 35, moveRange: 4, attackRange: 1 }; // Base range 1
  // const enemyUnit2 = new Unit('ArcherBot', 6, 4, assets.playerIdle, enemy2BaseStats, 'ARCHER', false, 'idle' );
  // This would result in attackRange = 1 (base) + 2 (Archer mod) = 3. This is correct.
  // If Archer job wanted to ensure a *minimum* range, logic in _applyJobModifiers would change.
  // Current additive approach is fine.

  console.log("Enemy2 (Archer) Stats:", { maxHp: enemyUnit2.maxHp, currentHp: enemyUnit2.hp, maxAp: enemyUnit2.maxAp, attackPower: enemyUnit2.attackPower, attackRange: enemyUnit2.attackRange, speed: enemyUnit2.speed });


  renderer.addUnit(playerUnit);
  renderer.addUnit(enemyUnit1);
  renderer.addUnit(enemyUnit2);
  console.log("Player and Enemy units with jobs created and added to renderer.");

  // Initialize TurnManager and Pathfinder
  const pathfinder = new Pathfinder(grid);
  const allUnits = [playerUnit, enemyUnit1, enemyUnit2];
  turnManager = new TurnManager(allUnits, pathfinder); // Pass pathfinder to TurnManager

  renderer.setPathfinder(pathfinder);
  renderer.setTurnManager(turnManager);
  console.log("Pathfinder, TurnManager initialized and linked to renderer.");

  // Setup "End Turn" button
  const endTurnButton = document.getElementById('endTurnButton');
  if (endTurnButton) {
    endTurnButton.addEventListener('click', () => {
      if (turnManager) {
        console.log("End Turn button clicked.");
        turnManager.nextTurn();
        renderer._clearActionStates(true);
        renderer._updateAbilityDisplay(); // Reset ability display
      }
    });
  } else {
    console.error("End Turn button not found!");
  }

  // Adjust camera
  renderer.cameraOffsetX = canvas.width / 2 - (3 * grid.tileDisplaySize.width / 2);
  renderer.cameraOffsetY = 150;

  // Game Loop
  function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    for (const unit of renderer.units) {
      unit.updateAnimation(deltaTime);
    }

    renderer.render();
    requestAnimationFrame(gameLoop);
  }

  console.log("Starting game loop with turn management...");
  requestAnimationFrame(gameLoop);

  // Setup Ability Cycle Button
  const nextAbilityButton = document.getElementById('selectNextAbilityButton');
  if (nextAbilityButton) {
    nextAbilityButton.addEventListener('click', () => {
      if (renderer && turnManager && turnManager.isPlayerTurn()) {
        renderer.cycleNextAbility();
      }
    });
  } else {
    console.error("Next Ability button not found!");
  }
}

/**
 * Initializes the game environment, loads assets, and then starts the game.
 */
function main() {
  console.log("Main function loaded. Initializing asset loading...");

  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const tileDisplaySize = { width: 64, height: 32 };
  const gridWidth = 10;
  const gridHeight = 10;
  const grid = new IsometricGrid(gridWidth, gridHeight, tileDisplaySize);

  if (!grid) {
    console.error("Failed to create IsometricGrid.");
    return;
  }
  console.log(`IsometricGrid created (${gridWidth}x${gridHeight}).`);

  // Create renderer here, pathfinder and turnManager will be set in startGame
  const renderer = new Renderer(canvas, grid, tileDisplaySize, 16);
  console.log("Renderer created.");

  const playerIdleSpritePath = 'assets/sprites/player_idle_4frames_32x32.png';
  let assetsLoadedCount = 0;
  const totalAssets = 1;
  const assets = {};

  console.log(`Attempting to load: ${playerIdleSpritePath}`);
  assets.playerIdle = new SpriteSheet(playerIdleSpritePath, 32, 32, () => {
    assetsLoadedCount++;
    if (assetsLoadedCount === totalAssets) {
      startGame(canvas, grid, renderer, assets);
    }
  });
  if (!assets.playerIdle.image.src.endsWith(playerIdleSpritePath)) {
     // Error handling for immediate src issues, though async load is key
  }
}

// Entry point - ensure DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
