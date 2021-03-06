/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import Stats from 'stats.js';
import {connect} from 'react-redux';
import SingleEntry from './SingleEntry';
import {Fragment} from 'react';

//styles
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedEntries: [],
      entryIndex: -1,
      date: '',
    };
  }

  componentDidMount() {
    //add current date to state
    const today = new Date();
    this.today = today;
    const todayStr = this.parseDate(this.today);
    this.setState({date: todayStr});
    //bind
    this.today = today;

    //set displayed entries to be only today
    this.renderDisplayedEntries();
    this.setState({displayedEntries: this.displayedEntries});

    //initialize scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 450;
    if (window.screen.width <= 479) {
      camera.position.z = 750;
    }

    //config renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //bind
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    const segment = this.displayedEntries.length
      ? Math.ceil(Math.sqrt(this.displayedEntries.length))
      : 0;

    //add light
    const ambientLight = new THREE.AmbientLight(0x404040, 150);
    this.ambientLight = ambientLight;
    this.scene.add(this.ambientLight);

    //draw sphere
    this.DrawSphere(segment, this.scene, this.camera, this.renderer);
  }

  componentDidUpdate(prevProps, prevState) {
    //if new entries are different in the redux store
    const {displayedEntries, entryIndex} = this.state;
    if (
      JSON.stringify(JSON.stringify(prevProps.entries)) !==
      JSON.stringify(JSON.stringify(this.props.entries))
    ) {
      this.renderDisplayedEntries();
      //just add new dots but don't re-render the whole sphere when new entry is added
      if (
        prevProps.entries.length !== 0 &&
        this.props.entries.length > prevProps.entries.length
      ) {
        this.geometry.setDrawRange(0, this.displayedEntries.length);
        //TODO: change the color of newly added entry/ glow

        //render a new bigger sphere if there are no more dots to show
        if (this.displayedEntries.length > this.vertices.length) {
          this.rotationx = this.particles.rotation.x;
          this.rotationy = this.particles.rotation.y;
          while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
          }
          const segment = Math.ceil(Math.sqrt(this.displayedEntries.length));
          this.DrawSphere(segment, this.scene, this.camera, this.renderer);
        }

        this.prevColorArr = [
          this.particles.geometry.attributes.customColor.array[
            (this.displayedEntries.length - 1) * 3
          ],
          this.particles.geometry.attributes.customColor.array[
            (this.displayedEntries.length - 1) * 3 + 1
          ],
          this.particles.geometry.attributes.customColor.array[
            (this.displayedEntries.length - 1) * 3 + 2
          ],
        ];

        this.particles.geometry.attributes.customColor.array[
          (this.displayedEntries.length - 1) * 3
        ] = 1;
        this.particles.geometry.attributes.customColor.array[
          (this.displayedEntries.length - 1) * 3 + 1
        ] = 1;
        this.particles.geometry.attributes.customColor.array[
          (this.displayedEntries.length - 1) * 3 + 2
        ] = 1;
        this.particles.geometry.attributes.customColor.needsUpdate = true;
      }
      //don't re-render the whole orb on like change
      else if (
        prevState.displayedEntries.length &&
        prevState.displayedEntries.length === this.state.displayedEntries.length
      ) {
        console.log('like');
      } else {
        //render when app first got entries from db after mounting
        this.renderDisplayedEntries();
        this.setState({displayedEntries: this.displayedEntries});
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0]);
        }
        const selectedObject = this.scene.getObjectByName('memorySphere');
        this.scene.remove(selectedObject);
        const segment = Math.ceil(Math.sqrt(this.displayedEntries.length));
        this.DrawSphere(segment, this.scene, this.camera, this.renderer);
      }
    }
    //render when the date is changed which leads to state.displayedEntries changes
    else if (prevState.date !== this.state.date) {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
      const selectedObject = this.scene.getObjectByName('memorySphere');
      this.scene.remove(selectedObject);
      const segment = Math.ceil(Math.sqrt(this.state.displayedEntries.length));
      this.DrawSphere(segment, this.scene, this.camera, this.renderer);
    }
  }

  renderDisplayedEntries = () => {
    const displayedEntries = this.props.entries
      .filter(entry => {
        return entry.dateTime.substring(0, 15) === this.today.toDateString();
      })
      .sort((a, b) => a.id - b.id);
    this.displayedEntries = displayedEntries;
  };

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
    const {entries} = this.props;
    const {displayedEntries} = this.state;
    let stats, geometry, material;
    let particles;
    let PARTICLE_SIZE = 70;
    if (window.screen.width <= 479) {
      PARTICLE_SIZE = 500;
    }
    let raycaster, intersects;
    let mouse, INTERSECTED;

    //Creating sphere vertices
    let vertices = new THREE.SphereGeometry(150, segment, segment).vertices;
    //add in extra vertices if we need more
    if (vertices.length < this.displayedEntries.length) {
      vertices = new THREE.SphereGeometry(150, segment + 1, segment + 1)
        .vertices;
    }
    let positions = new Float32Array(vertices.length * 3);
    let colors = new Float32Array(vertices.length * 3);
    let sizes = new Float32Array(vertices.length);
    let vertex;
    let color = new THREE.Color();
    for (let i = 0, l = vertices.length; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);
      // color.setHSL(0.07 + 0.08 * (i / l), 1, 0.5);
      color.setHSL(0.48 + 0.5 * (i / l), 0.8, 0.7);
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
        color: {value: new THREE.Color(0xffffff)},
        texture: {
          value: new THREE.TextureLoader().load('disc.png'),
        },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      alphaTest: 0.9,
    });

    //create sphere
    //color: 0xffff00
    let sphereGeometry = new THREE.SphereGeometry(30, 32, 32);
    const sphereTexture = new THREE.TextureLoader().load('white1.jpg');
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: sphereTexture,
      color: '#dbfffa',
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    //only show the amount of dots = the number of displayed entries
    const drawCount =
      this.displayedEntries.length > 0
        ? this.displayedEntries.length
        : this.state.displayedEntries.length;
    geometry.setDrawRange(0, drawCount);
    geometry.needsUpdate = true;
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
    this.vertices = vertices;
    this.vertex = vertex;
    this.positions = positions;
    this.colors = colors;
    this.color = color;
    this.sizes = sizes;
    this.sphere = sphere;

    //append all dom elements
    this.mount.appendChild(this.renderer.domElement);

    //define mouse and raycaster for mouse picking
    raycaster = new THREE.Raycaster();
    raycaster.linePrecision = 10000;
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
    controls.rotateSpeed = 1;
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
    this.renderDisplayedEntries();
    this.setState({
      date: todayStr,
      entryIndex: -1,
      displayedEntries: this.displayedEntries,
    });
  };

  renderParticles = () => {
    const {entryIndex} = this.state;

    if (entryIndex < 0) {
      this.particles.rotation.x += 0.0001;
      this.particles.rotation.y += 0.00008;
      this.sphere.rotation.x += 0.0004;
      this.sphere.rotation.y += 0.00016;
    }
    const geometry = this.particles.geometry;
    const attributes = geometry.attributes;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObject(this.particles);
    if (this.mouse.x && this.mouse.y) {
      if (this.intersects.length > 0) {
        if (this.INTERSECTED !== null) {
          attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE;
          attributes.size.needsUpdate = true;
          this.INTERSECTED = null;
        } else if (this.INTERSECTED !== this.intersects[0].index) {
          if (entryIndex !== this.intersects[0].index) {
            attributes.size.array[this.INTERSECTED] = this.PARTICLE_SIZE;
            this.INTERSECTED = this.intersects[0].index;
            if (
              attributes.size.array[this.INTERSECTED] !==
              this.PARTICLE_SIZE * 1.25
            ) {
              attributes.size.array[this.INTERSECTED] =
                this.PARTICLE_SIZE * 1.25;
            }

            //change color after read
            let pcolors = new Float32Array(3);
            let pcolor = new THREE.Color();
            pcolor.setHSL(
              0.48 + 0.5 * (this.INTERSECTED / this.vertices.length),
              0.8,
              0.7
            );
            pcolor.toArray(pcolors, 0);

            attributes.customColor.array[this.INTERSECTED * 3] = pcolors[0];
            attributes.customColor.array[this.INTERSECTED * 3 + 1] = pcolors[1];
            attributes.customColor.array[this.INTERSECTED * 3 + 2] = pcolors[2];

            attributes.size.needsUpdate = true;
            attributes.customColor.needsUpdate = true;
            //TODO add pop up message containing entries here
            //set state as current dots index
            this.setState({
              entryIndex: this.intersects[0].index,
            });
          }
        }
      }
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  toggleEntry = () => {
    this.setState({entryIndex: -1});
  };

  render() {
    const today = new Date();
    const disabledButton = this.today
      ? JSON.stringify(this.today.toDateString()) ===
        JSON.stringify(today.toDateString())
      : false;
    const {entries} = this.props;
    const {entryIndex, date, displayedEntries} = this.state;
    return (
      <div>
        <div>
          <div
            //this is where all the 3d will mount

            ref={mount => {
              this.mount = mount;
            }}
          />
          {/*if entry index is more than 0 (which means some dots were clicked),
          render out message box with entry */}
          {entryIndex >= 0 && entries[0] ? (
            <SingleEntry
              displayedEntries={this.displayedEntries}
              entryIndex={entryIndex}
              toggleEntry={this.toggleEntry}
            />
          ) : (
            ''
          )}
          <div className = 'arrow-container' >
            <div className="prev">
              <button onClick={evt => this.handleArrowClick(evt, false)}>
                <img src="prev.png" />
              </button>
            </div>
            <div className={`next ${disabledButton ? 'disabled' : ''}`}>
              <button
                onClick={evt => this.handleArrowClick(evt, true)}
                disabled={disabledButton}
              >
                <img src="next.png" />
              </button>
            </div>
          </div>

          <div className="date">
            <h3>{date}</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {entries: state.entries};
};

export default connect(mapStateToProps)(Home);
