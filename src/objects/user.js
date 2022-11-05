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

    selectUser(){
        this.user.position.y += 10;
    }

    unselectUser(){
        this.user.position.y -=10;
    }
    
    get3DObject() {
        return this.user;
    }


}