import { useRef, useEffect } from 'react';

class Particle {
  constructor(x, y, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;
  }

  draw() {
    this.ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const init = () => {
      setCanvasSize();
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas,
          ctx
        ));
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
