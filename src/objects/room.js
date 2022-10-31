export default class Room {

    constructor(scene){
        this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        this.scene = scene;

        this.material = new THREE.MeshPhongMaterial( {
            color: 0xffffff, 
            transparent: false,
            side: THREE.BackSide
        } );

        this.mesh = new THREE.Mesh( this.geometry, this.material);
    }

    setSize(x,y,z){
        this.mesh.geometry = new THREE.BoxGeometry( x, y, z );
    }

    setPosition(x,y,z){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    get3DObject(){
        return this.mesh;
    }

}
