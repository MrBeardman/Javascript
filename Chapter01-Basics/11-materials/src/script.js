import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import GUI from "lil-gui";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");
const gui = new GUI();
// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loadingManager: loading started");
};
loadingManager.onLoad = () => {
  console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
  console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
  console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRougnessTexture = textureLoader.load("./textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("./textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;
//Mesh Basic Material
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color("green");
// material.wireframe = true;
//Needs to be used together
// material.transparent = true;
// material.opacity = 1;

//See both sides of sphere

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

//MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial -uses light, is the most performant one
// const material = new THREE.MeshLambertMaterial();
//Light
// const ambientLight = new THREE.AmbientLight("white", 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight("white", 30);
// pointLight.position.x = 2;
// pointLight.position.y = 2;
// pointLight.position.z = 2;
// scene.add(pointLight);

function guiAdd(obj, min, max, step, name) {
  return;
}
//GUI
// const guiPointlight = gui.addFolder("Pointlight");
// guiPointlight
//   .add(pointLight.position, "x")
//   .min(-10)
//   .max(10)
//   .step(0.1)
//   .name("Pointlight X");
// guiPointlight
//   .add(pointLight.position, "y")
//   .min(-10)
//   .max(10)
//   .step(0.1)
//   .name("Pointlight Y");
// guiPointlight
//   .add(pointLight.position, "z")
//   .min(-10)
//   .max(10)
//   .step(0.1)
//   .name("Pointlight Z");
// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false; // better for performance
// material.gradientMap = gradientTexture;

// MeshStandartMaterial - Standart for BR
const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.roughnessMap = doorRougnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAplhaTexture;

const guiMaterial = gui.addFolder("Material");
guiMaterial.add(material, "wireframe");
guiMaterial.add(material, "metalness").min(-0.5).max(1.5).step(0.1);
guiMaterial.add(material, "roughness").min(-0.5).max(1.5).step(0.1);
guiMaterial.add(material, "aoMapIntensity").min(-3).max(3).step(0.1);
guiMaterial.add(material, "displacementScale").min(-0.5).max(0.5).step(0.05);

// MeshPhysicalMaterial - same as standartMaterial but has more properties so less performance
const material = new THREE.MeshPhysicalMaterial();
material.side = THREE.DoubleSide;
material.metalness = 1;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.roughnessMap = doorRougnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAplhaTexture;
//Cleaarcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

//Sheen
// material.sheen = 1;
// material.sheenRoughness = 1;
// material.sheenColor.set(1, 1, 1);

//Iridesence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;
//GUI
const guiMaterial = gui.addFolder("Material");
guiMaterial.add(material, "wireframe");
guiMaterial.add(material, "metalness").min(-0.5).max(1.5).step(0.1);
guiMaterial.add(material, "roughness").min(-0.5).max(1.5).step(0.1);
guiMaterial.add(material, "aoMapIntensity").min(-3).max(3).step(0.1);
guiMaterial.add(material, "displacementScale").min(-0.5).max(0.5).step(0.05);
guiMaterial.add(material, "clearcoat").min(0).max(1).step(0.001);
guiMaterial.add(material, "clearcoatRoughness").min(0).max(1).step(0.001);
guiMaterial.add(material, "sheen").min(0).max(1).step(0.001);
guiMaterial.add(material, "sheenRoughness").min(0).max(1).step(0.001);
guiMaterial.add(material, "transmission").min(0).max(1).step(0.001);
guiMaterial.add(material, "ior").min(1).max(5).step(0.0001);
guiMaterial.add(material, "thickness").min(0.1).max(5).step(0.0001);
// guiMaterial.add(material, "iridescence").min(0).max(1).step(0.001);
// guiMaterial.add(material, "iridescenceIOR").min(1).max(2.333).step(0.001);
// guiMaterial
//   .add(material.iridescenceThicknessRange, "0")
//   .min(1)
//   .max(1000)
//   .step(1)
//   .name("iridescence thickness");
// guiMaterial.addColor(material, "sheenColor");

//Meshes
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
);
const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material
);
const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 64),
  material
);
/**
 * Enviroment map
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", enviromentMap => {
  enviromentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = enviromentMap;
  scene.environment = enviromentMap;
});

//Positions
sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

let fpsCounter = document.querySelector(".fps");
const clock = new THREE.Clock();
let frameCount = 0;
let lastTime = performance.now();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const animationSpeed = 0.1 * elapsedTime;
  planeMesh.rotation.y = animationSpeed;
  sphereMesh.rotation.z = animationSpeed;
  torusMesh.rotation.z = animationSpeed;

  planeMesh.rotation.x = -animationSpeed;
  sphereMesh.rotation.x = -animationSpeed;
  torusMesh.rotation.x = -animationSpeed;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Calculate FPS
  // frameCount++;
  // const currentTime = performance.now();
  // const deltaTime = currentTime - lastTime;
  // if (deltaTime >= 1000) {
  //   const fps = (frameCount / deltaTime) * 1000;
  //   fpsCounter.innerHTML = `FPS: ${fps.toFixed(2)}`;
  //   frameCount = 0;
  //   lastTime = currentTime;
  // }
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
