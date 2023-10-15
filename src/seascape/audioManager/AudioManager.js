export default class AudioManager{

    constructor(){
        this.listSongs=[]
    }

    addSong(name,path){
        console.log(path+ " loaded.")
    }

    find(nameSong){
        for(let i =0;i<this.listSongs.length;i++){
            if(this.listSongs[i].name===nameSong){
                return this.listSongs[i]
            }

        }
    }

    play(songName) {
        let toPlay = this.find(songName);
        toPlay.play();
    }

    play(songName, playArg0, playArg1, playArg2) {
        let toPlay = this.find(songName);
        toPlay.play(playArg0, playArg1, playArg2);
    }

    stop(songName) {
        let toStop = this.find(songName)
        toStop.stop();
    }
}