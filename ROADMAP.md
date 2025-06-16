# Roadmap for the Tactics Saga game

## Core Pillars & Philosophy
-   **Deep Customization:** Player choice must matter profoundly. The joy comes from breaking the system with clever character builds.
-   **Tactical Depth:** The battlefield itself is a character. Terrain, height, positioning, and turn order are weapons.
-   **Addictive Progression:** A powerful, rewarding loop of "Battle -> Loot/XP -> Upgrade -> Stronger in next Battle". The player should always be chasing the next power spike.
-   **Data-Driven Architecture:** The solo developer's creed. The game's code is the *engine*; the game's content lives in RON files. This is non-negotiable for a project of this scope.

---

### **Phase 0: The Engine - Architecture & Core Systems (3-4 Weeks)**

*Objective: Forge the unbreakable foundation. This phase is pure, unglamorous, but critical systems programming.*

1.  **Project Scaffolding:**
    -   Setup project with `cargo`, `bevy`, `serde`, `ron`, `bevy_ecs_tilemap`, `bevy_pathfinding`.
    -   Establish a strict module structure: `src/main.rs`, `src/state.rs`, `src/systems/`, `src/components.rs`, `src/data_loading.rs`, `src/battle/`.

2.  **Data-Driven Asset & Content Pipeline:**
    -   [ ] **Master Loader System:** A single system responsible for loading all `.ron` files from `assets/data/` into Bevy `Resources` or `Assets` on startup.
        -   `assets/data/classes/`, `assets/data/races/`, `assets/data/skills/`, `assets/data/items/`, `assets/data/maps/`.
    -   [ ] **RON Definitions:** Define the Rust `structs` that `serde` will use to parse all data. This includes `ClassData`, `ItemData`, etc., with all their stats and properties.

3.  **Core Component Library (`components.rs`):**
    -   [ ] **Identity:** `UnitID(String)`, `Name(String)`, `PlayerControlled`, `AIControlled { profile: AIProfile }`.
    -   [ ] **Primary Stats:** `PrimaryStats { Strength, Dexterity, Agility, Intelligence, Vitality, Luck }`. These are the character's innate stats.
    -   [ ] **Secondary Stats:** `DerivedStats { HP, MaxHP, MP, MaxMP, Attack, Defense, MagicAttack, MagicDefense, Hit, Evasion, CritChance, CritDamage, MoveRange, JumpHeight }`. These are calculated from Primary Stats + Equipment + Buffs. A dedicated system will recalculate these whenever gear or status changes.
    -   [ ] **Battle State:** `GridPosition { x, y, z }`, `ActionPoints(u32)`, `ChargeTime(u32)`, `CurrentStatus(Vec<StatusEffect>)`, `Resistances(HashMap<Element, f32>)`.

4.  **State Machine:**
    -   [ ] Implement a robust `GameState` enum: `MainMenu`, `WorldMap`, `PartyManagement`, `BattleLoading`, `Battle`, `BattleVictoryScreen`. This controls which systems run at any given time.

---

### **Phase 1: The Tactical Core - A Rich "Vertical Slice" (8-12 Weeks)**

*Objective: Create a single, deeply tactical battle map that feels like a finished game, just with limited content.*

1.  **The Living Battlefield:**
    -   [ ] **Map System:** Load maps from RON files, defining not just tile heights, but tile types (`TileType::Grass`, `::Water`, `::Thorns`, `::Ice`) which affect movement cost and apply status effects on entry.
    -   [ ] **Line of Sight (LoS):** Implement LoS checks. Archers cannot shoot through mountains. Some spells might ignore LoS.
    -   [ ] **Camera System:** A polished, player-friendly isometric camera: rotate, pan, zoom, and a "snap to active unit" function.

2.  **The "Charge Time" (CT) Turn System (a la FFT):**
    -   [ ] At the start of every "tick", every unit on the field gains `CT` equal to its `Agility`.
    -   [ ] When a unit's `CT >= 100`, it gets a turn. Its `CT` is reset to 0.
    -   [ ] **This is key:** Actions (spells, special moves) have a `cast_time`. When a unit performs a slow action, it doesn't act immediately. It enters a "casting" state and its turn only resolves after its `CT` fills up again by the `cast_time` amount. This makes fast, weak actions and slow, powerful actions a deep tactical choice.
    -   [ ] **UI:** The Turn Order UI must clearly show not just *who* is next, but *when*, visually representing the CT of all units.

3.  **Deep Combat Mechanics:**
    -   [ ] **Damage Formula:** `FinalDamage = (BasePower * StatFactor - TargetDefense) * Multipliers`.
        -   `BasePower` comes from the Skill/Weapon.
        -   `StatFactor` is `Attacker.Attack` for physical, `Attacker.MagicAttack` for magical.
        -   `TargetDefense` is `Defender.Defense` or `Defender.MagicDefense`.
        -   `Multipliers` is a product of all bonuses: `ElementalWeakness * PositionalBonus * HeightAdvantage * CriticalDamage * Buffs`.
    -   [ ] **Area of Effect (AoE):** Skills must support multiple AoE patterns loaded from their RON definition: Line, Cone, Self-Centered Radius, Cross, etc. The targeting UI must accurately preview these shapes.
    -   [ ] **Status Effects:** Implement a full suite: Poison, Blind, Silence, Slow, Haste, Stop, Charm, Berserk, Petrify, Regen. The `turn_manager` must apply their effects (damage, skipping turns, etc.) at the correct time.

