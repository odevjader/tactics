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

The following phases outline the plan to expand from the MVP to a full-featured tactical RPG with significant depth.

### Phase 2: Core Architecture & Systems Implementation
**Goal:** Transition to an isometric perspective with multi-level terrain, establish robust core systems for combat and character management, and implement foundational job and ability mechanics. This phase includes significant architectural setup for future scalability.
**Key Features:**
- **Architectural Evolution: Isometric Engine & Rendering:**
    - Implement a modular **Isometric Grid Engine**: Handles grid data (including heights), coordinate conversions (world to iso, screen to iso), and pathfinding logic considering height and terrain types.
    - Develop an **Isometric Rendering System**: Updates `drawGrid`, `drawUnit`, `drawVisualEffects` for isometric projection, including robust depth sorting for units and map elements.
    - Convert mouse click interactions to accurately map to the isometric grid.
    - Define specifications and implement support for **Sprite Sheet Animations** for units (idle, move, basic attack).
- **Multi-Level Terrain Mechanics & Interaction:**
    - Integrate tile height data into the Isometric Grid Engine.
    - Define and implement rules for unit movement across varying heights (e.g., step height, a 'Jump' stat influencing vertical mobility).
    - Implement the impact of height on line of sight and attack range/damage calculations (e.g., high ground advantages).
    - Visually render height differences clearly within the isometric view.
- **Combat System Foundations:**
    - Implement a flexible **Action Points (AP) System** governing unit actions per turn.
    - Define and integrate a comprehensive set of **Core Character Stats**: HP, MP, Speed (for turn order), Move (horizontal range), Jump (vertical range), Physical Attack (PA), Magical Attack (MA), Physical Evasion, Magical Evasion.
    - Introduce 2-3 distinct enemy types with varied stat profiles and potentially unique passive traits.
    - Implement foundational **Ranged and Magical Attacks/Skills**, including range calculation (considering height/LoS), MP costs, and initial effects (damage, healing).
    - Develop a **Data-Driven Damage Calculation Formula** incorporating attacker's PA/MA, target's stats, ability power, and height advantages.
- **Foundational Job System:**
    - Allow player units to switch between 3-4 distinct **Starting Jobs** (e.g., Squire, Chemist, Archer, Wizard) each with unique stat modifiers and ability access.
    - Each job provides 2-3 thematically appropriate, active abilities usable via the AP/MP system.
    - Implement a **Job Point (JP) System** for earning JP through combat actions and spending JP to unlock/improve abilities.
- **Core UI for Combat & Character Management (Hybrid Approach):**
    - **Canvas UI:** AP/MP display per unit, floating damage numbers, status effect icons on units.
    - **HTML Overlay UI:** Initial implementation of an ability selection menu, and a basic unit status screen accessible during combat.
- **Data Management & Architecture:**
    - Implement a **Custom Event Emitter (Pub/Sub)** for managing state changes and decoupling game modules.
    - Begin **Externalizing Game Data**: Define structures and load initial data for jobs, abilities, and items from JSON files.

### Phase 3: Expanding Gameplay - Progression, Economy, Story & World
**Goal:** Build upon the core systems with robust character progression, a functional in-game economy, the introduction of narrative elements, and a navigable world.
**Key Features:**
- **Character Progression System:**
    - **Experience Points (EXP) & Leveling:** Units gain EXP for actions and level up.
    - **Stat Growth System:** Stats increase upon level-up, influenced by both base growth and current job modifiers.
    - **Equipment System:** Implement Weapon, Shield/Off-hand, Armor, Helmet, and Accessory slots. Equipment provides significant stat boosts, resistances, or may grant passive abilities/effects.
    - Develop more **Sprite Animations** for units (e.g., hit reaction, casting, diverse attack animations).
- **In-Game Economy & Shops:**
    - Establish game currency and integrate it with battle rewards.
    - Design and implement a **Shop System** (via HTML UI) allowing players to buy and sell equipment and consumable items. Shop inventory expands based on story progression.
- **World Map & Navigation:**
    - Implement an **Interactive World Map** (node-based) with multiple distinct locations.
    - Enable player party travel between map nodes, potentially triggering story events or battles.
    - Design and implement several **Fixed Encounters** with unique objectives and enemy compositions.
- **Narrative & Storytelling:**
    - Implement the **First Major Story Arc** (e.g., Chapter 1), including key plot points, character introductions, and motivations.
    - **Dialogue System (HTML UI):** Create a robust dialogue interface supporting character portraits, text display, and simple branching choices if applicable.
    - Introduce 2-3 unique **Story Characters** who can join the player's party, each with potential unique starting skills or traits.
