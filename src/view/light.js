export default class Light {

    constructor(scene, color, intensity, distance ){
        this.light = [];
        this.scene = scene;
        for(let i = 0; i< 4; i++){
            this.light.push(new THREE.PointLight( color, intensity, distance ));
        }

    }

    setPosition(x,y,z){
        let distance = 75;
        this.light[0].position.set( x+distance, y, z+distance);
        this.light[1].position.set( x+distance, y, z-distance);
        this.light[2].position.set( x-distance, y, z+distance);
        this.light[3].position.set( x-distance, y, z-distance);
        
    }

    setConfLight(color, intensity, distance ){
        this.light.forEach((light)=>{
            light.color.setHex( color);
            light.intensity = intensity;
            light.distance = distance;
            light.castShadow = false; // default false
        })
    }

    addToScene(){
        this.light.forEach((light)=>{
            this.scene.add(light);
        })
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
