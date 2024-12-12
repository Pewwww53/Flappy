import { MainView } from "../views/MainView";

export class GameScene extends Phaser.Scene {
  #mainView
  create() {
    this.#buildMainView();
  }

  update(){
    this.#mainView.update();
  }

  #buildMainView() {
    this.#mainView = new MainView(this);
    this.add.existing(this.#mainView);
  }
}
