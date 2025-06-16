// import Tile from './Tile.js'; // Uncomment if using ES6 modules

/**
 * Represents the isometric grid.
 */
class IsometricGrid {
  /**
   * Creates a new IsometricGrid instance.
   * @param {number} gridWidth - The width of the grid in tiles.
   * @param {number} gridHeight - The height of the grid in tiles.
   * @param {object} tileDisplaySize - The display size of a tile in pixels.
   * @param {number} tileDisplaySize.width - The width of the tile's diamond shape.
   * @param {number} tileDisplaySize.height - The height of the tile's diamond shape.
   */
  constructor(gridWidth, gridHeight, tileDisplaySize) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.tileDisplaySize = tileDisplaySize;
    this.tiles = [];

    // Initialize the grid with Tile objects
    for (let y = 0; y < gridHeight; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < gridWidth; x++) {
        // Assuming Tile class is available globally or imported
        this.tiles[y][x] = new Tile(x, y);
      }
    }
  }

  /**
   * Converts world coordinates (tile grid coordinates) to screen pixel coordinates.
   * This version calculates the center of the isometric tile on screen.
   * @param {number} worldX - The x-coordinate in the tile grid.
   * @param {number} worldY - The y-coordinate in the tile grid.
   * @returns {object} An object with screenX and screenY properties.
   */
  worldToIsometric(worldX, worldY) {
    const screenX = (worldX - worldY) * (this.tileDisplaySize.width / 2);
    const screenY = (worldX + worldY) * (this.tileDisplaySize.height / 2);
    // Note: This doesn't account for tile height yet or specific screen origin.
    // Adjustments will be needed for actual rendering.
    return { screenX, screenY };
  }

  /**
   * Converts screen pixel coordinates to logical isometric grid coordinates.
   * This is the inverse of worldToIsometric.
   * @param {number} screenX - The x-coordinate on the screen.
   * @param {number} screenY - The y-coordinate on the screen.
   * @returns {object} An object with worldX and worldY properties (grid coordinates).
   */
  screenToIsometric(screenX, screenY) {
    const worldX = (screenX / (this.tileDisplaySize.width / 2) + screenY / (this.tileDisplaySize.height / 2)) / 2;
    const worldY = (screenY / (this.tileDisplaySize.height / 2) - screenX / (this.tileDisplaySize.width / 2)) / 2;
    // Note: This is a simplified version and may need refinement,
    // especially for accuracy when clicking on tiles.
    return { worldX, worldY };
  }

  /**
   * Gets the Tile object at the specified grid coordinates.
   * @param {number} gridX - The x-coordinate in the tile grid.
   * @param {number} gridY - The y-coordinate in the tile grid.
   * @returns {Tile|null} The Tile object, or null if out of bounds.
   */
  getTile(gridX, gridY) {
    if (gridY >= 0 && gridY < this.gridHeight && gridX >= 0 && gridX < this.gridWidth) {
      return this.tiles[gridY][gridX];
    }
    return null; // Out of bounds
  }

  /**
   * Sets the height of a specific tile in the grid.
   * @param {number} gridX - The x-coordinate of the tile.
   * @param {number} gridY - The y-coordinate of the tile.
   * @param {number} height - The new height for the tile.
   */
  setTileHeight(gridX, gridY, height) {
    const tile = this.getTile(gridX, gridY);
    if (tile) {
      tile.height = height;
    }
    // Optionally, handle error if tile not found
  }
}

// Export the IsometricGrid class if using modules
// export default IsometricGrid; // Uncomment if using ES6 modules
