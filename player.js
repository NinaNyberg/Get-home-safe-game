const playerImage = new Image();
playerImage.src = '/images/idle/frame-1.png';
// const playerImage1 = new Image();
// playerImage1.src = '/images/idle/frame-2.png';
// const playerImages = [];

class Player {
  constructor(game) {
    this.game = game;
    this.x = 150;
    this.y = 150;
    this.width = 60;
    this.height = 80;
    // this.frame = img;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // const img2 = this.game.context.drawImage(
    //   playerImage1,
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // );

    // playerImages.push(img1);
    // playerImages.push(img2);
    // for (img of playerImages) img++;

    // this.game.context.fillStyle = 'blue';
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
