import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

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

const animationMixer = new THREE.AnimationMixer();


/********/
/*Meshes*/
/********/
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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

//Space ship
let spaceShip;
gltfLoader.load("assets/models/scene.gltf", function (gltf) {
    spaceShip = gltf.scene;
    scene.add(spaceShip);

    spaceShip.position.y = -3;
    spaceShip.position.z = 10;

    // Enable shadows for all child meshes.
    spaceShip.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        };
    });

    animationMixer.clipAction(gltf.animations[0], gltf.scene).play();
});


/*******/
/*Lights*/
/*******/
// Ambient light
const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.01);
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

/**
 * A dictionary that stores whether a key is pressed.
 * 
 * @example
 * inputs['ArrowUp'] = true => Up arrow is pressed
 * 
 * */
var inputs = {};

const sunSpeed = 2;

function animate() {
    delta = clock.getDelta();

    /*Earth movements*/
    earth.rotateY(earthRotationRate * delta);

    /*Moon movements*/
    var moonAngle = clock.getElapsedTime() * moonSpeed;
    moon.position.x = Math.cos(moonAngle) * moonDistanceFromEarth;
    moon.position.z = Math.sin(moonAngle) * moonDistanceFromEarth;
    moon.rotation.y = - moonAngle + Math.PI / 2;

    /*Sun movements*/
    var sunDirection = new THREE.Vector3();
    if (inputs['ArrowUp']) {
        sunDirection.y = 1;
    } else if (inputs['ArrowDown']) {
        sunDirection.y = -1;
    }

    if (inputs['ArrowRight']) {
        sunDirection.x = 1;
    } else if (inputs['ArrowLeft']) {
        sunDirection.x = -1;
    }

    var sunTranslation = sunDirection.normalize().multiplyScalar(sunSpeed * delta);

    sun.position.add(sunTranslation);
    directionalLight.position.add(sunTranslation);

    animationMixer.update(1 / 60);
    renderer.render(scene, camera);
}

/***************/
/*Input gesture*/
/***************/

document.addEventListener('keydown', function (ev) {
    if (ev.key == 'ArrowUp') {
        inputs['ArrowUp'] = true;
    }
    if (ev.key == 'ArrowDown') {
        inputs['ArrowDown'] = true;
    }
    if (ev.key == 'ArrowRight') {
        inputs['ArrowRight'] = true;
    }
    if (ev.key == 'ArrowLeft') {
        inputs['ArrowLeft'] = true;
    }
});

document.addEventListener('keyup', function (ev) {
    if (ev.key == 'ArrowUp') {
        inputs['ArrowUp'] = false;
    }
    if (ev.key == 'ArrowDown') {
        inputs['ArrowDown'] = false;
    }
    if (ev.key == 'ArrowRight') {
        inputs['ArrowRight'] = false;
    }
    if (ev.key == 'ArrowLeft') {
        inputs['ArrowLeft'] = false;
    }
});