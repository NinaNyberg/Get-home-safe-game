const canvasElement = document.querySelector('canvas');

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    // this.background = new Background(this);
    this.player = new Player(this);
    // this.cats = [];
    this.enemies = [];
    this.playerControls();
    this.score = 100;
  }

  playerControls() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          // this.player.y -= 10;
          this.player.state = 2;
          this.player.jump = 10;
          break;
        case 'ArrowDown':
          // this.player.y += 10;
          this.player.state = 3;
          this.player.jump = 0;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          if (this.player.jump === 0) this.player.state = 1;
          this.player.scale = 1;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          if (this.player.jump === 0) this.player.state = 1;
          this.player.scale = -1;
          break;
      }
    });
    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (this.player.jump === 0) this.player.state = 0;
    });
  }

  generateEnemy() {
    const enemySpeed = Math.random() + 0.2;
    const enemyX = this.canvas.width;
    const enemyY = Math.random() * (this.canvas.height / 2) + 215;
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  // generateCat() {
  //   const enemySpeed = Math.random() + 0.2;
  //   const enemyX = this.canvas.width;
  //   const enemyY = Math.random() * (this.canvas.height / 2) + 300;
  //   const enemy = new Cat(this, catX, catY, catSpeed);
  //   this.cats.push(cat);
  // }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    if (Math.random() < 0.003) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      const intersectionsDetect = enemy.checkIntersection(this.player);
      const enemyIsOutOfBounds = enemy.x + enemy.width < 0;
      if (intersectionsDetect || enemyIsOutOfBounds) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);

        this.score -= 5;
      }
    }

    //   if (Math.random() < 0.003) {
    //     this.generateCat();
    //   }
    //   for (const cat of this.cats) {
    //     cat.runLogic();
    //     const intersectionsDetect = cat.checkIntersection(this.player);
    //     if (intersectionsDetect) {
    //       const indexOfCats = this.cats.indexOf(cat);
    //       this.cats.splice(indexOfCats, 1);

    //       this.score += 10;
    //     }

    //     const catIsOutOfBounds = cat.x + cat.width < 0;
    //     if (catIsOutOfBounds) {
    //       const indexOfCats = this.cats.indexOf(cat);
    //       this.cats.splice(indexOfCats, 1);

    //       this.score -= 5;
    //     }
    //   }
  }

  drawScore() {
    this.context.font = '25px sans-serif';
    this.context.fillText(`Score: ${this.score}`, 20, 570);
  }

  draw() {
    this.context.clearRect(0, 0, 600, 600);
    // this.background.draw();
    // for (const enemy of this.enemies) {
    //   enemy.draw();
    // }
    // for (const cat of this.cats) {
    //   cat.draw();
    // }
    this.player.draw();
    this.drawScore();
  }
}

const game = new Game(canvasElement);

game.loop();
