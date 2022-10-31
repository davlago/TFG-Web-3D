export default class Community {

    constructor(scene, radius) {
        this.scene = scene;
        this.geometry = new THREE.CircleGeometry( radius, 32);
        //this.edges = new THREE.EdgesGeometry( this.geometry );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        //this.circle = new THREE.LineSegments( this.edges, this.material );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.rotation.x = Math.PI / 2;
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