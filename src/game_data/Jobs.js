/**
 * Defines the available jobs in the game and their properties.
 */
export const JOBS = {
    NONE: {
        name: 'None',
        description: 'No specific job. Uses base stats.',
        statModifiers: {}, // No modifiers
        abilities: []
    },
    SQUIRE: {
        name: 'Squire',
        description: 'A basic warrior-in-training.',
        statModifiers: {
            maxHp: 10,
            attackPower: 2,
            // Example: if we want to ensure squires have exactly 10 AP, not modify base
            // maxAp: { set: 10 } // Or some other way to denote override vs modify
            // For now, all modifiers are additive.
        },
        abilities: ['power_strike', 'basic_heal_self'] // Placeholder ability IDs
    },
    ARCHER: {
        name: 'Archer',
        description: 'A skilled marksman.',
        statModifiers: {
            maxHp: -5,
            attackPower: 1,
            attackRange: 2, // e.g., base 1 (melee) + 2 = 3 range
            speed: 1 // Slightly faster
        },
        abilities: ['ranged_shot', 'focus'] // Placeholder ability IDs
    },
    WIZARD: {
        name: 'Wizard',
        description: 'A student of arcane arts.',
        statModifiers: {
            maxHp: -10,
            maxAp: 5, // Wizards get more AP
            attackPower: -2, // Weaker physical attack
            speed: -2 // Slower
        },
        abilities: ['fireball', 'ice_lance', 'teleport_short'] // Placeholder ability IDs
    }
};

// To use this in other files (if not using ES6 modules directly in browser):
// If using a bundler like Webpack or Rollup, 'export const JOBS' is standard.
// For direct browser use without modules, you might do:
// window.JOBS = { ... };
// Or ensure files are loaded in an order where JOBS is defined before it's used.
// For this project, we're assuming a context where this export can be imported.
