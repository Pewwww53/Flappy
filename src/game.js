import { Scenes } from "./constants";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { PreloadScene } from "./scenes/PreloadScene";


export class Game extends Phaser.Game {
  constructor(gameConfig) {
    super(gameConfig);

    this.#initializeScenes();
    this.scene.start(Scenes.Preload);
  }

  #initializeScenes() {
    this.scene.add(Scenes.Preload, new PreloadScene());
    this.scene.add(Scenes.Boot, new BootScene());
    this.scene.add(Scenes.Game, new GameScene());
  }
}
