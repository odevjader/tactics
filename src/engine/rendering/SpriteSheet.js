/**
 * Represents a sprite sheet for animations.
 */
class SpriteSheet {
  /**
   * Creates a new SpriteSheet instance.
   * @param {string} imageSrc - The path to the image file for the sprite sheet.
   * @param {number} frameWidth - The width of a single frame in the sprite sheet.
   * @param {number} frameHeight - The height of a single frame in the sprite sheet.
   * @param {function} [onloadCallback] - Optional callback to execute when the image is loaded.
   */
  constructor(imageSrc, frameWidth, frameHeight, onloadCallback = null) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frames = new Map(); // To store defined animations: name -> { indices: [], speed: fps }
    this.loaded = false;
    this.numFrames = 0; // Total number of frames in the sheet (can be calculated if needed)

    this.image.onload = () => {
      this.loaded = true;
      this.numFrames = Math.floor(this.image.width / this.frameWidth) * Math.floor(this.image.height / this.frameHeight);
      console.log(`SpriteSheet loaded: ${imageSrc}, Frames: ${this.numFrames}`);
      if (onloadCallback) {
        onloadCallback();
      }
    };

    this.image.onerror = () => {
      console.error(`Failed to load sprite sheet: ${imageSrc}`);
      // Potentially set a flag or use a default placeholder image
    };

    this.image.src = imageSrc;
  }

  /**
   * Defines a named animation sequence.
   * @param {string} name - The name of the animation (e.g., 'idle', 'walk').
   * @param {Array<number>} frameIndices - An array of frame numbers (0-based) that make up this animation.
   *                                      These indices are based on a left-to-right, top-to-bottom reading.
   * @param {number} speed - Animation speed in frames per second (FPS).
   */
  defineAnim(name, frameIndices, speed) {
    if (!frameIndices || frameIndices.length === 0) {
      console.warn(`Attempted to define animation "${name}" with no frame indices.`);
      return;
    }
    if (speed <= 0) {
      console.warn(`Attempted to define animation "${name}" with speed <= 0.`);
      return;
    }
    this.frames.set(name, { indices: frameIndices, speed: speed });
    console.log(`Animation defined: ${name}, Indices: [${frameIndices.join(', ')}], Speed: ${speed} FPS`);
  }
}

// export default SpriteSheet; // Uncomment if using ES6 modules
