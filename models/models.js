import { OBJLoader } from './OBJLoader.js';
let stickman;
export default class Models {

    constructor(scene) {
        this.scene = scene;
    }

    getStickMan(){
        return stickman;
    }

    loadStickMan(){
        const objLoader = new OBJLoader();
        objLoader.load(
            '../models/stickman.obj',
            (object) => {
                object.position.set(0,3.5,0);
                console.log("Cargado StickMan")
                stickman = object;
            },
            (error) => {
                console.log(error)
            });
    }

}