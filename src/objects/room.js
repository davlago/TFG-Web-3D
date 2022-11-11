export default class Room {

    constructor(scene, textureWallOpen, textureWallClose, textureFloor){
        this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
        this.scene = scene;
        this.cubeMaterialArray = [];
        this.loadTextures(textureWallOpen,textureWallClose, textureFloor);
        this.mesh = new THREE.Mesh( this.geometry, this.cubeMaterialArray);
        this.mesh.name = "Room"
    }

    setSize(x,y,z){
        this.mesh.geometry = new THREE.BoxGeometry( x, y, z );
    }

    loadTextures(textureWallOpen,textureWallClose, textureFloor){
        /*Order:
            Walls: 1,2,5,6
            Ceiling and floor: 3,4 
        */

        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallClose, transparent: false,side: THREE.BackSide} ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallClose, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureFloor, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureFloor, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallOpen, transparent: false,side: THREE.BackSide } ) );
        this.cubeMaterialArray.push( new THREE.MeshStandardMaterial( { map: textureWallOpen, transparent: false,side: THREE.BackSide } ) );
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
