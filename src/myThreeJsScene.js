import * as THREE from "../node_modules/three/src/Three.js"
const container = document.getElementById("pruebaCubo");
const scene = new THREE.Scene();
const widthSize = 850;
const heightSize = 650;
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


let translateCube = 0.1;
let rotationCube = 0.03;
function animateCube() {
    requestAnimationFrame( animateCube );

    if(cube.position.x > 9 || cube.position.y > 9){
        translateCube = -0.1;
        rotationCube = -0.02;
    }
    if(cube.position.x < -9 || cube.position.y < -9){
        translateCube = 0.1;
        rotationCube = 0.02;
    }

    cube.translateX(translateCube)
    cube.rotation.x += rotationCube;
    cube.rotation.y += rotationCube;

    renderer.render( scene, camera );
};

animateCube();

let translateSphere = 0.1;
function animateSphere() {
    requestAnimationFrame( animateSphere );
    if(sphere.position.y > 9){
        translateSphere = -0.1;
    }
    if(sphere.position.y < -9){
        translateSphere = 0.1;
    }
    sphere.translateY(translateSphere);
    renderer.render( scene, camera );
};

animateSphere();

