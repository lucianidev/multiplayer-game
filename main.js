import './style.css'
import Player from './src/player.js'
import Client from './src/client.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.pressedKey = false;
        this.connection = new Client();
        this.player = new Player(this.canvas.width / 2,this.canvas.height / 2,"red",this.ctx,10);
        this.frameRate = 60;
        this.playerId = Math.round(Math.random() * 400); // the player id is generated once and is going to be validated on the server
    }

    init() {
        // start the game
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight / 2;

        document.addEventListener('keypress', (pressData) => {
            this.pressedKey = pressData.key
        })

        document.addEventListener('keyup', () => {
            this.pressedKey = false;
        })

        this.player.init();
        // init game loop
        setInterval(() => {
            this.clear();
            this.update();
        }, this.frameRate);
    }

    update() {
        this.connection.onConnect().then(context => {
            if(context.isOpen()) {
                context.setData(JSON.stringify({
                    x : this.player.x,
                    y : this.player.y,
                    id : this.playerId,
                })).
                send().
                onMessage((args) => {
                    const playerData = JSON.parse(args.data);
                    const player = new Player(playerData.x,playerData.y,"red",this.ctx,10);
                    player.draw();
                });
            }
        })
        this.player.move(this.pressedKey);
        this.player.checkBoundaries(this.canvas.width, this.canvas.height)
        this.player.draw();

    }

    clear() {
      this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight,)
    }
}

const game = new Game(ctx, canvas);
game.init()

