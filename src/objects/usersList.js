import User from "./user.js";
const coordCircle = [1,6, 14, 21, 29];
const coordAcom = [1, 7, 21, 42, 73];
export default class UsersList {

    constructor(scene, data, radius, pos) {
        this.center = pos;
        this.scene = scene;
        this.usersList = []
        this.objectList = []
        this.n_users = data["users"].length;
        this.coord = []
        this.group = new THREE.Group();
        this.radius = radius;
        this.generateGeomPos();
    }

    addUser(userInfo, model) {
<<<<<<< HEAD
        let ranCoord= this.coord[this.usersList.length];
        let newUser = new User(this.scene, userInfo, model,ranCoord.x, ranCoord.z);
        this.group.add(newUser.get3DObject());
=======
        let index = this.usersList.length;
        let ranCoord= this.coord[this.usersList.length];
        let newUser = new User(this.scene, userInfo, model, index, ranCoord.x, ranCoord.z);
>>>>>>> interaccion-individuos
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
    }

    getGroup(){
        return this.group;
    }

    generateGeomPos(){
        let grand = 0;
        let xi, zi;
        for(let i = 0; i < coordAcom.length; i++){
            if(coordAcom[i] >= this.n_users){
                grand = i;
                break;
            }
        }
        if(grand === 0) grand = 1;
        let radiusPart = this.radius/grand;
        for (let i = 0; i <= grand; i++) {
            for(let j = 0; j < this.coordCircle[i]; j++){
                let theta = (j / this.coordCircle[i]) * Math.PI * 2;
                xi = this.center.x + radiusPart*i * Math.cos(theta);
                zi = this.center.z + radiusPart*i * Math.sin(theta);
                this.coord.push({"x":xi, "z": zi});
            }
        }
    }

    addUsersOnScene(){
        this.usersList.forEach((elem) =>{
            this.scene.add(elem.get3DObject());
        })
    }

    getObjectList() {
        return this.objectList;
    }

    selectCommunity(){
        this.usersList.forEach((user)=>{
            user.selectUser();
        });
    }

    unselectCommunity(){
        this.usersList.forEach((user)=>{
            user.unselectUser();
        });
    }


    getInfoList(){
        return this.usersList;
    }

    getOneUserObject(index) {
        return this.objectList[index];
    }

    getOneUserInfo(index) {
        return this.usersList[index];
    }

}