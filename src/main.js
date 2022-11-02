import Stats from '../../node_modules/stats.js/src/Stats.js'
import Light from './view/light.js'
import Room from './objects/room.js'
import PolygonDist from './objects/polygonDist.js'
import data from '../data/data1.json' assert {type:'json'}; //READ JSON
import CommunitiesList from './objects/CommunitiesList.js';
import Controller from './controller/controller.js';
const container = document.getElementById("mainScene");
const scene = new THREE.Scene();
var expanded = false;


//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.outerWidth,window.outerHeight );
renderer.setClearColor( 0x000000, 0.5);
renderer.shadowMap.enabled = true;


//CAMERA
const camera = new THREE.PerspectiveCamera( 100, window.outerWidth/window.outerHeight, 1, 1000 );

//CONTROLS
const controller = new Controller(scene, camera, renderer.domElement );
controller.setDefaultCamera();



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
let communitiesList = new CommunitiesList(scene);
let cont = 0;
data["communities"].forEach(comm => {
    let xPos = polygonDist.getOneVertex(cont).x;
    let yPos = 1;
    let zPos = polygonDist.getOneVertex(cont).z;

    communitiesList.addCommunity(cont, data, xPos , yPos, zPos)
    scene.add(communitiesList.getOneCommunityObject(cont));
    cont++;
});
communitiesList.drawBorders();

//INTERACCION CON OBJETOS
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener('click', onDocumentMouseDown, false);
function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(communitiesList.getObjectList());
    if ( intersects.length > 0 ) {
        changeBox(intersects[0].object.name);
        controller.setCommunityCamera(polygonDist.getOneVertex(parseInt(intersects[0].object.name)));
    }
    else{
        controller.setDefaultCamera()
    }
}


//CAMBIAR CAJA
function changeBox(commIndex){
    let communitySelect = communitiesList.getOneCommunityInfo(parseInt(commIndex));
    
    if(!expanded){
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").innerHTML = "";
        setTimeout(() => {changeInfo(communitySelect)}, 300);
    }
    else{
        document.getElementById("info-box").className = "info retract";
        changeInfo();
    }
}

//CAMBIAR INFO
function changeInfo(communitySelect = null){
    if(!expanded){
        document.getElementById("community-title").innerHTML = communitySelect.getInfo()["name"];
        document.getElementById("community-type").innerHTML = "<h3>Type:</h3>"  + communitySelect.getInfo()["community-type"];
        document.getElementById("community-explanation").innerHTML = "<h3>Explanation:</h3>"  + communitySelect.getInfo()["explanation"];
        document.getElementById("community-nUsers").innerHTML = "<h3>Number of Users:</h3>"  +communitySelect.getInfo()["users"].length;
        expanded = true;
    }
    else{
        document.getElementById("community-title").innerHTML = "i";
        document.getElementById("community-type").innerHTML = "";
        document.getElementById("community-explanation").innerHTML = "";
        document.getElementById("community-nUsers").innerHTML = "";
        expanded = false;
    }
}

