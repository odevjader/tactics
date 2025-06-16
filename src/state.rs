// src/state.rs - Game State Machine (Simplified)

use bevy::prelude::*;

#[derive(States, Debug, Clone, Copy, Eq, PartialEq, Hash, Default)]
pub enum GameState {
    #[default]
    MainMenu,
    WorldMap,
    PartyManagement,
    BattleLoading,
    Battle,
    BattleVictoryScreen,
}

// Plugin to initialize the state
pub struct MinimalStatePlugin;

impl Plugin for MinimalStatePlugin {
    fn build(&self, app: &mut App) {
        app.add_state::<GameState>(); // Using add_state, which also initializes to default

        // Add a single system that logs the current state to verify it's working
        // This system will run in any state if not restricted.
        app.add_systems(Update, log_current_state_system);

        // Add a system to transition state on input - simplified
        app.add_systems(Update, test_state_transition_simplified);
    }
}

fn log_current_state_system(current_state: Res<State<GameState>>) {
    // This log can be very verbose, so only log if state changes or once.
    // For now, let it be verbose for debugging if it even runs.
    // info!("Current GameState: {:?}", current_state.get());
}

fn test_state_transition_simplified(
    keyboard_input: Res<Input<KeyCode>>, // Corrected: Use Res<Input<KeyCode>> for Bevy 0.12
    current_state: Res<State<GameState>>,
    mut next_state: ResMut<NextState<GameState>>
) {
    if keyboard_input.just_pressed(KeyCode::S) { // Corrected to KeyCode::S
        let current = current_state.get();
        match current {
            GameState::MainMenu => {
                info!("Key S: Transitioning MainMenu -> BattleLoading");
                next_state.set(GameState::BattleLoading);
            }
            GameState::BattleLoading => {
                info!("Key S: Transitioning BattleLoading -> MainMenu");
                next_state.set(GameState::MainMenu);
            }
            _ => {
                info!("Key S: In state {:?}, no specific transition, going to MainMenu", current);
                next_state.set(GameState::MainMenu);
            }
        }
    }
}
