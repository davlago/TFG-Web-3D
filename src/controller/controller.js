import {OrbitControls} from  './OrbitControls.js';

export default class Community {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.cameraInfo = "default";
        this.controls = new OrbitControls( camera, renderer );
    }

    setDefaultCamera(){
        this.controls.minDistance = 100 //min zoom
        this.controls.maxDistance = 150 //max zoom
        this.controls.maxPolarAngle = 0.9 //max angle      
        this.controls.update()
        this.cameraInfo = "default";
    }

    setCommunityCamera(){
        console.log(this.scene);
        this.controls.minDistance = 50 //min zoom
        this.controls.maxDistance = 100 //max zoom
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

    update() {
        this.controls.update()
    }
}