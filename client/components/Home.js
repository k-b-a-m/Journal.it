import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import Stats from 'stats.js';
import { connect } from 'react-redux';
import SingleEntry from './SingleEntry';

//styles
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryIndex: -1,
      date: '',
      entryVisible: true,
    };
  }

  componentDidMount() {
    //add current date to state
    const today = new Date();
    this.today = today;
    const todayStr = this.parseDate(this.today);
    this.setState({ date: todayStr });
    //bind
    this.today = today;

    //initialize scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 450;

    //config renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //bind
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    const segment = this.props.entries.length
      ? Math.ceil(Math.sqrt(this.props.entries.length))
      : 0;

    //add light
    const ambientLight = new THREE.AmbientLight(0x404040, 150);
    this.ambientLight = ambientLight;
    this.scene.add(this.ambientLight);

    //draw sphere
    this.DrawSphere(segment, this.scene, this.camera, this.renderer);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(JSON.stringify(prevProps.entries)) !==
      JSON.stringify(JSON.stringify(this.props.entries))
    ) {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
      const selectedObject = this.scene.getObjectByName('memorySphere');
      this.scene.remove(selectedObject);
      const segment = Math.ceil(Math.sqrt(this.props.entries.length));
      this.DrawSphere(segment, this.scene, this.camera, this.renderer);
    }
  }

  parseDate = date => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    const newDate = `${mm}/${dd}/${yyyy}`;
    return newDate;
  };

  DrawSphere = (segment, scene, camera, renderer) => {
    const { entries } = this.props;
    let stats, geometry, material;
    let particles;
    let PARTICLE_SIZE = 35;
    let raycaster, intersects;
    let mouse, INTERSECTED;

    //Creating sphere
    // const segment = entries.length ? Math.ceil(Math.sqrt(entries.length - 1)) : 1;
    let vertices = new THREE.SphereGeometry(150, segment, segment).vertices;
    //add in extra vertices if we need more
    if (vertices.length < entries.length) {
      vertices = new THREE.SphereGeometry(150, segment + 1, segment).vertices;
    }
    let positions = new Float32Array(vertices.length * 3);
    let colors = new Float32Array(vertices.length * 3);
    let sizes = new Float32Array(vertices.length);
    let vertex;
    let color = new THREE.Color();
    // console.log(vertices);
    for (var i = 0, l = entries.length - 1; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);
      color.setHSL(0.08 + 0.1 * (i / l), 1, 0.5);
      color.toArray(colors, i * 3);
      sizes[i] = PARTICLE_SIZE * 0.5;
    }

    //add dots texture
    geometry = new THREE.BufferGeometry();
    geometry.name = 'memorySphere';
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    material = new THREE.ShaderMaterial({
      uniforms: {
        lights: true,
        color: { value: new THREE.Color(0xffffff) },
        texture: {
          value: new THREE.TextureLoader().load('disc.png'),
        },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      alphaTest: 0.9,
    });

    //add particles behind spots
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //bind constants
    this.particles = particles;
    this.geometry = geometry;
    this.material = material;
    this.PARTICLE_SIZE = PARTICLE_SIZE;
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
  };

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

  handleArrowClick = (evt, next) => {
    evt.preventDefault();
    next === true
      ? this.today.setDate(this.today.getDate() + 1)
      : this.today.setDate(this.today.getDate() - 1);
    const todayStr = this.parseDate(this.today);
    this.setState({ date: todayStr });
  };

  renderParticles = () => {
    const { entryIndex } = this.state;
    if (entryIndex < 0) {
      this.particles.rotation.x += 0.0002;
      this.particles.rotation.y += 0.0001;
    }
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
          attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE;
          this.INTERSECTED = this.intersects[0].index;
          attributes.size.array[this.INTERSECTED] = 50;
          attributes.size.needsUpdate = true;
          //TODO add pop up message containing entries here
          //set state as current dots index
          if (entryIndex !== this.intersects[0].index) {
            this.setState({
              entryIndex: this.intersects[0].index,
              entryVisible: true,
            });
          }
        }
      }
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  toggleEntry = () => {
    this.setState({ entryVisible: !this.state.entryVisible });
  };

  render() {
    const { entries } = this.props;
    const { entryIndex, date } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <div
          //this is where all the 3d will mount

          ref={mount => {
            this.mount = mount;
          }}
          onClick={() => this.setState({ entryVisible: true, entryIndex: -1 })}
        />
        {/*if entry index is more than 0 (which means some dots were clicked),
        render out message box with entry */}
        {entryIndex >= 0 && entries[0] && this.state.entryVisible ? (
          <SingleEntry entryIndex={entryIndex} toggleEntry={this.toggleEntry} />
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
          onClick={evt => this.handleArrowClick(evt, false)}
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
          onClick={evt => this.handleArrowClick(evt, true)}
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
          <h3>{date}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { entries: state.entries };
};

export default connect(mapStateToProps)(Home);
