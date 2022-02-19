const canvasElement = document.querySelector('canvas');

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this);
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
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
      }
    });
  }

  generateEnemy() {
    const enemySpeed = Math.random() + 0.2;
    const enemyX = this.canvas.width;
    const enemyY = Math.random() * (this.canvas.height / 2) + 215;
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

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
      if (intersectionsDetect) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);

        this.score -= 5;
      }
    }
  }

  drawScore() {
    this.context.font = '25px sans-serif';
    this.context.fillText(`Score: ${this.score}`, 20, 570);
  }

  draw() {
    this.context.clearRect(0, 0, 600, 600);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}

const game = new Game(canvasElement);

game.loop();
