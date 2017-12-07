const stepSize = 3;
let sketchCanvas;
const num = 600;
let particles = [];
const t = 1000;
const fadeT = 0.5;
let fading = true;

function setup() {
  sketchCanvas = createCanvas(windowWidth, windowHeight);
  sketchCanvas.parent('sketch-canvas');
  // createCanvas(1200, 700);
  background(255);
  seed();
}

function draw() {
  if (frameCount > 3000) {
    noLoop();
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].move();
    particles[i].fade();
  }
}

function seed() {
  for (let i = 0; i < num; i++) {
    particle = new Particle(random(width), random(height), 1, 0);
    particles.push(particle);
  }
}

function windowResized() {
  clear();
  particles = [];
  seed();
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  clear();
  particles = [];
  seed();
}

class Particle {
  constructor(x, y, rad, op) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.op = op;
  }

  show() {
    noStroke();
    fill(this.op, 80);
    ellipse(this.x, this.y, this.rad);
  }

  move() {
    this.x += (1 - 2 * random()) * stepSize;
    this.y += (1 - 2 * random()) * stepSize;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  fade() {
    if (fading) {
      this.op -= fadeT;
    }

    if (fading === false) {
      this.op += fadeT;
    }

    if (this.op < 0) {
      fading = false;
    }

    if (this.op > 255) {
      fading = true;
    }
  }
}
