import User from "./user.js";

export default class UsersList {

    constructor(scene,data, list) {
        this.scene = scene;
        this.usersList = []
        this.objectList = []
    }

    addUser(userInfo) {
        let newUser = new User(this.scene, userInfo);
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
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