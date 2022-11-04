import User from "./user.js";

export default class UsersList {

    constructor(scene, pos, data, list) {
        this.scene = scene;
        this.usersList = []
        this.objectList = []
    }

    addUser(userInfo, model, pos, radius) {
        
        let theta = 2 * Math.PI * Math.random();
        let distance = radius * Math.random();
        let xi = pos.x + distance * Math.cos(theta)
        let yi = pos.z + distance * Math.sin(theta)

        let newUser = new User(this.scene, userInfo, model,xi, yi);
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
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