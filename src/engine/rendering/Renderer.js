/**
 * Handles rendering the isometric grid, tiles, and units onto an HTML5 Canvas.
 */
class Renderer {
  constructor(canvas, grid, tileDisplaySize, tileHeightPixelScale = 10) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.grid = grid;
    this.tileDisplaySize = tileDisplaySize;
    this.tileHeightPixelScale = tileHeightPixelScale;

    this.cameraOffsetX = this.canvas.width / 2;
    this.cameraOffsetY = this.tileDisplaySize.height * 2;

    this.units = [];
    this.selectedTile = null;
    this.turnManager = null;
    this.pathfinder = null;

    this.playerUnitSelectedForAction = false; // True if player is in "move mode"
    this.reachableTiles = [];
    this.playerUnitSelectedForAction = false;
    this.reachableTiles = [];
    this.playerUnitSelectedForAttack = false; // True if player is in "basic attack mode"
    this.attackableTiles = [];

    this.playerSelectedAbilityId = null; // ID of ability chosen from UI/hotkey
    this.abilityTargetableTiles = []; // Tiles valid for selected ability

    // ATTACK_AP_COST is now dynamically fetched from ABILITIES['basic_attack'].apCost

    this._initEventListeners();
  }

  setPathfinder(pathfinder) {
    this.pathfinder = pathfinder;
  }

  setTurnManager(turnManager) {
    this.turnManager = turnManager;
  }

  _initEventListeners() {
    if (this.canvas) {
      this.canvas.addEventListener('click', this.handleMouseClick.bind(this));
    }
    // Event listener for the "Next Ability" button will be set up in main.js
  }

  cycleNextAbility() {
    if (!this.turnManager || !this.turnManager.isPlayerTurn()) {
      this._clearActionStates();
      this._updateAbilityDisplay();
      return;
    }
    const activeUnit = this.turnManager.getActiveUnit();
    if (!activeUnit || !activeUnit.isAlive()) {
      this._clearActionStates();
      this._updateAbilityDisplay();
      return;
    }

    const jobAbilities = activeUnit.getAbilities();
    const availableAbilities = ['basic_attack', ...jobAbilities];

    if (availableAbilities.length === 0) {
      this.playerSelectedAbilityId = null;
      this._clearActionStates(false); // Keep tile selected if any
      this._updateAbilityDisplay();
      return;
    }

    let currentAbilityIndex = -1;
    if (this.playerSelectedAbilityId) {
      currentAbilityIndex = availableAbilities.indexOf(this.playerSelectedAbilityId);
    }

    currentAbilityIndex = (currentAbilityIndex + 1) % availableAbilities.length;
    const nextAbilityId = availableAbilities[currentAbilityIndex];

    // Set to ability mode
    this.playerUnitSelectedForAction = false;
    this.reachableTiles = [];
    this.playerUnitSelectedForAttack = false;
    this.attackableTiles = [];
    this.playerSelectedAbilityId = nextAbilityId;

    this._calculateAbilityTargetableTiles(activeUnit, this.playerSelectedAbilityId);
    this._updateAbilityDisplay();
    console.log(`Selected ability: ${this.playerSelectedAbilityId}`);
  }

  _updateAbilityDisplay() {
     const displayElement = document.getElementById('currentAbilityDisplay');
     if (displayElement) {
        if (this.playerSelectedAbilityId && typeof ABILITIES !== 'undefined' && ABILITIES[this.playerSelectedAbilityId]) {
            const ability = ABILITIES[this.playerSelectedAbilityId];
            displayElement.textContent = `Ability: ${ability.name} (Cost: ${ability.apCost} AP)`;
        } else if (this.playerUnitSelectedForAttack) {
            const basicAttackCost = (typeof ABILITIES !== 'undefined' && ABILITIES['basic_attack']) ? ABILITIES['basic_attack'].apCost : 'N/A';
            displayElement.textContent = `Basic Attack Mode (Cost: ${basicAttackCost} AP)`;
        } else if (this.playerUnitSelectedForAction) {
            displayElement.textContent = 'Movement Mode';
        } else {
            displayElement.textContent = 'No Action Selected';
        }
     }
  }

  handleMouseClick(event) {
    if (!this.turnManager || !this.grid || (this.turnManager.gameOver && !this.turnManager.isPlayerTurn())) return;

    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    const worldMouseX = canvasX - this.cameraOffsetX;
    const worldMouseY = canvasY - this.cameraOffsetY;
    const { worldX: rawGridX, worldY: rawGridY } = this.grid.screenToIsometric(worldMouseX, worldMouseY);
    const clickedGridX = Math.round(rawGridX);
    const clickedGridY = Math.round(rawGridY);

    const activeUnit = this.turnManager.getActiveUnit();

    if (!activeUnit || !this.turnManager.isPlayerTurn() || !activeUnit.isAlive()) {
      this.selectedTile = this.grid.getTile(clickedGridX, clickedGridY) ? {x: clickedGridX, y: clickedGridY} : null;
      this._clearActionStates();
      this._updateAbilityDisplay();
      console.log("Not player's turn, no active/alive unit, or game over. General tile selection:", this.selectedTile);
      return;
    }

    // --- Player's Turn Logic ---

    // 0. If an ABILITY is selected for targeting
    if (this.playerSelectedAbilityId) {
        const abilityData = ABILITIES[this.playerSelectedAbilityId];
        if (!abilityData) { this._clearActionStates(); this._updateAbilityDisplay(); return; }

        const targetTileInfo = this.abilityTargetableTiles.find(t => t.x === clickedGridX && t.y === clickedGridY);
        if (targetTileInfo) {
            if (activeUnit.canPerformAction(abilityData.apCost)) {
                let target = null;
                if (abilityData.targetType === 'enemy' || abilityData.targetType === 'ally') {
                    target = this.turnManager.getUnitAt(clickedGridX, clickedGridY);
                } else if (abilityData.targetType === 'self') {
                    target = activeUnit;
                }

                if (abilityData.targetType === 'self' || (target && target.isAlive())) {
                     if (abilityData.targetType === 'enemy' && target.isPlayerControlled) {
                        console.log("Cannot target friendly unit with enemy-only ability.");
                    } else if (abilityData.targetType === 'ally' && !target.isPlayerControlled && target !== activeUnit) {
                        console.log("Cannot target enemy unit with ally-only ability.");
                    } else {
                        activeUnit.consumeAp(abilityData.apCost);
                        abilityData.effect(activeUnit, target);
                        activeUnit.hasAttackedThisTurn = true; // Using this as a general "major action" flag with AP
                        if(this.turnManager.checkAndSetWinLoss()) { this._updateAbilityDisplay(); return; }
                    }
                } else {
                     console.log(`Invalid target for ability ${this.playerSelectedAbilityId} or target not alive/found.`);
                }
            } else {
                console.log(`${activeUnit.id} does not have enough AP (${activeUnit.currentAp}) for ability ${abilityData.name} (cost: ${abilityData.apCost}).`);
            }
        }
        this._clearActionStates();
        this.selectedTile = this.grid.getTile(clickedGridX, clickedGridY) ? {x: clickedGridX, y: clickedGridY} : null;
        this._calculateReachableTiles(activeUnit);
        this._calculateAttackableTiles(activeUnit); // For basic attack
        this._calculateAbilityTargetableTiles(activeUnit, this.playerSelectedAbilityId); // Re-calc for current ability if any
        this._updateAbilityDisplay();
        return;
    }

    // 1. If selected for basic ATTACK
    if (this.playerUnitSelectedForAttack) {
      const basicAttackData = ABILITIES['basic_attack'];
      if (!basicAttackData) { console.error("Basic Attack not defined!"); this._clearActionStates(); this._updateAbilityDisplay(); return; }
      const attackApCost = basicAttackData.apCost;

      const targetTileInfo = this.attackableTiles.find(t => t.x === clickedGridX && t.y === clickedGridY);
      if (targetTileInfo) {
        const targetUnit = this.turnManager.getUnitAt(clickedGridX, clickedGridY);
        if (targetUnit && !targetUnit.isPlayerControlled) {
          if (activeUnit.canPerformAction(attackApCost)) {
            activeUnit.consumeAp(attackApCost);
            basicAttackData.effect(activeUnit, targetUnit);
            activeUnit.hasAttackedThisTurn = true;
            if(this.turnManager.checkAndSetWinLoss()) { this._updateAbilityDisplay(); return; }
          } else {
            console.log(`${activeUnit.id} does not have enough AP (${activeUnit.currentAp}) to basic attack (cost: ${attackApCost}).`);
          }
        }
      }
      this._clearActionStates();
      this.selectedTile = this.grid.getTile(clickedGridX, clickedGridY) ? {x: clickedGridX, y: clickedGridY} : null;
      this._calculateReachableTiles(activeUnit);
      this._updateAbilityDisplay();
      return;
    }

    // 2. If selected for MOVE (ACTION)
    if (this.playerUnitSelectedForAction) {
      const targetReachableTile = this.reachableTiles.find(t => t.x === clickedGridX && t.y === clickedGridY);
      if (targetReachableTile) {
        const costToMove = targetReachableTile.cost;
        if (activeUnit.canPerformAction(costToMove)) {
          activeUnit.consumeAp(costToMove);
          console.log(`Moving ${activeUnit.id} to (${clickedGridX}, ${clickedGridY}) for ${costToMove} AP.`);
          activeUnit.gridX = clickedGridX;
          activeUnit.gridY = clickedGridY;
          activeUnit.hasMovedThisTurn = true; // Still useful to know if *any* move occurred
          this.selectedTile = { x: clickedGridX, y: clickedGridY };
          this.playerUnitSelectedForAction = true;
          this._calculateReachableTiles(activeUnit);
          this._calculateAttackableTiles(activeUnit);
        } else {
          console.log(`${activeUnit.id} does not have enough AP (${activeUnit.currentAp}) to move. Cost: ${costToMove}`);
        }
      } else {
        console.log("Clicked outside reachable range. Deselecting move action.");
        this._clearActionStates();
        this.selectedTile = this.grid.getTile(clickedGridX, clickedGridY) ? {x: clickedGridX, y: clickedGridY} : null;
      }
      this._updateAbilityDisplay();
      return;
    }

    // 3. If NO action selected yet (IDLE state for the unit), determine action based on click
    if (clickedGridX === activeUnit.gridX && clickedGridY === activeUnit.gridY) {
      // Clicked on the active unit: Default to showing move options if AP > 0
      if (activeUnit.currentAp > 0) {
        console.log(`Selected active unit ${activeUnit.id}. Defaulting to MOVE mode.`);
        this.playerUnitSelectedForAction = true;
        this.playerUnitSelectedForAttack = false;
        this.playerSelectedAbilityId = null;
        this._calculateReachableTiles(activeUnit);
      } else {
        console.log(`Active unit ${activeUnit.id} has no AP for actions.`);
        this._clearActionStates(false);
      }
      this.selectedTile = { x: clickedGridX, y: clickedGridY };
    } else {
      this.selectedTile = this.grid.getTile(clickedGridX, clickedGridY) ? {x: clickedGridX, y: clickedGridY} : null;
      this._clearActionStates();
      console.log("General tile selection:", this.selectedTile);
    }
    this._updateAbilityDisplay();
  }

  _clearActionStates(clearSelectedTileToo = true) {
    this.playerUnitSelectedForAction = false;
    this.reachableTiles = [];
    this.playerUnitSelectedForAttack = false;
    this.attackableTiles = [];
    this.playerSelectedAbilityId = null;
    this.abilityTargetableTiles = [];
    if (clearSelectedTileToo) {
        this.selectedTile = null;
    }
    // Note: _updateAbilityDisplay() is usually called by the caller of _clearActionStates
  }

  _calculateReachableTiles(unit) {
    this.reachableTiles = [];
    if (!this.pathfinder || !unit || unit.currentAp < 1 ) { // Min cost to move is 1
      if (this.playerUnitSelectedForAction && unit && unit.currentAp < 1) {
          this.playerUnitSelectedForAction = false;
          console.log(`${unit.id} has not enough AP left to move.`);
      }
      return;
    }
    this.reachableTiles = this.pathfinder.getReachableTiles(unit.gridX, unit.gridY, unit.currentAp);
    console.log(`Calculated ${this.reachableTiles.length} movement tiles for ${unit.id} with ${unit.currentAp} AP.`);
  }

  _calculateAttackableTiles(unit) { // For Basic Attack
    this.attackableTiles = [];
    const basicAttackData = (typeof ABILITIES !== 'undefined') ? ABILITIES['basic_attack'] : null;
    const attackApCost = basicAttackData ? basicAttackData.apCost : 999; // High cost if not defined

    if (!this.turnManager || !unit || unit.attackRange <= 0 || !unit.canPerformAction(attackApCost) || unit.hasAttackedThisTurn) {
        if (this.playerUnitSelectedForAttack && unit && (!unit.canPerformAction(attackApCost) || unit.hasAttackedThisTurn)) {
            this.playerUnitSelectedForAttack = false;
             console.log(`${unit.id} cannot basic attack (Not enough AP or already attacked).`);
        }
      return;
    }
    const range = basicAttackData.range > 0 ? basicAttackData.range : unit.attackRange;
    const directions = [ { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: -1 }, { dx: -1, dy: 1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 1 } ];
    for(const dir of directions) {
        const targetX = unit.gridX + dir.dx;
        const targetY = unit.gridY + dir.dy;
        if (Math.abs(unit.gridX - targetX) + Math.abs(unit.gridY - targetY) > range) continue;

        const targetUnitOnTile = this.turnManager.getUnitAt(targetX, targetY);
        if (targetUnitOnTile && !targetUnitOnTile.isPlayerControlled && targetUnitOnTile.isAlive()) {
          if (!this.attackableTiles.find(t => t.x === targetX && t.y === targetY)) {
            this.attackableTiles.push({ x: targetX, y: targetY });
          }
        }
    }
    console.log(`Calculated ${this.attackableTiles.length} basic attack targets for ${unit.id}.`);
  }

  _calculateAbilityTargetableTiles(unit, abilityId) {
    this.abilityTargetableTiles = [];
    if (!this.turnManager || !unit || !abilityId || typeof ABILITIES === 'undefined' || !ABILITIES[abilityId]) {
      console.warn("Cannot calculate ability targets: missing data.", {unitId: unit? unit.id : 'N/A', abilityId});
      this.playerSelectedAbilityId = null; this._updateAbilityDisplay();
      return;
    }
    const abilityData = ABILITIES[abilityId];
    if (!unit.canPerformAction(abilityData.apCost)) {
      console.log(`${unit.id} cannot use ${abilityData.name}, not enough AP (${unit.currentAp} / ${abilityData.apCost}).`);
      this.playerSelectedAbilityId = null;
      this._updateAbilityDisplay();
      return;
    }

    const range = abilityData.range; // Use ability's own range definition

    if (abilityData.targetType === 'self') {
        this.abilityTargetableTiles.push({ x: unit.gridX, y: unit.gridY });
    } else {
        // Using BFS to find all tiles within 'range' (Manhattan distance for now)
        const q = [{x: unit.gridX, y: unit.gridY, cost: 0}];
        const visited = new Set([`${unit.gridX},${unit.gridY}`]);
        // For abilities, usually 4-directional or 8-directional direct range, not pathfinding.
        const directions = [ { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: -1, dy: -1 }, { dx: -1, dy: 1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 1 } ];

        let head = 0;
        if (range > 0) { // Only explore if range > 0
            while(head < q.length) {
                const curr = q[head++];

                for(const dir of directions) {
                    const nx = curr.x + dir.dx;
                    const ny = curr.y + dir.dy;
                    const key = `${nx},${ny}`;

                    if (visited.has(key)) continue;

                    const tileOnGrid = this.grid.getTile(nx,ny);
                    if(!tileOnGrid) continue;

                    const newCost = Math.abs(unit.gridX - nx) + Math.abs(unit.gridY - ny); // Manhattan from origin for this ability type

                    if (newCost <= range) {
                        visited.add(key); // Add to visited before pushing to queue for this type of range
                        q.push({x:nx, y:ny, cost: newCost}); // Cost here is for BFS depth, not AP for ability

                        // Check if this tile is a valid target based on type
                        const unitOnTargetTile = this.turnManager.getUnitAt(nx, ny);
                        if (abilityData.targetType === 'enemy') {
                            if (unitOnTargetTile && !unitOnTargetTile.isPlayerControlled && unitOnTargetTile.isAlive()) {
                                this.abilityTargetableTiles.push({ x: nx, y: ny });
                            }
                        } else if (abilityData.targetType === 'ally') {
                             if (unitOnTargetTile && unitOnTargetTile.isPlayerControlled && unitOnTargetTile.isAlive()) {
                                this.abilityTargetableTiles.push({ x: nx, y: ny });
                            }
                        } else if (abilityData.targetType === 'tile') {
                            this.abilityTargetableTiles.push({ x: nx, y: ny });
                        }
                    }
                }
            }
        }
    }
    console.log(`Calculated ${this.abilityTargetableTiles.length} targets for ability ${abilityId} by ${unit.id}.`);
  }

  addUnit(unit) { if (unit) { this.units.push(unit); } }
  _getTileDepthSortValue(tile) { return (tile.x * 1) + (tile.y * 1000) + tile.height; }
  _getTileScreenPosition(tile) { const isoCoords = this.grid.worldToIsometric(tile.x, tile.y); const heightAdjust = tile.height * this.tileHeightPixelScale; const finalScreenY = isoCoords.screenY - heightAdjust + this.cameraOffsetY; const finalScreenX = isoCoords.screenX + this.cameraOffsetX; return { screenX: finalScreenX, screenY: finalScreenY }; }
  _drawTile(tile) { if (!tile) return; const { screenX, screenY } = this._getTileScreenPosition(tile); this.ctx.beginPath(); this.ctx.moveTo(screenX, screenY); this.ctx.lineTo(screenX + this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.lineTo(screenX, screenY + this.tileDisplaySize.height); this.ctx.lineTo(screenX - this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.closePath(); this.ctx.fillStyle = this._getTileColor(tile); this.ctx.fill(); this.ctx.strokeStyle = 'lightgrey'; this.ctx.lineWidth = 1; this.ctx.stroke(); if (tile.height > 0) { this._drawTileSides(screenX, screenY, tile); } if (this.selectedTile && tile.x === this.selectedTile.x && tile.y === this.selectedTile.y && !this.playerUnitSelectedForAction && !this.playerUnitSelectedForAttack && !this.playerSelectedAbilityId) { this.ctx.strokeStyle = 'yellow';  this.ctx.lineWidth = 2; this._strokeTileDiamond(screenX, screenY); this.ctx.lineWidth = 1;  } if (this.playerUnitSelectedForAction && this.reachableTiles.find(t => t.x === tile.x && t.y === tile.y)) { this.ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';  this._fillTileDiamond(screenX, screenY); this.ctx.strokeStyle = 'blue'; this.ctx.lineWidth = 1; this._strokeTileDiamond(screenX, screenY); } if (this.playerUnitSelectedForAttack && !this.playerUnitSelectedForAction && !this.playerSelectedAbilityId && this.attackableTiles.find(t => t.x === tile.x && t.y === tile.y)) { this.ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';  this._fillTileDiamond(screenX, screenY); this.ctx.strokeStyle = 'red'; this.ctx.lineWidth = 1; this._strokeTileDiamond(screenX, screenY); } if (this.playerSelectedAbilityId && this.abilityTargetableTiles.find(t => t.x === tile.x && t.y === tile.y)) { this.ctx.fillStyle = 'rgba(128, 0, 128, 0.4)'; this._fillTileDiamond(screenX, screenY); this.ctx.strokeStyle = 'purple'; this.ctx.lineWidth = 1; this._strokeTileDiamond(screenX, screenY); } }
  _fillTileDiamond(screenX, screenY) { this.ctx.beginPath(); this.ctx.moveTo(screenX, screenY); this.ctx.lineTo(screenX + this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.lineTo(screenX, screenY + this.tileDisplaySize.height); this.ctx.lineTo(screenX - this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.closePath(); this.ctx.fill(); }
  _strokeTileDiamond(screenX, screenY) { this.ctx.beginPath(); this.ctx.moveTo(screenX, screenY); this.ctx.lineTo(screenX + this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.lineTo(screenX, screenY + this.tileDisplaySize.height); this.ctx.lineTo(screenX - this.tileDisplaySize.width / 2, screenY + this.tileDisplaySize.height / 2); this.ctx.closePath(); this.ctx.stroke(); }
  _drawUnit(unit) {  if (!unit) return; const tile = this.grid.getTile(unit.gridX, unit.gridY); if (!tile) return; const isoCoords = this.grid.worldToIsometric(unit.gridX, unit.gridY); let unitScreenY = isoCoords.screenY - (tile.height * this.tileHeightPixelScale); unitScreenY -= unit.unitElevation * this.tileHeightPixelScale; unitScreenY -= unit.displayHeightOffset; const unitScreenX = isoCoords.screenX + this.cameraOffsetX; const finalScreenY = unitScreenY + this.cameraOffsetY; if (unit.spriteSheet && unit.spriteSheet.loaded) { const anim = unit.spriteSheet.frames.get(unit.currentAnimation); if (anim && anim.indices.length > 0) { const sheetFrameIndex = anim.indices[unit.animationFrameIndex]; const framesPerRow = Math.floor(unit.spriteSheet.image.width / unit.spriteSheet.frameWidth); const sx = (sheetFrameIndex % framesPerRow) * unit.spriteSheet.frameWidth; const sy = Math.floor(sheetFrameIndex / framesPerRow) * unit.spriteSheet.frameHeight; const destX = unitScreenX - unit.spriteSheet.frameWidth / 2; const destY = finalScreenY - unit.spriteSheet.frameHeight; this.ctx.drawImage( unit.spriteSheet.image, sx, sy, unit.spriteSheet.frameWidth, unit.spriteSheet.frameHeight, destX, destY, unit.spriteSheet.frameWidth, unit.spriteSheet.frameHeight ); } else { this.ctx.fillStyle = 'magenta'; this.ctx.fillRect( unitScreenX - 10 / 2, finalScreenY - 20, 10, 20 ); } } else { this.ctx.fillStyle = unit.sprite || 'grey'; const fallbackWidth = unit.size ? unit.size.width : 10; const fallbackHeight = unit.size ? unit.size.height : 20; this.ctx.fillRect( unitScreenX - fallbackWidth / 2, finalScreenY - fallbackHeight, fallbackWidth, fallbackHeight ); } }
  _getTileColor(tile) { if (!tile.walkable) return '#555555'; if (tile.terrainType === 'water') return '#3498db'; const baseGreen = 150; const heightShade = Math.max(0, Math.min(100, tile.height * 15)); return `rgb(50, ${Math.min(255, baseGreen + heightShade)}, 50)`; }
  _drawTileSides(topScreenX, topScreenY, tile) { const tileDepth = tile.height * this.tileHeightPixelScale; if (tileDepth <= 0) return; const rightX = topScreenX + this.tileDisplaySize.width / 2; const rightY = topScreenY + this.tileDisplaySize.height / 2; const bottomX = topScreenX; const bottomY = topScreenY + this.tileDisplaySize.height; const leftX = topScreenX - this.tileDisplaySize.width / 2; const leftY = topScreenY + this.tileDisplaySize.height / 2; const sideColorDark = 'rgba(0,0,0,0.3)'; const sideColorLight = 'rgba(0,0,0,0.15)'; this.ctx.beginPath(); this.ctx.moveTo(rightX, rightY); this.ctx.lineTo(rightX, rightY + tileDepth); this.ctx.lineTo(bottomX, bottomY + tileDepth); this.ctx.lineTo(bottomX, bottomY); this.ctx.closePath(); this.ctx.fillStyle = sideColorDark; this.ctx.fill(); this.ctx.beginPath(); this.ctx.moveTo(leftX, leftY); this.ctx.lineTo(leftX, leftY + tileDepth); this.ctx.lineTo(bottomX, bottomY + tileDepth); this.ctx.lineTo(bottomX, bottomY); this.ctx.closePath(); this.ctx.fillStyle = sideColorLight; this.ctx.fill(); }
  render() { if (!this.ctx || !this.canvas || !this.grid) { console.error("Renderer not properly initialized."); return; } this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); const renderables = []; for (let y = 0; y < this.grid.gridHeight; y++) { for (let x = 0; x < this.grid.gridWidth; x++) { const tile = this.grid.getTile(x, y); if (tile) { renderables.push({ type: 'tile', object: tile, depthValue: this._getTileDepthSortValue(tile) }); } } } for (const unit of this.units) { if (unit.isAlive()) { const tile = this.grid.getTile(unit.gridX, unit.gridY); if (tile) { renderables.push({ type: 'unit', object: unit, depthValue: unit.getDepthSortValue(tile.height) }); } } } renderables.sort((a, b) => a.depthValue - b.depthValue); for (const item of renderables) { if (item.type === 'tile') { this._drawTile(item.object); } else if (item.type === 'unit') { if (item.object.isAlive()) { this._drawUnit(item.object); } } } if (this.turnManager) { if (this.turnManager.gameOver) { this._drawGameOverScreen(); } else { this._drawCombatUI(); } } }
  _drawCombatUI() {
    if (!this.turnManager || !this.turnManager.getActiveUnit() || !this.turnManager.getActiveUnit().isAlive()) {
      return;
    }

    const activeUnit = this.turnManager.getActiveUnit();
    const jobName = (typeof JOBS !== 'undefined' && JOBS[activeUnit.jobId]) ? JOBS[activeUnit.jobId].name : 'No Job';
    const turnText = `Round: ${this.turnManager.getRoundCount()} - Turn: ${activeUnit.id} (${jobName} - ${activeUnit.isPlayerControlled ? 'Player' : 'Enemy'})`;
    const apText = `AP: ${activeUnit.currentAp}/${activeUnit.maxAp}`; // AP display added
    const hpText = `HP: ${activeUnit.hp}/${activeUnit.maxHp}`;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(10, 10, this.canvas.width - 20, 40);

    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';

    const padding = 15;
    let currentX = 20; // Start X for turnText
    this.ctx.fillText(turnText, currentX, 35); // Turn text drawn first

    // Right aligned info (HP and AP)
    currentX = this.canvas.width - 20; // Reset X to right edge
    this.ctx.textAlign = 'right';
    this.ctx.fillText(hpText, currentX, 35);
    currentX -= this.ctx.measureText(hpText).width + padding; // Move left for AP text
    this.ctx.fillText(apText, currentX, 35);

    this.ctx.textAlign = 'left';
  }

  _drawGameOverScreen() { if (!this.turnManager || !this.turnManager.gameOver) return; const gameState = this.turnManager.checkWinLossConditions(); let message = "GAME OVER"; if (gameState === 'player_wins') { message = "VICTORY!"; } else if (gameState === 'enemies_win') { message = "DEFEAT!"; } this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'; this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);  this.ctx.font = 'bold 48px Arial'; this.ctx.fillStyle = 'white'; this.ctx.textAlign = 'center'; this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2); this.ctx.font = '24px Arial'; this.ctx.fillText("Refresh page to play again.", this.canvas.width / 2, this.canvas.height / 2 + 50); }
}

// export default Renderer;
