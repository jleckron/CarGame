class Light {
    constructor(x, y, z) {
      var amb = 0.2;
      var diff = 0.7;
      var spec = 0.8;
      this.diffuse = [diff, diff, diff];
      this.ambient = [amb, amb, amb];
      this.pos = new Vector3([x, y, z]);
      this.spec = [spec, spec, spec];
    }
}
