import {OrbitControls} from  './OrbitControls.js';

export default class Community {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.cameraInfo = "default";
        this.controls = new OrbitControls( camera, renderer );
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            // RIGHT: THREE.MOUSE.PAN
        }

    }

    setDefaultCamera(){
        this.controls.minDistance = 80 //min zoom
        this.controls.maxDistance = 120 //max zoom
        this.controls.maxPolarAngle = 0.9 //max angle      
        this.controls.update()
        this.cameraInfo = "default";
    }

    setCommunityCamera(){
        this.controls.minDistance = 80 //min zoom
        this.controls.maxDistance = 120 //max zoom
        this.controls.maxPolarAngle = 0.9 //max angle      
        this.controls.update()
        this.cameraInfo = "community";
    }

    setMinMaxDistance(min, max) {
        this.controls.minDistance = min //min zoom
        this.controls.maxDistance = max //max zoom
        this.controls.update()
    }

    setMinMaxPolarAngle(min, max){
        this.controls.mixPolarAngle = min //min angle
        this.controls.maxPolarAngle = max //max angle
        this.controls.update()
    }

    getCameraInfo(){
        return this.cameraInfo;
    }

    getDistance(){
        return this.controls.getDistance();
    }

    target(vector){
        this.controls.target = vector;
    }

    update() {
        this.controls.update()
    }
}