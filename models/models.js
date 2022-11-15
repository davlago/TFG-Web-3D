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
        return new Promise((resolve, reject) => {
            loadStickMan().then(function () {
                loadYoung().then(function () {
                    loadAdult().then(function () {
                        loadElderly().then(function () {
                            resolve();
                        });
                    });
                });
            });
        });
    }

    getModelsArray() {
        return [stickman, young, adult, elderly]
    }
}

async function loadYoung() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/young/young.fbx',
            (object) => {
                young = object;
                young.scale.set(0.06, 0.06, 0.06);
                console.log("Cargado young")
                resolve();
            });

    });

}

async function loadAdult() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/adult/adult.fbx',
            (object) => {
                adult = object;
                adult.scale.set(0.07, 0.07, 0.07);
                console.log("Cargado adult")
                resolve();
            });

    });
}

async function loadElderly() {
    return new Promise((resolve, reject) => {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(
            '../models/elderly/elderly.fbx',
            (object) => {
                elderly = object;
                elderly.scale.set(0.06, 0.06, 0.06);
                console.log("Cargado elderly")
                resolve();
            });

    });
}

async function loadStickMan() {
    return new Promise((resolve, reject) => {
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
                resolve();
            });

    });
};
