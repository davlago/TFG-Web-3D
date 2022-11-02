export default class Light {

    constructor(scene, color, intensity, distance ){
        this.light = new THREE.PointLight( color, intensity, distance );
        this.scene = scene;

    }

    setPosition(x,y,z){
        this.light.position.set( x, y, z);
    }

    setConfLight(color, intensity, distance ){
        this.light.color.setHex( color);
        this.light.intensity = intensity;
        this.light.distance = distance;
        this.light.castShadow = false; // default false
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
