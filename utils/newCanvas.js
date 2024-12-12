export function newCanvas(canvasId = 'canvas') {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    console.error(`Canvas with ID '${canvasId}' not found.`);
    return;
  }

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const c = canvas.getContext('2d');

  const mouse = { x: undefined, y: undefined };
  let circleArray = [];
  let frame = 0;

  const colorArray = ['29, 145, 252', '223, 9, 3', '90, 54, 192', '165, 201, 63', '343, 81, 45', '112, 174, 210'];

  class Circle {
    constructor(x, y, radius, vx, vy, rgb, opacity, birth, life) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.vx = vx;
      this.vy = vy;
      this.rgb = rgb;
      this.opacity = opacity;
      this.birth = birth;
      this.life = life;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = `rgba(${this.rgb},${this.opacity})`;
      c.fill();
    }

    update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.vx = -this.vx;
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.vy = -this.vy;

      this.x += this.vx;
      this.y += this.vy;

      this.opacity = 1 - (frame - this.birth) / this.life;
      if (frame > this.birth + this.life) {
        circleArray = circleArray.filter((circle) => circle !== this);
      } else {
        this.draw();
      }
    }
  }

  function drawCircles() {
    for (let i = 0; i < 6; i++) {
      const radius = Math.random() * 4 + 2;
      const vx = Math.random() * 2 - 1;
      const vy = Math.random() * 2 - 1;
      const rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
      circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, frame, 100));
    }
  }

  function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArray.forEach((circle) => circle.update());
    frame++;
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    drawCircles();
  });

  canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    drawCircles();
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animate();
}
