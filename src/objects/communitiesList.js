import Community from './community.js';
export default class CommunitiesList {

    constructor(scene) {
        this.scene = scene;
        this.communitiesList = []
        this.objectList = []
        this.n_communities = 0;
    }

    addCommunity(models, index, data, xPos, yPos, zPos) {
        let radius = Math.log(data["communities"][index]["users"].length)*8;
        if (radius===0)radius = 4;
        let newComunity = new Community(this.scene, index, radius, data,xPos, yPos, zPos, models);
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