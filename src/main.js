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
    x:200,
    y:50,
    z:200
}
room.setSize(roomSize.x,roomSize.y,roomSize.z);
room.setPosition(0,roomSize.y/2,0);
scene.add(room.get3DObject());


//LUCES
let light = new Light(scene,0xffffff, 2, 200 );
light.setPosition(0, roomSize.y*0.9, 0); //x, y, z
scene.add(light.get3DObject());


//POLIGONO DE DISTRIBUCIÓN
const polygonDist = new PolygonDist(scene, data["communities"].length, roomSize.x/3.5)
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
var newDist = [];

window.addEventListener('click', onDocumentMouseDown, false);
function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(communitiesList.getObjectList());
    if ( intersects.length > 0 ) {
        let coord = polygonDist.getOneVertex(parseInt(intersects[0].object.name));
        newDist = [-coord.x, roomSize.y/2, -coord.z];
        changeBox(intersects[0].object.name);
        controller.setCommunityCamera();
        light.setPosition(coord.x, roomSize.y*0.5, coord.z); //x, y, z
        light.setConfLight(0xba8083, 3, 100); //x, y, z
    }
}
function moveCamera(){
    console.log(newDist)
    if(scene.position.x > newDist[0]){
        scene.position.x -= 3;
    }
    if(scene.position.x < newDist[0]){
        scene.position.x += 3;
    }
    if(scene.position.y > newDist[1]){
        scene.position.y -= 3;
    }
    if(scene.position.y < newDist[1]){
        scene.position.y += 3;
    }
    if(scene.position.z > newDist[2]){
        scene.position.z -= 3;
    }
    if(scene.position.z < newDist[2]){
        scene.position.z += 3;
    }
    
    requestAnimationFrame(moveCamera);
}
moveCamera();


//CAMBIAR CAJA
function changeBox(commIndex = null){
    let communitySelect = communitiesList.getOneCommunityInfo(parseInt(commIndex));
    if(commIndex !== null){
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").innerHTML = communitySelect.getInfo()["name"];
        document.getElementById("community-type").innerHTML = communitySelect.getInfo()["community-type"];
        document.getElementById("community-explanation").innerHTML = communitySelect.getInfo()["explanation"];
        document.getElementById("community-nUsers").innerHTML =communitySelect.getInfo()["users"].length;
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon show";
        document.getElementById("xcross").disabled = false;
        setTimeout(() => {changeShow(communitySelect)}, 300);
    }
    else{
        document.getElementById("info-box").className = "info retract";
        document.getElementById("icross").className = "smalliIcon show"
        document.getElementById("xcross").className = "smallXIcon hide";
        document.getElementById("xcross").disabled = true;
        changeShow();
    }
}

//CAMBIAR INFO
function changeShow(communitySelect = null){
    if(communitySelect !== null){
        document.getElementById("community-title").className = "show"
        document.getElementById("community-nUsers-row").className = "data row show"
        document.getElementById("community-explanation-row").className = "data row show"
        document.getElementById("community-type-row").className = "data row show"
    }
    else{
        document.getElementById("community-title").className = "hide"
        document.getElementById("community-type-row").className = "data row hide"
        document.getElementById("community-explanation-row").className = "data row hide"
        document.getElementById("community-nUsers-row").className = "data row hide"
    }
}

document.getElementById("xcross").addEventListener('click', () =>{
    changeBox();
    newDist = [0,-roomSize.y/10,0];
    controller.setDefaultCamera();
    light.setPosition(0, roomSize.y*0.9, 0); //x, y, z
    light.setConfLight(0xffffff, 2, 200); //x, y, z
    this.camera.position.set(20,25,20);
})
