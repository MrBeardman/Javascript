import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
//Vertices - poinst on a map that connect to create Geometries or particles
// Each one can have postiion, UV, Normal, and all sorts of values
// Create Buffer Geometry suing float32 array

// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionAtribute = new THREE.BufferAttribute();
// same thing
//First Vertices xyz
// positionArray[0] = 0;
// positionArray[1] = 0;
// positionArray[2] = 0;
//Second Vertices xyz
// positionArray[3] = 0;
// positionArray[4] = 1;
// positionArray[5] = 0;
//Third Vertices xyz
// positionArray[6] = 1;
// positionArray[7] = 0;
// positionArray[8] = 0;

// field of triangles

const count = 500;
const positionArray = new Float32Array(count * 3 * 3); //Each triangle has 3 Vertices and each vertice has a 3 values
const geometry = new THREE.BufferGeometry();
for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = Math.random() - 0.5; //- 0.5 to center it
}
const positionAtribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute("position", positionAtribute);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 200);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
