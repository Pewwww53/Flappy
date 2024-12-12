import { Scenes } from "../constants";

export class BootScene extends Phaser.Scene {
    preload() {
        //
    }

    create() {
        this.game.scene.stop(Scenes.Boot);
        this.game.scene.start(Scenes.Game);
    }
}
