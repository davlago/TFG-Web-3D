import * as THREE from "../node_modules/three/src/Three.js"
const container = document.getElementById("pruebaCubo");
const scene = new THREE.Scene();
const widthSize = 850;
const heightSize = 650;
const camera = new THREE.PerspectiveCamera( 100, widthSize/heightSize, 1, 100000 );

camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( widthSize,heightSize );
renderer.setClearColor( 0x000000, 0.5);
container.appendChild( renderer.domElement );
//LUCES
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 2, 10, 4 );
light.castShadow = true; // default false

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
scene.add( light );
//const helper = new THREE.CameraHelper( light.shadow.camera );
//scene.add( helper );


//CUBO
const geometryCube = new THREE.BoxGeometry( 3, 3, 3 );
const materialCube = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometryCube, materialCube );
cube.position.x = 1;
cube.position.y = 1;
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
scene.add( cube );

//ESFERA
const sphereGeometry = new THREE.SphereGeometry( 2, 32, 16 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );

//ANIMACIONES
let translateCube = 0.1;
let rotationCube = 0.03;
function animateSphere() {
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

let translateSphere = 0.1;
function animateCube() {
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
animateCube();


//LINEAS
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 15, 5, 0 ) );
points.push( new THREE.Vector3( 10, 15, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );

