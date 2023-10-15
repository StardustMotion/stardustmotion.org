import AudioManager from "./AudioManager.js"

export default class AudioManagerBabylon extends AudioManager{

    constructor(scene){
        super()
        this.scene=scene
    }


    addSong(name,path,loop,autoplay,volume){
        let song = new BABYLON.Sound(name, path, this.scene,null,{
            autoplay:autoplay,
            loop:loop,
            volume:volume

        });
        this.listSongs.push(song)
        super.addSong(name,path)
    }

    find(nameSong){
        return super.find(nameSong)
    }
}

