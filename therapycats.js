const bulletImage = new Image();
//therapycatImage.src = '/images/marshmallow_earphone-01.png';
bulletImage.src = '/images/__whippy_eyes_closed_surprised_000.png';

class Pooplet {
  constructor(game, x, y, direction) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 30;
    this.direction = direction;
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
    this.x += this.direction * 5; // move pooplet left or right
  }

  draw() {
    this.game.context.save();

    this.game.context.drawImage(
      bulletImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.restore();
  }
}
