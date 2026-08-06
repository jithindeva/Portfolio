/**
 * Interactive Particle Constellation Canvas Animation
 * High-performance HTML5 Canvas animation with cursor attraction & soft light navy nodes
 * Designed for D.P. Jithin's Light Navy Executive Portfolio
 */

(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resize);
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
            this.baseRadius = this.radius;
            // Soft Light Navy Palette for Light Background
            const colors = ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#64748B'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.35 + 0.15;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off canvas edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse attraction physics
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2.2;
                    this.y -= Math.sin(angle) * force * 2.2;
                    this.radius = this.baseRadius * (1 + force * 1.3);
                } else {
                    if (this.radius > this.baseRadius) {
                        this.radius -= 0.04;
                    }
                }
            } else {
                if (this.radius > this.baseRadius) {
                    this.radius -= 0.04;
                }
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor((width * height) / 13000), 75);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        const maxDist = 135;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(30, 58, 138, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw soft navy background glow around mouse
        if (mouse.x !== null && mouse.y !== null) {
            const bgGlow = ctx.createRadialGradient(
                mouse.x, mouse.y, 10,
                mouse.x, mouse.y, 360
            );
            bgGlow.addColorStop(0, 'rgba(30, 58, 138, 0.04)');
            bgGlow.addColorStop(0.5, 'rgba(37, 99, 235, 0.02)');
            bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, width, height);
        }

        drawConnections();

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    resize();
    animate();
})();
