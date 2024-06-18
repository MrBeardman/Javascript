import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
//CAMERA is an abstract class, do not use it directly

// Perspective camera - vertical FOV, widht, height, near and far
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.01,
  100
);

// custom controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2;
// controls.update();
//Danping
controls.enableDamping = true;
/**
 * Cursor
 */
const cursor = {};
window.addEventListener("mousemove", event => {
  cursor.x = event.clientX / sizes.width - 0.5; // Get a value from 0 to 1  by dividing by our viewport, - 0.5 to go from negative to positive value
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
// OrthographicCamera lacks perspective, objects has the same sizeal from all distances
const aspectRatio = sizes.width / sizes.height;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  //Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);
  // Render
  //Update controls
  controls.update();
  renderer.render(scene, camera);

  // Build in controls, Device orientation controls, does nto work on ios
  //Fly controls like flying a spaceship
  //First person controls like flz controls but cant change Y axis, no barel roll.
  //Pointer lock - wasd plus jump, liek first person view game
  //Orbit cotnrols - locked on a point, yoom in and out and locked on a plain

  //Trackball controll same as orbit but we can go unde the plane and around the axis
  // Call tick again on the next frame
  // transform and drag cotnrol can create editor isnide the browser
  window.requestAnimationFrame(tick);
};

tick();
renderer.render(scene, camera);
