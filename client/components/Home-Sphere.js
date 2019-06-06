/* eslint-disable max-statements */
import React, {Component} from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import Stats from 'stats.js';
import {connect} from 'react-redux';

class HomeSphere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryIndex: -1,
    };
  }

  componentDidMount() {
    let renderer, scene, camera, stats, geometry, material;
    let particles;
    let PARTICLE_SIZE = 35;
    let raycaster, intersects;
    let mouse, INTERSECTED;

    //initialize scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 450;

    //Creating sphere
    let vertices = new THREE.SphereGeometry(150, 14, 14).vertices;
    let positions = new Float32Array(vertices.length * 3);
    let colors = new Float32Array(vertices.length * 3);
    let sizes = new Float32Array(vertices.length);
    let vertex;
    let color = new THREE.Color();
    // console.log(vertices);
    for (var i = 0, l = vertices.length; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);
      color.setHSL(0.02 + 0.1 * (i / l), 1.0, 0.5);
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
    // stats = new Stats();
    // this.stats = stats;
    // this.mount.appendChild(stats.dom);

    //add trackball control to control the sphere
    const controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    //controls.update() must be called after any manual changes to the camera's transform
    controls.rotateSpeed = 1.5;
    this.controls = controls;
    this.controls.update();

    //add mouse listener and window resize listener
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('click', this.handleDocumentClick, false);

    //start animation
    this.animate();
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderParticles();
    // this.stats.update();
  };

  handleDocumentClick = () => {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  renderParticles = () => {
    this.particles.rotation.x += 0.0004;
    this.particles.rotation.y += 0.0002;
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
          //TODO add pop up message containing entries here
          //set state as current dots index
          if (this.state.entryIndex !== this.intersects[0].index) {
            this.setState({entryIndex: this.intersects[0].index});
          }
        }
      }
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const {entryIndex} = this.state;
    return (
      <div style={{position: 'relative'}}>
        <div
          //this is where all the 3d will mount

          ref={mount => {
            this.mount = mount;
          }}
        />
        {/*if entry index is more than 0 (which means some dots were clicked),
        render out message box with entry */}
        {entryIndex >= 0 ? (
          <div
            style={{
              color: 'black',
              zIndex: 9999,
              position: 'absolute',
              top: '50%',
              left: '50%',
              backgroundColor: 'white',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <h1>{entryIndex}</h1>
          </div>
        ) : (
          ''
        )}
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: '50%',
            left: 0,
            transform: 'translate(0, -50%)',
          }}
        >
          <img src="prev.png" />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: '50%',
            right: 0,
            transform: 'translate(0, -50%)',
          }}
        >
          <img src="next.png" />
        </div>
        <div
          style={{
            color: 'white',
            position: 'absolute',
            zIndex: 9999,
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          5/18/2019
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {entries: state};
};

export default connect(mapStateToProps)(HomeSphere);
