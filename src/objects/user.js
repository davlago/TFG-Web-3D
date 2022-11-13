export default class User {

    constructor(scene, info, model, index, x, y) {
        this.scene = scene;  
        this.info = info;
        this.ball = this.createBall();
        this.user = model;
        this.user.name = index;
        
        this.setPosition(x,0,y);
    }

    getInfo(){
        return this.info;
    }

    createBall(){
        const geometry = new THREE.CircleGeometry( 3, 32);
        const material = new THREE.MeshBasicMaterial( { color: this.getColor(this.info.explicit_community.language) } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.rotateX(-Math.PI/2)
        return mesh
    }

    getColor(leng){
        if(leng === "EN"){
            return 0xff0000;
        }
        else if(leng ==="ES"){
            return 0x00ff00;
        }
        else if(leng ==="FI"){
            return 0x0000ff;
        }
        else if(leng ==="HE"){
            return 0xffff00;
        }
        else if(leng ==="IT"){
            return 0x00ffff;
        }
        else return 0xffffff;
    }

    setPosition(x,y,z){
        this.user.position.set(x,y,z);
        let tam = this.getTam(this.info.explicit_community.ageGroup);
        this.ball.position.set(x,y+0.1,z);
    }

    getTam(age){
        if(age === "young"){
            return 12;
        }
        else if(age ==="adult"){
            return 14;
        }
        else if(age ==="elderly"){
            return 11;
        }
        else return 11;
    }

    selectUser(){
        this.user.position.y += 10;
        this.ball.position.y += 10;
    }

    unselectUser(){
        this.user.position.y -=10;
        this.ball.position.y -= 10;
    }
    
    get3DObject() {
        return this.user;
    }

    getBall3DObject(){
        return this.ball;
    }


}