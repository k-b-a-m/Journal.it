import React, {Component} from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';

class Home3 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var renderer, scene, camera, stats, geometry, material;
    var particles;
    var PARTICLE_SIZE = 20;
    var raycaster, intersects;
    var mouse, INTERSECTED;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 450;
    //
    var vertices = new THREE.SphereGeometry(150,32,32).vertices;
    var positions = new Float32Array(vertices.length * 3);
    var colors = new Float32Array(vertices.length * 3);
    var sizes = new Float32Array(vertices.length);
    var vertex;
    var color = new THREE.Color();
    for (var i = 0, l = vertices.length; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);
      color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
      color.toArray(colors, i * 3);
      sizes[i] = PARTICLE_SIZE * 0.5;
    }
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    //
    material = new THREE.ShaderMaterial({
      uniforms: {
        color: {value: new THREE.Color(0xffffff)},
        texture: {
          value: new THREE.TextureLoader().load('/disc.png'),
        },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      alphaTest: 0.9,
    });
    //
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //bind
    this.particles = particles;
    this.geometry = geometry;
    this.material = material;
    this.scene = scene;
    this.camera = camera;
    this.PARTICLE_SIZE=PARTICLE_SIZE;
    this.renderer = renderer;
    this.intersects = intersects;
    this.INTERSECTED = INTERSECTED;

    this.mount.appendChild(this.renderer.domElement);
    //
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    this.raycaster = raycaster;
    this.mouse = mouse;
    //
    stats = new Stats();
    this.stats = stats;
    this.mount.appendChild(stats.dom);
    //
    // window.addEventListener('resize', onWindowResize, false);
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    this.animate()
  }

  // componentWillUnmount() {
  //   this.stop();
  //   this.mount.removeChild(this.renderer.domElement);
  // }

  //start and stop will grab animation frame for animation at 60fps
  // start = () => {
  //   if (!this.frameId) {
  //     this.frameId = requestAnimationFrame(this.animate);
  //   }
  // };

  // stop = () => {
  //   cancelAnimationFrame(this.frameId);
  // };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.renderIt();
    this.stats.update();
  };

  // renderScene() {
  //   this.renderer.render(this.scene, this.camera);
  // }

  renderIt = () => {
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.001;
    var geometry = this.particles.geometry;
    var attributes = geometry.attributes;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObject(this.particles);
    if (this.intersects.length > 0) {
      if (this.INTERSECTED != this.intersects[0].index) {
        attributes.size.array[this.INTERSECTED] = this.ARTICLE_SIZE;
        this.INTERSECTED = this.intersects[0].index;
        attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE * 1.25;
        attributes.size.needsUpdate = true;
      }
    } else if (this.INTERSECTED !== null) {
      attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE;
      attributes.size.needsUpdate = true;
      this.INTERSECTED = null;
    }
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    console.log('hi');
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

export default Home3;
