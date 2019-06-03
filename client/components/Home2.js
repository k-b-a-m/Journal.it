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
    renderer.setClearColor('black');
    renderer.setSize(width, height);

    //rendering sphere
    const geometry = new THREE.SphereGeometry(100,32,32)
    const material = new THREE.MeshLambertMaterial({color: 'green'});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 800;

    //bind element to renderer
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.sphere = sphere;

    //lights
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    const light1 = new THREE.DirectionalLight(0xffffff, 2, 500);
    light1.target = sphere
    scene.add(light1);

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
    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = ()=> {
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
