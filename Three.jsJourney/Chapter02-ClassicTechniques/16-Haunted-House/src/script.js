import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { normalize } from "three/src/math/mathutils";

/**
 * Base
 */
// Debug
const gui = new GUI();
let projectObject = {};
window.projectObject = projectObject;
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog("#262837", 2, 15);
scene.fog = fog;

gui.add(fog, "near");
gui.add(fog, "far");
/**
 * Textures
 */

// Door textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOclusionTexture = textureLoader.load(
  "/textures/door/color.jpg"
);
const doorHeightTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorNormalTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnmessTexture = textureLoader.load(
  "/textures/door/roughness.jpg"
);
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// House textures
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
bricksColorTexture.colorSpace = THREE.SRGBColorSpace;

// Floor textures
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

const tombStoneColorTexture = textureLoader.load(
  "/textures/tombStone/color.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.repeat.set(8, 8);
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.repeat.set(8, 8);
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
/**
 * House
 */

// Group
const house = new THREE.Group();
scene.add(house);

// Walls
let wallsObjct = {
  dimensions: { w: 4, h: 2.5, d: 4 },
};
projectObject.walls = wallsObjct;
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    projectObject.walls.dimensions.w,
    projectObject.walls.dimensions.h,
    projectObject.walls.dimensions.d
  ),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.position.y = wallsObjct.dimensions.h / 2;
house.add(walls);

// Roof
let roofObjct = {
  dimensions: { r: 3.5, h: 1, rs: 4 },
};
projectObject.roof = roofObjct;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    projectObject.roof.dimensions.r,
    projectObject.roof.dimensions.h,
    projectObject.roof.dimensions.rs
  ),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = wallsObjct.dimensions.h + roofObjct.dimensions.h / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

//Door
let doorObjct = {
  dimensions: { w: 2, h: 2 },
};
projectObject.door = doorObjct;
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(
    projectObject.door.dimensions.w,
    projectObject.door.dimensions.h,
    100,
    100
  ),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnmessTexture,
  })
);
door.position.z = projectObject.door.dimensions.w + 0.0001;
door.position.y = projectObject.door.dimensions.w / 2;
house.add(door);

// Bushes
let bushesObjct = {
  dimensions: { r: 1, w: 16, h: 16 },
};
projectObject.bushes = bushesObjct;
// Bushes
const bushGeometry = new THREE.SphereGeometry(
  projectObject.bushes.dimensions.r,
  projectObject.bushes.dimensions.w,
  projectObject.bushes.dimensions.h
);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves - Procedually generated

// Create group
const graves = new THREE.Group();
scene.add(graves);

// Create geometry
const graveGeometry = new THREE.BoxGeometry(0.6, 0.9, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: tombStoneColorTexture,
});

// Loop over the graves
for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius =
    projectObject.walls.dimensions.w +
    Math.random() * (projectObject.walls.dimensions.w + 2);
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.3) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
}

// Ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 6, 3);
ghost1.position.set(1, 1, 1);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff)", 6, 3);
ghost2.position.set(1, 1, 1);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 6, 3);
ghost3.position.set(1, 1, 1);
scene.add(ghost3);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
const guiAmbient = gui.addFolder("Ambient light");
guiAmbient.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.26);
moonLight.position.set(4, 5, -2);
let directionalLightHelper = new THREE.DirectionalLightHelper(moonLight);
const guidirectional = gui.addFolder("Directional light");
guidirectional.add(moonLight, "intensity").min(0).max(1).step(0.001);
guidirectional.add(moonLight.position, "x").min(-5).max(5).step(0.001);
guidirectional.add(moonLight.position, "y").min(-5).max(5).step(0.001);
guidirectional.add(moonLight.position, "z").min(-5).max(5).step(0.001);
guidirectional.add(directionalLightHelper, "visible");
scene.add(moonLight);
scene.add(directionalLightHelper);

// Door Light
const doorLight1 = new THREE.PointLight("#ff7d46", 1, 7);
const doorLight2 = new THREE.PointLight("#ff7d46", 1, 7);
doorLight1.position.set(1.4, 2.2, 2.7);
doorLight2.position.set(-1.4, 2.2, 2.7);
house.add(doorLight1);
house.add(doorLight2);
let pointLightHelper = new THREE.PointLightHelper(doorLight1);
const guidPointLight = gui.addFolder("Point light");
guidPointLight.add(doorLight1, "intensity").min(0).max(1).step(0.001);
guidPointLight.add(doorLight1.position, "x").min(-5).max(5).step(0.001);
guidPointLight.add(doorLight1.position, "y").min(-5).max(5).step(0.001);
guidPointLight.add(doorLight1.position, "z").min(-5).max(5).step(0.001);
guidPointLight.add(pointLightHelper, "visible");

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
renderer.setClearColor("#262837");
renderer.shadowMap.enabled = true;

/**
 * Lights
 */
moonLight.castShadow = true;
doorLight1.castShadow = true;
doorLight2.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight1.shadow.mapSize.width = 256;
doorLight1.shadow.mapSize.height = 256;
doorLight1.shadow.camera.far = 7;

doorLight2.shadow.mapSize.width = 256;
doorLight2.shadow.mapSize.height = 256;
doorLight2.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Ghost
  const ghost1Angle = elapsedTime * 0.3;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.22;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
