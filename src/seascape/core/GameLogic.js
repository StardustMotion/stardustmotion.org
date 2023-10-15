import GuiGame from "../gui/GuiGame.js"

export default class GameLogic {

    constructor(scene, audioManager, babylonGUI) {
        this.scene = scene
        this.audioManager = audioManager
        this.babylonGUI = babylonGUI
    }


    gameOver(winner, panelEndGame, numberCheckPointPassed, textTimer, limitZ) {

        this.audioManager.find("backgroundSong").stop()
        this.audioManager.find("clockSong").stop()

        if (winner) {

            GuiGame.displayGUIGameOver(this.babylonGUI, panelEndGame, true)
            this.audioManager.find("winnerSong").play()


        } else {

            GuiGame.displayGUIGameOver(this.babylonGUI, panelEndGame, false)
            this.audioManager.find("loserSong").play()
        }


    }

    restart() {
       
        for (let i = 0; i < this.scene.actionManager.actions.length; i++) {
            this.scene.actionManager.actions.pop()
        }

    }


}