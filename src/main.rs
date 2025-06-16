mod data_defs;
mod data_loading;
mod components;
mod state;

use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins) // Added DefaultPlugins for basic Bevy functionality (logging, window, etc.)
        .add_plugins(crate::data_loading::DataLoadingPlugin) // Added our DataLoadingPlugin
        .add_plugins(crate::state::MinimalStatePlugin) // Added our MinimalStatePlugin
        .run();
}
