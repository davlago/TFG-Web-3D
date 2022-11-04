import Stats from '../node_modules/stats.js/src/Stats.js'
import Light from './view/light.js'
import Room from './objects/room.js'
import PolygonDist from './objects/polygonDist.js'
import data from '../data/data1.json' assert {type:'json'}; //READ JSON
import CommunitiesList from './objects/CommunitiesList.js';
import Controller from './controller/controller.js';
import Models from '../models/models.js';

const container = document.getElementById("mainScene");
const scene = new THREE.Scene();
var commSelected = null;


//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.outerWidth,window.outerHeight );
renderer.setClearColor( 0x000000, 1);
renderer.shadowMap.enabled = true;


//CAMERA
const camera = new THREE.PerspectiveCamera( 100, window.outerWidth/window.outerHeight, 1, 1000 );
camera.position.set(10,100,10);

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
    controller.update();

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
function createRoom(){
    room.setSize(roomSize.x,roomSize.y,roomSize.z);
    room.setPosition(0,roomSize.y/2,0);
    scene.add(room.get3DObject());
}

//LUCES
let light = new Light(scene,0xffffff, 2, 200 );
light.setPosition(0, roomSize.y*0.9, 0); //x, y, z


//POLIGONO DE DISTRIBUCIÓN
const polygonDist = new PolygonDist(scene, data["communities"].length, roomSize.x/3.5)

//COMUNIDADES
let communitiesList = new CommunitiesList(scene);
function createCommunities(models){
    let cont = 0;
    data["communities"].forEach(comm => {
        let xPos = polygonDist.getOneVertex(cont).x;
        let yPos = 1;
        let zPos = polygonDist.getOneVertex(cont).z;
    
        communitiesList.addCommunity(models,cont, data, xPos , yPos, zPos)
        cont++;
    });
    communitiesList.addCommunityOnScene();
    communitiesList.drawBorders();
}

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
    var intersectsC = raycaster.intersectObjects(communitiesList.getObjectList());
    if (intersectsC.length > 0 && controller.getCameraInfo() !== "community") {
        commSelected = intersectsC[0].object.name;
        controller.setCommunityCamera();
        let coord = polygonDist.getOneVertex(parseInt(commSelected));
        newDist = [-coord.x, roomSize.y/2, -coord.z];
        moveCamera();
        changeBox(commSelected);
        light.setPosition(coord.x, roomSize.y*0.5, coord.z); //x, y, z
        light.setConfLight(0xba8083, 3, 100); //x, y, z
        moveCamera();
    }
    else if(controller.getCameraInfo() === "community"){
        var userArray = communitiesList.getOneCommunityInfo(commSelected).userList.getObjectList();
        var intersectsU = raycaster.intersectObjects(userArray);
        if (intersectsU.length > 0){
            console.log(intersectsU)
        }
    }
}

function defaultView(noSelect){
    if(!noSelect){
        controller.setDefaultCamera();
        newDist = [0,0,0];
        moveCamera();
        light.setPosition(0, roomSize.y*0.9, 0); //x, y, z
        light.setConfLight(0xffffff, 2, 200); //x, y, z
    }
    changeBox();
}

function moveScene(){
    if(scene.position.x > newDist[0]){
        scene.position.x -= 2;
    }
    if(scene.position.x < newDist[0]){
        scene.position.x += 2;
    }
    if(scene.position.y > newDist[1]){
        scene.position.y -= 2;
    }
    if(scene.position.y < newDist[1]){
        scene.position.y += 2;
    }
    if(scene.position.z > newDist[2]){
        scene.position.z -= 2;
    }
    if(scene.position.z < newDist[2]){
        scene.position.z += 2;
    }
    requestAnimationFrame(moveScene);
}

moveScene();

function moveCamera(){
    let positive;
    if(controller.getCameraInfo()=== "community"){
        positive = Math.abs(0.98); 
    }
    else{         
        positive = Math.abs(1.02); 
    }
    //Moving camera.
    camera.position.x *= positive;
    camera.position.y *= positive;
    camera.position.z *= positive;
    if(controller.getDistance() > 99 || controller.getDistance() < 61){
        cancelAnimationFrame(moveCamera)
    }
    else{
        requestAnimationFrame(moveCamera);
    }
}

let models = new Models();
models.loadStickMan();

function createScenary(){
    console.log("empiezo")
    createRoom();
    scene.add(light.get3DObject());
    scene.add( polygonDist.get3DObject());
    let arrayModels = [models.getStickMan()];
    createCommunities(arrayModels);
}
setTimeout(()=>{createScenary();},2000);
/*--------------------------------------------------------------------
-----------------------CAMBIOS EN HTML--------------------------------
--------------------------------------------------------------------*/

//CAMBIAR CAJA
function changeBox(commIndex = null){
    let communitySelect = communitiesList.getOneCommunityInfo(parseInt(commIndex));
    if(commIndex === -1){
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").innerHTML = "No community selected"
        document.getElementById("community-type").innerHTML = "";
        document.getElementById("community-explanation").innerHTML = "";
        document.getElementById("community-nUsers").innerHTML = "";
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon show";
        communitySelect = -1
        setTimeout(() => {changeShow(communitySelect)}, 300);
    }
    else if(commIndex !== null){
        document.getElementById("info-box").className = "info expand";
        document.getElementById("community-title").innerHTML = communitySelect.getInfo()["name"];
        document.getElementById("community-type").innerHTML = communitySelect.getInfo()["community-type"];
        document.getElementById("community-explanation").innerHTML = communitySelect.getInfo()["explanation"];
        document.getElementById("community-nUsers").innerHTML =communitySelect.getInfo()["users"].length;
        document.getElementById("icross").className = "smalliIcon hide";
        document.getElementById("xcross").className = "smallXIcon show";
  
        setTimeout(() => {changeShow(communitySelect)}, 300);
    }
    else{
        document.getElementById("info-box").className = "info retract";
        document.getElementById("icross").className = "smalliIcon show"
        document.getElementById("xcross").className = "smallXIcon hide";
        changeShow();
    }
}

//CAMBIAR INFO
function changeShow(communitySelect = null){
    if(communitySelect !== null || communitySelect === -1){
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
    if(controller.getCameraInfo()=== "community"){
        defaultView(false);  
    }
    else{
        defaultView(true);  
    }
 
})

document.getElementById("icross").addEventListener('click', () =>{
    changeBox(-1);
    
})

