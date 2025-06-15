# Game Roadmap: Tactics Saga (Working Title)

## 1. Core Game Mechanics

### 1.0. MVP Scope & Simplifications
For the initial Minimum Viable Product (MVP) / Demo, the core game mechanics will be significantly simplified to achieve a playable browser-based experience quickly. The detailed mechanics listed in subsequent sections (1.1 to 1.6) represent the broader vision for the game, post-MVP.

**MVP Mechanic Focus:**

- **Combat System (MVP):**
    - **Grid:** Small, fixed-size grid (e.g., 8x8 or 10x10).
    - **Units:** 1 player-controlled unit, 1-2 enemy AI units.
    - **Turn Order:** Simple alternation (Player -> Enemy 1 -> Enemy 2 -> Player...).
    - **Actions Per Turn (MVP):**
        - **Move:** Move to an adjacent tile. No complex AP system for MVP.
        - **Attack:** A single, basic melee attack type against an adjacent unit.
    - **Damage Calculation (MVP):** Fixed damage amount (e.g., player deals 1 HP damage, enemy deals 1 HP damage). No complex stats or weapon modifiers. Units have minimal HP (e.g., 2-3 HP).
    - **Status Effects (MVP):** None for the MVP.
    - **Terrain (MVP):** Plain, uniform grid. No special terrain effects.
    - **Victory/Defeat (MVP):** Defeat all enemy units to win. Player unit defeated means loss.
    - **Reaction Abilities/ZOC (MVP):** None for theMVP.
    - **UI (MVP):** Minimalist. Visual indication of whose turn it is, unit HP (simple text or bars), and basic action selection (e.g., click to move, click enemy to attack).

- **Job System (MVP):**
    - **No formal job system for MVP.** Player unit will have a predefined role (e.g., "Fighter"). Enemy units will also be simple.
    - **No abilities beyond basic Move/Attack.**

- **Story/Narrative Structure (MVP):**
    - **None for MVP.** The focus is purely on the core combat mechanic. A simple "Defeat the Enemies!" message will suffice.

- **World Map & Navigation (MVP):**
    - **None for MVP.** The game will load directly into a single combat encounter.

- **Character Progression (MVP):**
    - **None for MVP.** No EXP, leveling, or stat growth.
    - **No equipment.**

- **In-Game Economy (MVP):**
    - **None for MVP.**

This highly focused approach for the MVP ensures that a core playable loop can be developed and tested rapidly in the browser.

### 1.1. Combat System
- **Genre:** Turn-based tactical RPG.
- **Perspective:** Isometric grid-based battlefield.
- **Turn Order:** Determined by a speed statistic (e.g., Agility or Speed). A visible turn order list/timeline will be displayed.
- **Actions Per Turn:** Characters will have Action Points (AP) or a similar system. Standard actions might include:
    - **Move:** Traverse a certain number of grid squares, affected by terrain and character mobility.
    - **Action:** Perform a skill, attack, or use an item. Some powerful abilities might consume more action points or even the entire turn.
    - **Wait/Defend:** End turn, possibly with a defensive bonus.
- **Attack Types:**
    - **Melee:** Close-quarters combat, damage influenced by strength and weapon power. Accuracy affected by character's skill and target's evasion.
    - **Ranged:** Attacks from a distance (bows, guns, etc.), damage influenced by dexterity and weapon power. Line of sight and range are critical.
    - **Magical:** Spells that can deal damage, heal, or inflict status effects. Damage/effectiveness influenced by magic power. Spells may have casting times or MP (Mana Points) costs.
    - **AoE (Area of Effect):** Abilities that affect multiple tiles/characters.
