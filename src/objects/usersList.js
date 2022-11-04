import User from "./user.js";

export default class UsersList {

    constructor(scene,data, list) {
        this.scene = scene;
        this.usersList = []
        this.objectList = []
    }

    addUser(userInfo, model) {
        let newUser = new User(this.scene, userInfo, model);
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
    }

    addUsersOnScene(){
        this.usersList.forEach((elem) =>{
            elem.setPosition(Math.random()*100, 3.5, Math.random()*100);
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