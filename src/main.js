import * as THREE from 'three';

/****************/
/*Scene defaults*/
/****************/
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(900, 600);
renderer.setAnimationLoop(animate);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, 900 / 600);
camera.position.z = 5;
camera.position.x = 2;


/********/
/*Meshes*/
/********/
const textureLoader = new THREE.TextureLoader();

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({ map: textureLoader.load('assets/textures/earth.jpg') }),
)
scene.add(earth);

const moon = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.08),
    new THREE.MeshStandardMaterial({ map: textureLoader.load('assets/textures/moon.jpg') }),
)
moon.position.x = 2;
scene.add(moon);

const sun = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('lightyellow') }),
)
sun.position.x = 6;
scene.add(sun);

/*******/
/*Lights*/
/*******/
const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'));
directionalLight.position.x = 6;
scene.add(directionalLight);


function animate() {
    renderer.render(scene, camera);
}