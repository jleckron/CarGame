/**
 * Specifies a square. A subclass of geometry.
 *
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, x, y, z, size, r, g, b) {
      super(shader);

      this.vertices = this.generateSquareVertices(x, y, z, size, r, g, b);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x, y, z, size, r, g, b) {
      var vertices = []

      var vertex1 = new Vertex(x, y, z, r, g, b);
      vertex1.normal.elements[0] = 0;
      vertex1.normal.elements[1] = 1;
      vertex1.normal.elements[2] = 0;

      var vertex2 = new Vertex(x+size,  y, z, r, g, b);
      vertex2.normal.elements[0] = 0;
      vertex2.normal.elements[1] = 1;
      vertex2.normal.elements[2] = 0;

      var vertex3 = new Vertex(x, y, z-size, r, g, b);
      vertex3.normal.elements[0] = 0;
      vertex3.normal.elements[1] = 1;
      vertex3.normal.elements[2] = 0;

      var vertex4 = new Vertex(x+size, y, z-size, r, g, b);
      vertex4.normal.elements[0] = 0;
      vertex4.normal.elements[1] = 1;
      vertex4.normal.elements[2] = 0;

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);

      return vertices;
  }
}
