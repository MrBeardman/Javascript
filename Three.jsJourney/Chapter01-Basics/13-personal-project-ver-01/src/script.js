import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import GUI from "lil-gui";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({closeFolders: true});
// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

// Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = ( url, itemsLoaded, itemsTotal ) => {
  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
loadingManager.onLoad = () => {
  console.log( 'Loading complete!');
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loadingManager.onError = (url) => {
  console.log( 'There was an error loading ' + url );
};

//RGBE Loader
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", enviromentMap => {
  enviromentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = enviromentMap;
  scene.environment = enviromentMap;
});
let twoK;

// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

//Texture optimizer fucnion
const optimizeTexture = (texture) =>{
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
}
// loading textures
const minecraftTexture = textureLoader.load("/textures/minecraft.png")
optimizeTexture(minecraftTexture)


const doorTexture = textureLoader.load("/textures/door/color.jpg", (texture) => {
  optimizeTexture(texture);
  projectObject.material.map = texture;
  projectObject.material.needsUpdate = true;
});

const doorAOMapTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
  (texture) => {
    optimizeTexture(texture);
    projectObject.material.aoMap = texture;
    projectObject.material.aoMapIntensity = 1;
    projectObject.material.needsUpdate = true;
  }
);

const doorHeightTexture = textureLoader.load(
  "./textures/door/height.jpg",
  (texture) => {
    optimizeTexture(texture);
    projectObject.material.displacementMap = texture;
    projectObject.material.displacementScale = 0.2;
    projectObject.material.needsUpdate = true;
  }
);

const doorNormalTexture = textureLoader.load(
  "./textures/door/normal.jpg",
  (texture) => {
    optimizeTexture(texture);
    projectObject.material.normalMap = texture;
    projectObject.material.normalScale.set(0.5, 0.5);
    projectObject.material.needsUpdate = true;
  }
);

const doorRougnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
  (texture) => {
    optimizeTexture(texture);
    projectObject.material.roughnessMap = texture;
    projectObject.material.needsUpdate = true;
  }
);

const doorAplhaTexture = textureLoader.load(
  "./textures/door/alpha.jpg",
  (texture) => {
    optimizeTexture(texture);
    projectObject.material.alphaMap = texture;
    projectObject.material.transparent = true;
    projectObject.material.needsUpdate = true;
  }
);


const geometryTypes = {box:'BoxGeometry', sphere: 'SphereGeometry', cyliner:'CylinderGeometry' }

const projectObject = {
  color: 0xFFFFFF,
  wireframe: false,
  currentGeometryType : geometryTypes.box,
  changeGeometryType : (type)=>{
    projectObject.currentGeometryType = type;
  },
  textures: [minecraftTexture,doorTexture, doorAOMapTexture],
  currentTexture: doorTexture,
  changeTexture: (index)=> {
    projectObject.currentTexture = projectObject.textures[index];
    projectObject.material.map = projectObject.currentTexture;
    projectObject.material.needsUpdate = true;
  },
  loadTextureMap : (property, texture) => {
    projectObject.material[property] = texture;
    projectObject.material.needsUpdate = true; // Ensure material updates
  },
  enviromentMaps : ['./textures/environmentMap/2k.hdr'],
  currentEnviromentMap: null,
  changeEnviromentalMap: (index)=>{
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(projectObject.enviromentMaps[index],(enviromentMap)=>{
      enviromentMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = enviromentMap;
      scene.environment = enviromentMap;
       // Set currentEnviromentMap to the first value in enviromentMaps
       projectObject.currentEnviromentMap = projectObject.enviromentMaps[0];
    })
  },
  pointLightVisible: true,  // Add a boolean property for point light visibility
  pointLightVisible: true,  // Add a boolean property for point light visibility
  togglePointLight: () => {
    projectObject.pointLightVisible = !projectObject.pointLightVisible;
    pointLight.visible = projectObject.pointLightVisible;

    if(projectObject.pointLightVisible){
      guiPointlightX.enable()
      guiPointlightY.enable()
      guiPointlightZ.enable()
    }else{
      guiPointlightX.disable()
      guiPointlightY.disable()
      guiPointlightZ.disable()
    }
  },
};

console.log(projectObject.enviromentMaps[0]);
//Geometry
projectObject.geometry = new THREE.BoxGeometry(1, 1, 1 ,10,10,10);
//material
projectObject.material = new THREE.MeshStandardMaterial({color: projectObject.color, wireframe: projectObject.wireframe, map: projectObject.currentTexture });

//Mesh
const mesh = new THREE.Mesh(projectObject.geometry, projectObject.material);
scene.add(mesh);

/**
 * Window Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

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


//Pointlight 
const pointLight = new THREE.PointLight("white", 30);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);
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
	window.requestAnimationFrame(tick);
};
tick();

// Responsivness
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
  mesh.rotation.y = 0.1 * elapsedTime
	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * GUI helper fucnions
 */
const updateGeometry = () => {
  const param = projectObject.geometry.parameters;
  mesh.geometry.dispose();

  // Check the current geometry type and create the corresponding geometry
  switch (projectObject.currentGeometryType) {
    case 'BoxGeometry':
      mesh.geometry = new THREE.BoxGeometry(
        param.width,
        param.height,
        param.depth,
        param.widthSegments,
        param.heightSegments
      );
      break;
    case 'SphereGeometry':
      const sphereRadius = 0.5; // Default radius is 1
      const sphereWidthSegments = 32; // Default widthSegments is 32
      const sphereHeightSegments = 16; // Default heightSegments is 16
      mesh.geometry = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthSegments,
        sphereHeightSegments
      );
      break;
    case 'CylinderGeometry':
      mesh.geometry = new THREE.CylinderGeometry(
        param.radiusTop,
        param.radiusBottom,
        param.height,
        param.radialSegments,
        param.heightSegments
      );
      break;
    // Add more cases for additional geometries
    default:
      // Handle the default case or provide an error message
      console.error(`Unknown geometry type: ${projectObject.currentGeometryType}`);
      break;
  }

  projectObject.material.needsUpdate = true;
};
// Geometry
const guiGeometry = gui.addFolder('Geometry');
guiGeometry.add(projectObject, 'currentGeometryType', geometryTypes).onChange(updateGeometry);



