(function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.id = 'starfield-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  // Use a dark gradient or transparent if the theme handles the background color
  // canvas.style.background = 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'; 
  
  document.body.appendChild(canvas);

  let width, height;
  let stars = [];
  const numStars = 100;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Optional: Draw a subtle dark overlay if the theme is too bright
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'white';
    stars.forEach(star => {
      ctx.globalAlpha = star.opacity;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      star.y -= star.speed; // Move up
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
      
      // Twinkle effect
      star.opacity += (Math.random() - 0.5) * 0.05;
      if (star.opacity < 0) star.opacity = 0;
      if (star.opacity > 1) star.opacity = 1;
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
