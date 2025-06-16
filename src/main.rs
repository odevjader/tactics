mod data_defs;
mod data_loading; // Added module

use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins) // Added DefaultPlugins for basic Bevy functionality (logging, window, etc.)
        .add_plugins(crate::data_loading::DataLoadingPlugin) // Added our DataLoadingPlugin
        .run();
}
