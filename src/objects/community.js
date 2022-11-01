export default class Community {

    constructor(scene, index, radius) {
        this.scene = scene;
        this.geometry = new THREE.CylinderGeometry( radius,radius,10, 32);
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0} );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.name = index;
    }

    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
    }

    get3DObject() {
        return this.circle;
    }

}