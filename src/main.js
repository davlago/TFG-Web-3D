import * as THREE from '../node_modules/three/build/three.module.js';
import {OrbitControls} from  './OrbitControls.js';
import Stats from '../node_modules/stats.js/src/Stats.js'

const container = document.getElementById("mainScene");
const scene = new THREE.Scene();
const widthSize = window.outerWidth;
const heightSize = window.outerHeight;

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( widthSize,heightSize );
renderer.setClearColor( 0x000000, 0.5);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

//CAMERA

const camera = new THREE.PerspectiveCamera( 100, widthSize/heightSize, 1, 100000 );

camera.position.z = 30;
camera.position.x = 50;
camera.position.y = 40;

const controls = new OrbitControls( camera, renderer.domElement );
controls.update()

//STATS
var stats = new Stats();
stats.showPanel( 0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function rendererScene() {
    stats.begin();
    renderer.render( scene, camera );
    stats.end();
    requestAnimationFrame( rendererScene );
};
rendererScene();

container.appendChild( renderer.domElement );

//LUCES
const light = new THREE.PointLight( 0xffffff, 1, 100 );
function setConfLight(){
    light.position.set( 0, 20, 0 );
    light.castShadow = true; // default false
    
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    scene.add( light );
    const helper = new THREE.CameraHelper( light.shadow.camera );
    scene.add( helper );
}
setConfLight();



function createRoom(){
    var geometry = new THREE.BoxGeometry( 50, 20, 50 );

    // material
    var material2 = new THREE.MeshPhongMaterial( {
        color: 0xffffff, 
        transparent: false,
        side: THREE.BackSide
    } );

    // mesh
    let mesh = new THREE.Mesh( geometry, material2 );
    scene.add( mesh );
}

createRoom()