
import {OrbitControls} from  './controller/OrbitControls.js';
import Stats from '../../node_modules/stats.js/src/Stats.js'
import Light from './view/light.js'

const container = document.getElementById("mainScene");
const scene = new THREE.Scene();
const widthSize = window.outerWidth;
const heightSize = window.outerHeight;

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( widthSize,heightSize );
renderer.setClearColor( 0x000000, 0.5);
renderer.shadowMap.enabled = true;

//CAMERA

const camera = new THREE.PerspectiveCamera( 100, widthSize/heightSize, 1, 1000 );

//CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 50 //min zoom
controls.maxDistance = 100 //max zoom
controls.maxPolarAngle = 1.5
controls.update()

//STATS
var stats = new Stats();
stats.showPanel( 0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//RENDERER FUNCTION
function rendererScene() {
    stats.begin();
    renderer.render( scene, camera );
    stats.end();
    requestAnimationFrame( rendererScene );
};
rendererScene();

container.appendChild( renderer.domElement );

//LUCES
let light = new Light(scene);
light.setConfLight( 0xffffff, 1, 100 )
scene.add(light.get3DObject())
light.setHelper(true)


function createRoom(){
    var geometry = new THREE.BoxGeometry( 50, 25, 50 );

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