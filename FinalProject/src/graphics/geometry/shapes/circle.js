/**
 * Specifies a circle. A subclass of geometry.
 *
 * @this {Circle}
 */
 let left = true;
// let ang = 1;
 //let turn = false;
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader, x, y, z, size, r, g, b, segs) {
      super(shader);

      this.vertices = this.generateCircleVertices(x, y, z, size, r, g, b, segs);
      this.faces = {0: this.vertices};
      this.modelMatrix = new Matrix4();

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
    //  this.render();
  }

  generateCircleVertices(x, y, z, size, r, g, b, segs) {
      var vertices = []

      let ang = 0;
      let curX = size * Math.cos(ang);
      let curY = size * Math.sin(ang);
      var vertex0 = new Vertex(x+.1, y, z, r, g, b);
      var vertex1 = new Vertex(x, y, z, r, g, b);
      vertex0.normal.elements[0] = 1;
      vertex0.normal.elements[1] = 0;
      vertex0.normal.elements[2] = 0;
      vertex1.normal.elements[0] = -1;
      vertex1.normal.elements[1] = 0;
      vertex1.normal.elements[2] = 0;
      for(let i=0; i<=segs; i++){
        var vertex2 = new Vertex(x, y+curX, z+curY, r, g, b);
        var v2 = new Vertex(x, y+curX, z+curY, r, g, b);
        var vertex4 = new Vertex(x+.1, y+curX, z+curY, r, g, b);
        var v4 = new Vertex(x+.1, y+curX, z+curY, r, g, b);
        vertex2.normal.elements[0] = -1;
        vertex2.normal.elements[1] = 0;
        vertex2.normal.elements[2] = 0;
        vertex4.normal.elements[0] = 1;
        vertex4.normal.elements[1] = 0;
        vertex4.normal.elements[2] = 0;


        ang = i*2*Math.PI / segs;
        let nextX = size * Math.cos(ang);
        let nextY = size * Math.sin(ang);

        var vertex3 = new Vertex(x, y+nextX, z+nextY, r, g, b);
        var v3 = new Vertex(x, y+nextX, z+nextY, r, g, b);
        var vertex5 = new Vertex(x+.1, y+nextX, z+nextY, r, g, b);
        var v5 = new Vertex(x+.1, y+nextX, z+nextY, r, g, b);
        vertex3.normal.elements[0] = -1;
        vertex3.normal.elements[1] = 0;
        vertex3.normal.elements[2] = 0;
        vertex5.normal.elements[0] = 1;
        vertex5.normal.elements[1] = 0;
        vertex5.normal.elements[2] = 0;


        curX=nextX;
        curY=nextY;

        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);

        vertices.push(vertex0);
        vertices.push(vertex4);
        vertices.push(vertex5);


        var v1 = new Vector3([v2.point.elements[0]-v3.point.elements[0], v2.point.elements[1]-v3.point.elements[1], v2.point.elements[2]-v3.point.elements[2]]);
        var v2b = new Vector3([v2.point.elements[0]-v4.point.elements[0], v2.point.elements[1]-v4.point.elements[1], v2.point.elements[2]-v4.point.elements[2]]);
        var norm = new Vector3();
        norm = v1.cross(v2b);
        v2.normal.elements[0] = norm.elements[0];
        v2.normal.elements[1] = norm.elements[1];
        v2.normal.elements[2] = norm.elements[2];
        v3.normal.elements[0] = norm.elements[0];
        v3.normal.elements[1] = norm.elements[1];
        v3.normal.elements[2] = norm.elements[2];
        v4.normal.elements[0] = norm.elements[0];
        v4.normal.elements[1] = norm.elements[1];
        v4.normal.elements[2] = norm.elements[2];
        v5.normal.elements[0] = norm.elements[0];
        v5.normal.elements[1] = norm.elements[1];
        v5.normal.elements[2] = norm.elements[2];

        vertices.push(v2);
        vertices.push(v3);
        vertices.push(v4);

        vertices.push(v3);
        vertices.push(v4);
        vertices.push(v5);

      }
      return vertices;
  }

  /*turn(dir){
    turn = true;
    ang = ang + dir;
  }

  render(){
    var rotate = new Matrix4();
    rotate.setRotate(ang, 1, 1, 1);
    //if(turn==true){
      console.log("turn1");
      this.modelMatrix = rotate.multiply(this.modelMatrix);
  //  }
    this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);
    turn = false;
  }*/
}
