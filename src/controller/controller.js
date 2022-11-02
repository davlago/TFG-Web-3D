import {OrbitControls} from  './OrbitControls.js';

export default class Community {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.controls = new OrbitControls( camera, renderer );
    }

    setDefaultCamera(){
        this.scene.position.set(0, 0, 0);
        this.camera.position.set(50,40,50);
        this.controls.minDistance = 100 //min zoom
        this.controls.maxDistance = 200 //max zoom
        this.controls.maxPolarAngle = 1.5 //max angle      
        this.controls.update()
    }

    setCommunityCamera(community){
        this.scene.position.set(-community.x, 0, -community.z);
        this.camera.position.set(20,25,20);
        this.controls.minDistance = 20 //min zoom
        this.controls.maxDistance = 50 //max zoom
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