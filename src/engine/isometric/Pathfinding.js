// import Tile from './Tile.js'; // Assuming Tile might be needed for type hinting or direct use
// import IsometricGrid from './IsometricGrid.js'; // Assuming IsometricGrid might be needed for type hinting

/**
 * Represents a node in the A* pathfinding algorithm.
 */
class PathNode {
  /**
   * Creates a new PathNode instance.
   * @param {number} x - The x-coordinate of the node in the grid.
   * @param {number} y - The y-coordinate of the node in the grid.
   * @param {PathNode|null} [parent=null] - The parent node from which this node was reached.
   * @param {number} [gCost=0] - The cost from the start node to this node.
   * @param {number} [hCost=0] - The heuristic (estimated cost) from this node to the end node.
   */
  constructor(x, y, parent = null, gCost = 0, hCost = 0) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.gCost = gCost;
    this.hCost = hCost;
    this.fCost = this.gCost + this.hCost;
  }
}

/**
 * Provides A* pathfinding capabilities for an IsometricGrid.
 */
class Pathfinder {
  /**
   * Creates a new Pathfinder instance.
   * @param {IsometricGrid} grid - The isometric grid to perform pathfinding on.
   * @param {number} [maxStepHeight=1] - The maximum height difference allowed between adjacent tiles.
   */
  constructor(grid, maxStepHeight = 1) {
    this.grid = grid;
    this.maxStepHeight = maxStepHeight;
  }