//Add controls to the GUI Helper
const addControll = (folder, object, property, name = property, min = 1, max = 5, step = 0.01, func = null, callback = null ) => {

  const control = folder.add(object, property).min(min).max(max).step(step).name(name);
  control.listen();
  if (func && typeof control[func] === 'function') {
      control[func](callback);
  }
};
// GUI Folders and its cotrnols 

//Camera
const cameraFolder = gui.addFolder("Camera");
// Position
const cameraFolderPosition = cameraFolder.addFolder("Position")
cameraFolderPosition.add(camera.position, "x").step(0.1).decimals(2).listen().name("Camera X")
cameraFolderPosition.add(camera.position, "y").step(0.1).decimals(2).listen().name("Camera Y")
cameraFolderPosition.add(camera.position, "z").step(0.1).decimals(2).listen().name("Camera Z")


//Enviroment
const guiEnviromentFolder = gui.addFolder("Enviroments");

//PointLight 
const guiPointlight = guiEnviromentFolder.addFolder("Pointlight");
guiPointlight.add(projectObject, "togglePointLight").name("Toggle Point Light Visibility");
const guiPointlightX = guiPointlight
  .add(pointLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Pointlight X");
  const guiPointlightY = guiPointlight
  .add(pointLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Pointlight Y");
  const guiPointlightZ =guiPointlight
  .add(pointLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Pointlight Z");

//Enviroments
guiEnviromentFolder.add(projectObject, "changeEnviromentalMap" ).onChange(()=>{
  projectObject.changeEnviromentalMap(0)
}).name('Street in 2k')


//Geometric Properties
const guiGeometryFolder = gui.addFolder("Geometry Properties");

//Size
const guiGeometrySizes = guiGeometryFolder.addFolder("Size");

//Width control
addControll(guiGeometrySizes,projectObject.geometry.parameters,"width","Width",1,5,0.01,"onChange",updateGeometry);

//Height control
addControll(guiGeometrySizes,projectObject.geometry.parameters,"height","Height",1,5,0.01,"onChange",updateGeometry);

//Depth control
addControll(guiGeometrySizes,projectObject.geometry.parameters,"depth","Depth",1,5,0.01,"onChange",updateGeometry);

//Color
const guiGeometryColor = guiGeometryFolder.addFolder("Color")
guiGeometryColor.addColor(projectObject, 'color').onChange(()=>{
  projectObject.material.color.setHex(projectObject.color);
  mesh.geometry.dispose()
  mesh.material.color = projectObject.material.color;
});

// Frame Properties
const guiGeometryFrame = guiGeometryFolder.addFolder("Frame");

// Wireframe
const wireframeController = guiGeometryFrame.add(mesh.material, "wireframe");

// Width Segments
const widthSegmentsController = guiGeometryFrame
  .add(projectObject.geometry.parameters, "widthSegments")
  .min(1)
  .max(20)
  .step(1)
  .name("Width Segments")
  .onChange(updateGeometry);
widthSegmentsController.disable();

// Height Segments
const heightSegmentsController = guiGeometryFrame
  .add(projectObject.geometry.parameters, "heightSegments")
  .min(1)
  .max(20)
  .step(1)
  .name("Height Segments")
  .onChange(updateGeometry);
heightSegmentsController.disable();
// Toggle segments if wireframe is active 
wireframeController.onChange((value) => {
  if (value) {
    widthSegmentsController.enable();
    heightSegmentsController.enable();
  } else {
    widthSegmentsController.disable();
    heightSegmentsController.disable();
  }
});
// Materials
const guiGeometryMaterials = guiGeometryFolder.addFolder("Materials");
guiGeometryMaterials.add(projectObject, "changeTexture").name("Minecraft").
onChange(()=>{
  projectObject.changeTexture(0);
})

// Door all textures
guiGeometryMaterials.add(projectObject,'changeTexture').name("Door Material").onChange(()=>{
  projectObject.changeTexture(1);
  projectObject.loadTextureMap("aoMap", doorAOMapTexture);
  projectObject.loadTextureMap("displacementMap", doorHeightTexture);
  projectObject.loadTextureMap("roughnessMap", doorRougnessTexture);
  projectObject.loadTextureMap("normalMap", doorNormalTexture);
  projectObject.material.normalScale.set(0.5,0.5)
  projectObject.loadTextureMap("alphaMap", doorAplhaTexture);
  projectObject.material.clearcoat = 1;
}
)

// AO map Intesity
guiGeometryMaterials.add(projectObject.material, 'aoMapIntensity').min(-3).max(3).step(0.1);

// Dispalcement Scale
guiGeometryMaterials.add(projectObject.material, 'displacementScale').min(-0.5).max(0.5).step(0.05);


guiGeometryMaterials.add(projectObject.material, 'metalness').min(-0.5).max(1.5).step(0.1);

// Roughness
guiGeometryMaterials.add(projectObject.material, 'roughness').min(-0.5).max(1.5).step(0.1);


