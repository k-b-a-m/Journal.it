import React, {Component} from 'react';
import * as THREE from 'three';

//scene, camera, renderer

class Home2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // const width = this.mount.clientWidth;
    // const height = this.mount.clientHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;

    //setting scene, camera, renderer to render three js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x00ff00);
    renderer.setSize(width, height);

    const light = new THREE.AmbientLight(0xffffff,0.5);
    scene.add(light);
    const light1 = new THREE.PointLight(0xffffff,0.5);
    scene.add(light1);

    //rendering sphere
    // const geometry = new THREE.SphereGeometry(10, 32, 32);
    // const material = new THREE.MeshBasicMaterial({color: 'green'});
    // const sphere = new THREE.Mesh(geometry, material);
    // scene.add(sphere);
    // camera.position.z = 3;

    //rendering cube
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial({color: 0xffff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    //move camera out to view cube
    camera.position.z = 4;

    //bind element to renderer
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.light = light;
    this.light1 = light1;
    // this.sphere = sphere;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  //start and stop will grab animation frame for animation at 60fps
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{width: '400px', height: '400px'}}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Home2;
