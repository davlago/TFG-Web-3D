import { OBJLoader } from './OBJLoader.js';
let stickman;
let young;
let adult;
let elderly;
const objLoader = new OBJLoader();
export default class Models {

    constructor(scene) {
        this.scene = scene;
    }

    loadModels(){
        this.loadStickMan();
        this.loadYoung();
        this.loadAdult();
        this.loadElderly();
    }

    getModelsArray(){
        return [stickman,young,adult,elderly]
    }


    loadYoung(){
        objLoader.load(
            '../models/young.obj',
            (object) => {
                object.position.set(0,3.5,0);
                object.scale.set(2.5,2.5,2.5);
                console.log("Cargado Young")
                young = object;
            },
            (error) => {
            });

    }

    loadAdult(){
        objLoader.load(
            '../models/adult.obj',
            (object) => {
                object.position.set(0,3.5,0);
                object.scale.set(3,3,3);
                console.log("Cargado Adult")
                adult = object;
            },
            (error) => {
            });
    }

    loadElderly(){
        let color = new THREE.Color( 0xFFB6C1 );
        objLoader.load(
            '../models/elderly.obj',
            (object) => {
                object.position.set(0,3.5,0);
                object.scale.set(0.2,0.2,0.2);
                console.log("Cargado Elderly")
                elderly = object;
            },
            (error) => {
            });
    }

    loadStickMan(){
        objLoader.load(
            '../models/stickman.obj',
            (object) => {
                object.position.set(0,3.5,0);
                object.scale.set(1.5,1.5,1.5);
                console.log("Cargado StickMan")
                stickman = object;
            },
            (error) => {
            });
    }

}