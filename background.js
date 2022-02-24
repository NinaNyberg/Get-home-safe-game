const backgroundImage = new Image();
backgroundImage.src = '/images/_01_ground.png';

class Background {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 600;
    this.height = 600;
  }

  draw() {
    this.game.context.save();

    this.game.context.drawImage(backgroundImage, 0, 0, 600, 600);

    this.game.context.restore();
  }
}