4.  **Battle UI - Information is Power:**
    -   [ ] **Prediction Window:** Before confirming an action, show a detailed forecast: `Predicted Damage`, `Hit Chance %`, `Crit Chance %`. This is a critical quality-of-life feature from the classics.
    -   [ ] **Combat Log:** A scrollable log of all actions, damage, and events in the battle.
    -   [ ] **Inspect Mode:** Allow the player to hover over or click any unit (player or enemy) at any time to see its full stats, equipment, and status effects.

**Milestone 1:** A single battle that feels strategically complete. A veteran of the genre could play this one map for an hour and appreciate its depth.

---

### **Phase 2: The Character Engine - Systemic Depth & Progression (10-16 Weeks)**

*Objective: Build the addictive meta-game. This is where the player spends their time when not in battle, and it's what makes them want to *return* to battle.*

1.  **The Job & Skill System (The Heart of the Game):**
    -   [ ] **Job System:**
        -   Every unit has a `PrimaryJob` and a `SecondaryJob`.
        -   Units gain Job Points (JP) for their `PrimaryJob` by performing actions in battle.
        -   Spending JP unlocks skills within that job's tree.
        -   **Mastery:** Once a skill is unlocked, it can be equipped regardless of the unit's current job, provided they have the `Skill Slot` available.
    -   [ ] **Skill Types:**
        -   **Action Skills:** Command sets from the equipped `PrimaryJob` (e.g., "Arts of War", "Black Magic").
        -   **Secondary Skills:** A second action skill set from any *other* job the unit has access to.
        -   **Reaction Skills:** Triggered by enemy actions (e.g., `Counter`, `Adrenaline Rush`). One slot.
        -   **Support Skills:** Passive bonuses (e.g., `Attack+20%`, `Half MP Cost`). Multiple slots.
        -   **Movement Skills:** Passive movement bonuses (e.g., `Ignore Terrain Cost`, `Fly`). One slot.
    -   [ ] **UI:** Build the comprehensive Job/Skill screen in the `PartyManagement` state to facilitate this deep customization.

2.  **Loot, Crafting, and Economy:**
    -   [ ] **Rarity Tiers:** Items have rarities: `Common`, `Uncommon`, `Rare`, `Epic`, `Legendary`. Higher rarities have more and better stat affixes.
    -   [ ] **Procedural Affixes:** Rare+ items can drop with random bonuses (e.g., "of the Bear" [+STR], "of Haste" [+AGI]).
    -   [ ] **Crafting System:** Enemies drop materials. A `Blacksmith` menu in the `PartyManagement` state allows crafting new gear and, more importantly, *upgrading* existing gear to add new affixes or improve its base stats.
    -   [ ] **Shop System:** A basic shop to buy/sell common gear and consumables.

3.  **Party & Roster Management:**
    -   [ ] **The Headquarters/Guild Hall:** A central hub UI for navigating all `PartyManagement` functions:
        -   `Barracks`: View and customize all units in your entire roster (not just the active party).
        -   `Formation Screen`: Choose which units to take into the next battle.
        -   `Shop / Blacksmith`
        -   `Tavern`: A place to pick up side quests and hear rumors (lore).

**Milestone 2:** The core gameplay loop is complete and deeply compelling. Players can lose hours just on the equipment and job screens, theory-crafting builds.

---

### **Phase 3: The World - Content, Narrative & Variety (Ongoing)**

*Objective: Flesh out the game with a vast amount of content, making the world feel alive and challenging.*

1.  **Mission & Quest System:**
    -   [ ] Implement diverse battle objectives beyond "kill all enemies": `Protect a VIP`, `Survive for X turns`, `Seize a specific tile`, `Assassinate the Enemy Leader`, `Destroy an object`.
    -   [ ] **Scripted Events:** A simple event system for mid-battle surprises: enemy reinforcements arriving, a bridge collapsing, the weather changing.

2.  **Enemy & Boss Design:**
    -   [ ] Create dozens of unique enemy classes with their own skill sets. Enemies should feel distinct, not just bags of HP.
    -   [ ] **Boss Battles:** Design epic, multi-stage boss fights.
        -   Bosses can be multi-tile entities.
        -   They have unique "Boss Only" skills that break normal rules.
        -   They may have phase changes with new attack patterns at 75%, 50%, and 25% HP.

3.  **Narrative Delivery:**
    -   [ ] Implement a simple but effective dialogue system for pre-battle and post-battle cutscenes (using `bevy_egui` portraits and a text box).
    -   [ ] Create a `Lore` or `Journal` section in the UI where players can read about characters, locations, and history discovered throughout the game.

**Milestone 3:** The game transforms from a system into a world. It has a beginning, a middle, and an end, with dozens of hours of unique content to explore.

---

### **Phase 4: Polish, Balance & Release (6-8 Weeks)**

*Objective: Go from "feature complete" to "critically acclaimed." Polish is not a feature; it's the entire experience.*

1.  **The "Juice" Factor:**
    -   [ ] Implement impactful animations, particle effects for spells, screen shake on critical hits, and satisfying sound design.
    -   [ ] UI must be responsive and fluid. Add subtle animations and transitions.

2.  **Ruthless Balancing:**
    -   [ ] Extensive playtesting with a focus on identifying and nerfing "overpowered" combinations and buffing "useless" skills. The goal is to make many strategies viable, not just one.
    -   [ ] Create data analysis tools (even simple spreadsheets) to model damage output and progression curves.

3.  **Quality of Life & Accessibility:**
    -   [ ] A skippable, clear tutorial.
    -   [ ] Key remapping, volume controls, text scaling, colorblind-friendly UI options.
    -   [ ] Allow players to speed up animations.

4.  **Launch:**
    -   [ ] Final bug hunt.
    -   [ ] Package and release on **Itch.io** and/or **Steam**.
    -   [ ] Prepare for post-launch support and balance patches based on community feedback.