- **Damage Calculation:** Factors will include attacker's relevant stat (Strength, Dexterity, Magic Power), weapon/ability power, defender's defenses (Physical Defense, Magical Defense), elemental affinities/resistances, and possibly a random variance. Critical hits will also be a factor.
- **Status Effects:** Positive (buffs) and negative (debuffs) conditions like Poison, Slow, Haste, Protect, Shell, Blind, Silence, Berserk, Charm, etc. Each will have clear effects and durations.
- **Terrain:** The battlefield grid will feature varied terrain types that can affect movement, attack range, accuracy, and provide defensive bonuses (e.g., high ground, forests, water).
- **Friendly Fire:** To be decided, but typically present in this genre for added tactical depth (especially for AoE).
- **Victory/Defeat Conditions:** Typically "Defeat all enemies," "Defeat a specific boss unit," "Protect a VIP," "Reach a specific location," etc. Losing all player units or a key story character usually results in defeat.
- **ZOC (Zone of Control):** Units may exert a Zone of Control on adjacent tiles, potentially hindering enemy movement or triggering reaction abilities.
- **Reaction Abilities:** (e.g., Counter-attack, Auto-Potion) Skills that trigger automatically in response to specific events.

### 1.2. Job System (Class System)
- **Overview:** Characters can switch between various jobs, each with unique stat growths, equippable gear, and a distinct set of abilities.
- **Base Jobs:** A set of starting jobs (e.g., Squire, Chemist).
- **Advanced Jobs:** Unlocked by reaching certain levels in one or more base jobs (e.g., Knight from Squire, White Mage from Chemist).
- **Special Jobs:** Unique jobs, perhaps for specific story characters, with powerful and distinct abilities.
- **Job Levels (JP/SP):** Characters earn Job Points (JP) or Skill Points (SP) in their current job by performing actions in combat. These points are used to learn new abilities from that job's skill tree.
- **Abilities:**
    - **Action Abilities:** Actively used commands in combat (e.g., Fire spell, Power Break attack).
    - **Reaction Abilities:** Triggered in response to game events (e.g., Counter, Regenerate).
    - **Support Abilities:** Passive bonuses or effects (e.g., +10% HP, Equip Axes).
    - **Movement Abilities:** Enhance mobility or provide unique movement options (e.g., Ignore Terrain, Fly).
- **Skill Inheritance:** Characters may be able to equip a secondary skillset from another mastered job, or mix and match learned support/reaction abilities, allowing for deep customization.
- **Unlocking New Jobs:** A clear system for unlocking jobs (e.g., "Squire Lv. 3 + Chemist Lv. 2 = Knight"). This will be visible to the player.

### 1.3. Story/Narrative Structure
- **Format:** The game will be divided into chapters or acts, each containing a series of story-driven battles and narrative sequences.
- **Narrative Delivery:**
    - **Cutscenes:** In-engine cutscenes with character sprites/portraits and dialogue boxes before and after key battles.
    - **World Map Events:** Short narrative events or dialogues that occur when moving between locations or at specific points in the story.
    - **Battle Dialogue:** Characters may have specific lines during combat, reacting to events or other characters.
- **Main Quest Line:** A central storyline driving the player through the game.
- **Side Quests/Optional Battles:** Additional missions and battles that provide extra rewards, lore, or unique character recruitment opportunities. These will not be mandatory for completing the main story.
- **Player Choices (Minor):** While the main story will be linear, there might be minor choices in side quests or dialogues that offer different small rewards or dialogue variations, but not branching major plotlines to keep development scope manageable.
- **Themes:** (To be defined by the writer, but common themes in the genre include war, betrayal, justice, class struggle, corruption, and the search for power or peace).

### 1.4. World Map & Navigation
- **Style:** A point-to-point node-based map, similar to FFT. Players click on locations to travel.
- **Random Encounters:** While traveling between locations, there's a chance of encountering random battles with generic enemy units. The frequency can be managed (e.g., an item to reduce encounters).
- **Fixed Encounters:** Story battles will occur at specific locations when the plot dictates.
- **Locations:**
    - **Towns/Cities:** Hubs for story events, shops, taverns (for rumors or side quests).
    - **Dungeons/Battlefields:** Locations where story battles or optional battles take place.
    - **Shops:** Buy/sell equipment, items, and possibly abilities. Shop inventory may update as the story progresses or with liberation/control of areas.
    - **Taverns/Guilds:** Places to gather information, find side quests, or recruit generic units.

