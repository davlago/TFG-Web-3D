import CommunityBorder from './communityBorder.js';
import UsersList from './usersList.js';
export default class Community {

    constructor(scene, index, radius, data,pos, models, textureBase) {
        this.scene = scene;
        this.info = data["communities"][index];
        this.geometry = new THREE.CylinderGeometry( radius,radius,17, 32);
        this.material = new THREE.MeshPhongMaterial( { map:textureBase, transparent: true, opacity: 0} );
        this.circle = new THREE.Mesh( this.geometry, this.material );
        this.circle.name = index;
        this.border = new CommunityBorder(scene, index, radius)
        this.setPosition(pos.x, pos.y, pos.z);
        this.userList = new UsersList(scene, this.info, radius, this.getPosition());
        data["communities"][index]["users"].forEach(userIndex => {
            data["users"].forEach(userInfo => {
                if(userInfo.id === userIndex){
                        let modelNum = this.getModelNum(userInfo.explicit_community.ageGroup);
                        this.userList.addUser(userInfo, models[modelNum].clone());
                }
            })
        });

    }
    
    getModelNum(age){
        if(age === "young"){
            return 1;
        }
        else if(age ==="adult"){
            return 2;
        }
        else if(age ==="elderly"){
            return 3;
        }
        else return 0;
    }

    setPosition(x, y, z) {
        this.circle.position.x = x;
        this.circle.position.y = y;
        this.circle.position.z = z;
        this.border.setPosition(this.circle.position.x, this.circle.position.y, this.circle.position.z);
    }

    selectCommunity(){
        this.circle.material.opacity = 1;
        this.userList.selectCommunity();
    }

    unselectCommunity(){
        this.circle.material.opacity = 0;
        this.userList.unselectCommunity();
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