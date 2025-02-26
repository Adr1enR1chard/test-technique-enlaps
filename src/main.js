import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/****************/
/*Scene defaults*/
/****************/
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(900, 600);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, 900 / 600);
camera.position.z = 5;
camera.position.x = 2;

const _controls = new OrbitControls(camera, renderer.domElement);


/********/
/*Meshes*/
/********/
const textureLoader = new THREE.TextureLoader();

// Earth
const earthRotationRate = 0.6;

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({ map: textureLoader.load('assets/textures/earth.jpg') }),
)
scene.add(earth);

earth.castShadow = true;
earth.receiveShadow = true;

// Moon
const moonSpeed = 1;
const moonDistanceFromEarth = 2;

const moon = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.08),
    new THREE.MeshStandardMaterial({ map: textureLoader.load('assets/textures/moon.jpg') }),
)
scene.add(moon);

moon.position.x = moonDistanceFromEarth;
moon.castShadow = true;
moon.receiveShadow = true;

// Sun
const sun = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('lightyellow') }),
)
scene.add(sun);

sun.position.x = 6;

/*******/
/*Lights*/
/*******/
// Ambient light
const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.1);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(new THREE.Color('white'));
scene.add(directionalLight);

directionalLight.position.x = 6;
directionalLight.castShadow = true;

/***********/
/*Animation*/
/***********/
const clock = new THREE.Clock(true);
var delta = 0;

function animate() {
    delta = clock.getDelta();

    /*Earth movements*/
    earth.rotateY(earthRotationRate * delta);

    /*Moon movements*/
    let moonAngle = clock.getElapsedTime() * moonSpeed;
    moon.position.x = Math.cos(moonAngle) * moonDistanceFromEarth;
    moon.position.z = Math.sin(moonAngle) * moonDistanceFromEarth;
    moon.rotation.y = - moonAngle + Math.PI / 2;

    renderer.render(scene, camera);
}