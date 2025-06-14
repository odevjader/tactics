# Game Roadmap: Tactics Saga (Working Title)

## 1. Core Game Mechanics

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

## 2. Development Phases

This roadmap outlines a phased approach to development. Timelines are rough estimates and assume a small, dedicated indie team (e.g., 2-4 core members). Actual timelines will vary based on team size, skill, resources, and desired level of polish.

### Phase 1: Core Engine & Combat Prototype (Est. 3-6 Months)
- **Goal:** Develop a playable prototype showcasing the fundamental turn-based combat system.
- **Key Features:**
    - Basic game engine setup (chosen engine: Unity, Godot, etc.).
    - Grid generation and rendering.
    - Character sprite rendering and basic animation (idle, move, attack).
    - Pathfinding and character movement on the grid.
    - Basic turn management system (Speed-based).
    - Implementation of Move and a basic Attack action.
    - HP system and damage calculation (simplified).
    - Simple UI for character stats, actions, and turn order.
    - One to two playable character classes (e.g., Squire-like melee, Archer-like ranged).
    - One small test battlefield.
    - Basic enemy AI (move towards player, attack if in range).
    - Victory/Defeat conditions (defeat all enemies).
- **Focus:** Functionality over aesthetics. Get the core loop of combat working.
- **Potential Risks:**
    - Choice of game engine leads to unforeseen limitations or performance issues.
    - Core combat loop feels clunky or unfun, requiring significant redesign.
    - Underestimation of complexity for grid logic or pathfinding.
    - Difficulty in establishing an efficient asset pipeline for sprites and animations.

### Phase 2: Job System & Character Progression (Est. 4-6 Months)
- **Goal:** Implement the job system and fundamental character progression mechanics.
- **Key Features:**
    - Design and implement 3-5 base jobs (e.g., Squire, Chemist, Archer, Black Mage, White Mage).
    - Implement Job Point (JP) earning and spending system.
    - Create skill trees for the initial set of jobs with a selection of action, reaction, and support abilities.
    - Implement ability learning and equipping.
    - EXP and leveling system for characters.
    - Stat growth tied to job and character level.
    - Basic equipment system (weapon, armor slots) with stat modifiers.
    - UI for managing jobs, abilities, and equipment.
    - System for unlocking new jobs (prerequisites).
- **Focus:** Adding depth to character development and combat options.
- **Potential Risks:**
    - Balancing the initial set of jobs and abilities proves difficult.
    - Skill tree implementation is more complex than anticipated.
    - Player progression feels too slow or too fast.
    - UI for managing many skills and jobs becomes cluttered or difficult to use.

### Phase 3: Story Implementation - First Arc (Est. 5-8 Months)
- **Goal:** Develop the first major arc of the story, including narrative elements and associated battles.
- **Key Features:**
    - Write and script the main storyline for the first 2-3 chapters.
    - Design and implement 5-7 story battles with unique objectives and terrain.
    - Introduce 2-3 key story characters with unique sprites (and possibly special jobs later).
    - Create in-engine cutscene system (dialogue boxes, character portraits, basic camera movement).
    - Implement world map navigation (point-to-point).
    - Basic shop system in one or two town locations (buy/sell items).
    - Introduce the first set of equipment (weapons, armor).
    - Music and basic sound effects integration for combat and cutscenes.
- **Focus:** Bringing the game world to life and providing a narrative context for the gameplay.
- **Potential Risks:**
    - Story writing and scripting take longer than expected.
    - Integrating narrative with gameplay seamlessly is challenging.
    - Cutscene system is too basic or difficult to work with, limiting storytelling.
    - Maintaining player interest through the first arc is difficult.

### Phase 4: Content Expansion - Systems & Initial World Building (Est. 6-9 Months)
- **Goal:** Expand on existing systems, add more content, and flesh out the game world.
- **Key Features:**
    - Implement 3-5 advanced jobs and their skill trees.
    - Add more abilities to existing jobs.
    - Introduce status effects (positive and negative) into combat.
    - Refine enemy AI (use of skills, targeting priorities).
    - Implement random encounters on the world map.
    - Design and add 2-3 optional side quest chains.
    - Expand the world map with more locations, towns, and dungeons.
    - More diverse enemy types and formations.
    - Add more equipment tiers and special item properties.
    - Implement a tavern/rumor system for side quest hints.
    - System for recruiting generic units.
