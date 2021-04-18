/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class CustomOBJ extends Geometry {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @param imgPath An optional file path/data url for an image file
   * @param color An optional color object with r,g,b,a components
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(shader, objStr, image) {
    super(shader);
    this.image = image;

    // If an image path/data url is provided, then load/save that image as a texture
  /*  if (imgPath != null) {
      var self = this;
      var callback = function(texture) { self.textures.push(texture); };
      load2DTexture(imgPath, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
    }*/

    // Construct the Mesh object containg the OBJ file's information
    var objMesh = new OBJ.Mesh(objStr);

    // Construct the necessary amount of vertex objects within this.vertices
    for (var i = 0; i < objMesh.indices.length; i++) {
      this.vertices[i] = new Vertex();
    }

    this.modelMatrix = new Matrix4();

    // Add the vertex points, normals, and uv coordinates in OBJ
    var transAndScaleVal = this.addVertexPoints(objMesh.indices, objMesh.vertices);
    //this.addVertexNormals(objMesh.indices, objMesh.vertexNormals);
    this.addVertexTextureCoordinates(objMesh.indices, objMesh.textures);

    // Modify loadedOBJ's modelMatrix to present OBJ correctly
    this.moveOBJToCenterOfScreen(transAndScaleVal[0]);
    this.scaleOBJToFitOnScreen(transAndScaleVal[1]);

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
    this.render();
  }

  /**
   * Adds the point information to the vertices of LoadedOBJ. Also keeps
   * track of the largest x-y-z coordinate absolute value and the center of
   * the LoadedOBJ. Does so for displaying geometry correctly. Uses indices to
   * put points in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} points The points being added
   * @returns {Array} centerPoint at index 0, necessary scale at index 1
   */
  addVertexPoints(indices, points) {
    var vertexHasNotBeenEncountered = new Array(points.length / 3);
    vertexHasNotBeenEncountered.fill(true);

    var largestCoordinateValue = 1.0;
    var centerPoint = [0.0, 0.0, 0.0];

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i];
      var xyz = [points[index * 3], points[index * 3 + 1], points[index * 3 + 2]];

      if (vertexHasNotBeenEncountered[index]) {
        // Compare xyz to largestCoordinateValue
        for (var j = 0; j < 3; j++) {
          if (Math.abs(xyz[j]) > largestCoordinateValue) {
            largestCoordinateValue = Math.abs(xyz[j]);
          }
        }

        // Continue computing the centerPoint of LoadedOBJ
        centerPoint[0] += xyz[0];
        centerPoint[1] += xyz[1];
        centerPoint[2] += xyz[2];

        vertexHasNotBeenEncountered[index] = false;
      }

      this.vertices[i].point = new Vector3(xyz);
    }

    centerPoint[0] /= -(points.length / 3);
    centerPoint[1] /= -(points.length / 3);
    centerPoint[2] /= -(points.length / 3);

    return [centerPoint, 1 / largestCoordinateValue];
  }

  /**
   * Adds the normals information to LoadedOBJ's vertices. Uses indices to
   * add normals in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} normals The normals being added
   */
  addVertexNormals(indices, normals) {
    // If normals information is invalid, set all normals to just null
    if (this.isInvalidParameter(normals)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].normal = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var xyz = [normals[index * 3], normals[index * 3 + 1], normals[index * 3 + 2]];

        this.vertices[i].normal = new Vector3(xyz);
      }
    }
  }

  /**
   * Adds the texture information to LoadedOBJ's vertices. Uses indices to
   * add texture coordinates in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ's vertices
   * @param {Array} textures The textures being added
   */
  addVertexTextureCoordinates(indices, textures) {
    // If textures information is invalid, set vertex.uv to null for all vertices.
    if (this.isInvalidParameter(textures)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].texCoord = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var uv = [textures[index * 2], textures[index * 2 + 1]];

        this.vertices[i].texCoord = uv;
      }
    }
  }

  /**
   * Determines if a parameter (points, normals, textures) is invalid.
   *
   * @private
   */
  isInvalidParameter(parameter) {
    if (parameter == null) {
      return true;
    }
    if (parameter == []) {
      return true;
    }
    if (isNaN(parameter[0])) {  // Can be array of just NaN
      return true;
    }

    return false;
  }

  /**
   * Modifes the LoadedOBJ's modelMatrix to move the LoadedOBJ to the
   * center of the canvas.
   *
   * @private
   * @param {Array} transValue An array containing translation value for x, y, z
   * axis (indices: 0, 1, 2)
   */
  moveOBJToCenterOfScreen(transValue) {
    this.modelMatrix.setTranslate(transValue[0], transValue[1], transValue[2]);
  }

  /**
   * Modifies the LoadedOBJ's modelMatrix to scale the LoadedOBJ to fit
   * within the canvas. Assumes moveOBJToCenterOfScreen() has been called
   * beforehand and modelMatrix is defined.
   *
   * @private
   * @param {Number} scaleValue Amount LoadedOBJ will be scaled by
   */
  scaleOBJToFitOnScreen(scaleValue) {
    var scaleMatrix = new Matrix4();
    scaleMatrix.setScale(scaleValue, scaleValue, scaleValue);
    this.modelMatrix = scaleMatrix.multiply(this.modelMatrix);
  }

  render(){
    let rotateM = new Matrix4();
    rotateM.setRotate(-1, 0, 1, 0);
    this.modelMatrix = rotateM.multiply(this.modelMatrix);

    this.shader.setUniform('u_ModelMatrix', this.modelMatrix.elements);
  }
}
