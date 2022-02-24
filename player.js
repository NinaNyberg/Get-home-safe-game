const playerImage = new Image();
playerImage.src = '/images/boy.png';

class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 400;
    this.width = 62;
    this.height = 82;
    this.frame = 0;

    this.stagger = 10;
    this.state = 0;
    this.scale = 1;
    this.jump = 0;
    this.spriteAnimations = [
      {
        // 0
        loc: [{ x: 0 }, { x: 307 }],
        y: 0,
        width: 307,
        height: 409
      },
      {
        // 1
        loc: [
          { x: 614 },
          { x: 614 + 307 },
          { x: 614 + 307 * 2 },
          { x: 614 + 307 * 3 }
        ],
        y: 0,
        width: 307,
        height: 409
      },
      {
        // 2
        loc: [{ x: 0 }],
        y: 461,
        width: 304,
        height: 447
      },
      {
        // 3
        loc: [{ x: 304 }],
        y: 461,
        width: 304,
        height: 447
      }
    ];
  }

  draw() {
    let position =
      Math.floor(this.frame / this.stagger) %
      this.spriteAnimations[this.state].loc.length;

    let frameX = this.spriteAnimations[this.state].loc[position].x;
    let frameY = this.spriteAnimations[this.state].y;
    let spriteWidth = this.spriteAnimations[this.state].width;
    let spriteHeight = this.spriteAnimations[this.state].height;

    this.game.context.save();
    this.game.context.scale(this.scale, 1);
    this.game.context.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      this.x * this.scale,
      this.y - this.jump,
      (spriteWidth / 4) * this.scale,
      spriteHeight / 4
    );
    this.frame++;
    if (this.state === 2) {
      this.jump += 5;
      if (this.jump > 100) {
        this.state = 3;
      }
    } else if (this.state === 3) {
      this.jump -= 5;
      if (this.jump <= 0) {
        this.state = 0;
        this.jump = 0;
      }
    }

    this.game.context.restore();
  }
}
