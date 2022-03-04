const backgroundImage = new Image();
backgroundImage.src = '/images/_01_ground.png';
const backgroundImage1 = new Image();
backgroundImage1.src = '/images/_02_trees and bushes.png';
const backgroundImage2 = new Image();
backgroundImage2.src = '/images/_11_background.png';
const backgroundImage3 = new Image();
backgroundImage3.src = '/images/_10_distant_clouds.png';
const backgroundImage4 = new Image();
backgroundImage4.src = '/images/_03_distant_trees.png';

class Layer {
  constructor(game, image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2048;
    this.height = 1546;
    this.scaledWidth = (this.width * 600) / this.height;
    //this.x2 = this.scaledWidth;
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.game.speed * this.speedModifier;
  }
  update() {
    this.speed = this.game.speed * this.speedModifier;
    if (this.x <= -this.scaledWidth) {
      this.x = 0;
    }
    // if (this.x2 <= -this.scaledWidth) {
    //   this.x2 = this.scaledWidth + this.x - this.speed;
    // }
    this.x = Math.floor(this.x - this.speed);
    // this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    //this.game.context.save();
    this.game.context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.scaledWidth,
      600
    );
    this.game.context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x + this.scaledWidth,
      this.y,
      (this.width * 600) / this.height,
      600
    );
    // this.game.context.drawImage(
    //   this.image,
    //   this.x2,
    //   this.y,
    //   this.width,
    //   this.height,
    //   0,
    //   0,
    //   (this.width * 600) / this.heigth,
    //   600
    // );
    //this.game.context.restore();
  }
}

class Background {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 600;
    this.height = 600;
    this.layers = [
      new Layer(game, backgroundImage2, 0.1),
      new Layer(game, backgroundImage3, 0.5),
      new Layer(game, backgroundImage4, 0.9),
      new Layer(game, backgroundImage1, 1.2),

      new Layer(game, backgroundImage, 2)
    ];
  }

  draw() {
    this.game.context.save();

    // this.game.context.restore();

    // this.game.context.save();

    //this.game.context.drawImage(backgroundImage1, 0, 0, 600, 600);
    // this.game.context.drawImage(
    //   backgroundImage,
    //   0,
    //   0,
    //   2048,
    //   1546,
    //   0,
    //   0,
    //   (2048 * 600) / 1546,
    //   600
    // );
    for (let layer of this.layers) {
      layer.update();
      layer.draw();
    }

    this.game.context.restore();
  }
}
