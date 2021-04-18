/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z, r, g, b) {
    this.point  = new Vector3([x, y, z]);
    this.color  = [r, g, b, 1.0];
    this.normal = new Vector3([0.0, 0.0, 0.0]);
    this.texCoord = [0.0, 0.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
