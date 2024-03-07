import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
let matcapTexture = textureLoader.load("textures/matcaps/2.png");

matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Create a configuration object
const textConfig = {
  text: "Jan Matyas",
  size: 0.5,
  height: 0.2,
  curveSegments: 6,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5,
};
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
console.time("donuts");
for (let i = 0; i < 500; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);
  // Position
  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 20;
  donut.position.z = (Math.random() - 0.5) * 20;
  // Rotation
  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);
  scene.add(donut);
}
console.timeEnd("donuts");
/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", font => {
  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Text
  const textGeometry = new TextGeometry(textConfig.text, {
    font: font,
    size: textConfig.size,
    height: textConfig.height,
    curveSegments: textConfig.curveSegments,
    bevelEnabled: textConfig.bevelEnabled,
    bevelThickness: textConfig.bevelThickness,
    bevelSize: textConfig.bevelSize,
    bevelOffset: textConfig.bevelOffset,
    bevelSegments: textConfig.bevelSegments,
  });
  textGeometry.center();
  // textGeometry.computeBoundingBox();
  // // To center it truly
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textConfig.bevelSize) * 0.5, //minus the bewel thickess
  //   -(textGeometry.boundingBox.max.y - textConfig.bevelSize) * 0.5,
  //   -(textGeometry.boundingBox.max.z - textConfig.bevelThickness) * 0.5
  // );

  // material.wireframe = true;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

// Axis gelper
// const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);

// Frustrum culling - Render a box or a sphere around the object, so we know when its in frame to render it

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 15;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
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
