import "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import { Game } from "./game";

const config = {
    transparent: false,
    antialiasGL: false,
    type: Phaser.WEBGL,
    width: 288,
    height: 512,
    input: {
        mouse: {
            preventDefaultWheel: false,
        },
    },
    scale: {
        parent: "phaser-game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
        },
    },
    plugins: {
        scene: [
            {
                key: "SpinePlugin",
                plugin: window.SpinePlugin,
                mapping: "spine",
            },
        ],
    },
    antialias: true,
};

window.addEventListener("load", () => {
    new Game(config);
});