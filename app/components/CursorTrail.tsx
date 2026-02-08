'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas
        const resizeObserver = new ResizeObserver(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        resizeObserver.observe(document.body);

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            createParticle();
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Particle logic
        const colors = ['#ff4d6d', '#ff8fa3', '#ffccd5', '#fff0f3'];

        const createParticle = () => {
            particles.current.push({
                x: mouse.current.x,
                y: mouse.current.y,
                size: Math.random() * 5 + 2,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];

                // Update
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.95; // Shrink
                p.life -= 0.02; // Fade

                // Draw
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life > 0 ? p.life : 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Remove dead particles
                if (p.life <= 0 || p.size <= 0.5) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
}
