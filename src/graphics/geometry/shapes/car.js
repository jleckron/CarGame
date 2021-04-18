/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @this {Car}
 */
 let mov = false;
 let turn = false;
 let forward = true;
 let ang=0;
class Car extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Car} Car created
   */
   constructor(shader, x, y, z, r, g, b) {
       super(shader);
       this.speed = 0.5;

       this.carPos = new Vector3([x, y, z]);
       this.forward = new Vector3([0.0, 0.0, -this.speed]);
       this.backward = new Vector3([0.0, 0.0, this.speed]);
       this.frontLeft;
       this.frontRight;

       this.vertices = this.generateCarVertices(this.carPos.elements[0], this.carPos.elements[1], this.carPos.elements[2], r, g, b);
       this.faces = {0: this.vertices};

       this.modelMatrix = new Matrix4();
       this.normalMatrix = new Matrix4();


       // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
       this.interleaveVertices();
       this.render();
   }

  generateCarVertices(x, y, z, r, g, b) {
      var vertices = []

      //bottom
      var v1 = new Vertex(x-.26, y-.13, z-.5, r, g, b);
      v1.normal.elements[0] = 0;
      v1.normal.elements[1] = -1;
      v1.normal.elements[2] = 0;
      var v2 = new Vertex(x+.26, y-.13, z-.5, r, g, b);
      v2.normal.elements[0] = 0;
      v2.normal.elements[1] = -1;
      v2.normal.elements[2] = 0;
      var v3 = new Vertex(x+.26, y-.13, z+.5, r, g, b);
      v3.normal.elements[0] = 0;
      v3.normal.elements[1] = -1;
      v3.normal.elements[2] = 0;
      vertices.push(v1);
      vertices.push(v2);
      vertices.push(v3);
      var v4 = new Vertex(x-.26, y-.13, z+.5, r, g, b);
      v4.normal.elements[0] = 0;
      v4.normal.elements[1] = -1;
      v4.normal.elements[2] = 0;
      vertices.push(v4);
      vertices.push(v3);
      vertices.push(v1);

      //right side
      var v5 = new Vertex(x+.26, y+.07, z+.5, r, g, b);
      v5.normal.elements[0] = 1;
      v5.normal.elements[1] = 0;
      v5.normal.elements[2] = 0;
      var v7 = new Vertex(x+.26, y-.13, z-.5, r, g, b);;
      v7.normal.elements[0] = 1;
      v7.normal.elements[1] = 0;
      v7.normal.elements[2] = 0;
      var v8 = new Vertex(x+.26, y-.13, z+.5, r, g, b);
      v8.normal.elements[0] = 1;
      v8.normal.elements[1] = 0;
      v8.normal.elements[2] = 0;
      vertices.push(v5);
      vertices.push(v7);
      vertices.push(v8);
      var v6 = new Vertex(x+.26, y+.07, z-.5, r, g, b);
      v6.normal.elements[0] = 1;
      v6.normal.elements[1] = 0;
      v6.normal.elements[2] = 0;
      vertices.push(v5);
      vertices.push(v7);
      vertices.push(v6);


      //left side
      var v9 = new Vertex(x-.26, y+.07, z+.5, r, g, b);
      v9.normal.elements[0] = -1;
      v9.normal.elements[1] = 0;
      v9.normal.elements[2] = 0;
      var v10 = new Vertex(x-.26, y-.13, z+.5, r, g, b);
      v10.normal.elements[0] = -1;
      v10.normal.elements[1] = 0;
      v10.normal.elements[2] = 0;
      var v11 = new Vertex(x-.26, y-.13, z-.5, r, g, b);
      v11.normal.elements[0] = -1;
      v11.normal.elements[1] = 0;
      v11.normal.elements[2] = 0;
      vertices.push(v9);
      vertices.push(v10);
      vertices.push(v11);
      var v12 = new Vertex(x-.26, y+.07, z-.5, r, g, b);
      v12.normal.elements[0] = -1;
      v12.normal.elements[1] = 0;
      v12.normal.elements[2] = 0;
      vertices.push(v9);
      vertices.push(v12);
      vertices.push(v11);

      //front
      var v13 = new Vertex(x-.26, y-.13, z-.5, r, g, b);
      var v14 = new Vertex(x+.26, y-.13, z-.5, r, g, b);
      var v15 = new Vertex(x+.26, y+.07, z-.5, r, g, b);
      var v16 = new Vertex(x-.26, y+.07, z-.5, r, g, b);
      v13.normal.elements[0] = 0;
      v13.normal.elements[1] = 0;
      v13.normal.elements[2] = -1;
      v14.normal.elements[0] = 0;
      v14.normal.elements[1] = 0;
      v14.normal.elements[2] = -1;
      v15.normal.elements[0] = 0;
      v15.normal.elements[1] = 0;
      v15.normal.elements[2] = -1;
      v16.normal.elements[0] = 0;
      v16.normal.elements[1] = 0;
      v16.normal.elements[2] = -1;
      vertices.push(v13);
      vertices.push(v14);
      vertices.push(v15);
      vertices.push(v13);
      vertices.push(v15);
      vertices.push(v16);

      //back
      var v17 = new Vertex(x-.26, y-.13, z+.5, r, g, b);
      var v18 = new Vertex(x+.26, y-.13, z+.5, r, g, b);
      var v19 = new Vertex(x+.26, y+.07, z+.5, r, g, b);
      var v20 = new Vertex(x-.26, y+.07, z+.5, r, g, b);
      v17.normal.elements[0] = 0;
      v17.normal.elements[1] = 0;
      v17.normal.elements[2] = 1;
      v18.normal.elements[0] = 0;
      v18.normal.elements[1] = 0;
      v18.normal.elements[2] = 1;
      v19.normal.elements[0] = 0;
      v19.normal.elements[1] = 0;
      v19.normal.elements[2] = 1;
      v20.normal.elements[0] = 0;
      v20.normal.elements[1] = 0;
      v20.normal.elements[2] = 1;
      vertices.push(v17);
      vertices.push(v18);
      vertices.push(v19);
      vertices.push(v17);
      vertices.push(v19);
      vertices.push(v20);

      //hood
      var v21 = new Vertex(x-.26, y+.07, z-.5, r, g, b);
      var v22 = new Vertex(x+.26, y+.07, z-.5, r, g, b);
      var v23 = new Vertex(x+.26, y+.07, z-.167, r, g, b);
      var v24 = new Vertex(x-.26, y+.07, z-.167, r, g, b);
      v21.normal.elements[0] = 0;
      v21.normal.elements[1] = 1;
      v21.normal.elements[2] = 0;
      v22.normal.elements[0] = 0;
      v22.normal.elements[1] = 1;
      v22.normal.elements[2] = 0;
      v23.normal.elements[0] = 0;
      v23.normal.elements[1] = 1;
      v23.normal.elements[2] = 0;
      v24.normal.elements[0] = 0;
      v24.normal.elements[1] = 1;
      v24.normal.elements[2] = 0;
      vertices.push(v21);
      vertices.push(v22);
      vertices.push(v23);
      vertices.push(v21);
      vertices.push(v23);
      vertices.push(v24);

      //windshild
      var v25 = new Vertex(x-.26, y+.27, z-.08, r, g, b);
      var v26 = new Vertex(x+.26, y+.27, z-.08, r, g, b);
      var v27 = new Vertex(x+.26, y+.07, z-.167, r, g, b);
      var v28 = new Vertex(x-.26, y+.07, z-.167, r, g, b);
      var v1 = new Vector3([v25.point.elements[0]-v26.point.elements[0], v25.point.elements[1]-v26.point.elements[1], v25.point.elements[2]-v26.point.elements[2]]);
      var v2 = new Vector3([v25.point.elements[0]-v28.point.elements[0], v25.point.elements[1]-v28.point.elements[1], v25.point.elements[2]-v28.point.elements[2]]);
      var norm = new Vector3();
      norm = v1.cross(v2);
      v25.normal.elements[0] = norm.elements[0];
      v25.normal.elements[1] = norm.elements[1];
      v25.normal.elements[2] = norm.elements[2];
      v26.normal.elements[0] = norm.elements[0];
      v26.normal.elements[1] = norm.elements[1];
      v26.normal.elements[2] = norm.elements[2];
      v27.normal.elements[0] = norm.elements[0];
      v27.normal.elements[1] = norm.elements[1];
      v27.normal.elements[2] = norm.elements[2];
      v28.normal.elements[0] = norm.elements[0];
      v28.normal.elements[1] = norm.elements[1];
      v28.normal.elements[2] = norm.elements[2];
      vertices.push(v25);
      vertices.push(v26);
      vertices.push(v27);
      vertices.push(v25);
      vertices.push(v27);
      vertices.push(v28);

      //roof
      var v29 = new Vertex(x+.26, y+.27, z+.4, r, g, b);
      var v30 = new Vertex(x+.26, y+.27, z-.08, r, g, b);
      var v31 = new Vertex(x-.26, y+.27, z-.08, r, g, b);
      var v32 = new Vertex(x-.26, y+.27, z+.4, r, g, b);
      v29.normal.elements[0] = 0;
      v29.normal.elements[1] = 1;
      v29.normal.elements[2] = 0;
      v30.normal.elements[0] = 0;
      v30.normal.elements[1] = 1;
      v30.normal.elements[2] = 0;
      v31.normal.elements[0] = 0;
      v31.normal.elements[1] = 1;
      v31.normal.elements[2] = 0;
      v32.normal.elements[0] = 0;
      v32.normal.elements[1] = 1;
      v32.normal.elements[2] = 0;
      vertices.push(v29);
      vertices.push(v30);
      vertices.push(v31);
      vertices.push(v29);
      vertices.push(v31);
      vertices.push(v32);

      //back window
      var v33 = new Vertex(x-.26, y+.27, z+.4, r, g, b);
      var v34 = new Vertex(x+.26, y+.27, z+.4, r, g, b);
      var v35 = new Vertex(x+.26, y+.07, z+.5, r, g, b);
      var v36 = new Vertex(x-.26, y+.07, z+.5, r, g, b);
      var v3 = new Vector3([v33.point.elements[0]-v34.point.elements[0], v33.point.elements[1]-v34.point.elements[1], v33.point.elements[2]-v34.point.elements[2]]);
      var v4 = new Vector3([v33.point.elements[0]-v35.point.elements[0], v33.point.elements[1]-v35.point.elements[1], v33.point.elements[2]-v35.point.elements[2]]);
      var norm2 = new Vector3();
      norm2 = v4.cross(v3);
      v33.normal.elements[0] = norm2.elements[0];
      v33.normal.elements[1] = norm2.elements[1];
      v33.normal.elements[2] = norm2.elements[2];
      v34.normal.elements[0] = norm2.elements[0];
      v34.normal.elements[1] = norm2.elements[1];
      v34.normal.elements[2] = norm2.elements[2];
      v35.normal.elements[0] = norm2.elements[0];
      v35.normal.elements[1] = norm2.elements[1];
      v35.normal.elements[2] = norm2.elements[2];
      v36.normal.elements[0] = norm2.elements[0];
      v36.normal.elements[1] = norm2.elements[1];
      v36.normal.elements[2] = norm2.elements[2];
      vertices.push(v33);
      vertices.push(v34);
      vertices.push(v35);
      vertices.push(v33);
      vertices.push(v35);
      vertices.push(v36);

      //right side window
      var v37 = new Vertex(x+.26, y+.07, z-.167, r, g, b);
      var v38 = new Vertex(x+.26, y+.27, z-.08, r, g, b);
      var v39 = new Vertex(x+.26, y+.07, z-.08, r, g, b);
      v37.normal.elements[0] = 1;
      v37.normal.elements[1] = 0;
      v37.normal.elements[2] = 0;
      v38.normal.elements[0] = 1;
      v38.normal.elements[1] = 0;
      v38.normal.elements[2] = 0;
      v39.normal.elements[0] = 1;
      v39.normal.elements[1] = 0;
      v39.normal.elements[2] = 0;
      vertices.push(v37);
      vertices.push(v38);
      vertices.push(v39);

      var v40 = new Vertex(x+.26, y+.07, z+.4, r, g, b);
      var v41 = new Vertex(x+.26, y+.27, z+.4, r, g, b);
      var v42 = new Vertex(x+.26, y+.07, z+.5, r, g, b);
      v40.normal.elements[0] = 1;
      v40.normal.elements[1] = 0;
      v40.normal.elements[2] = 0;
      v41.normal.elements[0] = 1;
      v41.normal.elements[1] = 0;
      v41.normal.elements[2] = 0;
      v42.normal.elements[0] = 1;
      v42.normal.elements[1] = 0;
      v42.normal.elements[2] = 0;
      vertices.push(v40);
      vertices.push(v41);
      vertices.push(v42);

      vertices.push(v38);
      vertices.push(v39);
      vertices.push(v40);
      vertices.push(v38);
      vertices.push(v41);
      vertices.push(v40);

      //left side window
      var v43 = new Vertex(x-.26, y+.07, z-.167, r, g, b);
      var v44 = new Vertex(x-.26, y+.27, z-.08, r, g, b);
      var v45 = new Vertex(x-.26, y+.07, z-.08, r, g, b);
      v43.normal.elements[0] = -1;
      v43.normal.elements[1] = 0;
      v43.normal.elements[2] = 0;
      v44.normal.elements[0] = -1;
      v44.normal.elements[1] = 0;
      v44.normal.elements[2] = 0;
      v45.normal.elements[0] = -1;
      v45.normal.elements[1] = 0;
      v45.normal.elements[2] = 0;
      vertices.push(v43);
      vertices.push(v44);
      vertices.push(v45);

      var v46 = new Vertex(x-.26, y+.07, z+.4, r, g, b);
      var v47 = new Vertex(x-.26, y+.27, z+.4, r, g, b);
      var v48 = new Vertex(x-.26, y+.07, z+.5, r, g, b);
      v46.normal.elements[0] = -1;
      v46.normal.elements[1] = 0;
      v46.normal.elements[2] = 0;
      v47.normal.elements[0] = -1;
      v47.normal.elements[1] = 0;
      v47.normal.elements[2] = 0;
      v48.normal.elements[0] = -1;
      v48.normal.elements[1] = 0;
      v48.normal.elements[2] = 0;
      vertices.push(v46);
      vertices.push(v47);
      vertices.push(v48);

      vertices.push(v44);
      vertices.push(v45);
      vertices.push(v46);
      vertices.push(v44);
      vertices.push(v46);
      vertices.push(v47);



      this.frontLeft = new Circle(shader, x-.36, y-.1, z-.3, .15, 0.15, 0.15, 0.15, 20);
      this.frontRight = new Circle(shader, x+.27, y-.1, z-.3, .15, 0.15, 0.15, 0.15, 20);
      var rearLeft = new Circle(shader, x-.36, y-.1, z+.3, .15, 0.15, 0.15, 0.15, 20);
      var rearRight = new Circle(shader, x+.27, y-.1, z+.3, .15, 0.15, 0.15, 0.15, 20);

      for(let i=0; i<this.frontLeft.vertices.length; i++){
        vertices.push(this.frontLeft.vertices[i]);
      }
      for(let i=0; i<this.frontRight.vertices.length; i++){
        vertices.push(this.frontRight.vertices[i]);
      }
      for(let i=0; i<rearLeft.vertices.length; i++){
        vertices.push(rearLeft.vertices[i]);
      }
      for(let i=0; i<rearRight.vertices.length; i++){
        vertices.push(rearRight.vertices[i]);
      }
      return vertices;
  }


  render(){
    if(mov==true){
      var trans = new Matrix4();
      if(forward==true){
        trans.setTranslate(this.forward.elements[0], this.forward.elements[1], this.forward.elements[2]);
        this.carPos.elements[0]=this.carPos.elements[0]+this.forward.elements[0];
        this.carPos.elements[1]=this.carPos.elements[1]+this.forward.elements[1];
        this.carPos.elements[2]=this.carPos.elements[2]+this.forward.elements[2];

      }
      else if(forward==false){
        trans.setTranslate(this.backward.elements[0], this.backward.elements[1], this.backward.elements[2]);
        this.carPos.elements[0]=this.carPos.elements[0]+this.backward.elements[0];
        this.carPos.elements[1]=this.carPos.elements[1]+this.backward.elements[1];
        this.carPos.elements[2]=this.carPos.elements[2]+this.backward.elements[2];
      }
      this.modelMatrix = trans.multiply(this.modelMatrix);
    }
    if(turn==true){
      var rotat = new Matrix4();
      var rotat1 = new Matrix4();
      rotat.setRotate(ang, 0, 1, 0);
      rotat1.setRotate(ang, 0, 1, 0);

      var toOrig = new Matrix4();
      toOrig.setTranslate(-this.carPos.elements[0], -this.carPos.elements[1], -this.carPos.elements[2]);
      var toPos = new Matrix4();
      toPos.setTranslate(this.carPos.elements[0], this.carPos.elements[1], this.carPos.elements[2]);
      this.modelMatrix = toOrig.multiply(this.modelMatrix);
      this.modelMatrix = rotat.multiply(this.modelMatrix);
      this.modelMatrix = toPos.multiply(this.modelMatrix);

      this.forward = rotat1.multiplyVector3(this.forward);
      this.backward = rotat1.multiplyVector3(this.backward);
    }
    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    this.shader.setUniform("u_NormalMatrix", this.normalMatrix.elements);
    mov = false;
    turn = false;
    ang = 0;
  }

  move(dir){
    mov = true;
    if(forward==true && dir==1){
      forward=true;
    }
    else if(forward==true && dir==-1){
      forward=false;
    }
    else if(forward==false && dir==-1){
      forward=false;
    }
    else if(forward==false && dir==1){
      forward=true;
    }
  }

  turn(dir){
    turn = true;
    ang = dir;
  }
}
