/**
 * Represents a game unit or entity.
 */
class Unit {
  /**
   * Creates a new Unit instance.
   * @param {string} id - A unique identifier for the unit.
   * @param {number} gridX - The initial x-coordinate of the unit on the isometric grid.
   * @param {number} gridY - The initial y-coordinate of the unit on the isometric grid.
   * @param {SpriteSheet} spriteSheet - The SpriteSheet instance for this unit.
   * @param {object} baseStatsInput - Object containing the unit's base stats before job modifiers.
   * @param {string} jobId - The ID of the unit's job (e.g., 'SQUIRE', 'ARCHER').
   * @param {boolean} [isPlayerControlled=false] - Whether the unit is player-controlled.
   * @param {string} [initialAnimation='idle'] - The name of the initial animation to play.
   * @param {number} [displayHeightOffset=0] - Optional offset to adjust unit's Y position visually.
   */
  constructor(id, gridX, gridY, spriteSheet, baseStatsInput, jobId = 'NONE', isPlayerControlled = false, initialAnimation = 'idle', displayHeightOffset = 0) {
    this.id = id;
    this.gridX = gridX;
    this.gridY = gridY;

    this.spriteSheet = spriteSheet;
    this.currentAnimation = initialAnimation;
    this.animationFrameIndex = 0;
    this.animationTimer = 0;

    // Store base stats and apply job modifiers
    this.baseStats = { ...baseStatsInput };
    this.jobId = jobId;
    this._applyJobModifiers(); // This will set actual maxHp, hp, attackPower, etc.

    // Initialize current AP to (potentially job-modified) maxAp
    this.currentAp = this.maxAp;

    this.isPlayerControlled = isPlayerControlled;
    this.isDefeated = false;

    this.hasMovedThisTurn = false;
    this.hasAttackedThisTurn = false;

    this.unitElevation = 0;
    this.displayHeightOffset = displayHeightOffset;
  }

  /**
   * Applies stat modifiers from the unit's job to its base stats.
   * This should be called after baseStats and jobId are set.
   * @private
   */
  _applyJobModifiers() {
    // Import JOBS. Assuming JOBS is available globally or via import if using modules.
    // If not using ES6 modules in browser, JOBS would need to be on window object or similar.
    // For this environment, direct access or a placeholder is fine.
    const jobData = typeof JOBS !== 'undefined' ? JOBS[this.jobId] : null;

    // Initialize stats from base stats
    this.maxHp = this.baseStats.maxHp || 50; // Default base if not provided
    this.hp = this.maxHp; // Full HP at start
    this.maxAp = this.baseStats.maxAp || 10;
    this.attackPower = this.baseStats.attackPower || 5;
    this.attackRange = this.baseStats.attackRange || 1;
    this.speed = this.baseStats.speed || 30;
    this.moveRange = this.baseStats.moveRange || 4; // Still here, but AP is primary for movement cost

    if (jobData && jobData.statModifiers) {
      const modifiers = jobData.statModifiers;
      this.maxHp += (modifiers.maxHp || 0);
      this.hp = this.maxHp; // Correct HP to new max after modification
      this.maxAp += (modifiers.maxAp || 0);
      this.attackPower += (modifiers.attackPower || 0);
      this.attackRange += (modifiers.attackRange || 0);
      this.speed += (modifiers.speed || 0);
      this.moveRange += (modifiers.moveRange || 0);
      // Ensure stats don't go below reasonable minimums (e.g., 1 HP, 0 for others)
      if (this.maxHp < 1) this.maxHp = 1;
      if (this.hp < 1) this.hp = 1; // If modifiers made it negative, bring to 1
      if (this.maxAp < 0) this.maxAp = 0;
      if (this.attackPower < 0) this.attackPower = 0;
      if (this.attackRange < 1) this.attackRange = 1; // Min attack range usually 1 (self/melee)
      if (this.speed < 1) this.speed = 1;
      if (this.moveRange < 0) this.moveRange = 0;
      console.log(`Applied job modifiers for ${this.jobId} to ${this.id}. Final MaxHP: ${this.maxHp}, AP: ${this.maxAp}, ATK: ${this.attackPower}`);
    } else {
        console.log(`No job modifiers found for ${this.jobId} on ${this.id}, using base stats.`);
    }
  }

  /**
   * Resets turn-specific flags and AP for the unit.
   */
  resetTurnState() {
    this.currentAp = this.maxAp; // maxAp is now job-modified
    this.hasMovedThisTurn = false;
    this.hasAttackedThisTurn = false;
    console.log(`Unit ${this.id} turn state reset. AP: ${this.currentAp}/${this.maxAp}`);
  }

  /**
   * Checks if the unit can perform an action with the given AP cost.
   * @param {number} apCost - The AP cost of the action.
   * @returns {boolean} True if the unit has enough AP, false otherwise.
   */
  canPerformAction(apCost) {
    return this.currentAp >= apCost;
  }

  /**
   * Consumes AP for an action.
   * @param {number} apCost - The AP cost of the action.
   * @returns {boolean} True if AP was successfully consumed, false otherwise.
   */
  consumeAp(apCost) {
    if (this.canPerformAction(apCost)) {
      this.currentAp -= apCost;
      console.log(`Unit ${this.id} consumed ${apCost} AP. Remaining AP: ${this.currentAp}`);
      return true;
    }
    console.log(`Unit ${this.id} FAILED to consume ${apCost} AP. Current AP: ${this.currentAp}`);
    return false;
  }

  /**
   * Reduces unit's HP by a given amount.
   * @param {number} damageAmount - The amount of damage to take.
   */
  takeDamage(damageAmount) {
    this.hp -= damageAmount;
    if (this.hp <= 0) {
      this.hp = 0;
      if (!this.isDefeated) {
        this.isDefeated = true;
        console.log(`Unit ${this.id} has been defeated!`);
      }
    } else {
        console.log(`Unit ${this.id} takes ${damageAmount} damage, HP is now ${this.hp}/${this.maxHp}`);
    }
  }

  isAlive() {
    return !this.isDefeated;
  }

  updateAnimation(deltaTime) {
    if (!this.spriteSheet || !this.spriteSheet.loaded || !this.currentAnimation) {
      return;
    }
    const anim = this.spriteSheet.frames.get(this.currentAnimation);
    if (!anim || !anim.indices || anim.indices.length === 0) {
      return;
    }
    this.animationTimer += deltaTime;
    const timePerFrame = 1 / anim.speed;
    if (this.animationTimer >= timePerFrame) {
      this.animationTimer -= timePerFrame;
      this.animationFrameIndex = (this.animationFrameIndex + 1) % anim.indices.length;
    }
  }

  getDepthSortValue(tileHeight) {
    return (this.gridX * 1) + (this.gridY * 1000) + (tileHeight + this.unitElevation);
  }

  setPosition(newGridX, newGridY) {
    this.gridX = newGridX;
    this.gridY = newGridY;
  }

  /**
   * Gets the list of ability IDs for the unit's current job.
   * @returns {Array<string>} An array of ability IDs.
   */
  getAbilities() {
    const jobData = typeof JOBS !== 'undefined' ? JOBS[this.jobId] : null;
    return jobData && jobData.abilities ? jobData.abilities : [];
  }
}

// export default Unit;
