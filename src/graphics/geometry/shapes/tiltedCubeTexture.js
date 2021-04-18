/**
 * Specifies a tilted cube. A subclass of geometry.
 *
 @author John Leckrone
 * @this {tilted cube}
 */
class TexturedTiltedCube extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {TiltedCube} Tilted Cube created
   */
   constructor(shader, x, y, z, size, image, flag) {
       super(shader);
       this.x = x;
       this.y = y;
       this.vertices = this.generateTexCubeVertices(x, y, z, size, flag);
       this.faces = {0: this.vertices};
       this.image = image;

       // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
       this.interleaveVertices();
       this.render();
   }

   generateTexCubeVertices(x, y, z, size, flag) {
       var vertices = []
       let r=0;
       let b=0;
       let g=1;
       //front face
       var vertex1 = new Vertex(x, y, z, r, g, b);
       var vertex2 = new Vertex(x, y+size, z, r, g, b);
       var vertex3 = new Vertex(x+size, y, z, r, g, b);
       var vertex4 = new Vertex(x+size, y+size, z, r, g, b);

       //top face
       var vertex5 = new Vertex(x+size, y+size, z, r, g, b);
       var vertex6 = new Vertex(x, y+size, z, r, g, b);
       var vertex7 = new Vertex(x, y+size, z-size, r, g, b);
       var vertex8 = new Vertex(x+size, y+size, z-size, r, g, b);

       //bottom face
       var vertex9 = new Vertex(x, y, z, r, g, b);
       var vertex10 = new Vertex(x+size,  y, z, r, g, b);
       var vertex11 = new Vertex(x, y, z-size, r, g, b);
       var vertex12 = new Vertex(x+size, y, z-size, r, g, b);

       //left face
       var vertex13 = new Vertex(x, y, z, r, g, b);
       var vertex14 = new Vertex(x, y, z-size, r, g, b);
       var vertex15 = new Vertex(x, y+size, z-size, r, g, b);
       var vertex16 = new Vertex(x, y+size, z, r, g, b);

       //right face
       var vertex17 = new Vertex(x+size,  y, z, r, g, b);
       var vertex18 = new Vertex(x+size, y+size, z, r, g, b);
       var vertex19 = new Vertex(x+size, y+size, z-size, r, g, b);
       var vertex20 = new Vertex(x+size, y, z-size, r, g, b);

       //rear face
       var vertex21 = new Vertex(x, y, z-size, r, g, b);
       var vertex22 = new Vertex(x+size, y, z-size, r, g, b);
       var vertex23 = new Vertex(x, y+size, z-size, r, g, b);
       var vertex24 = new Vertex(x+size, y+size, z-size, r, g, b);

       if(flag==1){
         vertex1.normal.elements[0] = 0;
         vertex1.normal.elements[1] = 0;
         vertex1.normal.elements[2] = -1;
         vertex2.normal.elements[0] = 0;
         vertex2.normal.elements[1] = 0;
         vertex2.normal.elements[2] = -1;
         vertex3.normal.elements[0] = 0;
         vertex3.normal.elements[1] = 0;
         vertex3.normal.elements[2] = -1;
         vertex4.normal.elements[0] = 0;
         vertex4.normal.elements[1] = 0;
         vertex4.normal.elements[2] = -1;

         vertex5.normal.elements[0] = 0;
         vertex5.normal.elements[1] = -1;
         vertex5.normal.elements[2] = 0;
         vertex6.normal.elements[0] = 0;
         vertex6.normal.elements[1] = -1;
         vertex6.normal.elements[2] = 0;
         vertex7.normal.elements[0] = 0;
         vertex7.normal.elements[1] = -1;
         vertex7.normal.elements[2] = 0;
         vertex8.normal.elements[0] = 0;
         vertex8.normal.elements[1] = -1;
         vertex8.normal.elements[2] = 0;

         vertex9.normal.elements[0] = 0;
         vertex9.normal.elements[1] = 1;
         vertex9.normal.elements[2] = 0;
         vertex10.normal.elements[0] = 0;
         vertex10.normal.elements[1] = 1;
         vertex10.normal.elements[2] = 0;
         vertex11.normal.elements[0] = 0;
         vertex11.normal.elements[1] = 1;
         vertex11.normal.elements[2] = 0;
         vertex12.normal.elements[0] = 0;
         vertex12.normal.elements[1] = 1;
         vertex12.normal.elements[2] = 0;

         vertex13.normal.elements[0] = 1;
         vertex13.normal.elements[1] = 0;
         vertex13.normal.elements[2] = 0;
         vertex14.normal.elements[0] = 1;
         vertex14.normal.elements[1] = 0;
         vertex14.normal.elements[2] = 0;
         vertex15.normal.elements[0] = 1;
         vertex15.normal.elements[1] = 0;
         vertex15.normal.elements[2] = 0;
         vertex16.normal.elements[0] = 1;
         vertex16.normal.elements[1] = 0;
         vertex16.normal.elements[2] = 0;

         vertex17.normal.elements[0] = -1;
         vertex17.normal.elements[1] = 0;
         vertex17.normal.elements[2] = 0;
         vertex18.normal.elements[0] = -1;
         vertex18.normal.elements[1] = 0;
         vertex18.normal.elements[2] = 0;
         vertex19.normal.elements[0] = -1;
         vertex19.normal.elements[1] = 0;
         vertex19.normal.elements[2] = 0;
         vertex20.normal.elements[0] = -1;
         vertex20.normal.elements[1] = 0;
         vertex20.normal.elements[2] = 0;

         vertex21.normal.elements[0] = 0;
         vertex21.normal.elements[1] = 0;
         vertex21.normal.elements[2] = 1;
         vertex22.normal.elements[0] = 0;
         vertex22.normal.elements[1] = 0;
         vertex22.normal.elements[2] = 1;
         vertex23.normal.elements[0] = 0;
         vertex23.normal.elements[1] = 0;
         vertex23.normal.elements[2] = 1;
         vertex24.normal.elements[0] = 0;
         vertex24.normal.elements[1] = 0;
         vertex24.normal.elements[2] = 1;
       }
       else if(flag==0){
         vertex1.normal.elements[0] = 0;
         vertex1.normal.elements[1] = 0;
         vertex1.normal.elements[2] = 1;
         vertex2.normal.elements[0] = 0;
         vertex2.normal.elements[1] = 0;
         vertex2.normal.elements[2] = 1;
         vertex3.normal.elements[0] = 0;
         vertex3.normal.elements[1] = 0;
         vertex3.normal.elements[2] = 1;
         vertex4.normal.elements[0] = 0;
         vertex4.normal.elements[1] = 0;
         vertex4.normal.elements[2] = 1;

         vertex5.normal.elements[0] = 0;
         vertex5.normal.elements[1] = 1;
         vertex5.normal.elements[2] = 0;
         vertex6.normal.elements[0] = 0;
         vertex6.normal.elements[1] = 1;
         vertex6.normal.elements[2] = 0;
         vertex7.normal.elements[0] = 0;
         vertex7.normal.elements[1] = 1;
         vertex7.normal.elements[2] = 0;
         vertex8.normal.elements[0] = 0;
         vertex8.normal.elements[1] = 1;
         vertex8.normal.elements[2] = 0;

         vertex9.normal.elements[0] = 0;
         vertex9.normal.elements[1] = -1;
         vertex9.normal.elements[2] = 0;
         vertex10.normal.elements[0] = 0;
         vertex10.normal.elements[1] = -1;
         vertex10.normal.elements[2] = 0;
         vertex11.normal.elements[0] = 0;
         vertex11.normal.elements[1] = -1;
         vertex11.normal.elements[2] = 0;
         vertex12.normal.elements[0] = 0;
         vertex12.normal.elements[1] = -1;
         vertex12.normal.elements[2] = 0;

         vertex13.normal.elements[0] = -1;
         vertex13.normal.elements[1] = 0;
         vertex13.normal.elements[2] = 0;
         vertex14.normal.elements[0] = -1;
         vertex14.normal.elements[1] = 0;
         vertex14.normal.elements[2] = 0;
         vertex15.normal.elements[0] = -1;
         vertex15.normal.elements[1] = 0;
         vertex15.normal.elements[2] = 0;
         vertex16.normal.elements[0] = -1;
         vertex16.normal.elements[1] = 0;
         vertex16.normal.elements[2] = 0;

         vertex17.normal.elements[0] = 1;
         vertex17.normal.elements[1] = 0;
         vertex17.normal.elements[2] = 0;
         vertex18.normal.elements[0] = 1;
         vertex18.normal.elements[1] = 0;
         vertex18.normal.elements[2] = 0;
         vertex19.normal.elements[0] = 1;
         vertex19.normal.elements[1] = 0;
         vertex19.normal.elements[2] = 0;
         vertex20.normal.elements[0] = 1;
         vertex20.normal.elements[1] = 0;
         vertex20.normal.elements[2] = 0;

         vertex21.normal.elements[0] = 0;
         vertex21.normal.elements[1] = 0;
         vertex21.normal.elements[2] = -1;
         vertex22.normal.elements[0] = 0;
         vertex22.normal.elements[1] = 0;
         vertex22.normal.elements[2] = -1;
         vertex23.normal.elements[0] = 0;
         vertex23.normal.elements[1] = 0;
         vertex23.normal.elements[2] = -1;
         vertex24.normal.elements[0] = 0;
         vertex24.normal.elements[1] = 0;
         vertex24.normal.elements[2] = -1;
       }

       //front
       vertex1.texCoord = [0.0, 0.0];
       vertex2.texCoord = [0.0, 1.0];
       vertex3.texCoord = [1.0, 0.0];
       vertex4.texCoord = [1.0, 1.0];
       //top
       if(flag==1){
         vertex6.texCoord = [0.0, 0.0];
         vertex5.texCoord = [0.0, 1.0];
         vertex7.texCoord = [1.0, 0.0];
         vertex8.texCoord = [1.0, 1.0];
       }
       else if(flag==0){
         vertex6.texCoord = [0.0, 0.999];
         vertex5.texCoord = [0.001, 0.999];
         vertex7.texCoord = [0.0, 1.0];
         vertex8.texCoord = [0.001, 1.0];
       }
       //bottom
    /*   vertex9.texCoord = [0.0, 0.0];
       vertex10.texCoord = [0.0, 1.0];
       vertex11.texCoord = [1.0, 0.0];
       vertex12.texCoord = [1.0, 1.0];*/
       //left
       vertex13.texCoord = [0.0, 0.0];
       vertex14.texCoord = [1.0, 0.0];
       vertex15.texCoord = [1.0, 1.0];
       vertex16.texCoord = [0.0, 1.0];
     //right
       vertex17.texCoord = [1.0, 0.0];
       vertex18.texCoord = [1.0, 1.0];
       vertex19.texCoord = [0.0, 1.0];
       vertex20.texCoord = [0.0, 0.0];
       //back
       vertex21.texCoord = [1.0, 0.0];
       vertex22.texCoord = [0.0, 0.0];
       vertex23.texCoord = [1.0, 1.0];
       vertex24.texCoord = [0.0, 1.0];

       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);

       vertices.push(vertex2);
       vertices.push(vertex3);
       vertices.push(vertex4);

       vertices.push(vertex5);
       vertices.push(vertex6);
       vertices.push(vertex7);

       vertices.push(vertex5);
       vertices.push(vertex7);
       vertices.push(vertex8);

       vertices.push(vertex9);
       vertices.push(vertex10);
       vertices.push(vertex11);

       vertices.push(vertex12);
       vertices.push(vertex10);
       vertices.push(vertex11);

       vertices.push(vertex13);
       vertices.push(vertex14);
       vertices.push(vertex15);

       vertices.push(vertex16);
       vertices.push(vertex13);
       vertices.push(vertex15);

       vertices.push(vertex17);
       vertices.push(vertex18);
       vertices.push(vertex19);

       vertices.push(vertex20);
       vertices.push(vertex17);
       vertices.push(vertex19);

       vertices.push(vertex21);
       vertices.push(vertex22);
       vertices.push(vertex23);

       vertices.push(vertex24);
       vertices.push(vertex22);
       vertices.push(vertex23);
       return vertices;
   }
  }