- **Focus:** Increasing variety, replayability, and depth of content.
- **Potential Risks:**
    - Scope creep: adding too many jobs, abilities, or systems makes balancing and completion difficult.
    - Random encounters become tedious or poorly balanced.
    - Side quests feel generic or unrewarding.
    - New systems don't integrate well with existing core mechanics.

### Phase 5: Content Polish & Pre-Alpha (Est. 4-6 Months)
- **Goal:** Polish existing content, add more advanced features, and prepare for broader testing.
- **Key Features:**
    - Implement remaining planned jobs (including special/unique jobs).
    - Complete all planned abilities for all jobs.
    - Advanced AI tactics and teamwork for enemies.
    - Implement the full range of planned equipment, including unique and legendary items.
    - Add unique battle mechanics (e.g., environmental hazards, interactive objects on battlefield).
    - Story completion for the main narrative.
    - All planned side quests and optional content.
    - Art polish: character animations, spell effects, UI improvements.
    - Sound design polish: unique sound effects for abilities, ambient sounds.
    - Initial balancing pass for jobs, abilities, economy, and enemy difficulty.
    - Tutorial system implementation.
    - Implement Permadeath option (Classic/Casual modes).
- **Focus:** Bringing all elements to a feature-complete state and improving overall presentation.
- **Potential Risks:**
    - Feature creep continues, delaying polish and bug fixing.
    - Balancing the vast amount of content (jobs, skills, items, enemies) becomes overwhelming.
    - Story pacing suffers in later stages of the game.
    - Performance issues arise as more content and effects are added.
    - Tutorial system is insufficient or tedious for players.

### Phase 6: Alpha/Beta Testing & Bug Fixing (Est. 3-6 Months)
- **Goal:** Extensive testing, bug fixing, balancing, and incorporating player feedback.
- **Key Features:**
    - **Alpha Testing (Internal/Friends & Family):** Focus on major bugs, system stability, and core gameplay feedback.
    - **Beta Testing (Closed/Open):** Broader testing pool to find more obscure bugs, gather balancing feedback, and assess player experience.
    - Iterative balancing of jobs, abilities, items, and enemy encounters based on feedback.
    - Performance optimization.
    - UI/UX refinement based on feedback.
    - Intensive bug hunting and fixing.
    - Localization preparation (if planned).
- **Focus:** Stability, balance, and refining the player experience.
- **Potential Risks:**
    - Critical bugs are discovered late in testing, requiring significant rework.
    - Player feedback on balance is contradictory or difficult to implement.
    - Burnout within the development team from prolonged bug fixing.
    - Inability to gather a diverse enough pool of testers.
    - Performance on target hardware does not meet expectations.

### Phase 7: Release & Post-Launch Support (Ongoing)
- **Goal:** Launch the game and provide ongoing support.
- **Key Features:**
    - Final marketing push and release preparation.
    - Launch on chosen platform(s).
    - Monitor player feedback and bug reports post-launch.
    - Release patches for critical bugs and balancing issues.
    - Potential for future content (DLC, expansions, sequels) if successful.
- **Focus:** Successful launch and maintaining player satisfaction.
- **Potential Risks:**
    - Unforeseen server issues or platform-specific problems at launch.
    - Negative initial reviews impact sales and morale.
    - Marketing efforts don't reach the target audience effectively.
    - Underestimation of post-launch support needs (patching, community management).
    - Sales do not meet expectations, impacting ability to fund future content or support.

## 3. Technology Stack Considerations

Choosing the right technology stack is crucial for the project's success. This section outlines key considerations rather than prescribing a specific stack, as the best choice depends on team expertise, project scope, and specific goals.

### 3.1. Game Engine
A game engine provides a foundational framework, including rendering, physics, input handling, and asset management, significantly speeding up development.

