import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

bakedShadow.colorSpace = THREE.SRGBColorSpace;
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const guiAmbientLight = gui.addFolder("Ambient Light");

guiAmbientLight.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const guiDirectionalLight = gui.addFolder("Directional Light");
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Supports Shadows

directionalLight.position.set(2, 2, -1);
guiDirectionalLight
  .add(directionalLight, "intensity")
  .min(0)
  .max(3)
  .step(0.001);
guiDirectionalLight
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001);
guiDirectionalLight
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001);
guiDirectionalLight
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001);

scene.add(directionalLight);
directionalLight.castShadow = true;

//Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight.target);
scene.add(spotLight);

// Helper
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);

// gui
const guiSpotLight = gui.addFolder("Spot Light");
guiSpotLight.add(spotLight, "intensity").min(0).max(3).step(0.001);
guiSpotLight.add(spotLight.position, "x").min(-5).max(5).step(0.001);
guiSpotLight.add(spotLight.position, "y").min(-5).max(5).step(0.001);
guiSpotLight.add(spotLight.position, "z").min(-5).max(5).step(0.001);
guiSpotLight.add(spotLightCameraHelper, "visible").name("Toggle helper");

//Shadow
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 2;

// Pointlight
const pointLight = new THREE.PointLight(0xffff, 2.7);
scene.add(pointLight);
pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);
scene.add(pointLight.target);
scene.add(pointLight);

// Helper
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);

// gui
const guiPointLight = gui.addFolder("Point Light");
guiPointLight.addColor(pointLight, "color");
guiPointLight.add(pointLight, "intensity").min(0).max(3).step(0.001);
guiPointLight.add(pointLight.position, "x").min(-5).max(5).step(0.001);
guiPointLight.add(pointLight.position, "y").min(-5).max(5).step(0.001);
guiPointLight.add(pointLight.position, "z").min(-5).max(5).step(0.001);
guiPointLight.add(pointLightCameraHelper, "visible").name("Toggle helper");

//Shadow
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.fov = 30;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 2;

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x00ff, 0.3);
scene.add(hemisphereLight);

// Helper
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);

// gui
const guiHemisphereLight = gui.addFolder("Hemisphere Light");
// guiHemisphereLight.addColor(hemisphereLight, "skyColor");
// guiHemisphereLight.addColor(hemisphereLight, "groundColor");
guiHemisphereLight.add(hemisphereLight, "intensity").min(0).max(3).step(0.001);
guiHemisphereLight
  .add(hemisphereLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001);
guiHemisphereLight
  .add(hemisphereLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001);
guiHemisphereLight
  .add(hemisphereLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001);
// guiHemisphereLight.add(hemisphereLightHelper, "visible").name("Toggle helper");

// Baking shadows

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
const guiMaterial = gui.addFolder("Material");
guiMaterial.add(material, "metalness").min(0).max(1).step(0.001);
guiMaterial.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(5, 5),
//   new THREE.MeshBasicMaterial({ map: simpleShadow })
// );
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;

scene.add(sphere, sphereShadow, plane);

sphere.castShadow = true;
plane.receiveShadow = true;
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

//Shadow MAP
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//MipMapping use the power of 2
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 8.5;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.radius = 10;
const directionalLightHelpergui = gui
  .add(directionalLight.shadow, "radius")
  .min(-10)
  .max(25)
  .step(0.01)
  .name("Shadow Radius");
//Debug
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);

const shadowMapSettings = {
  type: THREE.PCFSoftShadowMap,
};

const guiShadowMap = gui.addFolder("Shadow Map Type");
guiShadowMap
  .add(shadowMapSettings, "type", {
    BasicShadowMap: THREE.BasicShadowMap,
    PCFShadowMap: THREE.PCFShadowMap,
    PCFSoftShadowMap: THREE.PCFSoftShadowMap,
    VSMShadowMap: THREE.VSMShadowMap,
  })
  .onChange(() => {
    renderer.shadowMap.type = shadowMapSettings.type;
    if (shadowMapSettings.type === 0 || shadowMapSettings.type === 2) {
      directionalLightHelpergui.disable();
    } else {
      directionalLightHelpergui.enable();
    }
  });

guiDirectionalLight
  .add(directionalLightCameraHelper, "visible")
  .name("Toggle helper");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3) * 1.5);

  // Update the shadow
  sphereShadow.position.x = Math.cos(elapsedTime) * 1.5;
  sphereShadow.position.z = Math.sin(elapsedTime) * 1.5;
  sphereShadow.material.opacity = 1 - sphere.position.y * 0.3;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
