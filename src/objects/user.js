export default class User {

    constructor(scene, info) {
        this.scene = scene;  
        this.info = info;     
    }

    getInfo(){
        return this.info;
    }
    
    get3DObject() {
        return this.user;
    }

}