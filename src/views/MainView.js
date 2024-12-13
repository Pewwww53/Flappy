import { Game_Config } from "../constants";
import { PipeContainer } from "./PipeContainer";
import Phaser from "phaser";

export class MainView extends Phaser.GameObjects.Container {
    #bkg
    #bird
    #pipes
    #overlap
    #isLost
    #score
    
    constructor(scene) {
        super(scene);
        this.#build();
    }
    update(){

        const {height} = this.scene.scale;
        if (this.#bird && this.#bird.y > height - this.#bird.height / 2) {
            this.scene.physics.world.disable(this.#bird);
            this.#gameOver()
        }
        
        if (this.#isLost) {
            return
        }

        this.#pipes.forEach((p, i) => {
            p.x -= Game_Config.speed/2
            if (p.x < this.#bird.x && !p.add) {
                this.#score++
                p.add = true
                console.log(this.#score, p.add);
                
            }
            if (p.x == -30) {
                p.destroy();
                this.#pipes.splice(i, 1);
            }
            if (p.x == 200) {
                this.#addPipe();
            }
        });

        this.#bkg.tilePositionX += Game_Config.speed;
    }
    #build() {
        this.#isLost = false;
        this.#score = 0
        this.#pipes = [];
        this.#buildBkg();
        this.#buildBird();
        this.#addPipe();

    }

    #buildBkg(){
        this.#bkg = this.scene.add.tileSprite(0, 0, 288, 512, "bkg");
        this.#bkg.setOrigin(0);
        this.#bkg.setInteractive();
        this.#bkg.on("pointerdown", this.#onBkgClick, this);
        this.add(this.#bkg);

    }

    #buildBird(){
        const {width, height} = this.scene.scale;
        this.#bird = this.scene.add.sprite(width * 0.2, height / 2, 'character')
        this.scene.physics.add.existing(this.#bird);
        this.add(this.#bird)
    }

    #addPipe(){
        const pipeX = this.#pipes.length ? this.#pipes[this.#pipes.length - 1].x + 200 : 400
        const pipe = new PipeContainer(this.scene);
        
        pipe.x = pipeX;
        pipe.add = false;
        this.add(pipe)
        this.#pipes.push(pipe)
        this.#addOverLap();
    }

    #addOverLap(){
        // const allPipes = this.#pipes.map((p) => p.getPipes()).flat()
        // this.#overlap?.destroy();
        // this.#overlap = this.scene.physics.add.overlap(this.#bird, allPipes, this.#gameOver, this);

        const allPipes = this.#pipes.map((p) => p.getPipes()).flat();
        if (this.#overlap) {
            this.#overlap.destroy(); 
        }
        this.#overlap = this.scene.physics.add.overlap(this.#bird, allPipes, this.#gameOver.bind(this));
    }

    #gameOver(){
        if (this.#isLost) return;

        this.#bkg.disableInteractive();
        this.#isLost = true;
        console.log("Game Over");

        const highScore = Math.max(this.#score, sessionStorage.getItem('highScore') || 0);
        sessionStorage.setItem('highScore', highScore);
        const { width, height } = this.scene.scale;
        const popup = this.scene.add.container(width / 2, height / 2);

        const bg = this.scene.add.rectangle(0, 0, 250, 150, 0xf8fb3e, 0.9);
        const gameOverTxt = this.scene.add.text(0, -30, 'Game Over', { fontSize: '30px', color: '#000', fontFamily: 'Play, Arial'}).setOrigin(0.5).setPosition(0, -40);
        const scoreTxt = this.scene.add.text(0, 0, `Score: ${this.#score}\nHigh Score: ${highScore}`, {
            fontSize: '16px',
            color: '#000',
            align: 'center',
            fontFamily: 'Inter'
        }).setOrigin(0.5);

        const restartButton = this.scene.add.text(0, 40, 'Restart', { fontSize: '16px', color: '#000', fontFamily: 'Inter' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                popup.destroy();
                this.scene.scene.restart();
            });

        popup.add([bg, gameOverTxt, scoreTxt, restartButton]);
    }
    #onBkgClick(){
        this.#bird.body.velocity.y = Game_Config.birdVelocity;
    }
}
