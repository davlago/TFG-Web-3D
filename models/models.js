import { OBJLoader } from '../models/OBJLoader.js';
import { MTLLoader } from '../models/MTLLoader.js';
import { GLTFLoader } from '../models/GLTFLoader.js'

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
        let mtlLoader = new MTLLoader();
        mtlLoader.load(
            '../models/young/young.mtl', (materials) => {
                materials.preload();
                let objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../models/young/young.obj',
                    (object) => {
                        object.position.set(0, 3.5, 0);
                        object.scale.set(0.07, 0.07, 0.07);
                        console.log("Cargado Young")
                        young = object;
                    });
            })


    }

    loadAdult() {
        let mtlLoader = new MTLLoader();
        mtlLoader.load(
            '../models/adult/adult.mtl', (materials) => {
                materials.preload();
                let objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(
                    '../models/adult/adult.obj',
                    (object) => {
                        object.position.set(0, 3.5, 0);
                        object.scale.set(0.07, 0.07, 0.07);
                        console.log("Cargado adult")
                        adult = object;
                    });
            })
    }

    loadElderly() {
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(
            '../models/elderly/elderly.gltf',
            (object) => {
                console.log(object)
                console.log("Cargado elderly")
                console.log(object)

                elderly = object.scene;
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
            },
            (error) => {
            });
    }

}