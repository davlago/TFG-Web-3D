import CommunityBorder from './communityBorder.js';
import UsersList from './usersList.js';
export default class Community {

    constructor(scene, index, radius, data, xPos, yPos, zPos, models) {
        this.scene = scene;
        this.info = data["communities"][index];
        this.geometry = new THREE.CylinderGeometry( radius,radius,10, 32);
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0} );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.name = index;
        this.border = new CommunityBorder(scene, index, radius)
        this.setPosition(xPos, yPos, zPos);

        console.log(this.getPosition())
        this.userList = new UsersList(scene);
        data["communities"][index]["users"].forEach(userIndex => {
            data["users"].forEach(userInfo => {
                if(userInfo.id === userIndex){
                    this.userList.addUser(userInfo, models[0].clone(), this.getPosition(), radius);
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

    getPosition(){
        let pos ={
            "x":this.circle.position.x,
            "y":this.circle.position.y,
            "z":this.circle.position.z
        }
        return pos;
    }

    addUsersOnScene(){
        this.userList.addUsersOnScene();
    }

    getInfo(){
        return this.info;
    }

    get3DObject() {
        return this.circle;
    }

    drawBorder(){
        this.border.draw();
    }

}