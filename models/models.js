import { OBJLoader } from './OBJLoader.js';

let stickman;
export default class Models {

    constructor(scene) {
        this.scene = scene; 
        loadStickMan();  
    }

    getStickMan(){
        return stickman;
    }

}

function loadStickMan(){
        const objLoader = new OBJLoader();
        objLoader.load(
            '../models/stickman.obj',
            (object) => {
                object.scale.set(0.1,0.1,0.1)
                object.position.set(0,3.5,0);
                stickman = object;
            },
            (error) => {
                console.log(error)
            }
        )
}