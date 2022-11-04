import User from "./user.js";

export default class UsersList {

    constructor(scene, pos, data, list) {
        this.scene = scene;
        this.usersList = []
        this.objectList = []
    }

    addUser(userInfo, model, pos, radius) {
        let newUser = new User(this.scene, userInfo, model,pos, radius);
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