### 1.5. Character Progression
- **Experience Points (EXP):** Characters gain EXP for actions in combat (attacking, using skills, defeating enemies).
- **Leveling Up:** Gaining enough EXP results in a level up, which increases base stats (HP, MP, Strength, Magic, Speed, etc.). Stat growth will be influenced by the character's current job.
- **Stat Growth:** Each job will have different multipliers for stat growth upon leveling up. Characters will also have innate base stat growth.
- **Equipment:**
    - **Weapon:** Main hand.
    - **Shield/Off-hand:** Secondary item or two-handed weapon.
    - **Head:** Helmets, hats.
    - **Body:** Armor, robes.
    - **Accessory:** Rings, cloaks, boots providing various bonuses.
    - Equipment provides stat boosts and can sometimes grant special abilities or resistances. Job restrictions will apply to equippable gear.
- **Recruitment:**
    - **Story Characters:** Automatically join as the plot progresses.
    - **Generic Units:** Can be recruited from towns or after certain battles, allowing players to customize their party with different jobs from the start.
    - **Special Recruits:** Optional characters that may require specific conditions or side quests to be completed.
- **Permadeath:** A classic feature of the genre. If a character's HP drops to 0, they enter a "downed" state. If not revived within a certain number of turns (e.g., 3 turns), they are permanently removed from the party. This will be an optional setting (Hardcore/Classic vs. Casual mode).

### 1.6. In-Game Economy
- **Currency:** A single type of currency (e.g., Gil, Gold).
- **Sources of Income:**
    - Winning battles (story and random).
    - Completing side quests.
    - Selling unwanted items and equipment.
    - Treasure chests found in battle or on the world map.
- **Expenses:**
    - Buying new weapons, armor, accessories.
    - Purchasing consumable items (potions, status ailment cures).
    - Fees for recruiting generic units.
    - (Potentially) Fees for learning certain high-level abilities or job changes.
- **Item Rarity & Value:** Items will have different tiers of rarity and cost, with more powerful items being more expensive and harder to find.
- **Shops:** Shop inventories will expand as the player progresses through the story or liberates new regions. Some rare items might only be found in specific locations or as drops from tough enemies.

## 2. Development Phases (MVP Focus)

With the goal of rapidly developing a playable browser-based MVP/Demo, the development phases are restructured to prioritize this initial version. The original, more extensive phases are considered "Post-MVP" and can be revisited if the MVP proves successful and further development is pursued.

### Phase 1 (MVP): Browser-Based Combat Core (Est. 2-4 Weeks)
- **Goal:** Develop a functional and playable minimalist tactical combat demo in a web browser using JavaScript and HTML5 Canvas.
- **Core Technologies:** Vanilla JavaScript (ES6+), HTML5 Canvas for rendering, basic HTML/CSS for structure.
- **Key Features (as per MVP Scope in Core Mechanics):**
    - ✅ **Basic HTML Page Setup:** A single HTML page to host the game.
    - ✅ **Canvas Grid Rendering:** Draw a small, fixed-size grid (e.g., 8x8).
    - ✅ **Unit Rendering:** Simple visual representation for 1 player unit and 1-2 enemy units (e.g., colored squares/circles).
    - ✅ **Turn Management:** Basic alternating turn system (Player -> Enemy -> Player). Visual indicator of the current turn.
    - **Player Unit Control:**
        - ✅ Select player unit.
        - ✅ Click on an adjacent valid tile to move the unit.
        - ✅ Click on an adjacent enemy unit to perform a basic attack.
    - **Enemy AI (Simple):**
        - ✅ Enemy units move towards the player unit if not adjacent.
        - ✅ Enemy units attack the player unit if adjacent.
    - **Combat Resolution:**
        - ✅ Units have minimal HP (e.g., 2-3 HP).
        - ✅ Attacks deal fixed damage (e.g., 1 HP).
        - ✅ Visual feedback for attacks (e.g., unit flashes red).
        - ✅ Units are removed from the grid when HP reaches 0.
    - **Win/Loss Conditions:**
        - ✅ **Win:** Player defeats all enemy units. Display a simple "You Win!" message.
        - ✅ **Loss:** Player's unit is defeated. Display a simple "You Lose!" message.
    - **Minimal UI:**
        - ✅ Display unit HP (e.g., small number next to unit).
        - Buttons or clickable areas for "End Turn" (if manual turn end is desired, otherwise automatic after action).
        - Clear visual distinction between player and enemy units.
