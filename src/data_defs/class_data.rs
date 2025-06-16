use serde::{Serialize, Deserialize};
use bevy::prelude::Resource; // For storing as a Bevy resource

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ClassAttributes {
    pub strength: u32,
    pub dexterity: u32,
    pub intelligence: u32,
    // Add other attributes as needed
}

#[derive(Debug, Serialize, Deserialize, Clone, Resource)] // Added Resource derive
#[serde(deny_unknown_fields)]
pub struct ClassData {
    pub id: String,
    pub name: String,
    pub description: String,
    pub base_attributes: ClassAttributes,
    pub hp_per_vitality: u32, // Example of a class-specific mechanic
    pub mp_per_intelligence: u32, // Example
}

// Collection resource
#[derive(Debug, Default, Clone, Resource)]
pub struct AllClasses(pub Vec<ClassData>);

impl From<Vec<ClassData>> for AllClasses {
    fn from(classes: Vec<ClassData>) -> Self {
        AllClasses(classes)
    }
}
