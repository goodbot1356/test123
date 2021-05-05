import { 
  WebGLRenderer, 
  Camera, 
  Scene, 
  PerspectiveCamera, 
  BoxGeometry, 
  MeshPhongMaterial, 
  Mesh, 
  ConeGeometry, 
  SphereGeometry,
  DirectionalLight,
  AmbientLight,
} from 'three';

import OrbitControls from 'three-orbitcontrols';

const addToList = (id, cb) => {
  const div = document.createElement('div');

  div.innerHTML = id + '   Х';

  div.onclick = () => {
    cb();
    div.remove();
  }

  const container = document.querySelector('.items');
  container.appendChild(div);
}

export default new class Renderer {
  constructor() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new Camera();
    this.scene = new Scene();

    var light = new DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();

    this.scene.add(light);
    this.scene.add(new AmbientLight(0x404040));

    this.init();
  }

  remove(id) {
    const obj = this.scene.getObjectByProperty('uuid', id);

    obj.geometry.dispose();
    obj.material.dispose();
    this.scene.remove(obj);

    this.render();
  }

  create() {
    const geometry = document.querySelector('select#geometry').value;
    const scale = +document.querySelector('input#scale').value;

    let id = -1;

    switch (geometry) {
      case 'cube':
        id = this.createCube(scale);
        break;

      case 'cone':
        id = this.createCone(scale)
        break;

      case 'sphere':
        id = this.createSphere(scale);
        break;
    }

    this.render();
    
    addToList(id, () => this.remove(id));
  }

  init() {
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1.5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
  }

  createCube(scale) {
    const color = 0xfaabb1;
    const geometry = new BoxGeometry(0.4, 0.4, 0.4);
    const material = new MeshPhongMaterial({ ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 });
    
    const cube = new Mesh(geometry, material);
    cube.scale.set(scale, scale, scale);

    this.scene.add(cube);

    return cube.uuid;
  }

  createCone(scale) {
    const color = 0xfaabb1;
    const geometry = new ConeGeometry(0.4, 1, 8);
    const material = new MeshPhongMaterial({ ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 });

    const cone = new Mesh(geometry, material);
    cone.scale.set(scale, scale, scale);

    this.scene.add(cone);

    return cone.uuid;
  }

  createSphere(scale) {
    const color = 0xfaabb1;
    const geometry = new SphereGeometry(0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI * 2);
    const material = new MeshPhongMaterial({ color } );

    const sphere = new Mesh(geometry, material);
    sphere.scale.set(scale, scale, scale);

    this.scene.add(sphere);

    return sphere.uuid;
  }





  // here is task misunderstand


/*   cache() {
    const color = 0xfaabb1;

    let geometry = new BoxGeometry(0.4, 0.4, 0.4);
    let material = new MeshBasicMaterial({ color });
    this.cube = new Mesh(geometry, material);
    this.cube.visible = false;

    geometry = new ConeGeometry(0.4, 1, 8);
    material = new MeshBasicMaterial({ color });
    this.cone = new Mesh(geometry, material);
    this.cone.visible = false;

    geometry = new SphereGeometry(0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI * 2);
    material = new MeshBasicMaterial({ color } );
    this.sphere = new Mesh(geometry, material);
    this.sphere.visible = false;

    this.scene.add(this.cube);
    this.scene.add(this.cone);
    this.scene.add(this.sphere);

    this.light = new DirectionalLight(0xffffff, 0.5);
    this.light.position.copy(this.camera);
    this.scene.add(this.light);
  } */

/*   changeGeometry(geometry) {
    switch (geometry) {
      case 'cube':
        this.cube.visible = true;
        this.cone.visible = this.sphere.visible = false;
        break;

      case 'cone':
        this.cone.visible = true;
        this.cube.visible = this.sphere.visible = false;
        break;

      case 'sphere':
        this.sphere.visible = true;
        this.cone.visible = this.cube.visible = false;
        break;
    }

    this.render();
  } */

  changeScale(scale) {
/*     this.camera.position.z = 10 - scale;

    this.cube.scale.set(scale, scale, scale);
    this.cone.scale.set(scale, scale, scale);
    this.sphere.scale.set(scale, scale, scale);
    this.render(); */
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}