# Game Roadmap: Tactics Saga (Working Title)

## Introduction
Tactics Saga is a turn-based tactical RPG inspired by classics like Final Fantasy Tactics and Tactics Ogre. This roadmap outlines the development plan, building upon the foundational JavaScript/HTML5 Canvas Minimum Viable Product (MVP). Our goal is to incrementally develop a rich single-player tactical RPG experience.

## Phase 1: MVP Core Combat (Completed)
The initial Minimum Viable Product (MVP) successfully established a browser-based tactical combat engine.
Key achievements of the MVP include:
- Basic grid and unit rendering (player and enemies).
- Turn management system.
- Player unit control: selection, movement, and basic melee attack.
- Simple enemy AI: movement towards player and basic melee attack.
- Combat resolution: HP system, fixed damage, unit removal at 0 HP.
- Win/loss conditions: player wins by defeating all enemies, loses if player unit is defeated.
- Minimal UI: turn indication, HP display, End Turn button.

All specific MVP features and tasks are documented as completed in the `jules_flow/done/` directory and were marked in previous versions of this roadmap.

## Post-MVP Development Plan

The following phases outline the plan to expand from the MVP to a full-featured tactical RPG.

### Phase 2: Isometric View, Core Combat Enhancements & Basic Jobs
**Goal:** Transition to an isometric perspective, introduce more depth to combat mechanics, add multi-level terrain, and lay the groundwork for character customization.
**Key Features:**
- **Architectural Shift: Isometric View Implementation:**
    - Refactor grid data structures and logic for isometric coordinate system.
    - Update rendering engine (`drawGrid`, `drawUnit`, `drawVisualEffects`, etc.) for isometric projection.
    - Implement basic depth sorting for units and map elements.
    - Convert mouse click coordinates to isometric grid coordinates.
    - Define requirements for isometric art assets (placeholder or initial style).
- **Multi-Level Terrain Mechanics:**
    - Implement data storage for tile heights.
    - Define rules for movement between different heights (e.g., step height, jump stat).
    - Basic impact of height on line of sight and attack range (e.g., high ground bonuses).
    - Visual representation of height differences within the isometric view.
- **Advanced Combat Mechanics (integrating ideas from original section 1.1):**
    - Action Points (AP) system.
    - Basic character stats (e.g., Speed, Strength, HP/MP pools, Jump).
    - Introduce 1-2 new unit types/roles.
    - Expand attack types (e.g., simple ranged, basic magic/skill), considering height.
    - Damage calculation incorporating stats and potentially height advantages.
- **Rudimentary Job System (integrating ideas from original section 1.2):**
    - Player unit can switch between 2-3 basic jobs (e.g., Fighter, Archer, Healer).
    - Each job provides 1-2 unique active abilities.
    - Simple Job Point (JP) earning and ability learning.
- **UI Enhancements:**
    - Display AP, MP (if applicable).
    - Basic ability selection menu.
    - Adapt UI elements (HP display, turn indicator) for isometric view if needed.

### Phase 3: Core Systems Expansion - Progression, Economy, and World
**Goal:** Build out systems for character growth, resource management, and initial world interaction.
**Key Features:**
- **Character Progression (integrating ideas from original section 1.5):**
    - Experience Points (EXP) and Leveling.
    - Stat growth influenced by job.
    - Basic equipment (Weapon, Armor slots) with stat boosts.
- **In-Game Economy (integrating ideas from original section 1.6):**
    - Basic currency.
    - Simple shop menu (buy basic equipment).
    - Battles award currency.
- **World Map & Navigation (integrating ideas from original section 1.4):**
    - Simple node-based world map (2-3 locations).
    - Travel between locations.
    - Fixed encounters at map locations.
- **Refined UI:**
    - Basic character status screen.
    - Simple shop interface.

### Phase 4: Narrative Structure & Content Alpha
**Goal:** Introduce main story elements, expand content, and integrate systems.
**Key Features:**
- **Story/Narrative Structure (integrating ideas from original section 1.3):**
    - First chapter/act of the story.
    - Basic dialogue system (e.g., portraits and text boxes).
    - Introduce 1-2 story characters.
- **Combat System Enhancements (from original section 1.1):**
    - Basic status effects (e.g., Poison, Slow).
    - Simple terrain effects (e.g., forest for defense).
- **Job System Expansion (from original section 1.2):**
    - 1-2 advanced jobs, unlockable from base jobs.
- **Content Creation:**
    - New battle maps.
    - More enemy types.

### Phase 5: System Polish & Feature Completion (Beta)
**Goal:** Refine systems, add more complex features, aim for feature-complete beta.
**Key Features:**
- **Advanced Combat Features (from original section 1.1):**
    - Area of Effect (AoE) abilities.
    - More sophisticated damage calculation (e.g., elemental affinities - simplified).
    - Basic reaction abilities (e.g., counter-attack).
- **Expanded Job System (from original section 1.2):**
    - Deeper skill trees.
    - Support/Movement abilities.
- **Narrative Deepening & World Expansion (from original sections 1.3, 1.4):**
    - More story content.
    - Side quests.
    - More locations.
- **Character Progression (from original section 1.5):**
    - More equipment types/slots.
    - Generic unit recruitment.

### Phase 6: Alpha/Beta Testing, Balancing, and Content Lock
**Goal:** Extensive playtesting, balancing, bug fixing, and finalizing content.

### Phase 7: Release and Post-Release Support
**Goal:** Launch the game and provide ongoing support.

## Technology Vision
The game will continue to be developed using **JavaScript (ES6+)** and the **HTML5 Canvas API**.
- **Architectural Evolution:** A significant update will be undertaken to support an **isometric perspective and multi-level terrain rendering** on the Canvas. This will involve refactoring grid logic and rendering systems.
- Performance optimizations will be crucial as complexity grows with the new perspective and features.
- Minimal, targeted use of external libraries for specific needs only if vanilla JS proves insufficient.
- Continued focus on modular code structure.

*(Detailed MVP history, original MVP technology rationale, and general game design discussions have been moved to PROJECT_BACKGROUND_AND_DESIGN_NOTES.md for reference.)*
