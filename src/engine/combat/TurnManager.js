/**
 * Manages the sequence of turns in combat.
 */
class TurnManager {
  /**
   * Creates a new TurnManager instance.
   * @param {Array<Unit>} allUnits - An array of all units participating in combat.
   * @param {Pathfinder} pathfinder - An instance of the Pathfinder class.
   */
  constructor(allUnits = [], pathfinder = null) {
    this.allUnits = [];
    this.turnOrder = [];
    this.currentTurnIndex = -1;
    this.activeUnit = null;
    this.roundCount = 0;
    this.pathfinder = pathfinder;
    this.gameOver = false; // Initialize gameOver state
    this._lastGameState = 'ongoing'; // Cache for game over screen

    if (!pathfinder) {
        console.error("TurnManager: Pathfinder instance is required!");
    }

    if (allUnits.length > 0) {
      this.startCombat(allUnits);
    }
  }

  setPathfinder(pathfinder) {
    this.pathfinder = pathfinder;
  }

  startCombat(allUnitsArray) {
    if (!allUnitsArray || allUnitsArray.length === 0) {
      console.error("TurnManager: Cannot start combat with no units.");
      return;
    }
    this.allUnits = [...allUnitsArray];
    this.turnOrder = this.allUnits.sort((a, b) => b.speed - a.speed);

    this.currentTurnIndex = -1;
    this.activeUnit = null;
    this.roundCount = 0;
    this.gameOver = false; // Reset game over state
    this._lastGameState = 'ongoing';
    console.log("Combat started. Turn order:", this.turnOrder.map(u => `${u.id} (Speed: ${u.speed})`).join(', '));
    this.nextTurn();
  }

  nextTurn() {
    if (this.gameOver) {
      console.log("TurnManager: Game is over. No more turns.");
      return;
    }
    if (this.turnOrder.length === 0) {
      console.warn("TurnManager: No units in turn order.");
      this.activeUnit = null;
      return;
    }

    let attempts = 0;
    let potentialNextUnit;
    do {
      this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
      if (this.currentTurnIndex === 0 && attempts === 0) {
        this.roundCount++;
        console.log(`--- Round ${this.roundCount} ---`);
      }
      potentialNextUnit = this.turnOrder[this.currentTurnIndex];
      attempts++;
    } while (potentialNextUnit.isDefeated && attempts <= this.turnOrder.length * 2); // Increased attempts to be safe

    if (potentialNextUnit.isDefeated) {
        console.log("All remaining units appear to be defeated.");
        this.checkAndSetWinLoss();
        return;
    }
    this.activeUnit = potentialNextUnit;

    if (this.activeUnit && typeof this.activeUnit.resetTurnState === 'function') {
      this.activeUnit.resetTurnState();
    }
    console.log(`TurnManager: It's now ${this.activeUnit.id}'s turn (${this.activeUnit.isPlayerControlled ? 'Player' : 'Enemy'}). HP: ${this.activeUnit.hp}/${this.activeUnit.maxHp}`);

    // Check win/loss after selecting a new active unit and resetting its state
    if (this.checkAndSetWinLoss()) {
        return; // Game over, stop further processing
    }

    if (this.activeUnit && !this.activeUnit.isPlayerControlled && this.activeUnit.isAlive()) {
      setTimeout(() => {
        if (this.activeUnit && !this.activeUnit.isPlayerControlled && this.activeUnit.isAlive() && !this.gameOver) {
            this.executeEnemyTurn(this.activeUnit);
        }
      }, 500);
    }
  }

  checkAndSetWinLoss() {
    const gameState = this.checkWinLossConditions();
    if (gameState !== 'ongoing') {
      this.handleGameOver(gameState);
      return true; // Game is over
    }
    return false; // Game is not over
  }

  checkWinLossConditions() {
    if (this.gameOver) return this._lastGameState;

    const alivePlayerUnits = this.allUnits.filter(u => u.isPlayerControlled && u.isAlive()).length;
    const aliveEnemyUnits = this.allUnits.filter(u => !u.isPlayerControlled && u.isAlive()).length;

    if (alivePlayerUnits === 0) {
      this._lastGameState = 'enemies_win';
      return 'enemies_win';
    }
    if (aliveEnemyUnits === 0) {
      this._lastGameState = 'player_wins';
      return 'player_wins';
    }
    this._lastGameState = 'ongoing';
    return 'ongoing';
  }

  handleGameOver(gameState) {
    if (this.gameOver) return; // Prevent multiple game over handlings

    this.gameOver = true;
    if (gameState === 'player_wins') {
      console.log("VICTORY! All enemy units defeated!");
    } else if (gameState === 'enemies_win') {
      console.log("DEFEAT! All player units have been vanquished!");
    }
  }

