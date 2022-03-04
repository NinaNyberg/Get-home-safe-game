const canvasElement = document.querySelector('canvas');

const startScreenElement = document.getElementById('start');
const playingScreenElement = document.getElementById('play');
const endScreenElement = document.getElementById('game-over');
const winScreenElement = document.getElementById('win');

const startButton = startScreenElement.querySelector('button');
const tryAgainButton = endScreenElement.querySelector('button');
const winAgainButton = winScreenElement.querySelector('button');

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement,
  win: winScreenElement
};

startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  game.start();
});

winAgainButton.addEventListener('click', () => {
  game.start();
});

const enemyBumpSound = new Audio('/mixkit-creature-cry-of-hurt-2208.wav');
const playerBumpSound = new Audio('/mixkit-boxing-punch-2051.wav');
const gameOverSound = new Audio('/mixkit-player-losing-or-failing-2042.wav');
const gameWinSound = new Audio('/mixkit-magic-sweep-game-trophy-257.wav');
const gameStartSound = new Audio('/mixkit-player-boost-recharging-2040.wav');

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');

    this.screens = screens;
    this.running = false;
    this.speed = 0;
    this.startTime = 0;

    this.playerControls();
  }

  start() {
    this.running = true;
    this.score = 100;
    this.background = new Background(this);
    this.player = new Player(this);
    this.pooplets = [];
    this.enemies = [];
    this.startTime = Date.now();
    this.timePassed = 0;
    this.speed = 1;

    this.displayScreen('playing');

    this.loop();
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  lose() {
    this.running = false;
    this.displayScreen('end');
    gameOverSound.play();
  }

  win() {
    this.running = false;
    this.displayScreen('win');
    gameWinSound.play();
  }

  playerControls() {
    window.addEventListener('keydown', (event) => {
      if (this.running) {
        event.preventDefault();
        const code = event.code;
        switch (code) {
          case 'ArrowUp':
            // this.player.y -= 10;
            if (this.player.momentum === 0) {
              this.player.state = 2;
              this.player.momentum = 300;
            }
            break;
          case 'ArrowDown':
            // this.player.y += 10;
            if (this.player.momentum === 0) {
              this.player.state = 4;
              this.player.y = 438; // because the slide image height is smaller
              this.player.momentum = 200;
              game.speed += this.player.scale;
            }

            //this.player.state = 3;
            //this.player.jump = 0;
            break;
          case 'ArrowRight':
            this.player.x += 10;
            if (this.player.momentum === 0) {
              this.player.state = 1;
              this.player.scale = 1;
            }
            break;
          case 'ArrowLeft':
            this.player.x -= 10;
            if (this.player.momentum === 0) {
              this.player.state = 1;
              this.player.scale = -1;
            }

            break;
          case 'Space':
            if (this.pooplets.length < 3) this.fire();
            break;
        }
      }
    });
    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (this.player.momentum === 0) this.player.state = 0;
      if (this.player.state < 2) this.player.y = 400;
    });
  }

  fire() {
    const fireY = this.player.y + this.player.height / 2 - 5 / 2;
    const fire = new Pooplet(
      this,
      this.player.x + this.player.width / 4,
      fireY,
      this.player.scale
    );
    this.pooplets.push(fire);
  }

  generateEnemy() {
    // 400
    const enemySpeed = Math.random() + 0.2;
    const enemyX = this.canvas.width;
    // let lines = [200, 300, 400];
    //const enemyY = Math.random() * (this.canvas.height / 3.5) + 210;
    const enemyY = 250 + Math.random() * (this.canvas.height - (250 + 130));
    //const enemyY = lines[parseInt(Math.random() * lines.length)];
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
      }
    });
  }

  runLogic() {
    this.timePassed = Date.now() - this.startTime;
    if (Math.random() < (this.timePassed / 3000) * 0.0009) {
      this.generateEnemy();
    }

    // let secondsPassed = (Date.now() - this.startTime) / 3000;
    // if (Math.random() < secondsPassed * 0.005) {
    //   this.generateEnemy();
    // }

    for (const fire of this.pooplets) {
      this.runFireLogic(fire);
    }
    for (const enemy of this.enemies) {
      this.runEnemyLogic(enemy);
    }

    if (this.score <= 0) {
      this.lose();
    }
    if (this.score >= 200) {
      this.win();
    }
  }

  runEnemyLogic(enemy) {
    enemy.runLogic();
    const intersectionsDetect = enemy.checkIntersection(this.player);
    const enemyIsOutOfBounds = enemy.x + enemy.width < 0;
    if (enemyIsOutOfBounds) {
      const indexOfEnemy = this.enemies.indexOf(enemy);
      this.enemies.splice(indexOfEnemy, 1);
    }
    if (intersectionsDetect) {
      playerBumpSound.play();
      const indexOfEnemy = this.enemies.indexOf(enemy);
      this.enemies.splice(indexOfEnemy, 1);

      this.score -= 10;
    }
  }

  runFireLogic(fire) {
    fire.runLogic();
    for (const enemy of this.enemies) {
      const poopletAndEnemyAreIntersecting = enemy.checkIntersection(fire);
      if (poopletAndEnemyAreIntersecting) {
        enemyBumpSound.play();
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        const indexOfFire = this.pooplets.indexOf(fire);
        this.pooplets.splice(indexOfFire, 1);
        this.score += 10;
      }
    }
    if (fire.x - fire.width > this.canvas.width || fire.x + fire.width < 0) {
      const indexOfFire = this.pooplets.indexOf(fire);
      this.pooplets.splice(indexOfFire, 1);
    }
  }

  drawScore() {
    this.context.font = '25px Papyrus';
    this.context.fillText(`Score: ${this.score}`, 20, 570);
  }

  draw() {
    this.context.clearRect(0, 0, 600, 600);
    this.background.draw();
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const fire of this.pooplets) {
      fire.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}

const game = new Game(canvasElement, screenElements);
game.loop();
