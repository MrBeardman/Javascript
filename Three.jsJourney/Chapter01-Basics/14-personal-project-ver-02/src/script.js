import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
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
const matcapTexture1 = textureLoader.load("./textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture1.colorSpace = THREE.SRGBColorSpace;

/**
 * Enviroment map
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", enviromentMap => {
  enviromentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = enviromentMap;
  scene.environment = enviromentMap;
});

/**
 * Objects
 */
const projectObject = {
  material: new THREE.MeshStandardMaterial(),
  texture: doorColorTexture,
  color: 0xffffff, // Default color (white)
  wireframe: false,
  transparent: false,
};

const geometryOptions = {
  geometryType: "planeGeometry",
};

const materialOptions = {
  materialType: "MeshStandardMaterial",
};

const textureOptions = {
  textureType: "doorTexture",
};

const matCapOptions = {
  matcapType: "1",
};

const materialTypes = [
  "MeshBasicMaterial",
  "MeshNormalMaterial",
  // "MeshDepthMaterial",
  // "MeshDistanceMaterial",
  // "MeshLambertMaterial",
  // "MeshMatcapMaterial",
  // "MeshPhongMaterial",
  // "MeshPhysicalMaterial",
  "MeshStandardMaterial",
  // "MeshToonMaterial",
];
const textureTypes = ["No Texture", "doorTexture"];
const geometries = {
  planeGeometry: new THREE.PlaneGeometry(1, 1, 100, 100),
  TorusGeometry: new THREE.TorusGeometry(),
  BoxGeometry: new THREE.BoxGeometry(1, 1, 1, 64, 64, 64),
  Capsule: new THREE.CapsuleGeometry(),
  Circle: new THREE.CircleGeometry(),
  Dodecahedron: new THREE.DodecahedronGeometry(),
  TorusKnot: new THREE.TorusKnotGeometry(),
  Extrude: new THREE.ExtrudeGeometry(),
  Octahedron: new THREE.OctahedronGeometry(),
};
const matcapTypes = {};
// Initial setup
projectObject.geometry = geometries[geometryOptions.geometryType];
const mesh = new THREE.Mesh(projectObject.geometry, projectObject.material);
mesh.material.map = doorColorTexture;
mesh.material.side = THREE.DoubleSide;
mesh.material.aoMap = doorAmbientTexture;
mesh.material.aoMapIntensity = 1;
mesh.material.displacementScale = 0.15;
mesh.material.metalnessMap = doorMetalnessTexture;
mesh.material.roughnessMao = doorRougnessTexture;
mesh.material.normalMap = doorNormalTexture;
mesh.material.displacementMap = doorHeightTexture;
gui.add(mesh.material, "aoMapIntensity").min(0).max(2);
gui.add(mesh.material, "displacementScale").min(0).max(1);
scene.add(mesh);

/**
 * GUI
 */

// Conmtrolers
let transparentController;
let wireframeController;
let opacityController;
let metalnessController;
let roughnessController;

// Helper Functions
// Function to handle color changes
const handleColorChange = () => {
  mesh.material.dispose();
  mesh.material = projectObject.material;

  if (projectObject.material instanceof THREE.MeshBasicMaterial) {
    projectObject.material.color.set(projectObject.color);
  } else {
    console.warn("Cannot set color for this material type");
  }
};

// Function to add the transparent controller
const addTransparentController = () => {
  if ("transparent" in projectObject.material) {
    transparentController = gui
      .add(projectObject.material, "transparent")
      .onChange(() => {
        mesh.material.needsUpdate = true;

        projectObject.material.transparent
          ? opacityController.enable()
          : opacityController.disable();
      });
  }
};
// Function to add the opacity controller
const addOpacityController = () => {
  if ("opacity" in projectObject.material) {
    opacityController = gui
      .add(projectObject.material, "opacity")
      .min(0)
      .max(1)
      .step(0.01);
  }
};

const addMetalnessController = () => {
  if ("metalness" in projectObject.material) {
    metalnessController = gui
      .add(projectObject.material, "metalness")
      .min(0)
      .max(1)
      .setValue(0.5);
  }
};

const addRoughnessController = () => {
  if ("roughness" in projectObject.material) {
    roughnessController = gui
      .add(projectObject.material, "roughness")
      .min(0)
      .max(1)
      .setValue(0)
      .name("roughness");
  }
};

// Function to add the wireframe controller
const addWireframeController = () => {
  if (
    materialOptions.materialType !== "MeshMatcapMaterial" &&
    "wireframe" in projectObject.material
  ) {
    wireframeController = gui
      .add(projectObject.material, "wireframe")
      .onChange(() => {
        mesh.material.needsUpdate = true;
      });
  }
};

//Geometry Type
gui
  .add(geometryOptions, "geometryType", Object.keys(geometries))
  .onChange(() => {
    mesh.geometry.dispose();

    // Update the geometry when the GUI changes
    projectObject.geometry = geometries[geometryOptions.geometryType];
    mesh.geometry = projectObject.geometry;
  });

//Material Type
gui.add(materialOptions, "materialType", materialTypes).onChange(() => {
  // Update the material when the GUI changes
  projectObject.material.dispose();
  projectObject.material = new THREE[materialOptions.materialType]();
  mesh.material = projectObject.material;
  // Reset GUI controllers

  wireframeController.destroy();
  transparentController.destroy();
  opacityController.destroy();
  if (document.getElementById("lil-gui-name-8")) {
    metalnessController.destroy();
  }
  if (document.getElementById("lil-gui-name-9")) {
    roughnessController.destroy();
  }

  // Re-add controllers for the new material instance

  //Adding wireframe will break the Matcap material

  addWireframeController();
  addTransparentController();
  addOpacityController();
  addMetalnessController();
  addRoughnessController();
  if (materialOptions.materialType === "MeshNormalMaterial") {
    textureType.reset().hide();
  } else if (materialOptions.materialType === "MeshStandardMaterial") {
    colorPicker.reset().hide();
    textureType.show();
  } else {
    textureType.show();
    colorPicker.show();
  }
});
// Texture TYPE
const textureType = gui
  .add(textureOptions, "textureType", textureTypes)
  .onChange(() => {
    // Set the texture based on the selected texture type
    switch (textureOptions.textureType) {
      case "No Texture":
        projectObject.texture = null;
        break;
      case "doorTexture":
        projectObject.texture = doorColorTexture;
        projectObject.AoMap = doorAmbientTexture;
        break; // Add other texture cases as needed
    } // Assign the texture to the material and update the material

    projectObject.material.map = projectObject.texture;
    mesh.material.map = projectObject.material.map;
    mesh.material.needsUpdate = true;
  });
// Color Picker
const colorPicker = gui
  .addColor(projectObject, "color")
  .onChange(handleColorChange)
  .hide();

// Wireframe
wireframeController = gui.add(mesh.material, "wireframe").onChange(() => {
  mesh.material.needsUpdate = true;
});
transparentController = gui
  .add(projectObject.material, "transparent")
  .onChange(() => {
    projectObject.material = new THREE[materialOptions.materialType]({
      transparent: projectObject.material.transparent,
    });
    mesh.material.needsUpdate = true;
    console.log(mesh.material.transparent, projectObject.material.transparent);
    mesh.material.transparent
      ? opacityController.enable()
      : opacityController.disable();
  });
opacityController = gui
  .add(projectObject.material, "opacity")
  .min(0)
  .max(1)
  .step(0.01)
  .disable();

addMetalnessController();
addRoughnessController();
// Save and Load functionality (example)
const saveButton = { save: () => gui.save() };
const loadButton = { load: () => gui.load() };

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
camera.position.y = š;
camera.position.z = 1;
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

  mesh.rotation.y = 0.1 * elapsedTime;
  mesh.rotation.x = -0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
