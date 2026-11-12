'use client';

import { useEffect, useRef } from 'react';

function seededRandom() {
  let seed = 71423;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function drawPaper(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const random = seededRandom();
  const base = getComputedStyle(document.documentElement)
    .getPropertyValue('--paper-base-rgb')
    .trim()
    .split(/\s+/)
    .map(Number);
  const grain = context.createImageData(canvas.width, canvas.height);

  // Full-viewport grain avoids a visible repeating tile. Keep the reading column quieter.
  for (let x = 0; x < canvas.width; x++) {
    const edge = Math.pow(Math.abs((x / canvas.width) * 2 - 1), 1.5);
    for (let y = 0; y < canvas.height; y++) {
      const offset = (y * canvas.width + x) * 4;
      const variation = random() > 0.72 ? (random() - 0.68) * 17 * (0.4 + edge * 0.6) : 0;
      grain.data[offset] = base[0] + variation;
      grain.data[offset + 1] = base[1] + variation;
      grain.data[offset + 2] = base[2] + variation;
      grain.data[offset + 3] = 255;
    }
  }
  context.putImageData(grain, 0, 0);
  context.scale(ratio, ratio);

  const strengthAt = (x: number) => 0.72 + Math.pow(Math.abs((x / width) * 2 - 1), 1.5) * 0.28;
  const mobile = width < 640;

  // Uneven ink flecks sit below the longer paper fibers.
  for (let i = 0; i < (width * height) / 2400; i++) {
    const x = random() * width;
    const y = random() * height;
    context.fillStyle = '#8d806b';
    context.globalAlpha = (0.045 + random() * 0.13) * strengthAt(x);
    context.beginPath();
    context.ellipse(x, y, 0.25 + random() * 0.65, 0.2 + random() * 0.4, random() * Math.PI, 0, Math.PI * 2);
    context.fill();
  }

  const fiberCount = Math.round((width * height) / (mobile ? 4300 : 3600));
  const clusters = Array.from({ length: mobile ? 3 : 7 }, () => ({
    x: random() * width,
    y: random() * height,
  }));
  context.lineCap = 'round';
  for (let i = 0; i < fiberCount; i++) {
    const cluster = clusters[Math.floor(random() * clusters.length)];
    const clustered = random() < 0.22;
    const spread = mobile ? 140 : 260;
    const x = clustered ? cluster.x + (random() - 0.5) * spread : random() * width;
    const y = clustered ? cluster.y + (random() - 0.5) * spread : random() * height;
    const lengthChoice = random();
    const length =
      (lengthChoice < 0.22 ? 25 + random() * 55 : lengthChoice < 0.8 ? 85 + random() * 125 : 210 + random() * 120) *
      (mobile ? 0.65 : 1);
    const bend = (random() - 0.5) * length * 1.5;
    const endBend = (random() - 0.5) * length * 0.6;
    const pale = random() < 0.76;
    const strength = strengthAt(Math.max(0, Math.min(width, x)));
    const lineWidth = pale ? 0.65 + random() * 0.8 : 0.35 + random() * 0.45;

    context.save();
    context.translate(x, y);
    context.rotate(random() * Math.PI * 2);
    if (random() < 0.14) context.setLineDash([length * 0.4, 5 + random() * 12, length * 0.3]);
    context.beginPath();
    context.moveTo(0, 0);
    if (random() < 0.65) {
      context.bezierCurveTo(length * 0.15, bend * 0.85, length * 0.65, bend, length, endBend);
    } else {
      context.bezierCurveTo(length * 0.23, bend, length * 0.66, -bend * 0.55, length, endBend);
    }
    context.strokeStyle = pale ? '#ffffff' : ['#a99b83', '#aca99e', '#bab2a2'][i % 3];
    context.globalAlpha = pale ? (0.55 + random() * 0.4) * strength : (0.045 + random() * 0.055) * strength;
    context.lineWidth = lineWidth;
    context.stroke();

    if (random() < 0.2) {
      context.setLineDash([]);
      context.globalAlpha *= pale ? 0.7 : 0.45;
      context.lineWidth *= 0.65;
      context.beginPath();
      context.moveTo(length * 0.12, 1.5);
      context.quadraticCurveTo(length * 0.4, bend * 0.45 + 3, length * 0.7, endBend + 2);
      context.stroke();
    }
    context.restore();
  }
  context.globalAlpha = 1;
}

export default function PaperBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => drawPaper(canvas);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 120);
    };

    // Static texture: redraw only when the viewport changes.
    draw();
    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="paper-background" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
