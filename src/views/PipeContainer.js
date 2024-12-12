export class PipeContainer extends Phaser.GameObjects.Container{
    #pipeTop
    #pipeBottom

    constructor(scene){
        super(scene);

        this.#init();
    }

    getPipes(){
        return [this.#pipeTop, this.#pipeBottom]
    }

    #init(){
        const pipeTopY = Math.random() * 150 + 400;
        this.#pipeTop = this.scene.physics.add.sprite(0, pipeTopY, "laser")
        this.#pipeTop.body.allowGravity = false;

        const pipeBottomY = pipeTopY - 420;
        this.#pipeBottom = this.scene.physics.add.sprite(0, pipeBottomY, "laser")
        this.#pipeBottom.body.allowGravity = false;
        this.#pipeBottom.scaleY *= -1;

        this.add(this.#pipeTop)
        this.add(this.#pipeBottom)
    }
}