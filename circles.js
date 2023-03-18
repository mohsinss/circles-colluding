class MovingCircle {
    constructor(posX, posY, circleRadius, circleColor, speedX, speedY) {
      this.posX = posX;
      this.posY = posY;
      this.circleRadius = circleRadius;
      this.circleColor = circleColor;
      this.speedX = speedX;
      this.speedY = speedY;
    }
  
    render(context) {
      context.beginPath();
      context.arc(this.posX, this.posY, this.circleRadius, 0, Math.PI * 2);
      context.fillStyle = this.circleColor;
      context.fill();
      context.closePath();
    }
  
    move(context, canvasWidth, canvasHeight) {
      this.posX += this.speedX;
      this.posY += this.speedY;
  
      if (this.posX + this.circleRadius > canvasWidth || this.posX - this.circleRadius < 0) {
        this.speedX = -this.speedX;
      }
  
      if (this.posY + this.circleRadius > canvasHeight || this.posY - this.circleRadius < 0) {
        this.speedY = -this.speedY;
      }
  
      this.render(context);
    }
  }
  
  function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  function connectCircles(context, startX, startY, endX, endY, lineColor) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = lineColor;
    context.stroke();
  }
  
  const canvasElement = document.getElementById('circleCanvas');
  const canvasContext = canvasElement.getContext('2d');
  
  const totalCircles = 20;
  const movingCircles = [];
  const circleColors = ['red', 'blue'];
  
  for (let i = 0; i < totalCircles; i++) {
    const radius = 10;
    const x = Math.random() * (canvasElement.width - 2 * radius) + radius;
    const y = Math.random() * (canvasElement.height - 2 * radius) + radius;
    const color = circleColors[i % 2];
    const velocityX = Math.random() * 2 - 1;
    const velocityY = Math.random() * 2 - 1;
  
    movingCircles.push(new MovingCircle(x, y, radius, color, velocityX, velocityY));
  }
  
  function startAnimation() {
    requestAnimationFrame(startAnimation);
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
    for (const circle of movingCircles) {
      circle.move(canvasContext, canvasElement.width, canvasElement.height);
    }
  
    for (let i = 0; i < movingCircles.length; i++) {
      for (let j = i + 1; j < movingCircles.length; j++) {
        if (movingCircles[i].circleColor !== movingCircles[j].circleColor && calculateDistance(movingCircles[i].posX, movingCircles[i].posY, movingCircles[j].posX, movingCircles[j].posY) < 100) {
          connectCircles(canvasContext, movingCircles[i].posX, movingCircles[i].posY, movingCircles[j].posX, movingCircles[j].posY, 'purple');
        }
      }
    }
  }
  
  startAnimation();
  