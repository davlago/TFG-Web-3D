import { OBJLoader } from '../models/OBJLoader.js';
import { MTLLoader } from '../models/MTLLoader.js';
import { GLTFLoader } from '../models/GLTFLoader.js';
import { FBXLoader } from '../models/FBXLoader.js';

let stickman;
let young;
let adult;
let elderly;
export default class Models {

    constructor(scene) {
        this.scene = scene;
    }

    loadModels() {
        this.loadStickMan();
        this.loadYoung();
        this.loadAdult();
        this.loadElderly();
    }

    getModelsArray() {
        return [stickman, young, adult, elderly]
    }


    loadYoung() {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/young/young.fbx',
            (object) => {
                young = object;
                young.scale.set(0.06, 0.06, 0.06);
                console.log("Cargado young")
            });
    }

    loadAdult() {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/adult/adult.fbx',
            (object) => {
                adult = object;
                adult.scale.set(0.07, 0.07, 0.07);
                console.log("Cargado adult")
            });
    }

    loadElderly() {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/elderly/elderly.fbx',
            (object) => {
                elderly = object;
                elderly.scale.set(0.06, 0.06, 0.06);
                console.log("Cargado elderly")

            });
    }

    loadStickMan() {
        let objLoader = new OBJLoader();
        objLoader.load(
            '../models/stickman/stickman.obj',
            (object) => {
                object.position.set(0, 3.5, 0);
                object.scale.set(1.3, 1.3, 1.3);
                object.traverse(function (obj) {
                    if (obj.isMesh) {
                        if (Array.isArray(obj.material)) {
                            obj.material.forEach(element => {
                                element.color.setHex(0xffff00);
                            });
                        }
                        else {
                            obj.material.color.setHex(0xffff00);
                        }

                    }
                });
                console.log("Cargado StickMan")
                stickman = object;
                console.log(stickman)
            },
            (error) => {
            });
    }

}