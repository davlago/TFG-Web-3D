export default class User {

    constructor(scene, info, model, x, y) {
        this.scene = scene;  
        this.info = info;
        this.user = model;
        
        this.setPosition(x,0,y);
    }

    getInfo(){
        return this.info;
    }

    setPosition(x,y,z){
        this.user.position.set(x,y,z);
    }
    
    get3DObject() {
        return this.user;
    }

}