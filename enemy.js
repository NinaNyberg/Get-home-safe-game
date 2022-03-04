const enemyImage = new Image();
enemyImage.src = '/images/ghost.png';

class Enemy {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.speed = speed;
    this.frame = 1;
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
    this.x -= this.speed + this.game.speed;
  }

  draw() {
    this.frame++;
    this.game.context.save();

    this.game.context.drawImage(
      enemyImage,
      10,
      0,
      396,
      582,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.restore();
  }
}
