/**
 * Specifies a Scene full of Geometry.
 *
 * @author Jack Leckrone
 * @this {Scene}
 */
 let zNear = .01;
 let zFar = 51;
 let fov = 60;
 let free=false;
 let front=true;

class Camera {
  /**
   * Constructor for Camera.
   *
   * @constructor
   * @returns {Scene} Scene object created
   */

  constructor() {
    this.speed = 0.5;

    this.eye = new Vector3([5.0, 2.0, -3.0]);
    this.center = new Vector3([5.0, 1.0, -5.0]);
    this.up = new Vector3([0.0, 1.0, 0.0]);
    this.lastCenter = new Vector3([5.0, 1.0, -5.0]);
    this.lastEye = new Vector3([5.0, 2.0, -2.0]);

    this.forward = new Vector3([0.0, 0.0, -this.speed]);
    this.backward = new Vector3([0.0, 0.0, this.speed]);


    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.cameraPosition = new Vector3();

    this.updateView();
    this.switchView();

  }
  switchView(){
    this.projectionMatrix.setPerspective(fov, 1, zNear, zFar);
  }

  zoom(dir){
    if((fov + dir)<180 && (fov + dir)>0){
      fov = fov += dir;
    }
    this.projectionMatrix.setPerspective(fov, 1, zNear, zFar);
  }

  reset(){
    this.center = this.lastCenter;
    this.eye = this.lastEye;
    this.updateView();
  }

  rot(dir, flag){
    var n = this.eye.sub(this.center);
    var rot = new Matrix4();
    rot.setRotate(dir, 0, 1, 0);
    n = rot.multiplyVector3(n);
    this.eye = this.center.add(n);
    if(flag==1){
      this.lastEye=this.eye;
      this.forward = rot.multiplyVector3(this.forward);
      this.backward = rot.multiplyVector3(this.backward);
    }
    this.updateView();
  }

  //Translations
  truck(dir){
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    var rot = new Matrix4();
    rot.setRotate(dir, 0, 1, 0);
    n = rot.multiplyVector3(n);
    this.eye = this.center.add(n);
    this.center = this.center.add(n);
    this.updateView();
  }

  dolly(dir){
    var n;
    if(dir==1 && front==true){
      n = this.forward;
    }
    else if(dir==-1 && front==true){
      front=false;
      this.rot(180, 0);
      n = this.backward;
    }
    else if(dir==-1 && front==false){
      n = this.backward;
    }
    else if(dir==1 && front==false){
      front=true;
      this.rot(180,0);
      n = this.forward;
    }
    this.eye = this.eye.add(n);
    this.center = this.center.add(n);
    this.lastEye = this.eye;
    this.lastCenter = this.center;
    this.updateView();
  }

  //Rotations
  tilt(dir){
    var  n = this.center.sub(this.eye);
    var rot = new Matrix4();
    if(n.elements[2]>0){
      dir = -dir;
    }
    rot.setRotate(dir, 1, 0, 0);
    n = rot.multiplyVector3(n);
    this.center = this.eye.add(n);
    this.updateView();
  }

  pan(dir){
    var  n = this.center.sub(this.eye);
    var rot = new Matrix4();
    rot.setRotate(dir, 0, 1, 0);
    n = rot.multiplyVector3(n);
    this.center = this.eye.add(n);
    this.updateView();
  }

  updateView(){
    this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                              this.center.elements[0], this.center.elements[1], this.center.elements[2],
                              this.up.elements[0], this.up.elements[1], this.up.elements[2]);

    this.cameraPosition = this.eye;
  }
}
