// src/components.rs - Core Component Library

use bevy::prelude::*;
use std::collections::HashMap;

// --- Helper Enums/Structs (Placeholders, to be expanded later) ---

#[derive(Debug, Clone, PartialEq, Eq, Hash, Default, Component)] // Added Default for AIControlled, Added Component
pub enum AIProfile {
    #[default]
    Guard, // Example: Stays put until enemy in range
    Aggressive, // Example: Moves towards nearest enemy
    Support,    // Example: Stays near allies and buffs/heals
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Component)] // Added Component
pub enum StatusEffectType {
    Poison,
    Slow,
    Haste,
    Regen,
    // ... other status effects
}

#[derive(Debug, Clone, Component)] // Also a component to be attached to entities having the status
pub struct StatusEffect {
    pub effect_type: StatusEffectType,
    pub duration_ticks: u32, // How long it lasts in game 'ticks' or turns
    pub magnitude: Option<f32>, // e.g., damage per tick for poison, speed change for slow/haste
    // pub source_entity: Option<Entity>, // Optional: who applied it
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Component)] // Added Component
pub enum Element {
    Fire,
    Water,
    Earth,
    Air,
    Light,
    Dark,
    Physical, // For non-elemental physical damage
}

// --- Identity Components ---

#[derive(Component, Debug, Clone)]
pub struct UnitID(pub String);

#[derive(Component, Debug, Clone)]
pub struct Name(pub String);

#[derive(Component, Debug, Clone, Default)] // Default for easy adding
pub struct PlayerControlled; // Marker component

#[derive(Component, Debug, Clone, Default)]
pub struct AIControlled {
    pub profile: AIProfile,
}

// --- Stats Components ---

#[derive(Component, Debug, Clone, Default)]
pub struct PrimaryStats {
    pub strength: u32,
    pub dexterity: u32,
    pub agility: u32,    // Often influences turn order, evasion
    pub intelligence: u32, // Affects magic power, MP
    pub vitality: u32,   // Affects HP
    pub luck: u32,       // Affects critical hits, rare item drops, etc.
}

#[derive(Component, Debug, Clone, Default)]
pub struct DerivedStats {
    pub hp: u32,
    pub max_hp: u32,
    pub mp: u32,
    pub max_mp: u32,
    pub attack_power: u32,      // Physical attack
    pub defense: u32,           // Physical defense
    pub magic_attack_power: u32,// Magical attack
    pub magic_defense: u32,     // Magical defense
    pub hit_chance: f32,        // Base chance to hit, often vs evasion
    pub evasion_chance: f32,    // Chance to evade attacks
    pub crit_chance: f32,       // Chance to land a critical hit
    pub crit_damage_multiplier: f32, // e.g., 1.5 for 150% damage
    pub move_range: u32,        // How many tiles a unit can move
    pub jump_height: u32,       // How high a unit can jump
}
// Note: A separate system will be responsible for calculating DerivedStats
// based on PrimaryStats, equipment, buffs/debuffs, etc.

// --- Battle State Components ---

#[derive(Component, Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
pub struct GridPosition {
    pub x: i32,
    pub y: i32, // Could represent rows, or depth in some isometric views
    pub z: i32, // Could represent height, or columns
}

#[derive(Component, Debug, Clone, Default)]
pub struct ActionPoints(pub u32); // Current AP

#[derive(Component, Debug, Clone, Default)]
pub struct ChargeTime(pub u32); // Current CT for FFT-like turn systems

#[derive(Component, Debug, Clone, Default)]
pub struct CurrentStatusEffects(pub Vec<StatusEffect>); // List of active status effects

#[derive(Component, Debug, Clone, Default)]
pub struct Resistances(pub HashMap<Element, f32>); // Value is a multiplier, e.g., 0.5 for 50% resistance, 1.5 for 50% weakness

// It's good practice to have a prelude for your components
pub mod prelude {
    pub use super::{
        AIProfile, StatusEffect, StatusEffectType, Element,
        UnitID, Name, PlayerControlled, AIControlled,
        PrimaryStats, DerivedStats,
        GridPosition, ActionPoints, ChargeTime, CurrentStatusEffects, Resistances,
    };
}
