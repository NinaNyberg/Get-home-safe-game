const therapycatImage = new Image();
therapycatImage.src = '/images/marshmallow_earphone-01.png';

class Cat {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
  }

  checkIntersection(element) {
    return (
      this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
    );
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    this.game.context.save();

    this.game.context.drawImage(
      therapycatImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // this.game.context.fillStyle = 'green';
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
