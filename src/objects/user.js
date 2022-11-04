export default class User {

    constructor(scene, info, model, pos, radius) {
        this.scene = scene;  
        this.info = info;
        this.user = model;
        let random = Math.random() * Math.random();
        let theta = 2 * Math.PI * random;
        let distance = random * radius
        let xi = pos.x + distance * Math.cos(theta)
        let yi = pos.z + distance * Math.sin(theta)
        this.setPosition(xi,0,yi);
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