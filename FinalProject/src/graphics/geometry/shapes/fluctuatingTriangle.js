/**
 * Specifies a fluctuating triangle. A subclass of triangle.
 *
 * @this {fluctTriangle}
 */
class FluctuatingTriangle extends Triangle {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {FluctuatingTriangle} Fluctuating Triangle created
   */
   constructor(shader, x, y, size, r, g, b) {
    super(shader);
    this.modelMatrix = new Matrix4();
    this.vertices = this.generateTriangleVertices(x, y, size, r, g, b);

    this.x = x;
    this.y =y;
    this.timer = 0;
    this.grow = true;
    this.interleaveVertices();
    this.render();

  }

  render(){
    let translateM1 = new Matrix4();
    translateM1.setTranslate(-this.x, -this.y, 0);
    let translateM2 = new Matrix4();
    translateM2.setTranslate(this.x, this.y, 0);
    let scale = new Matrix4();
    let z = this.timer%80;
    if(z==0 && this.timer!=0){
      this.grow = false;
    }
    if(z==0 && this.timer==0){
      this.grow = true;
    }
    if(this.grow == true){
      scale.setScale(1.01, 1.01, 0, 1);
      this.timer++;
    }
    else{
      scale.setScale(0.99, 0.99, 0, 1);
      this.timer--;
    }
    this.modelMatrix = translateM1.multiply(this.modelMatrix);
    this.modelMatrix = scale.multiply(this.modelMatrix);
    this.modelMatrix = translateM2.multiply(this.modelMatrix);
    this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);

  }


}
