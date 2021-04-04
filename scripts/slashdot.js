const diam = 5;
let now;
const par = [];
const numPoints = 24;
const durMax = 5000;
const durMin = 1000;
const holdMax = 3000;
const holdMin = 200;
const activeArea = 560;
const wd = 1024;
const ht = 448;

function setup() {
  const renderer = createCanvas(wd, ht);
  renderer.parent("slashdot");

  for (let i = 0; i < numPoints; i++) {
    par.push(new Particle());
  }
}

function draw() {
  setGradientBackground();
  now = millis()

  for (let i = 0; i < par.length; i++) {
    par[i].update()
    par[i].display()
  }

  frameRate(30);
  noLoop();
}

var Particle = function() {
  this.dur = round(random(durMin, durMax));
  this.hold = round(random(holdMin, holdMax));
  this.dT = 0;
  this.lastTick = 0;
  this.moving = random(1) > 0.5 ? true : false;
  this.ptA = createVector(width - activeArea + random(activeArea), random(height));
  this.ptB = createVector(width - activeArea + random(activeArea), random(height));
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
      this.ptB = createVector(width - 448 + random(448), random(height));
      this.dT = 0;
      this.lastTick = now;
      this.moving = true;
    }
  }
}

Particle.prototype.display = function() {
  strokeWeight(1);
  noFill();
  stroke(255)
  ellipse(this.pos.x, this.pos.y, 8, 8);
  noFill()
  
  if (this.moving) {
    fill(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    stroke(255, 255, 255, map(this.dT / this.dur, 0, 1, 0, 255));
    ellipse(this.ptB.x, this.ptB.y, diam, diam);
    stroke(243, 161, 255, map(this.dT / this.dur, 0, 1, 23, 95));
    line(this.pos.x, this.pos.y, this.ptA.x, this.ptA.y);
  } else {
    stroke(255, 255, 255, map(this.dT / this.hold, 0, 1, 255, 0));
    ellipse(this.ptB.x, this.ptB.y, diam, diam);
    stroke(243, 161, 255, map(this.dT / this.hold, 0, 1, 95, 23));
    line(this.pos.x, this.pos.y, this.ptA.x, this.ptA.y);
  }
}

const setGradientBackground = function () {
  var c=document.getElementById("defaultCanvas0");
  var ctx=c.getContext("2d");

  // Create gradient
  var grd=ctx.createLinearGradient(0, 0, width, 0);
  grd.addColorStop(0.04, "#53aec3");
  grd.addColorStop(0.39, "#6d44a8");
  grd.addColorStop(0.76, "rgba(11, 16, 71)");

  // Fill with gradient
  ctx.fillStyle=grd;
  ctx.fillRect(0, 0, width, height); 
}


// QUARTIC EASING!
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