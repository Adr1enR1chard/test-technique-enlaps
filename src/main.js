import * as THREE from 'three';

/****************/
/*Scene defaults*/
/****************/
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(900, 600);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, 900 / 600);

renderer.render(scene, camera);