
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import Noise from './noise'
import {other} from './noise'

var scene,
camera,
renderer,
gui,
stats;

// create start time
var start = Date.now();

var amplitude = 10;

// create the shader material      
var material = new THREE.ShaderMaterial( {
    uniforms: {
      // float initialized to 0
      time: { type: "f", value: 0.0 },
      //float initialized to 25
      amp: { type: "f", value: 10.0 }
    },
    vertexShader: require('./shaders/adam-vert.glsl'),
    fragmentShader: require('./shaders/adam-frag.glsl')
} );


// create a sphere and assign the material
var mesh = new THREE.Points( 
    new THREE.IcosahedronGeometry( 15, 5 ), 
    //new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } ) 
    material
);

// called after the scene loads
function onLoad(framework) {
  // LOOK: the line below is synyatic sugar. Optional, but I sort of recommend it.
  // var {scene, camera, renderer, gui, stats} = framework; 
  scene = framework.scene;
  camera = framework.camera;
  renderer = framework.renderer;
  gui = framework.gui;
  stats = framework.stats;

  scene.add( mesh );

  // set camera position
  camera.position.set(1, 1, 40);
  camera.lookAt(new THREE.Vector3(0,0,0));
}

// called on frame updates
function onUpdate(framework) {

  //rotates the mesh around
  mesh.rotation.y += 0.005;

  //passing time into shader
  material.uniforms[ 'time' ].value = 0.00025 * ( Date.now() - start );

  //pass the slider amplitude the user modified
  material.uniforms[ 'amp' ].value = amplitude;
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
