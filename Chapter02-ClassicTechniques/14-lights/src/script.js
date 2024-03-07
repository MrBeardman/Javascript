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

/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.name = "ambientLight";
ambientLight.color = new THREE.Color("purple");
scene.add(ambientLight);

// GUI Ambient
const guiAmbientLight = gui.addFolder("Ambient light");
guiAmbientLight
  .add(ambientLight, "remove")
  .onChange(() => {
    if (scene.getObjectByName("ambientLight")) {
      scene.remove(ambientLight);
      guiAmbientLight.controllers[0].name("Off");
    } else {
      scene.add(ambientLight);
      guiAmbientLight.controllers[0].name("On");
    }
  })
  .name("Toggle");
guiAmbientLight.addColor(ambientLight, "color").name("Color");
guiAmbientLight.add(ambientLight, "intensity").min(0).max(1).name("Intensity");

// Directional Light
const directionalLight = new THREE.DirectionalLight();

directionalLight.name = "directionalLight";
scene.add(directionalLight);

// GUI Directional Light
let guiDirectionalLight = gui.addFolder("Directional Light");
guiDirectionalLight
  .add(directionalLight, "remove")
  .onChange(event => {
    if (scene.getObjectByName("directionalLight")) {
      scene.remove(directionalLight);
      guiDirectionalLight.controllers[0].name("Off");
    } else {
      scene.add(directionalLight);
      guiDirectionalLight.controllers[0].name("On");
    }
  })
  .name("Toggle");

guiDirectionalLight.addColor(directionalLight, "color").name("Color");
guiDirectionalLight
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .name("X-axis");
guiDirectionalLight
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .name("Y-axis");
guiDirectionalLight
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .name("Z-axis");
guiDirectionalLight.add(directionalLight, "intensity").min(0).max(2);
//  Hemisphere Light
let hemisphereLight = new THREE.HemisphereLight(0xff000, 0x0000ff, 0.9);
hemisphereLight.name = "hemisphereLight";
scene.add(hemisphereLight);

let guiHemisphereLight = gui.addFolder("Hemisphere Light");
guiHemisphereLight
  .add(hemisphereLight, "remove")
  .onChange(() => {
    if (scene.getObjectByName("hemisphereLight")) {
      guiHemisphereLight.controllers[0].name("Off");
      scene.remove(hemisphereLight);
    } else {
      scene.add(hemisphereLight);
      guiHemisphereLight.controllers[0].name("On");
    }
  })
  .name("Toggle");
guiHemisphereLight
  .add(hemisphereLight.position, "x")
  .min(-5)
  .max(5)
  .name("X-axis");
guiHemisphereLight
  .add(hemisphereLight.position, "y")
  .min(-5)
  .max(5)
  .name("Y-axis");

guiHemisphereLight
  .add(hemisphereLight.position, "z")
  .min(-5)
  .max(5)
  .name("Z-axis");

guiHemisphereLight.addColor(hemisphereLight, "color").name("Sky Color");
guiHemisphereLight
  .addColor(hemisphereLight, "groundColor")
  .name("Ground Color");
guiHemisphereLight.add(hemisphereLight, "intensity").min(0).max(2);

const pointLight = new THREE.PointLight(0xff9000, 2.5);
pointLight.name = "pointLight";
pointLight.position.x = 1;
pointLight.position.y = 0.5;
pointLight.position.z = 1;
scene.add(pointLight);
const guiPointLight = gui.addFolder("Point Light");

guiPointLight
  .add(pointLight, "remove")
  .onChange(() => {
    if (scene.getObjectByName("pointLight")) {
      guiPointLight.controllers[0].name("Off");
      scene.remove(pointLight);
    } else {
      scene.add(pointLight);
      guiPointLight.controllers[0].name("On");
    }
  })
  .name("Toggle");
guiPointLight.addColor(pointLight, "color");
guiPointLight.add(pointLight.position, "x").min(-10).max(10);
guiPointLight.add(pointLight.position, "y").min(-10).max(10);
guiPointLight.add(pointLight.position, "z").min(-10).max(10);
guiPointLight.add(pointLight, "intensity").min(-10).max(100);

const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 2, 1, 1); // Works with Standart and Physical material //!HIGH cost
scene.add(rectAreaLight);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3()); // Vector 3 default is 0,0,0 so it is looking at the center of the screen

let guiRectAreaLight = gui.addFolder("RectAreaLight");

guiRectAreaLight.addColor(rectAreaLight, "color");
guiRectAreaLight.add(rectAreaLight, "intensity").min(0).max(10).step(0.01);
guiRectAreaLight.add(rectAreaLight, "width").min(0).max(10).step(0.01);
guiRectAreaLight.add(rectAreaLight, "height").min(0).max(10).step(0.01);
guiRectAreaLight.add(rectAreaLight.position, "x").min(-10).max(10).step(0.01);
guiRectAreaLight.add(rectAreaLight.position, "y").min(-10).max(10).step(0.01);
guiRectAreaLight.add(rectAreaLight.position, "z").min(-10).max(10).step(0.01);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

//Spotlight - Like a flashlight //! High Cost

let guiSpotlight = gui.addFolder("Spotlight");

const spotlight = new THREE.SpotLight(
  0x78ff00,
  4.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
scene.add(spotlight);

guiSpotlight.addColor(spotlight, "color");
guiSpotlight.add(spotlight, "intensity").onChange(() => {
  window.requestAnimationFrame(() => {
    spotlightHelper.update();
  });
});
guiSpotlight.add(spotlight, "distance").onChange(() => {
  window.requestAnimationFrame(() => {
    spotlightHelper.update();
  });
});
guiSpotlight
  .add(spotlight, "angle")
  .onChange(() => {
    window.requestAnimationFrame(() => {
      spotlightHelper.update();
    });
  })
  .min(0)
  .max(Math.PI * 2)
  .step(0.01);
guiSpotlight
  .add(spotlight, "penumbra")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange(() => {
    window.requestAnimationFrame(() => {
      spotlightHelper.update();
    });
  });
guiSpotlight.add(spotlight, "decay").onChange(() => {
  window.requestAnimationFrame(() => {
    spotlightHelper.update();
  });
});

// You can set initial values if needed
spotlight.position.set(0, 0, 5);

// Update the spotlight target if needed
spotlight.target.position.set(0, 0, 0);
scene.add(spotlight.target);

/** *Baking
 * Bake the light inside the texture so it is not rendered in Three
 */

//Helpers

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
// scene.add(hemisphereLightHelper)
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

const spotlightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotlightHelper);

window.requestAnimationFrame(() => {
  spotlightHelper.update();
});
/**7.3 End here */
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
