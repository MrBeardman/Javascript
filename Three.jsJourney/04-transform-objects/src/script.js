import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//Group
const group = new THREE.Group();

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

let createCube = function (x, y, z, color) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(x, y, z),
    new THREE.MeshBasicMaterial({ color: color })
  );
};
const cube2 = createCube(2, 1, 1, 0x00ff00);
const cube3 = createCube(2, 1, 1, 0x00fff0);
cube2.position.x = -2;
cube3.position.x = 2;
group.add(cube1, cube2, cube3);
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

//Position
// mesh.position.set(1, 1, 1);
// scene.add(cube1);
// mesh.position.normalize();
//Scale
// mesh.scale.set(0.7, 1, 0.8);

//Rotation is an Euler, properties x,y,z,order
//Pi is the benchmark for a rotation so 3.14159
// mesh.rotation.y = 2;
// mesh.rotation.x = Math.PI * 0.5;
// mesh.rotation.reorder("YZX");
//Quatertnion uses math for rotation
scene.add(new THREE.AxesHelper(5));
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
//Position
camera.position.z = 3;
camera.position.set(1, 1, 3);
scene.add(camera);

//Look at ...
// camera.lookAt(mesh.position);

//Combining transformation
//Groups
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
