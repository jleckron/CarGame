class Sphere extends Geometry {
  /**
   * Constructor for Sphere.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Sphere} Sphere created
   */
  constructor(shader, segments, xPos, yPos, zPos, r, g, b) {
      super(shader);

      this.vertices = this.generateSphereVertices(segments, xPos, yPos, zPos, r, g, b);
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSphereVertices(segments, xPos, yPos, zPos, r, g, b) {
      var outerVerts = [];

      // Generate coordinates
      for (var j = 0; j <= segments; j++) {
          var aj = j * Math.PI / segments;
          var sj = Math.sin(aj);
          var cj = Math.cos(aj);
          for (var i = 0; i <= segments; i++) {
              var ai = i * 2 * Math.PI / segments;
              var si = Math.sin(ai);
              var ci = Math.cos(ai);

              outerVerts.push({"x": (si * sj)+xPos, "y": (cj)+yPos, "z": (ci * sj)+zPos});
          }
      }

      var vertices = [];

      // Generate vertices
      for (var j = 0; j < segments; j++) {
        for (var i = 0; i < segments; i++) {
          var p1 = j * (segments+1) + i;
          var p2 = p1 + (segments+1);

          var vertex0 = new Vertex(outerVerts[p1].x, outerVerts[p1].y, outerVerts[p1].z, r, g, b);
          var vertex1 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, r, g, b);
          var vertex2 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, r, g, b);

          var v1 = new Vector3([outerVerts[p2].x-outerVerts[p1].x, outerVerts[p2].y-outerVerts[p1].y, outerVerts[p2].z-outerVerts[p1].z]);
          var v2 = new Vector3([outerVerts[p1+1].x-outerVerts[p1].x, outerVerts[p1+1].y-outerVerts[p1].y, outerVerts[p1+1].z-outerVerts[p1].z]);
          var norm = new Vector3();
          norm = v1.cross(v2);
          vertex0.normal.elements[0] = norm.elements[0];
          vertex0.normal.elements[1] = norm.elements[1];
          vertex0.normal.elements[2] = norm.elements[2];
          vertex1.normal.elements[0] = norm.elements[0];
          vertex1.normal.elements[1] = norm.elements[1];
          vertex1.normal.elements[2] = norm.elements[2];
          vertex2.normal.elements[0] = norm.elements[0];
          vertex2.normal.elements[1] = norm.elements[1];
          vertex2.normal.elements[2] = norm.elements[2];

          vertices.push(vertex0, vertex1, vertex2);

          var vertex3 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, r, g, b);
          var vertex4 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, r, g, b);
          var vertex5 = new Vertex(outerVerts[p2 + 1].x, outerVerts[p2 + 1].y, outerVerts[p2 + 1].z, r, g, b);

          var v3 = new Vector3([outerVerts[p2].x-outerVerts[p1+1].x, outerVerts[p2].y-outerVerts[p1+1].y, outerVerts[p2].z-outerVerts[p1+1].z]);
          var v4 = new Vector3([outerVerts[p1+1].x-outerVerts[p1+1].x, outerVerts[p1+1].y-outerVerts[p1+1].y, outerVerts[p1+1].z-outerVerts[p1+1].z]);
          var norm2 = new Vector3();
          norm2 = v3.cross(v4);
          vertex3.normal.elements[0] = norm.elements[0];
          vertex3.normal.elements[1] = norm.elements[1];
          vertex3.normal.elements[2] = norm.elements[2];
          vertex4.normal.elements[0] = norm.elements[0];
          vertex4.normal.elements[1] = norm.elements[1];
          vertex4.normal.elements[2] = norm.elements[2];
          vertex5.normal.elements[0] = norm.elements[0];
          vertex5.normal.elements[1] = norm.elements[1];
          vertex5.normal.elements[2] = norm.elements[2];

          vertices.push(vertex3, vertex4, vertex5);
        }
      }

      return vertices;
   }
}
