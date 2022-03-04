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
    this.state = 0; // what player is doing
    this.scale = 1; // player direction
    this.momentum = 0; // momentum used in jumping and sliding
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
      },
      {
        // 4
        loc: [{ x: 1308 }],
        y: 461,
        width: 429,
        height: 259
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
    //this.x -= this.game.speed * 2;
    if (this.state === 2) {
      // jump up: divide distance to peak by 5 to emulate smooth curve
      let span = parseInt((this.momentum - 150) / 5) + 1;
      this.momentum -= span;
      this.y -= span;
      this.x += this.scale * 6;
      if (this.momentum <= 300 / 2 + 5) {
        //if (this.span === 0) {
        this.state = 3;
      }
    } else if (this.state === 3) {
      // fall down
      let span = parseInt((150 + 5 - this.momentum) / 5) + 1;
      this.momentum -= span;
      this.y += span;
      this.x += this.scale * 6;
      //if (this.y >= 400) {
      if (this.momentum <= 0) {
        this.state = 0;
        this.momentum = 0;
        this.y = 400;
      }
    } else if (this.state === 4) {
      // slide
      let span = parseInt(this.momentum / 10) + 1;
      this.x += this.scale * span;
      this.momentum -= span;
      if (this.momentum <= 0) {
        this.state = 0;
        this.game.speed = 1;
        this.momentum = 0;
        this.y = 400;
      }
    }

    this.game.context.scale(this.scale, 1);
    this.game.context.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      this.x * this.scale,
      this.y,
      (spriteWidth / 4) * this.scale,
      spriteHeight / 4
    );
    this.frame++;

    this.game.context.restore();
  }
}
