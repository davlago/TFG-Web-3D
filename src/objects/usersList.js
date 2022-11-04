import User from "./user.js";

export default class UsersList {

    constructor(scene, pos, data, list) {
        this.scene = scene;
        this.usersList = []
        this.objectList = []
        this.n_users;
        this.coord = []
    }

    addUser(userInfo, model, pos, radius) {
        let ranCoord=this.generatePos(pos, radius);
        this.coord.push(ranCoord);

        let newUser = new User(this.scene, userInfo, model,ranCoord.x, ranCoord.z);
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
        this.n_users++;
        console.log(this.coord);
    }

    generatePos(pos, radius){
        let theta = 2 * Math.PI * Math.random();
        let distance = radius * Math.random();
        let xi = pos.x + distance * Math.cos(theta)
        let zi = pos.z + distance * Math.sin(theta)

        return {"x":xi, "z": zi};
    }

    addUsersOnScene(){
        this.usersList.forEach((elem) =>{
            this.scene.add(elem.get3DObject());
        })
    }

    getObjectList() {
        return this.objectList;
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