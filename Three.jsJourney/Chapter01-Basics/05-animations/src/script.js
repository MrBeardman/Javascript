import * as THREE from "three";
import gsap from "gsap";

//* Canvas
const canvas = document.querySelector("canvas.webgl");

//* Scene
const scene = new THREE.Scene();

//* Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//* Sizes
const sizes = {
  width: 800,
  height: 600,
};

//* Camera
const camera = new THREE.PerspectiveCamera(70, sizes.height / sizes.width);
camera.position.z = 3;
scene.add(camera);

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
//* Animation
// let time = Date.now();

//*   Clock
const clock = new THREE.Clock();

// GSAP
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
const tick = () => {
  //* Adapt to the framerate and use something different and use seconds isntead of frames
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;

  //* Adapt to the framerate using Clock
  const elapsedTime = clock.getElapsedTime();

  console;
  //* Update object
  //* with deltaTime
  //   mesh.rotation.x += 0.001 * deltaTime;
  //   mesh.rotation.y += 0.001 * deltaTime;
  //* with Clock
  //   mesh.rotation.x = elapsedTime * Math.PI * 2; // One revolution pres second
  //* Makes a sircle
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);
  //*   Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
  //   If we want mroe control we can use GSAP
};
// tick();
document.addEventListener("wheel", e => {
  console.log(e.deltaY);
  if (e.deltaY > 0) {
    camera.position.z += 1;
  } else {
    camera.position.z -= 1;
  }
});
