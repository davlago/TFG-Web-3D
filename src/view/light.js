import * as THREE from '../../node_modules/three/build/three.module.js';
export default class Light {

    constructor(scene){
        this.light = new THREE.PointLight( 0xffffff, 1, 100 )
        this.scene = scene;

    }

    setPosition(x,y,z){
        this.light.position.set( x, y, z);
    }

    setConfLight(color, intensity, distance ){
        this.light = new THREE.PointLight( color, intensity, distance );
        this.light.position.set( 0, 10, 0 );
        this.light.castShadow = true; // default false
    }

    get3DObject(){
        return this.light;
    }

    setHelper(num){
        this.helper = new THREE.CameraHelper( this.light.shadow.camera );
        if(num){
            this.scene.add( this.helper );
        }
        else{
            this.scene.remove( this.helper );
        }
    }

}