  executeEnemyTurn(enemyUnit) {
    if (this.gameOver || !enemyUnit.isAlive()) {
        this.nextTurnAfterAI(false); // false = AI didn't act
        return;
    }
    if (!this.pathfinder) {
      console.error("TurnManager: Pathfinder not set, enemy AI cannot operate.");
      this.nextTurnAfterAI(false);
      return;
    }

    let actionPerformed = false;
    console.log(`Executing turn for enemy: ${enemyUnit.id}`);

    // AI constants
    const AI_ATTACK_AP_COST = 5; // Assuming same cost as player for now
    const AI_MOVE_TILE_COST = 1; // Assuming 1 AP per tile for AI path cost

    // 1. Find Target (Nearest Player Unit)
    let closestPlayerUnit = null;
    let shortestPath = null; // Path to target's exact location
    let pathCostToTarget = Infinity;

    for (const unit of this.allUnits) {
      if (unit.isPlayerControlled && unit.isAlive()) {
        const path = this.pathfinder.findPath(enemyUnit.gridX, enemyUnit.gridY, unit.gridX, unit.gridY);
        if (path && (shortestPath === null || path.length < shortestPath.length)) {
          shortestPath = path;
          closestPlayerUnit = unit;
          pathCostToTarget = path.length -1; // Cost is number of steps
        }
      }
    }

    if (!closestPlayerUnit) {
      console.log(`Enemy ${enemyUnit.id} found no living player units.`);
      this.nextTurnAfterAI(actionPerformed);
      return;
    }
    // No need to check closestPlayerUnit.isAlive() here as it's checked in the loop.
    console.log(`Enemy ${enemyUnit.id} (AP: ${enemyUnit.currentAp}) targeting ${closestPlayerUnit.id}. Path cost: ${pathCostToTarget}`);

    // 2. Attempt to Move closer if not in attack range and can afford to move
    // Check if already in attack range
    let inAttackRange = false;
    for (let r = 1; r <= enemyUnit.attackRange; r++) {
        // Simplified check for adjacency or within range (Manhattan distance)
        if (Math.abs(enemyUnit.gridX - closestPlayerUnit.gridX) + Math.abs(enemyUnit.gridY - closestPlayerUnit.gridY) <= enemyUnit.attackRange) {
            inAttackRange = true;
            break;
        }
    }

    if (!inAttackRange && shortestPath && pathCostToTarget > 0) {
        // Max steps AI can take based on current AP and path cost per tile
        const maxPossibleStepsByAp = Math.floor(enemyUnit.currentAp / AI_MOVE_TILE_COST);
        const stepsToTake = Math.min(maxPossibleStepsByAp, pathCostToTarget);

        if (stepsToTake > 0) {
            const actualMoveCost = stepsToTake * AI_MOVE_TILE_COST;
            if (enemyUnit.canPerformAction(actualMoveCost)) {
                const targetStep = shortestPath[stepsToTake];
                console.log(`Enemy ${enemyUnit.id} moving from (${enemyUnit.gridX},${enemyUnit.gridY}) to (${targetStep[0]},${targetStep[1]}) towards ${closestPlayerUnit.id}. Cost: ${actualMoveCost} AP.`);
                enemyUnit.consumeAp(actualMoveCost);
                enemyUnit.gridX = targetStep[0];
                enemyUnit.gridY = targetStep[1];
                actionPerformed = true;
                // Re-evaluate if now in attack range after moving
                if (Math.abs(enemyUnit.gridX - closestPlayerUnit.gridX) + Math.abs(enemyUnit.gridY - closestPlayerUnit.gridY) <= enemyUnit.attackRange) {
                    inAttackRange = true;
                }
            } else {
                 console.log(`Enemy ${enemyUnit.id} cannot afford to move ${stepsToTake} steps (cost ${actualMoveCost} AP). Has ${enemyUnit.currentAp} AP.`);
            }
        } else {
            console.log(`Enemy ${enemyUnit.id} path to target is 0 or cannot afford even one step.`);
        }
    } else if (inAttackRange) {
        console.log(`Enemy ${enemyUnit.id} is already in attack range of ${closestPlayerUnit.id}.`);
    } else {
        console.log(`Enemy ${enemyUnit.id} has no path or is at target, but not in attack range (should not happen if pathing to target center).`);
    }

    // 3. Attack (if in range and has AP)
    if (inAttackRange && closestPlayerUnit.isAlive()) { // Check target alive again
      if (enemyUnit.canPerformAction(AI_ATTACK_AP_COST)) {
        enemyUnit.consumeAp(AI_ATTACK_AP_COST);
        console.log(`Enemy ${enemyUnit.id} attacks ${closestPlayerUnit.id} for ${enemyUnit.attackPower} damage. Cost: ${AI_ATTACK_AP_COST} AP.`);
        closestPlayerUnit.takeDamage(enemyUnit.attackPower);
        actionPerformed = true;
        if(this.checkAndSetWinLoss()) return; // Game Over check
      } else {
         console.log(`Enemy ${enemyUnit.id} wants to attack but cannot afford AP cost ${AI_ATTACK_AP_COST}. Has ${enemyUnit.currentAp} AP.`);
      }
    }

    // If AI has AP left and could do more (e.g. move again, or attack another target) - for future enhancement.
    // For now, one move and/or one attack attempt.

    if (!actionPerformed) {
        console.log(`Enemy ${enemyUnit.id} ended turn without performing a significant action. AP: ${enemyUnit.currentAp}`);
    }
    this.nextTurnAfterAI(actionPerformed);
  }

  nextTurnAfterAI(aiActed) {
    if (this.gameOver) {
        console.log(`Game is over. AI ${this.activeUnit ? this.activeUnit.id : ''} turn processing ends.`);
        return;
    }
    console.log(`Enemy ${this.activeUnit ? this.activeUnit.id : ''} turn finished.`);
    setTimeout(() => {
      if (!this.gameOver) {
         this.nextTurn();
      }
    }, aiActed ? 1000 : 100); // Shorter delay if AI did nothing
  }

  getActiveUnit() {
    return this.activeUnit;
  }

  isPlayerTurn() {
    return this.activeUnit ? this.activeUnit.isPlayerControlled && this.activeUnit.isAlive() : false;
  }

  getRoundCount() {
    return this.roundCount;
  }

  getUnitAt(x, y) {
    return this.allUnits.find(unit => unit.gridX === x && unit.gridY === y && unit.isAlive());
  }
}

// export default TurnManager;
