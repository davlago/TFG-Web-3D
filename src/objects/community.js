import CommunityBorder from './communityBorder.js';
import UsersList from './usersList.js';
export default class Community {

    constructor(scene, index, radius, data) {
        this.scene = scene;
        this.geometry = new THREE.CylinderGeometry( radius,radius,10, 32);
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0} );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.name = "Área "+index;

        this.border = new CommunityBorder(scene, index, radius)
        this.border.setPosition(this.circle.position.x, this.circle.position.y, this.circle.position.z);

        this.userList = new UsersList(scene);
        data["communities"][index]["users"].forEach(userIndex => {
            data["users"].forEach(userInfo => {
                if(userInfo.id === userIndex){
                    this.userList.addUser(userInfo);
                }
            })
        });

    }

    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
        this.border.setPosition(this.circle.position.x, this.circle.position.y, this.circle.position.z);
    }

    get3DObject() {
        return this.circle;
    }

    drawBorder(){
        this.border.draw();
    }

}