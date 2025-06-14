---
id: TASK-001
title: "Basic HTML Page Setup"
epic: "Phase 1 (MVP): Browser-Based Combat Core"
status: done
priority: medium
dependencies: []
assignee: Jules
---

### Descrição

Create the main HTML file that will host the game canvas and any other UI elements.

### Critérios de Aceitação

- [ ] An `index.html` file is created.
- [ ] The HTML file includes a `<canvas>` element with a specific ID (e.g., `gameCanvas`).
- [ ] The HTML file structure is valid.

### Arquivos Relevantes

*

### Relatório de Execução

Created an `index.html` file in the project root.
The file includes:
- Standard HTML5 structure.
- A `<meta charset="UTF-8">` and `<meta name="viewport" ...>` tag.
- A `<title>Tactics Saga - MVP</title>`.
- Basic CSS to center the canvas and set a black background.
- A `<canvas id="gameCanvas"></canvas>` element within the `<body>`.
- A small inline script to get the canvas element, set a placeholder size (400x400), get the 2D context, and draw a "Canvas Ready" message.
This fulfills all acceptance criteria for the task.
