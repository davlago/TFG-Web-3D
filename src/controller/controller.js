import {OrbitControls} from  './OrbitControls.js';

export default class Community {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.controls = new OrbitControls( camera, renderer );
    }

    setDefaultCamera(){
        this.controls.minDistance = 100 //min zoom
        this.controls.maxDistance = 200 //max zoom
        this.controls.maxPolarAngle = 1.5 //max angle      
        this.controls.update()
    }

    setCommunityCamera(){
        this.controls.minDistance = 50 //min zoom
        this.controls.maxDistance = 100 //max zoom
        this.controls.maxPolarAngle = 1.5 //max angle      
        this.controls.update()
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

    update() {
        this.controls.update()
    }
}