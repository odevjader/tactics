---
id: TASK-010
title: "Implement Loot, Crafting, and Economy Systems"
epic: "Phase 2: The Character Engine - Systemic Depth & Progression"
status: backlog
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Introduce item rarity tiers, procedural affixes on items, a material-based crafting system (new gear and upgrades), and a basic shop system.

### Critérios de Aceitação

- [ ] Rarity Tiers: Items have rarities: `Common`, `Uncommon`, `Rare`, `Epic`, `Legendary`. Higher rarities have more/better stat affixes.
- [ ] Procedural Affixes: Rare+ items can drop with random bonuses (e.g., "of the Bear" [+STR]).
- [ ] Crafting System: Enemies drop materials. A `Blacksmith` menu in the `PartyManagement` state allows crafting new gear and upgrading existing gear (add affixes, improve base stats).
- [ ] Shop System: A basic shop to buy/sell common gear and consumables.

### Arquivos Relevantes

* `src/battle/loot_system.rs` (suggested)
* `src/systems/crafting_system.rs` (suggested)
* `src/systems/shop_system.rs` (suggested)
* `src/data_loading/item_data.rs` (suggested)
* `src/ui/blacksmith_ui.rs` (suggested)
* `src/ui/shop_ui.rs` (suggested)

### Relatório de Execução

(Esta seção deve ser deixada em branco no template)
