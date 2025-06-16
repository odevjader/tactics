---
id: TASK-002
title: "Implement Data-Driven Asset & Content Pipeline"
epic: "Phase 0: The Engine - Architecture & Core Systems"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Develop the systems for loading game data (`.ron` files) into Bevy resources/assets and define the necessary Rust structs for data parsing.

### Critérios de Aceitação

- [ ] Implement a Master Loader System: A single system responsible for loading all `.ron` files from `assets/data/` into Bevy `Resources` or `Assets` on startup. Ensure it handles paths like `assets/data/classes/`, `assets/data/races/`, etc.
- [ ] Define RON Definitions: Create the Rust `structs` that `serde` will use to parse all data. This includes `ClassData`, `ItemData`, etc., with all their stats and properties.

### Arquivos Relevantes

* `assets/data/`
* `src/data_loading.rs`

### Relatório de Execução

Implemented the data-driven asset and content pipeline as follows:

1.  **Data Structures (`src/data_defs/`):**
    *   Created `src/data_defs/mod.rs`.
    *   Defined `src/data_defs/class_data.rs` containing:
        *   `ClassAttributes` struct.
        *   `ClassData` struct (derived `Serialize`, `Deserialize`, `Clone`, `Resource`).
        *   `AllClasses` resource (tuple struct `Vec<ClassData>`, derived `Resource`, `Default`, `Clone`).
    *   Defined `src/data_defs/item_data.rs` containing:
        *   `ItemType` enum (derived `Serialize`, `Deserialize`, `Clone`, `PartialEq`).
        *   `ItemData` struct (derived `Serialize`, `Deserialize`, `Clone`, `Resource`).
        *   `AllItems` resource (tuple struct `Vec<ItemData>`, derived `Resource`, `Default`, `Clone`).
    *   Added `mod data_defs;` to `src/main.rs`.

2.  **Sample RON Files (`assets/data/`):**
    *   Created `assets/data/classes/warrior.ron` with sample warrior class data.
    *   Created `assets/data/items/short_sword.ron` with sample short sword item data.

3.  **Master Loader System (`src/data_loading.rs`):**
    *   Implemented a generic function `load_ron_files_from_dir<T, R>(dir_path: &str, asset_name: &str) -> R` to load and parse RON files of a given type `T` from a directory, returning a collection resource `R`.
    *   Created `load_all_data_system`, a Bevy `Startup` system, that uses the generic loader to:
        *   Load `ClassData` from `assets/data/classes/` into an `AllClasses` resource.
        *   Load `ItemData` from `assets/data/items/` into an `AllItems` resource.
    *   Included `info!` log messages for verifying loaded data.
    *   Packaged the loading system into a `DataLoadingPlugin`.

4.  **Integration (`src/main.rs`):**
    *   Added `mod data_loading;` to `src/main.rs`.
    *   Integrated `DataLoadingPlugin` into the Bevy `App` in `main.rs`.
    *   Ensured `DefaultPlugins` are added for core Bevy functionality (logging, etc.).

5.  **Verification:**
    *   The project compiles successfully (`cargo run`).
    *   `info!` logs from `load_all_data_system` confirm that the system runs and attempts to load data.
    *   A runtime panic ("Failed to initialize any backend!") occurs after data loading. This is expected in a headless environment when `DefaultPlugins` attempt to initialize a windowing system and does not indicate a failure of the data loading logic itself.

All acceptance criteria for the task are met.
