use bevy::prelude::*;
use std::{fs::{self, File}, io::Read}; // Removed path::Path
use crate::data_defs::{
    class_data::{AllClasses, ClassData},
    item_data::{AllItems, ItemData},
}; // Assuming data_defs is made public at crate root or accessible

// Generic loader function
fn load_ron_files_from_dir<T, R>(dir_path: &str, asset_name: &str) -> R
where
    T: serde::de::DeserializeOwned + Send + Sync + 'static + Clone, // Added Clone
    R: Resource + Default + From<Vec<T>>,
{
    let mut loaded_data = Vec::new();
    match fs::read_dir(dir_path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let path = entry.path();
                        if path.is_file() && path.extension().map_or(false, |ext| ext == "ron") {
                            info!("Loading {}: {:?}", asset_name, path);
                            match File::open(&path) {
                                Ok(mut file) => {
                                    let mut content = String::new();
                                    if file.read_to_string(&mut content).is_ok() {
                                        match ron::from_str::<T>(&content) {
                                            Ok(data) => loaded_data.push(data),
                                            Err(e) => error!("Failed to parse {}: {:?}. Error: {}", asset_name, path, e),
                                        }
                                    } else {
                                        error!("Failed to read {}: {:?}", asset_name, path);
                                    }
                                }
                                Err(e) => error!("Failed to open {}: {:?}. Error: {}", asset_name, path, e),
                            }
                        }
                    }
                    Err(e) => error!("Failed to read directory entry in {}. Error: {}", dir_path, e),
                }
            }
        }
        Err(e) => error!("Failed to read directory {}. Error: {}", dir_path, e),
    }
    R::from(loaded_data)
}

pub fn load_all_data_system(mut commands: Commands) {
    info!("Starting to load all game data...");

    let classes = load_ron_files_from_dir::<ClassData, AllClasses>("assets/data/classes", "ClassData");
    if !classes.0.is_empty() {
        info!("Successfully loaded {} classes.", classes.0.len());
        for class_info in &classes.0 {
            info!("Loaded Class: {} ({})", class_info.name, class_info.id);
        }
    } else {
        warn!("No classes loaded or failed to load all classes.");
    }
    commands.insert_resource(classes);

    let items = load_ron_files_from_dir::<ItemData, AllItems>("assets/data/items", "ItemData");
    if !items.0.is_empty() {
        info!("Successfully loaded {} items.", items.0.len());
         for item_info in &items.0 {
            info!("Loaded Item: {} ({})", item_info.name, item_info.id);
        }
    } else {
        warn!("No items loaded or failed to load all items.");
    }
    commands.insert_resource(items);

    info!("Finished loading all game data.");
}

// Plugin to group data loading
pub struct DataLoadingPlugin;

impl Plugin for DataLoadingPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, load_all_data_system);
    }
}