- **Focus:** Core gameplay loop (Move -> Attack -> Enemy Response). Functionality and playability are paramount. Aesthetics are secondary for the MVP.
- **Potential Risks (MVP Specific):**
    - Canvas rendering performance for even simple scenes might be tricky if not optimized from the start (though unlikely for MVP scope).
    - Implementing even simple grid logic (valid moves, adjacency) can be error-prone.
    - Vanilla JS state management can become messy quickly; good structure is needed from the outset.
    - Balancing the simple MVP (e.g., number of enemies, HP) to be engaging enough for a short demo.
    - Time underestimation, even for a "simple" MVP.

### Post-MVP Phases (Placeholder)
Following a successful MVP, development could proceed by incrementally adding features from the original, more comprehensive roadmap. This might include:
- **Phase 2 (Post-MVP): Enhanced Combat & Basic Job System:** Introduce more unit types, basic stats, a couple of distinct abilities, and a rudimentary job selection.
- **Phase 3 (Post-MVP): Narrative & World Elements:** Begin to layer in story elements, a simple world map, and more varied encounters.
- *Further phases would draw from the original detailed roadmap, adapting as needed.*

The immediate priority is the successful completion and testing of **Phase 1 (MVP): Browser-Based Combat Core**.

## 3. Technology Stack for Browser-Based MVP

For the initial Minimum Viable Product (MVP) / Demo, the goal is to create a simple, playable experience directly in a web browser. This dictates a lightweight and readily available technology stack.

### 3.1. Core Technologies
- **Language: JavaScript (JS)**
    - **Rationale:** JavaScript is the native language of web browsers, requiring no plugins or complex setup for users to play the game. It has a vast ecosystem of libraries and is well-suited for interactive web applications.
    - **Considerations:** We will use modern JavaScript (ES6+) for better syntax and features. No complex frameworks (like React, Angular, Vue) will be used for the initial MVP to keep things simple, focusing on vanilla JS for core logic.
- **Rendering: HTML5 Canvas API**
    - **Rationale:** The Canvas API provides a powerful 2D drawing surface directly in HTML. It's ideal for rendering grids, sprites (or simple shapes for the MVP), and game effects without external dependencies.
    - **Considerations:** We'll manage the game loop (update, draw) and handle all rendering logic (drawing grid lines, units, UI elements) directly using Canvas drawing commands.
- **Structure: HTML & CSS**
    - **Rationale:** Basic HTML will structure the game page (containing the canvas element, any simple UI buttons, or text displays). CSS will be used for minimal styling of these HTML elements.
    - **Considerations:** The focus will be on functionality over elaborate design for the MVP.

### 3.2. Art & Animation (MVP Simplification)
- **Initial Assets:** For the MVP, character and enemy representations might be simple geometric shapes (e.g., colored squares/circles) or placeholder static sprites if readily available.
- **Animation:** Complex animations will be avoided for the MVP. Movement might be simple position updates, and attacks could be indicated by a brief visual effect (e.g., a flashing color or a projectile line).

### 3.3. Version Control
- **Git:** Still essential. GitHub, GitLab, or Bitbucket will be used for repository hosting.

### 3.4. Project Management & Communication
- **Tools:** For a solo developer MVP, project management can be simpler (e.g., a checklist). Communication is internal.

### 3.5. Development Approach for MVP
- **Focus:** Rapid prototyping of the core combat loop.
- **Modularity:** While keeping it simple, structure the JavaScript code logically (e.g., separate modules/objects for game state, rendering, unit logic) to allow for easier expansion post-MVP.
- **No External Libraries (Initially):** To maintain simplicity and control for the MVP, we will avoid external game engines or complex utility libraries unless absolutely necessary.

This streamlined stack allows for quick iteration and focuses all effort on delivering a playable core experience in the browser.

## 4. Team Role Considerations

