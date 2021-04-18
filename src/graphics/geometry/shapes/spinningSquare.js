/**
 * Specifies a spining square. A subclass of square.
 *@author Jack Leckrone
 * @this {Square}
 */
class SpinningSquare extends Square {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {spinningSquare} Spinning Square created
   */
   constructor(shader, x, y, size, r, g, b) {
    super(shader);
    this.modelMatrix = new Matrix4();
    this.vertices = this.generateSquareVertices(x, y, size, r, g, b);
    this.x = x;
    this.y = y;

    this.interleaveVertices();
    this.render();

  }

  render(){
    let rotateM = new Matrix4();
    rotateM.setRotate(1, 0, 0, 1);
    let translateM1 = new Matrix4();
    translateM1.setTranslate(-this.x, -this.y, 0);
    let translateM2 = new Matrix4();
    translateM2.setTranslate(this.x, this.y, 0);
    this.modelMatrix = translateM1.multiply(this.modelMatrix);
    this.modelMatrix = rotateM.multiply(this.modelMatrix);
    this.modelMatrix = translateM2.multiply(this.modelMatrix);

    this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);

  }
}
