/**
 * Specifies a Scene full of Geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   * @returns {Scene} Scene object created
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this.light = null;
    this.fogDist = new Float32Array([0, 50]);
    this.fogColor = new Float32Array([0.4, 0.4, 0.5]);
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  setLight(light) {
    this.light = light;
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}
