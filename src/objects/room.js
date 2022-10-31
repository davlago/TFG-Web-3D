export default class Room {

    constructor(scene, x, y, z){
        this.geometry = new THREE.BoxGeometry( x, y, z );
        this.scene = scene;

        this.material = new THREE.MeshPhongMaterial( {
            color: 0xffffff, 
            transparent: false,
            side: THREE.BackSide
        } );
    }

    get3DObject(){
        return new THREE.Mesh( this.geometry, this.material);
    }

}
