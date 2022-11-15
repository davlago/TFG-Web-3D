/**
 * Clase de la lista de comunidades
 */

import Community from './community.js';

const coordAcom = [1, 7, 21, 42, 73];
export default class CommunitiesList {

    constructor(scene, textureBase) {
        this.scene = scene;
        this.textureBase = textureBase;
        this.communitiesList = []
        this.objectList = []
        this.n_communities = 0;
    }

    addCommunity(models, index, data, pos) {
        let grand;
        for(let i = 0; i < coordAcom.length; i++){
            if(coordAcom[i] >= data["communities"][index]["users"].length){
                grand = i;
                break;
            }
        }   
        let radius = grand*10;
        if (radius===0)radius = 4;
        let newComunity = new Community(this.scene, index, radius, data,pos, models, this.textureBase);
        this.objectList.push(newComunity.get3DObject());
        this.communitiesList.push(newComunity);
        this.n_communities++;
    }

    addCommunityOnScene(){
        for(let i = 0; i < this.n_communities; i++){
            this.scene.add(this.objectList[i]);
            this.communitiesList[i].addUsersOnScene();
        }
    }

    selectCommunity(index){
        this.communitiesList[index].selectCommunity();
    }

    unselectCommunity(index){
        this.communitiesList[index].unselectCommunity();
    }

    drawBorders(){
        this.communitiesList.map(x => x.drawBorder());
    }

    getObjectList() {
        return this.objectList;
    }

    getInfoList(){
        return this.communitiesList;
    }

    getOneCommunityObject(index) {
        return this.objectList[index];
    }

    getOneCommunityInfo(index) {
        return this.communitiesList[index];
    }

}