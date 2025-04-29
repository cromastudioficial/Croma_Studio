import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>>([]);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    alpha: number;
    decay: number;
  }>>([]);
  const lastTimeRef = useRef<number>(0);
  const mousePos = useRef<{ x: number; y: number; isActive: boolean }>({ x: 0, y: 0, isActive: false });
  const hueRef = useRef<number>(215); // Azul neón
  const bgGradientRef = useRef<{ start: string; end: string }>({ 
    start: 'rgba(20, 0, 50, 1)', // Violeta oscuro
    end: 'rgba(0, 5, 20, 1)' // Azul muy oscuro
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true
      };
      
      // Create particles on mouse move
      createParticlesAtMouse();
    };

    const handleMouseDown = () => {
      // Create circles on mouse click
      for (let i = 0; i < 3; i++) {
        const radius = Math.random() * 100 + 50;
        const hue = Math.random() * 360;
        circlesRef.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          radius: radius,
          color: `hsla(${hue}, 100%, 60%, 0.4)`,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 100 + Math.random() * 100
        });
      }
    };

    const handleMouseLeave = () => {
      mousePos.current.isActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Create particles at mouse position
    const createParticlesAtMouse = () => {
      if (!mousePos.current.isActive) return;
      
      const count = 2;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 5 + 2;
        const speed = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const hue = (hueRef.current + Math.random() * 30) % 360;
        
        particlesRef.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          size: size,
          color: `hsla(${hue}, 100%, 60%, 0.8)`,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.02
        });
      }
    };

    // Animation loop
    const render = (time: number) => {
      if (!ctxRef.current) return;

      // Calculate delta time
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Create background gradient
      const gradient = ctxRef.current.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, bgGradientRef.current.start);
      gradient.addColorStop(1, bgGradientRef.current.end);

      // Draw background
      ctxRef.current.fillStyle = gradient;
      ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);

      // Slowly change hue over time
      hueRef.current = (hueRef.current + 0.1) % 360;
      
      // Update background gradient colors
      if (mousePos.current.isActive) {
        const yPercent = mousePos.current.y / canvas.height;
        const xPercent = mousePos.current.x / canvas.width;
        
        bgGradientRef.current.start = `hsla(${(hueRef.current + 50) % 360}, ${70 + xPercent * 30}%, ${60 + yPercent * 20}%, 1)`;
        bgGradientRef.current.end = `hsla(${(hueRef.current + 180) % 360}, ${80 - xPercent * 30}%, ${30 - yPercent * 20}%, 1)`;
      }

      // Draw circles
      ctxRef.current.globalCompositeOperation = 'lighter';
      for (let i = 0; i < circlesRef.current.length; i++) {
        const circle = circlesRef.current[i];
        
        // Update position
        circle.x += circle.vx;
        circle.y += circle.vy;
        
        // Bounce off edges
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
          circle.vx *= -1;
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
          circle.vy *= -1;
        }
        
        // Update life
        circle.life++;
        const opacity = 1 - (circle.life / circle.maxLife);
        
        // Draw circle
        ctxRef.current.beginPath();
        const gradient = ctxRef.current.createRadialGradient(
          circle.x, circle.y, 0, 
          circle.x, circle.y, circle.radius
        );
        const colorStart = circle.color.replace('0.4', `${opacity * 0.7}`);
        const colorEnd = circle.color.replace('0.4', '0');
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        
        ctxRef.current.fillStyle = gradient;
        ctxRef.current.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctxRef.current.fill();
        
        // Remove dead circles
        if (circle.life >= circle.maxLife) {
          circlesRef.current.splice(i, 1);
          i--;
        }
      }

      // Draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gravity
        particle.vy += 0.05;
        
        // Update alpha
        particle.alpha -= particle.decay;
        
        // Draw particle
        ctxRef.current.beginPath();
        ctxRef.current.fillStyle = particle.color.replace('0.8', `${particle.alpha}`);
        ctxRef.current.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxRef.current.fill();
        
        // Remove dead particles
        if (particle.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          i--;
        }
      }
      
      // Reset composite operation
      ctxRef.current.globalCompositeOperation = 'source-over';

      // Draw some circles in the background
      const time2 = time * 0.001;
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time2 * (0.2 + i * 0.1)) * canvas.width * 0.4 + canvas.width * 0.5;
        const y = Math.cos(time2 * (0.3 + i * 0.1)) * canvas.height * 0.4 + canvas.height * 0.5;
        const size = 100 + Math.sin(time2 * (0.4 + i * 0.1)) * 50;
        
        ctxRef.current.beginPath();
        const gradient = ctxRef.current.createRadialGradient(x, y, 0, x, y, size);
        const hue = (hueRef.current + i * 30) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0)`);
        
        ctxRef.current.fillStyle = gradient;
        ctxRef.current.arc(x, y, size, 0, Math.PI * 2);
        ctxRef.current.fill();
      }

      requestAnimationFrame(render);
    };

    // Create initial circles
    for (let i = 0; i < 5; i++) {
      circlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 100,
        color: `hsla(${Math.random() * 360}, 100%, 60%, 0.4)`,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        life: 0,
        maxLife: 200 + Math.random() * 100
      });
    }

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default GradientBackground;