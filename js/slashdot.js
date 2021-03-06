const diam = 5;
let now;
let ctx, grd;
let pg;
const par = [];
const numPoints = 24;
const durMax = 8000;
const durMin = 2000;
const holdMax = 6000;
const holdMin = 400;
const activeArea = 800;

function setup() {
  const wd = 1024;
  const ht = 800;
  const renderer = createCanvas(wd, ht);
  renderer.parent("slashdot");
  
  for (let i = 0; i < numPoints; i++) {
    par.push(new Particle());
  }
  
  pg = createGraphics(wd, ht);

  const c = document.getElementById("defaultCanvas0");
  ctx = c.getContext("2d");
  
  // Create gradient
  grd = ctx.createLinearGradient(0, 0, width, 0);
  grd.addColorStop(0.04, "#5e7cb6");
  grd.addColorStop(0.39, "#6d44a8");
  grd.addColorStop(0.76, "#0b1047");

  frameRate(24);
  // noLoop();
}

const renderParticles = () => {
  pg.clear();

  for (let i = 0; i < par.length; i++) {
    par[i].update()
    par[i].display()
  }
}

function draw() {
  // setGradientBackground();
  // background(0);
  background('#0b1047');

  if(window.animateHero) {
    now = millis()
    renderParticles();
    image(pg, 0, 0);
  }  
}

const getRandomPosition = () => {
  const pt = createVector(width - activeArea + random(activeArea), random(height));
  return pt;
}

const Particle = function() {
  this.dur = round(random(durMin, durMax));
  this.hold = round(random(holdMin, holdMax));
  this.dT = 0;
  this.lastTick = 0;
  this.moving = random(1) > 0.5 ? true : false;
  this.ptA = getRandomPosition();
  this.ptB = getRandomPosition();
  this.pos = this.moving ? this.ptA.copy() : this.ptB.copy()
};

// Move the point from point A to point B with Ease Out Quart easing
Particle.prototype.update = function() {
  this.dT = now - this.lastTick;
  if (this.moving) {
    if (this.dT <= this.dur) {
      const nextX = easeOutQuart(this.dT, this.ptA.x, this.ptB.x - this.ptA.x, this.dur)
      const nextY = easeOutQuart(this.dT, this.ptA.y, this.ptB.y - this.ptA.y, this.dur)
      this.pos = createVector(nextX, nextY);
    } else {
      // Set new destination
      this.dT = 0;
      this.lastTick = now;
      this.moving = false;
      this.pos = this.ptB.copy()
      this.dur = round(random(durMin, durMax))
      this.hold = round(random(holdMin, holdMax))
    }
  } else {
    if (this.dT >= this.hold) {
      this.ptA = this.ptB.copy()
      this.ptB = getRandomPosition();
      this.dT = 0;
      this.lastTick = now;
      this.moving = true;
    }
  }
}

Particle.prototype.display = function() {
  pg.strokeWeight(1);
  pg.noFill();
  pg.stroke(255)
  pg.ellipse(this.pos.x, this.pos.y, 8, 8);
  pg.noFill()
  
  if (this.moving) {
    pg.fill(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    pg.stroke(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    pg.ellipse(this.ptB.x, this.ptB.y, diam, diam);
    pg.stroke(243, 161, 255, map(this.dT / this.dur, 0, 1, 23, 95));
    pg.line(this.pos.x, this.pos.y, this.ptA.x, this.ptA.y);
  } else {
    pg.stroke(255, 255, 255, map(this.dT / this.hold, 0, 1, 255, 0));
    pg.ellipse(this.ptB.x, this.ptB.y, diam, diam);
    pg.stroke(243, 161, 255, map(this.dT / this.hold, 0, 1, 95, 23));
    pg.line(this.pos.x, this.pos.y, this.ptA.x, this.ptA.y);
  }
}

// const setGradientBackground = function () {
//   ctx.fillStyle = grd;
//   ctx.fillRect(0, 0, width, height); 
// }

// QUARTIC EASING
// t: time from start of animation until now
// b: value at start of animation
// c: change in value being animated
// d: duration of animation
const easeOutQuart = function (t, b, c, d) {  
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;  
}