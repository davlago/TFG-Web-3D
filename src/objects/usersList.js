import User from "./user.js";

export default class UsersList {

    constructor(scene, data, radius, pos) {
        this.center = pos;
        this.scene = scene;
        this.usersList = []
        this.objectList = []
        this.n_users = data["users"].length;
        this.coord = []
        this.coordCircle = [1,6, 14, 21, 29];
        this.coordAcom = [1, 7, 21, 42, 73];
        this.radius = radius;
        this.generateGeomPos();
    }

    addUser(userInfo, model) {
        console.log(this.usersList.length);
        let ranCoord= this.coord[this.usersList.length];
        console.log(ranCoord)
        let newUser = new User(this.scene, userInfo, model,ranCoord.x, ranCoord.z);
        this.objectList.push(newUser.get3DObject());
        this.usersList.push(newUser);
        this.n_users++;
    }

    generatePos(pos, radius){
        let theta = 2 * Math.PI * Math.random();
        let distance = radius * Math.random();
        let xi = pos.x + distance * Math.cos(theta)
        let zi = pos.z + distance * Math.sin(theta)

        return {"x":xi, "z": zi};
    }

    generateGeomPos(){
        let grand = 0;
        let xi, zi;
        console.log(this.coordAcom.length)
        for(let i = 0; i < this.coordAcom.length; i++){
            if(this.coordAcom[i] <= this.n_users) grand = i+1;
        }

        let radiusPart = this.radius/grand;
        console.log(grand)
        for (let i = 0; i <= grand; i++) {
            for(let j = 0; j < this.coordCircle[i]; j++){
                var theta = (j / this.coordCircle[i]) * Math.PI * 2;
                xi = this.center.x + radiusPart*i * Math.cos(theta);
                zi = this.center.z + radiusPart*i * Math.sin(theta);
                this.coord.push({"x":xi, "z": zi});
            }
        }
        console.log(this.coord)
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