### 4.0. MVP Development Team
For the initial Browser-Based MVP (as outlined in "## 2. Development Phases (MVP Focus)"), the development will be undertaken by a single developer (Jules). This means the roles of Game Designer, Programmer, and initial Artist (using placeholder graphics) and Tester will be consolidated. The primary focus is on implementing the core technical features of the MVP.

The subsequent detailed roles (4.1 to 4.3) provide a broader view for potential team expansion post-MVP.

Developing a game, especially a tactical RPG, involves various disciplines. For a small indie team, individuals often wear multiple hats. However, understanding the key roles can help in planning and resource allocation.

### 4.1. Core Roles

- **Game Designer:**
    - **Responsibilities:** Defines the core gameplay mechanics, system design (combat, job system, economy), level design, narrative structure, and overall player experience. Works closely with all other roles to ensure the vision is cohesive. Responsible for documentation like the Game Design Document (GDD).
    - **Skills:** Strong understanding of game mechanics, creativity, analytical thinking, communication, documentation skills.

- **Programmer(s):**
    - **Responsibilities:** Writes the code that brings the game to life. Implements game logic, UI, AI, tools for the designers/artists, and ensures game performance and stability.
    - **Specializations (for larger teams or as needed):** Gameplay programmer, UI programmer, AI programmer, engine/systems programmer.
    - **Skills:** Proficiency in the chosen programming language and game engine, problem-solving, mathematics, logic.

- **Artist(s):**
    - **Responsibilities:** Creates all visual assets for the game. This includes character sprites/models, animations, environments, UI elements, item icons, and potentially concept art and marketing materials.
    - **Specializations:**
        - **Character Artist:** Designs and creates characters and their animations.
        - **Environment Artist:** Builds the game worlds, battlefields, and props.
        - **UI Artist:** Designs and implements the user interface and user experience (UI/UX).
        - **Pixel Artist:** Specializes in pixel art if that's the chosen aesthetic.
    - **Skills:** Drawing, digital painting, modeling (if 3D), animation, understanding of color theory, composition, and the chosen art style.

- **Writer/Narrative Designer:**
    - **Responsibilities:** Develops the game's story, writes dialogue, character backstories, lore, quest descriptions, and any in-game text. Ensures the narrative is engaging and integrates well with gameplay.
    - **Skills:** Creative writing, storytelling, dialogue crafting, understanding of narrative structure.

### 4.2. Supporting Roles (Often combined or outsourced, especially in small teams)

- **Sound Designer/Composer:**
    - **Responsibilities:** Creates or sources all audio elements: sound effects (SFX) for actions, UI feedback, ambient sounds, and composes the musical score.
    - **Skills:** Audio engineering, music composition, familiarity with audio software.

- **Quality Assurance (QA) Tester:**
    - **Responsibilities:** Plays the game extensively to find bugs, exploits, balance issues, and provide feedback on gameplay and user experience. This role is crucial for a polished final product.
    - **Skills:** Attention to detail, patience, communication, analytical skills. (Often, the whole team participates in QA).

- **Producer/Project Manager:**
    - **Responsibilities:** Oversees the project's development, manages timelines, budgets (if any), resources, and team communication. Ensures the project stays on track.
    - **Skills:** Organization, communication, leadership, problem-solving. (In small teams, this is often a lead designer or programmer).

### 4.3. Small Team Dynamics
- **Wearing Multiple Hats:** In a typical indie team of 2-4 people, roles will heavily overlap. For example:
    - A programmer might also be the primary game designer.
    - An artist might also contribute to UI design and some narrative elements.
    - Everyone is likely a tester.
- **Core Needs:** Even for a very small team, you'll likely need:
    - At least one strong **Programmer**.
    - At least one versatile **Artist**.
    - Someone to focus on **Game Design and Writing** (can be shared or one of the above).
- **Outsourcing/Assets:** Consider using pre-made assets (from marketplaces like the Unity Asset Store or Itch.io) for areas where the team lacks expertise or time (e.g., music, some sound effects, certain art assets). This can save significant development time but ensure they fit the game's style.

Clear communication, a shared vision, and a passion for the project are essential for any team, regardless of size.
