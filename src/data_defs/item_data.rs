use serde::{Serialize, Deserialize};
use bevy::prelude::Resource;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum ItemType {
    Weapon,
    Armor,
    Consumable,
}

#[derive(Debug, Serialize, Deserialize, Clone, Resource)] // Added Resource derive
#[serde(deny_unknown_fields)]
pub struct ItemData {
    pub id: String,
    pub name: String,
    pub description: String,
    pub item_type: ItemType,
    pub base_power: Option<u32>, // e.g., for weapons or healing items
    pub defense: Option<u32>,    // e.g., for armor
}

// Collection resource
#[derive(Debug, Default, Clone, Resource)]
pub struct AllItems(pub Vec<ItemData>);

impl From<Vec<ItemData>> for AllItems {
    fn from(items: Vec<ItemData>) -> Self {
        AllItems(items)
    }
}
