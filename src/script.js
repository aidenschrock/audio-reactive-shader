import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createSculptureWithGeometry } from 'shader-park-core'
import { spCode } from '/sp-code.js';

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xFF5733)

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Camera
let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 2;

// AUDIO
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create an Audio source
const sound = new THREE.Audio(listener);

let playButton = document.querySelector('#play-button');
let pauseButton = document.querySelector('#pause-button')
playButton.innerHTML = "Loading Audio..."

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/assets/alice.mp3', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  playButton.innerHTML = "Play Audio"
  playButton.addEventListener('pointerdown', () => {
    sound.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block'
  }, false);
  pauseButton.addEventListener('pointerdown', () => {
    sound.pause()
    playButton.style.display = 'block';
    pauseButton.style.display = 'none'

  })
});



// create an AudioAnalyser, passing in the sound and desired fftSize
// get the average frequency of the sound
const analyser = new THREE.AudioAnalyser(sound, 32);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

let clock = new THREE.Clock();




let state = {
  mouse: new THREE.Vector3(),
  currMouse: new THREE.Vector3(),
  pointerDown: 0.0,
  currPointerDown: 0.0,
  audio: 0.0,
  currAudio: 0.0,
  time: 0.0,
  size: 0.5,
}

// create our geometry and material
let geometry = new THREE.SphereGeometry(2, 45, 45);
// let material = new THREE.MeshBasicMaterial({ color: 0x33aaee });
// let mesh = new THREE.Mesh(geometry, material);

let mesh = createSculptureWithGeometry(geometry, spCode(), () => {
  return {
    time: state.time,
    pointerDown: state.pointerDown,
    mouse: state.mouse,
    audio: state.audio,
    size: state.size,
    _scale: .5,
  }
})

scene.add(mesh);

window.addEventListener('pointermove', (event) => {
  state.currMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  state.currMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}, false);

window.addEventListener('pointerdown', (event) => state.currPointerDown = 1.0, false);
window.addEventListener('pointerup', (event) => state.currPointerDown = 0.0, false);

// Add mouse controlls
let controls = new OrbitControls(camera, renderer.domElement, {
  enableDamping: true,
  dampingFactor: 0.25,
  zoomSpeed: 0.5,
  rotateSpeed: 0.5
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime()


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)

  state.time += clock.getDelta();
  state.pointerDown = .1 * state.currPointerDown + .9 * state.pointerDown;
  state.mouse.lerp(state.currMouse, .05);
  if (analyser) {
    state.currAudio += Math.pow((analyser.getFrequencyData()[2] / 255) * .9, 8) + clock.getDelta() * .5;
    state.audio = .2 * state.currAudio + .8 * state.audio;
  }
}

tick()