- **UI Development:**
    - Detailed Character Status Screen (showing all stats, equipment, abilities, resistances via HTML UI).
    - Inventory Management screen (HTML UI).
    - Job Change/Ability Management interface (HTML UI).

### Phase 4: Content Richness & System Depth
**Goal:** Significantly expand available content (jobs, abilities, enemies, story), deepen existing systems, and introduce more complex tactical elements.
**Key Features:**
- **Advanced Job & Ability System:**
    - Introduce **Advanced and Hybrid Jobs**, unlockable through mastering base jobs.
    - Significantly expand the list of learnable abilities for all jobs, including **Support and Reaction Abilities**.
    - Implement a more detailed skill tree or ability progression system for each job (HTML UI).
- **Combat System Evolution:**
    - Introduce a wider array of **Status Effects** (buffs and debuffs) with clear visual indicators and mechanical impacts.
    - Implement diverse **Terrain Types** on battle maps that affect movement, combat, or provide unique tactical opportunities (e.g., water, obstacles, cover, elemental-enhancing tiles), building on height mechanics.
    - Introduce **Area of Effect (AoE) abilities** with various targeting patterns (visualized on isometric grid).
    - (Optional based on complexity) Basic **Zone of Control (ZOC)** rules.
- **Content Expansion:**
    - Develop a significant portion of the **Main Storyline** (e.g., Chapters 2-3).
    - Create numerous **New Battle Maps** with diverse tactical challenges, utilizing isometric design and height variations extensively.
    - Introduce many new **Enemy Types**, including "boss" units with unique abilities and stats.
    - Expand the roster of available **Equipment and Items**.
- **AI Enhancements:**
    - Improve enemy AI to utilize abilities more effectively, consider terrain and height, and potentially react to player strategies.
- **Visual & Audio Polish:**
    - Implement a wider range of **Spell/Ability Visual Effects** (potentially using a basic particle engine built on Canvas).
    - Begin integration of sound effects and music.

### Phase 5: System Polish & Feature Completion (Beta)
**Goal:** Refine all existing systems, add more complex features, and aim for a feature-complete beta version of the core game.
**Key Features:**
- **Advanced Combat Features (from original section 1.1):**
    - (This section from previous roadmap seems to largely overlap with what's now detailed in Phase 4's "Combat System Evolution". Consolidate or ensure no redundancy).
    - Focus on balancing existing advanced features, adding unique encounter mechanics.
- **Expanded Job System (from original section 1.2):**
    - (Similar to above, ensure this is an expansion beyond Phase 4, e.g., job-specific unique equipment, ultimate abilities).
    - Focus on job balance and interplay.
- **Narrative Deepening & World Expansion (from original sections 1.3, 1.4):**
    - More story content, potentially concluding the main arc.
    - Side quests and optional super-bosses or challenge maps.
    - More locations, lore details.
- **Character Progression & Customization (from original section 1.5):**
    - Late-game equipment, rare items.
    - Generic unit recruitment system refinements.
    - Permadeath option implementation and testing (if included).

### Phase 6: Alpha/Beta Testing, Balancing, and Content Lock
**Goal:** Extensive playtesting, balancing of all game systems (jobs, economy, difficulty), bug fixing, and finalizing all content for a release candidate.

### Phase 7: Release and Post-Release Support
**Goal:** Launch the game and provide ongoing support.

## Technology Vision (Revised)
The game will be developed using **JavaScript (ES6+)** and the **HTML5 Canvas API**, evolving the MVP architecture to support a feature-rich tactical RPG:
- **Core Architecture:**
    - **Isometric Engine:** A dedicated set of modules will manage isometric grid logic, multi-level terrain, coordinate systems, pathfinding, and rendering (including depth sorting and sprite animation).
    - **State Management:** A custom **Event Emitter (Pub/Sub) system** will be implemented to manage complex game state and facilitate module communication.
    - **UI System:** A **hybrid approach** will be used: HTML overlays for complex menus (status, jobs, shops, dialogue) and Canvas for in-combat, world-integrated UI elements.
- **Data Management:** Game data (jobs, abilities, items, enemies, maps, story) will be externalized using **JSON files**, loaded and managed by a dedicated data module.
- **Performance:** Ongoing performance optimization will be critical, especially for the isometric rendering and complex game logic.
- **External Libraries:** Use will be minimal and targeted, only for well-defined needs where vanilla JS/Canvas is significantly inefficient (e.g., potentially a proven audio library or a highly optimized vector math library if needed later).
- **Modularity:** Emphasis on well-defined modules with clear responsibilities will be maintained.

*(Detailed MVP history, original MVP technology rationale, and general game design discussions remain in PROJECT_BACKGROUND_AND_DESIGN_NOTES.md for reference.)*
