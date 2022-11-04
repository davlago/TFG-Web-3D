export default class User {

    constructor(scene, info, x,y,z) {
        this.scene = scene;  
        this.info = info;
    }

    getInfo(){
        return this.info;
    }

    setPosition(x,y,z){
        this.user.setPosition(x,y,z);
    }
    
    get3DObject() {
        return this.user;
    }

}