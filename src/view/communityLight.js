/**
 * Clase para tener las luces que se encienden al pulsar una comunidad
 */

export default class CommunityLight {

    constructor(scene, color, intensity, distance ){
        this.light = [];
        this.scene = scene;
        for(let i = 0; i< 5; i++){
            this.light.push(new THREE.PointLight( color, intensity, distance ));
        }
        this.scene = scene;
    }

    setPosition(x,y,z){
        let distance = 20;
        this.light[0].position.set( x+distance, y, z+distance);
        this.light[1].position.set( x+distance, y, z-distance);
        this.light[2].position.set( x-distance, y, z+distance);
        this.light[3].position.set( x-distance, y, z-distance);
        this.light[4].position.set( x, y-15, z);
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

}
