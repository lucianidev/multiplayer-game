import Gameobject from "./gameobject";

class Player extends Gameobject {
    constructor(x,y,color,ctx,size) {
        super(x,y,color,ctx,size);
        this.velocity =  2;
    }

    move(key) {
        if(key == 'w') {
            this.y = this.y -= this.velocity;
        } else if(key == 'd') {
            this.x = this.x += this.velocity;
        } else if(key == 's') {
            this.y = this.y += this.velocity;
        } else if(key == 'a') {
            this.x = this.x -= this.velocity;
        }
    }

    checkBoundaries(canvasWidth,canvasHeigtht) {
        // if the player is over the maxium width and heigth take it back 30px
        if(this.x > canvasWidth) {
            this.x = this.x - 30;
        } else if(this.y > canvasHeigtht) {
            this.y = this.y - 30;
        } else if(this.x <= 0) {
            this.x = this.x + 30;
        }  else if(this.y <= 0) {
            this.y = this.y + 30;
        } 
    }
}

export default Player;