import React, { useRef, useEffect } from "react";

const StarField = () => {
  const canvasRef = useRef(null);
  const stars = [];
  const planets = [];
  const shootings = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 🌟 Tạo sao
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: 0.02 + Math.random() * 0.03,
        alpha: Math.random(),
      });
    }

    // 🌞 Tạo hành tinh quay quanh Mặt Trời (ở góc phải dưới)
    const sun = { x: canvas.width - 150, y: canvas.height - 150, r: 25 };
    for (let i = 1; i <= 3; i++) {
      planets.push({
        r: 40 + i * 25,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 * i,
        size: 6 - i,
      });
    }

    // 💫 Sao băng
    const createShooting = () => {
      shootings.push({
        x: Math.random() * canvas.width,
        y: 0,
        len: 150 + Math.random() * 100,
        speed: 8 + Math.random() * 3,
        alpha: 1,
      });
    };

    let last = 0;
    const loop = (now) => {
      const dt = now - last;
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nền vũ trụ
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#030316");
      gradient.addColorStop(1, "#000010");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🌟 Vẽ sao
      ctx.fillStyle = "white";
      for (let s of stars) {
        s.alpha += s.speed;
        const twinkle = 0.5 + Math.sin(s.alpha) * 0.5;
        ctx.globalAlpha = twinkle;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      // ☄️ Sao băng
      if (Math.random() < 0.008) createShooting();
      for (let i = shootings.length - 1; i >= 0; i--) {
        const s = shootings[i];
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y + s.len / 2);
        ctx.stroke();
        s.x += s.speed;
        s.y += s.speed / 2;
        s.alpha -= 0.01;
        if (s.alpha <= 0) shootings.splice(i, 1);
      }

      // 🌞 Hệ Mặt Trời nhỏ ở góc phải dưới
      ctx.globalAlpha = 1;
      ctx.beginPath();
      const glow = ctx.createRadialGradient(sun.x, sun.y, 5, sun.x, sun.y, 30);
      glow.addColorStop(0, "rgba(255,255,180,1)");
      glow.addColorStop(1, "rgba(255,200,50,0)");
      ctx.fillStyle = glow;
      ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
      ctx.fill();

      // 🪐 Vẽ hành tinh quay quanh
      planets.forEach((p) => {
        p.angle += p.speed;
        const x = sun.x + Math.cos(p.angle) * p.r;
        const y = sun.y + Math.sin(p.angle) * p.r;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,150,255,0.9)";
        ctx.fill();
      });

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default StarField;
