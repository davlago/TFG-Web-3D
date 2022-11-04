export default class User {

    constructor(scene, info, model, index, x, y) {
        this.scene = scene;  
        this.info = info;
        this.user = model;
        this.user.name = index;
        
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