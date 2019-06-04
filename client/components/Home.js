import React, {Component} from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import {connect} from 'react-redux';

class Home extends Component {
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

    //Creating sphere
    var vertices = new THREE.SphereGeometry(150, 32, 32).vertices;
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

    //add dots texture
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
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

    //add particles behind spots
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //config renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //bind constants
    this.particles = particles;
    this.geometry = geometry;
    this.material = material;
    this.scene = scene;
    this.camera = camera;
    this.PARTICLE_SIZE = PARTICLE_SIZE;
    this.renderer = renderer;
    this.intersects = intersects;
    this.INTERSECTED = INTERSECTED;

    //append all dom elements
    this.mount.appendChild(this.renderer.domElement);

    //define mouse and raycaster for mouse picking
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    this.raycaster = raycaster;
    this.mouse = mouse;

    //add fps monitor, can take away later
    stats = new Stats();
    this.stats = stats;
    this.mount.appendChild(stats.dom);

    //add mouse listener and window resize listener
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    document.addEventListener('mouseup', this.onDocumentMouseUp, false);

    //start animation
    this.animate();
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onDocumentMouseDown = event => {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  onDocumentMouseUp = event => {
    event.preventDefault();
    this.mouse.x = null;
    this.mouse.y = null;
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.renderParticles();
    this.stats.update();
  };

  renderParticles = () => {
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.001;
    var geometry = this.particles.geometry;
    var attributes = geometry.attributes;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObject(this.particles);
    if (this.mouse.x && this.mouse.y) {
      if (this.intersects.length > 0) {
        if (this.INTERSECTED !== null) {
          attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE;
          attributes.size.needsUpdate = true;
          this.INTERSECTED = null;
        } else if (this.INTERSECTED !== this.intersects[0].index) {
          attributes.size.array[this.INTERSECTED] = this.ARTICLE_SIZE;
          this.INTERSECTED = this.intersects[0].index;
          attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE * 1.25;
          attributes.size.needsUpdate = true;
        }
      }
    }
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{width: '400px', height: '400px'}}
        //this is where all the 3d will mount
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {entries: state};
};

export default connect(mapStateToProps)(Home);
