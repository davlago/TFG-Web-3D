import Stats from '../node_modules/stats.js/src/Stats.js'
import Light from './view/light.js'
import Room from './objects/room.js'
import PolygonDist from './objects/polygonDist.js'
import data from '../data/data1.json' assert {type:'json'}; //READ JSON
import CommunitiesList from './objects/communitiesList.js';
import Controller from './controller/controller.js';
import Models from '../models/models.js';
import CommunityLight from './view/communityLight.js';
import Textures from '../textures/textures.js'

const container = document.getElementById("mainScene");
const scene = new THREE.Scene();


//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.outerWidth,window.outerHeight );
renderer.setClearColor( 0x64B5F6, 1);
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

//CARGAR IMAGENES Y MODELOS
let models = new Models();
models.loadStickMan();

let textures = new Textures();
textures.loadTextures();

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
const room = new Room(scene, textures.getWindowOpen(), textures.getWindowClose(), textures.getWood());
const roomSize ={
    x:200,
    y:50,
    z:200
}
function createRoom(){
    room.setSize(roomSize.x*1.25,roomSize.y,roomSize.z*1.25);
    room.setPosition(0,roomSize.y/2,0);
    scene.add(room.get3DObject());
}

//LUCES
let light = new Light(scene,0xffffff, 1, 250 );
let communityLight = new CommunityLight(scene,0xffffff, 0, 200 )
light.setPosition(0, roomSize.y*0.9, 0); //x, y, z


//POLIGONO DE DISTRIBUCIÓN
const polygonDist = new PolygonDist(scene, data["communities"].length, roomSize.x/2.8)

//COMUNIDADES
let communitiesList = new CommunitiesList(scene, textures.getWood());
function createCommunities(models){
    let cont = 0;
    data["communities"].forEach(comm => {
        let pos = {
            "x" : polygonDist.getOneVertex(cont).x,
            "y" : 1,
            "z" :polygonDist.getOneVertex(cont).z
        }
    
        communitiesList.addCommunity(models,cont, data,pos)
        cont++;
    });
    communitiesList.addCommunityOnScene();
    communitiesList.drawBorders();
}

//INTERACCION CON OBJETOS
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var newDist = [];

let commSelected = null;

let userSelected = null;

window.addEventListener('mousedown', onDocumentMouseDown, false);
function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    let intersectsC = raycaster.intersectObjects(communitiesList.getObjectList());
    if (controller.getCameraInfo() !== "community" && intersectsC.length > 0) {
        commSelected = intersectsC[0].object.name;
        controller.setCommunityCamera();
        let coord = polygonDist.getOneVertex(parseInt(commSelected));
        newDist = [-coord.x, roomSize.y/2, -coord.z];
        moveCamera();
        changeBox(commSelected);
        communityLight.setPosition(coord.x, roomSize.y*0.25, coord.z); //x, y, z
        communityLight.setConfLight(0xba8083, 0.5, 75); //x, y, z
        communitiesList.selectCommunity(parseInt(commSelected));

    }
    else if(controller.getCameraInfo() === "community"){
        let userArray = communitiesList.getOneCommunityInfo(commSelected).userList.getObjectList();
        let intersectsU = raycaster.intersectObjects(userArray);
        let first = false;
        if (intersectsU.length > 0){
            if(userSelected !== null){
                communitiesList.getOneCommunityInfo(commSelected).userList.unselectOneUser(userSelected)
            }
            else{
                first = true
            }
            if(userSelected !== intersectsU[0].object.parent.name){
                userSelected = intersectsU[0].object.parent.name;
                changeUser(communitiesList.getOneCommunityInfo(commSelected).userList.getOneUserInfo(userSelected).info, first)
                communitiesList.getOneCommunityInfo(commSelected).userList.selectOneUser(userSelected)
            }
            else{
                userSelected = null;
                changeUser(null, true)  //true para que simule click y esconda la informacion del usuario
            }

        }
    }
}



function defaultView(noSelect){
    if(!noSelect){
        communitiesList.unselectCommunity(parseInt(commSelected));
        if(userSelected !== null){
            communitiesList.getOneCommunityInfo(commSelected).userList.unselectOneUser(userSelected)
        }
        newDist = [0,0,0];
        controller.setDefaultCamera();
        moveCamera();
        communityLight.setConfLight(0xffffff, 0, 0); //x, y, z
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
        positive = Math.abs(0.99); 
    }
    else{         
        positive = Math.abs(1.01); 
    }
    //Moving camera.
    camera.position.x *= positive;
    camera.position.y *= positive;
    camera.position.z *= positive;
    console.log(controller.getDistance())
    if(controller.getDistance() > 109 && controller.getCameraInfo()=== "default"){
        cancelAnimationFrame(moveCamera);
    }
    else if(controller.getDistance() <80 && controller.getCameraInfo()=== "community"){
        cancelAnimationFrame(moveCamera);
    }
    else{
        requestAnimationFrame(moveCamera);
    }
}



function createScenary(){
    console.log("empiezo")
    createRoom();
    light.addToScene();
    communityLight.addToScene();
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
        document.getElementById("xcross").className = "smallXIcon myShow";
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
        document.getElementById("xcross").className = "smallXIcon myShow";
  
        setTimeout(() => {changeShow(communitySelect)}, 300);
    }
    else{
        document.getElementById("info-box").className = "info retract";
        document.getElementById("icross").className = "smalliIcon myShow"
        document.getElementById("xcross").className = "smallXIcon hide";
        changeShow();
        if(userSelected !== null) changeUser(null, true);
    }
}

//CAMBIAR INFO
function changeShow(communitySelect = null){
    if(communitySelect !== null || communitySelect === -1){
        document.getElementById("community-title").className = "myShow";
        document.getElementById("community-nUsers-row").className = "data row myShow";
        document.getElementById("community-explanation-row").className = "data row myShow";
        document.getElementById("community-type-row").className = "data row myShow";
    }
    else{
        document.getElementById("community-title").className = "hide";
        document.getElementById("community-type-row").className = "data row hide";
        document.getElementById("community-explanation-row").className = "data row hide";
        document.getElementById("community-nUsers-row").className = "data row hide";
    }
}

function changeUser(userInfo = null, first){
    if(first) document.getElementById("botonSimulado").click()
    if(userInfo !== null){
        document.getElementById("raya").className = "hr1 myShow"
        document.getElementById("user-id-row").className = "data row myShow";
        document.getElementById("user-age-row").className = "data row myShow";
        document.getElementById("user-language-row").className = "data row myShow";
        document.getElementById("user-id").innerHTML = userInfo.id;
        document.getElementById("user-age").innerHTML = userInfo.explicit_community.ageGroup;
        document.getElementById("user-language").innerHTML = userInfo.explicit_community.language;

    }
    else{
        document.getElementById("raya").className = "hr1 hide"
        document.getElementById("user-id-row").className = "data row hide"
        document.getElementById("user-age-row").className = "data row hide"
        document.getElementById("user-language-row").className = "data row hide"
    }
}

document.getElementById("xcross").addEventListener('mouseup', () =>{
    if(controller.getCameraInfo()=== "community"){
        defaultView(false);  
    }
    else{
        defaultView(true);  
    }
    commSelected = null;
    userSelected = null;
})

document.getElementById("icross").addEventListener('click', () =>{
    changeBox(-1);
    
})

