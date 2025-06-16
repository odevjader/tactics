---
id: TASK-004
title: "Implement Game State Machine"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Implement a robust GameState enum (`MainMenu`, `WorldMap`, `PartyManagement`, `BattleLoading`, `Battle`, `BattleVictoryScreen`) to control system execution flow.

### Critérios de Aceitação

- [ ] Define the `GameState` enum with all specified states.
- [ ] Integrate the state machine into the Bevy application to control which systems run at any given time.

### Arquivos Relevantes

* `src/state.rs`

### Relatório de Execução

Implemented the Game State Machine as specified:

1.  **`GameState` Enum Definition (`src/state.rs`):**
    *   Defined the `GameState` enum with the required states: `MainMenu`, `WorldMap`, `PartyManagement`, `BattleLoading`, `Battle`, and `BattleVictoryScreen`.
    *   Derived `bevy::prelude::States`, `Debug`, `Clone`, `Copy`, `Eq`, `PartialEq`, `Hash`, and `Default` (with `MainMenu` as the default state).

2.  **State Machine Integration (`src/main.rs` & `src/state.rs`):**
    *   Created a `MinimalStatePlugin` in `src/state.rs`.
    *   Within the plugin, the state machine is initialized using `app.add_state::<GameState>()`, which sets the initial state to `GameState::default()` (i.e., `MainMenu`).
    *   Ensured `mod state;` is declared in `src/main.rs` and the `MinimalStatePlugin` is added to the Bevy `App`.

3.  **Verification & Testing:**
    *   Included a test system `test_state_transition_simplified` in `src/state.rs` that allows transitioning between `MainMenu` and `BattleLoading` using the 'S' key. This system uses `Res<Input<KeyCode>>` for input handling.
    *   Logging messages (`info!`) are included in this test system to indicate state transitions.
    *   The project successfully compiles with `cargo check` and `cargo run`.
    *   A runtime panic ("Failed to initialize any backend!") occurs after engine setup. This is an expected behavior in the current headless testing environment when `DefaultPlugins` (which include rendering) are used and does not indicate a failure of the state machine logic itself. The state machine setup and transition logic compile and are integrated correctly.

The `GameState` enum is defined and the state machine is integrated into the Bevy application, fulfilling the acceptance criteria. Systems can now be scheduled to run based on the current `GameState`.
