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
                object.traverse( function (obj) {
                    if (obj.isMesh){
                        if(Array.isArray(obj.material)){
                            obj.material.forEach(element => {
                                element.color.setHex(0x00ff00);
                            });
                        }
                        else{
                            obj.material.color.setHex(0x00ff00);
                        }

                    }
                  } );
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
                object.traverse( function (obj) {
                    if (obj.isMesh){
                        if(Array.isArray(obj.material)){
                            obj.material.forEach(element => {
                                element.color.setHex(0x0000ff);
                            });
                        }
                        else{
                            obj.material.color.setHex(0x0000ff);
                        }

                    }
                  } );
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
                object.traverse( function (obj) {
                    if (obj.isMesh){
                        if(Array.isArray(obj.material)){
                            obj.material.forEach(element => {
                                element.color.setHex(0xff0000);
                            });
                        }
                        else{
                            obj.material.color.setHex(0xff0000);
                        }

                    }
                  } );
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
                object.traverse( function (obj) {
                    if (obj.isMesh){
                        if(Array.isArray(obj.material)){
                            obj.material.forEach(element => {
                                element.color.setHex(0xffff00);
                            });
                        }
                        else{
                            obj.material.color.setHex(0xffff00);
                        }

                    }
                  } );
                console.log("Cargado StickMan")
                stickman = object;
            },
            (error) => {
            });
    }

}