- **Considerations:**
    - **2D vs. 2.5D vs. 3D:**
        - **2D:** Simpler to develop assets for, generally faster performance on lower-end hardware. Good for a classic pixel art or hand-drawn aesthetic. Engines like Godot (with its dedicated 2D pipeline), Unity (with 2D tools), or GameMaker Studio are strong contenders.
        - **2.5D (Isometric):** This is the classic FFT style. Achievable in both 2D and 3D engines.
            - Using a 3D engine (e.g., Unity, Unreal, Godot 3D) allows for true height differences, dynamic camera angles, and potentially more sophisticated visual effects. Character models would be 3D, but presented on a 2D grid.
            - Using a 2D engine with isometric projection techniques is also possible and can be simpler for teams more comfortable with 2D workflows. Asset creation might involve careful sprite work to simulate depth.
    - **Ease of Use & Learning Curve:** Consider the team's familiarity with the engine. A steeper learning curve can slow down initial development.
    - **Community & Support:** A large, active community means more tutorials, readily available assets, and help when encountering problems.
    - **Feature Set:** Does the engine have built-in tools that are beneficial for a tactical RPG (e.g., good UI system, animation tools, pathfinding libraries)?
    - **Performance:** Ensure the engine can handle the number of units and complexity of maps planned for the game without performance issues.
    - **Target Platforms:** If planning to release on multiple platforms (PC, consoles, mobile), choose an engine with good cross-platform support.
    - **Licensing & Cost:** Understand the engine's licensing terms and any associated costs (e.g., revenue sharing, subscription fees).

- **Popular Engine Options:**
    - **Unity:** Very popular, versatile (strong in both 2D and 3D), large asset store, extensive documentation and community. C# is the primary language. Good for isometric 2.5D or 3D approaches.
    - **Godot Engine:** Free and open-source, gaining popularity rapidly. Strong dedicated 2D pipeline and capable 3D. Uses GDScript (Python-like), C#, and supports C++. Excellent choice for 2D or 2.5D isometric games.
    - **Unreal Engine:** Powerful, particularly for high-fidelity 3D graphics. Uses C++ and Blueprints (visual scripting). Might be overkill for a more classic FFT-style game unless aiming for a very modern 3D take, and has a steeper learning curve.
    - **GameMaker Studio:** Primarily focused on 2D games, known for its ease of use. Uses its own GML (GameMaker Language). Could be suitable for a purely 2D isometric approach.
    - **RPG Maker Series:** Specifically designed for creating RPGs. While good for traditional JRPGs, it might be restrictive or require significant modification/plugins for a tactical grid-based system.

### 3.2. Programming Language
The choice of programming language is often tied to the game engine.

- **Considerations:**
    - **Engine Compatibility:** Most engines have a primary language (e.g., C# for Unity, GDScript/C# for Godot, C++ for Unreal).
    - **Team Expertise:** Leverage the existing skills of your development team.
    - **Performance:** Compiled languages (C++, C#) generally offer better performance than interpreted languages, which can be important for complex game logic.
    - **Development Speed:** Some languages (like Python or GDScript) can offer faster iteration and development speed for certain tasks.
    - **Available Libraries:** Access to libraries for common tasks (e.g., pathfinding, UI management) can be beneficial.

### 3.3. Art & Animation Tools
- **Pixel Art:** Aseprite, GraphicsGale, Photoshop/GIMP.
- **2D Digital Painting:** Krita, Photoshop, GIMP, Clip Studio Paint.
- **3D Modeling & Animation (if choosing a 3D approach for characters/environments):** Blender (free and open-source), Maya, 3ds Max.
- **Animation Software:** Spine (for 2D skeletal animation), Unity's built-in animation tools, Godot's animation tools.

### 3.4. Version Control
- **Git:** Essential for collaborative development, tracking changes, and managing different versions of the project. Platforms like GitHub, GitLab, or Bitbucket can host repositories.

### 3.5. Project Management & Communication
- **Tools like Trello, Asana, Jira (for task management), and Discord/Slack (for team communication) are highly recommended.**

**Recommendation for an FFT-like game:**
For a project aiming to replicate the feel of Final Fantasy Tactics, with a small to medium-sized team:
- **Engine:** Godot or Unity would be strong choices.
    - **Godot:** Excellent for 2D or 2.5D isometric. Its node system can be very intuitive for structuring game elements. Free and open-source is a big plus for indie teams.
    - **Unity:** Very versatile, great asset store, and robust community support. Well-suited for a 2.5D (3D models on a grid) or a more advanced 3D take on the genre.
- **Language:** GDScript or C# (if using Godot/Unity).
- **Art Style:** Pixel art or stylized low-poly 3D can capture the classic feel while being manageable for smaller teams.

Ultimately, the team should create small prototypes in their top engine choices to evaluate which best fits their workflow and the game's vision before committing fully.

## 4. Team Role Considerations

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
