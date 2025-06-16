/**
 * Represents a single tile in the isometric grid.
 */
class Tile {
  /**
   * Creates a new Tile instance.
   * @param {number} x - The x-coordinate of the tile in the grid.
   * @param {number} y - The y-coordinate of the tile in the grid.
   * @param {number} [height=0] - The height of the tile.
   * @param {boolean} [walkable=true] - Whether the tile is walkable.
   * @param {string} [terrainType='grass'] - The type of terrain of the tile.
   */
  constructor(x, y, height = 0, walkable = true, terrainType = 'grass') {
    this.x = x;
    this.y = y;
    this.height = height;
    this.walkable = walkable;
    this.terrainType = terrainType;
  }
}

// Export the Tile class if using modules, otherwise it will be globally available
// export default Tile; // Uncomment if using ES6 modules
