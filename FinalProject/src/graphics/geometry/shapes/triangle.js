/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, size, r, g, b) {
      super(shader);

      this.vertices = this.generateTriangleVertices(x, y, size, r, g, b);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x, y, size, r, g, b) {
      var vertices = []

      var vertex1 = new Vertex(x-size, y-size, 0.0, r, g, b);
      var vertex2 = new Vertex(x+size, y-size, 0.0, r, g, b);
      var vertex3 = new Vertex(x,  y+size, 0.0, r, g, b);
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      return vertices;
  }
}
