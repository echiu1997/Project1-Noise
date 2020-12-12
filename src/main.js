
//IMPORT 
const THREE = require('three'); 
import Framework from './framework'
import Noise from './noise'
import {other} from './noise'

var scene,
camera,
renderer,
stats;

// create start time
var start = Date.now();
//window.innerWidth
var amplitude = 5.0;
var PositionDefault = 40;
/* //listens for window resize
var onresize = function() {
  //your code here
  //this is just an example
  width = document.body.clientWidth;
  height = document.body.clientHeight;
}
window.addEventListener("resize", onresize);

var amplitude = Math.sqrt(width*width + height*height)/500 */

// shader material using frag & vertex shader     
var material = new THREE.ShaderMaterial({
  uniforms: {
    // float initialized to 0
    time: { type: "f", value: 0.0 },
    //float initialized to 25
    amp: { type: "f", value: 5.0 }
  },
  vertexShader: require('./shaders/adam-vert.glsl'),
  fragmentShader: require('./shaders/adam-frag.glsl')
});

// creates sphere and assigns material
var mesh = new THREE.Points(new THREE.IcosahedronGeometry(10, 5),
//new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } ) 
material);

// called after the scene loads
function onLoad(framework) {

  // var {scene, camera, renderer, gui, stats} = framework; 
  scene = framework.scene;
  camera = framework.camera;
  renderer = framework.renderer;
  /* gui = framework.gui; */
  /* stats = framework.stats; */

  scene.add(mesh);

  // initial camera position, sets position and centers it at 0,0,0
  camera.position.set(1, 1, PositionDefault);
  camera.lookAt(new THREE.Vector3(0,0,0));
}

// called on frame updates
function onUpdate(framework) {

  //rotates the mesh around
  mesh.rotation.y += 0.005;

  //passing time into shader
  material.uniforms['time'].value = 0.00025 * (Date.now() - start);

  //pass the slider amplitude the user modified
  material.uniforms['amp'].value = amplitude;
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
