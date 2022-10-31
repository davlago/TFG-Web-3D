import {OrbitControls} from  './controller/OrbitControls.js';
import Stats from '../../node_modules/stats.js/src/Stats.js'
import Light from './view/light.js'
import Room from './objects/room.js'
import PolygonDist from './objects/polygonDist.js'
import Community from './objects/community.js';

import data from '../data/data1.json' assert {type:'json'}; //READ JSON


const container = document.getElementById("mainScene");
const scene = new THREE.Scene();


//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.outerWidth,window.outerHeight );
renderer.setClearColor( 0x000000, 0.5);
renderer.shadowMap.enabled = true;


//CAMERA
const camera = new THREE.PerspectiveCamera( 100, window.outerWidth/window.outerHeight, 1, 1000 );


//CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 100 //min zoom
controls.maxDistance = 200 //max zoom
controls.maxPolarAngle = 1.5 //max angle
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


//ADD TO HTML
container.appendChild( renderer.domElement );


//PRINCIPAL ROOM
const room = new Room(scene);
const roomSize ={
    x:130,
    y:50,
    z:130
}
room.setSize(roomSize.x,roomSize.y,roomSize.z);
room.setPosition(0,roomSize.y/2,0);
scene.add(room.get3DObject());


//LUCES
let light = new Light(scene);
light.setConfLight(0xffffff, 2, 120 ); //color, intensidad, distancia
light.setPosition(0, roomSize.y*0.9, 0); //x, y, z
scene.add(light.get3DObject());


//POLIGONO DE DISTRIBUCIÓN
const polygonDist = new PolygonDist(scene, data["communities"].length, roomSize.x/3)
scene.add( polygonDist.get3DObject());

//COMUNIDADES
for(let i = 0; i < data["communities"].length; i++){
    let community = new Community(scene, data["communities"][i]["users"].length*0.5)
    community.setPosition(polygonDist.getOneVertex(i).x,10,polygonDist.getOneVertex(i).z);
    scene.add( community.get3DObject() );
}
