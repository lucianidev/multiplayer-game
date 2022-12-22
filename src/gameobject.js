class Gameobject {
  constructor(x,y,color,ctx,size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx = ctx;
    this.size = size;
  };

  init() {
    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();
  }
}

export default Gameobject;