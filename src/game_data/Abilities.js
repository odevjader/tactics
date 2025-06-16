/**
 * Defines abilities in the game.
 * Each ability has properties like AP cost, range, target type, and an effect function.
 */
export const ABILITIES = {
    basic_attack: {
        name: 'Attack',
        description: 'A standard melee attack using the unit\'s attack power.',
        apCost: 4, // Standard AP cost for a basic attack
        range: 1,  // Default to unit's current attackRange, or 1 if not specified
        type: 'attack',
        targetType: 'enemy',
        effect: (caster, target) => {
            if (!target || !target.isAlive()) {
                console.log(`${caster.id} tries to use Basic Attack, but target is invalid or defeated.`);
                return;
            }
            const damage = caster.attackPower; // Uses unit's current attackPower
            console.log(`${caster.id} uses Basic Attack on ${target.id} for ${damage} damage!`);
            target.takeDamage(damage);
        }
    },
    power_strike: {
        name: 'Power Strike',
        description: 'A focused melee attack that deals 150% of normal damage.',
        apCost: 6,
        range: 1, // Melee only
        type: 'attack',
        targetType: 'enemy',
        effect: (caster, target) => {
            if (!target || !target.isAlive()) {
                console.log(`${caster.id} tries to use Power Strike, but target is invalid or defeated.`);
                return;
            }
            const damage = Math.floor(caster.attackPower * 1.5);
            console.log(`${caster.id} uses Power Strike on ${target.id} for ${damage} damage!`);
            target.takeDamage(damage);
        }
    },
    ranged_shot: {
        name: 'Ranged Shot',
        description: 'Attack an enemy from a distance using the unit\'s attack power.',
        apCost: 7,
        // range: 0, // If 0, could mean use unit's attackRange. Or specify fixed range here. Let's use unit's attackRange.
                     // If ability has its own range, it should override unit's default attackRange for this ability.
                     // For now, let's assume this ability explicitly has a range.
        range: 5, // Example fixed range for this ability, could also be caster.attackRange
        type: 'attack',
        targetType: 'enemy',
        effect: (caster, target) => {
            if (!target || !target.isAlive()) {
                console.log(`${caster.id} tries to use Ranged Shot, but target is invalid or defeated.`);
                return;
            }
            // For ranged attacks, could add accuracy checks later.
            const damage = caster.attackPower; // Standard damage
            console.log(`${caster.id} uses Ranged Shot on ${target.id} for ${damage} damage!`);
            target.takeDamage(damage);
        }
    },
    basic_heal_self: {
        name: 'Minor Heal',
        description: 'Heals self for a small amount.',
        apCost: 4,
        range: 0, // Self-target
        type: 'heal',
        targetType: 'self',
        effect: (caster, target) => { // target will be caster here
            const healAmount = Math.floor(caster.maxHp * 0.25); // Heals 25% of max HP
            caster.hp += healAmount;
            if (caster.hp > caster.maxHp) {
                caster.hp = caster.maxHp;
            }
            console.log(`${caster.id} uses Minor Heal on self, recovers ${healAmount} HP. Current HP: ${caster.hp}`);
        }
    }
    // TODO: Add 'focus' and 'fireball', 'ice_lance', 'teleport_short' later
};

// If not using ES6 modules, this would be:
// window.ABILITIES = { ... };
// And JOBS.js would need to be loaded first if it references ABILITIES, or vice-versa.
// For now, assuming module context where they can import each other or be globally available.
