import * as THREE from "./node_modules/three/src/Three.js"
const container = document.getElementById("pruebaCubo");
const scene = new THREE.Scene();
const widthSize = 1080;
const heightSize = 850;
const camera = new THREE.PerspectiveCamera( 75, widthSize/heightSize, 0.1, 1000 );

camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( widthSize,heightSize );
container.appendChild( renderer.domElement );

const geometryCube = new THREE.BoxGeometry( 3, 3, 3 );
const materialCube = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometryCube, materialCube );
cube.position.x = 1;
cube.position.y = 1;
scene.add( cube );

const geometryCircle = new THREE.SphereGeometry( 2, 32, 16 );
const materialCircle = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometryCircle, materialCircle );
sphere.position.x = 1;
sphere.position.y = 5;
scene.add( sphere );



function animateCube() {
    requestAnimationFrame( animateCube );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animateCube();

var subir = true;
function animateSphere() {
    requestAnimationFrame( animateSphere );

    if(subir){
        sphere.position.y += 0.1;
    }
    if(!subir){
        sphere.position.y -= 0.1;
    }
    if(sphere.position.y > 12){
        subir = false;
    }
    if(sphere.position.y < -12){
        subir = !subir;
    }
    renderer.render( scene, camera );
};

animateSphere();