  /**
   * Calculates the Manhattan distance heuristic between two points.
   * @param {number} x1 - X-coordinate of the first point.
   * @param {number} y1 - Y-coordinate of the first point.
   * @param {number} x2 - X-coordinate of the second point.
   * @param {number} y2 - Y-coordinate of the second point.
   * @returns {number} The Manhattan distance.
   */
  _heuristic(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  /**
   * Reconstructs the path from the end node back to the start node.
   * @param {PathNode} endNode - The end node of the path.
   * @returns {Array<Array<number>>} An array of [x, y] coordinate pairs representing the path.
   */
  _reconstructPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode) {
      path.unshift([currentNode.x, currentNode.y]);
      currentNode = currentNode.parent;
    }
    return path;
  }

  /**
   * Gets the valid neighbors of a given node.
   * Considers grid boundaries, walkability, and max step height.
   * @param {PathNode} node - The node to get neighbors for.
   * @param {PathNode} endNode - The target end node (for heuristic calculation).
   * @returns {Array<PathNode>} An array of valid neighbor nodes.
   */
  _getNeighbors(node, endNode) {
    const neighbors = [];
    const directions = [
      { dx: 0, dy: -1 }, // North
      { dx: 0, dy: 1 },  // South
      { dx: 1, dy: 0 },  // East
      { dx: -1, dy: 0 }  // West
      // Add diagonal movements if desired, e.g., { dx: -1, dy: -1 }
      // If adding diagonals, adjust gCost accordingly (e.g., Math.sqrt(2) or just 1.414)
    ];

    const currentTile = this.grid.getTile(node.x, node.y);
    if (!currentTile) return []; // Should not happen if node is valid

    for (const dir of directions) {
      const nx = node.x + dir.dx;
      const ny = node.y + dir.dy;

      const neighborTile = this.grid.getTile(nx, ny);

      if (neighborTile && neighborTile.walkable) {
        // Height difference check
        if (Math.abs(neighborTile.height - currentTile.height) <= this.maxStepHeight) {
          // For now, gCost is simply 1 for adjacent tiles
          const gCost = node.gCost + 1;
          const hCost = this._heuristic(nx, ny, endNode.x, endNode.y);
          neighbors.push(new PathNode(nx, ny, node, gCost, hCost));
        }
      }
    }
    return neighbors;
  }

  /**
   * Finds a path from a start point to an end point using the A* algorithm.
   * @param {number} startX - The x-coordinate of the start point.
   * @param {number} startY - The y-coordinate of the start point.
   * @param {number} endX - The x-coordinate of the end point.
   * @param {number} endY - The y-coordinate of the end point.
   * @returns {Array<Array<number>>|null} An array of [x, y] coordinate pairs representing the path,
   *                                       or null if no path is found.
   */
  findPath(startX, startY, endX, endY) {
    const startTile = this.grid.getTile(startX, startY);
    const endTile = this.grid.getTile(endX, endY);

    if (!startTile || !endTile || !startTile.walkable || !endTile.walkable) {
      return null; // Start or end tile is invalid or not walkable
    }

    if (startX === endX && startY === endY) {
        return [[startX, startY]]; // Start and end are the same
    }

    const openSet = []; // Use a simple array for now, sort by F-cost
    const closedSet = new Set(); // To store "x,y" strings for efficient lookup

    const startNode = new PathNode(startX, startY, null, 0, this._heuristic(startX, startY, endX, endY));
    openSet.push(startNode);

    const endNodeTarget = new PathNode(endX, endY); // Used for heuristic and comparison

    while (openSet.length > 0) {
      // Sort openSet by fCost to get the node with the lowest fCost
      openSet.sort((a, b) => a.fCost - b.fCost);
      const currentNode = openSet.shift(); // Get and remove the best node

      if (currentNode.x === endNodeTarget.x && currentNode.y === endNodeTarget.y) {
        return this._reconstructPath(currentNode); // Path found
      }

      closedSet.add(`${currentNode.x},${currentNode.y}`);

      const neighbors = this._getNeighbors(currentNode, endNodeTarget);

      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (closedSet.has(neighborKey)) {
          continue; // Already evaluated
        }

        // gCost to neighbor is already calculated in _getNeighbors based on currentNode's gCost
        // const tentativeGCost = currentNode.gCost + 1; // Assuming cost of 1 to move to neighbor

        const existingNodeInOpenSet = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);

        if (existingNodeInOpenSet) {
          if (neighbor.gCost < existingNodeInOpenSet.gCost) {
            existingNodeInOpenSet.gCost = neighbor.gCost;
            existingNodeInOpenSet.fCost = existingNodeInOpenSet.gCost + existingNodeInOpenSet.hCost;
            existingNodeInOpenSet.parent = currentNode;
          }
        } else {
          // Add the neighbor to the open set
          // The neighbor PathNode created by _getNeighbors already has its parent and costs set.
          openSet.push(neighbor);
        }
      }
    }

    return null; // No path found
  }

  /**
   * Finds all tiles reachable from a start point within a given maximum movement cost.
   * Uses a BFS-like approach.
   * @param {number} startX - The x-coordinate of the start point.
   * @param {number} startY - The y-coordinate of the start point.
   * @param {number} maxCost - The maximum movement cost (e.g., unit's moveRange).
   * @returns {Array<{x: number, y: number, cost: number}>} An array of objects,
   *          each representing a reachable tile with its coordinates and cost to reach.
   */
  getReachableTiles(startX, startY, maxCost) {
    const reachable = []; // Stores {x, y, cost}
    const queue = [];     // Stores {x, y, cost} for BFS
    const visited = new Set(); // Stores "x,y" strings for visited tiles to prevent cycles and redundant checks

    const startTile = this.grid.getTile(startX, startY);
    if (!startTile) {
      return []; // Start tile is invalid
    }

    queue.push({ x: startX, y: startY, cost: 0 });
    visited.add(`${startX},${startY}`);
    reachable.push({ x: startX, y: startY, cost: 0 }); // Starting tile is reachable with cost 0

    const directions = [
      { dx: 0, dy: -1 }, // North
      { dx: 0, dy: 1 },  // South
      { dx: 1, dy: 0 },  // East
      { dx: -1, dy: 0 }  // West
    ];

    let head = 0;
    while (head < queue.length) {
      const current = queue[head++];
      const currentTile = this.grid.getTile(current.x, current.y); // Should always exist

      if (current.cost >= maxCost) { // No need to explore further from this tile if maxCost is met/exceeded
        continue;
      }

      for (const dir of directions) {
        const nx = current.x + dir.dx;
        const ny = current.y + dir.dy;
        const neighborKey = `${nx},${ny}`;

        if (visited.has(neighborKey)) {
          continue; // Already visited this tile
        }

        const neighborTile = this.grid.getTile(nx, ny);

        if (neighborTile && neighborTile.walkable) {
          // Height difference check (using this.maxStepHeight from Pathfinder constructor)
          if (Math.abs(neighborTile.height - currentTile.height) <= this.maxStepHeight) {
            const newCost = current.cost + 1; // Assuming each step costs 1
            if (newCost <= maxCost) {
              visited.add(neighborKey);
              queue.push({ x: nx, y: ny, cost: newCost });
              reachable.push({ x: nx, y: ny, cost: newCost });
            }
          }
        }
      }
    }
    return reachable; // Does not include the start tile itself, unless explicitly added. Let's add it.
    // Actually, the logic above adds the start tile with cost 0.
  }
}

// Export the Pathfinder class if using modules
// export default Pathfinder; // Uncomment if using ES6 modules
