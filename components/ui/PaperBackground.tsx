'use client';

import { useEffect, useRef } from 'react';
import { paletteChangeEvent } from '@/utils/palettes';
import { backgroundChangeEvent, isBackgroundEnabled } from '@/utils/paperBackground';

function seededRandom() {
  let seed = 71423;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

type Point = [number, number];
type Fiber = {
  points: Point[];
  x: number;
  y: number;
  rotation: number;
  color: string;
  opacity: number;
  lineWidth: number;
  dash: number[];
  delay: number;
};

// Split a Bézier curve at t so the visible part grows along the actual stroke.
function traceFiber(context: CanvasRenderingContext2D, points: Point[], t: number) {
  const partial = [points[0]];
  let remaining = points;
  while (remaining.length > 1) {
    remaining = remaining.slice(0, -1).map(([x, y], index) => {
      const next = remaining[index + 1];
      return [x + (next[0] - x) * t, y + (next[1] - y) * t];
    });
    partial.push(remaining[0]);
  }
  context.beginPath();
  context.moveTo(...partial[0]);
  if (partial.length === 4) {
    context.bezierCurveTo(...partial[1], ...partial[2], ...partial[3]);
  } else {
    context.quadraticCurveTo(...partial[1], ...partial[2]);
  }
  context.stroke();
}

function drawPaper(canvas: HTMLCanvasElement, fiberCanvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  const fiberContext = fiberCanvas.getContext('2d');
  if (!context || !fiberContext) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  fiberCanvas.width = canvas.width;
  fiberCanvas.height = canvas.height;
  fiberContext.scale(ratio, ratio);
  const random = seededRandom();
  const styles = getComputedStyle(document.documentElement);
  const base = styles.getPropertyValue('--paper-base-rgb').trim().split(/\s+/).map(Number);
  const accent = styles.getPropertyValue('--paper-accent').trim();
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

  // Soft fog/dust colors washed lightly over the paper.
  for (const [property, x, y, radius, opacity] of [
    ['--paper-fog', width * 0.08, height * 0.12, width * 0.7, 0.22],
    ['--paper-dust', width * 0.95, height * 0.65, width * 0.55, 0.14],
  ] as const) {
    const wash = context.createRadialGradient(x, y, 0, x, y, radius);
    wash.addColorStop(0, styles.getPropertyValue(property).trim());
    wash.addColorStop(1, 'transparent');
    context.globalAlpha = opacity;
    context.fillStyle = wash;
    context.fillRect(0, 0, width, height);
  }

  const strengthAt = (x: number) => 0.72 + Math.pow(Math.abs((x / width) * 2 - 1), 1.5) * 0.28;
  const mobile = width < 640;

  // Uneven ink flecks sit below the longer paper fibers.
  for (let i = 0; i < (width * height) / 2400; i++) {
    const x = random() * width;
    const y = random() * height;
    context.fillStyle = accent;
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
  const fibers: Fiber[] = [];
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

    const rotation = random() * Math.PI * 2;
    const dash = random() < 0.14 ? [length * 0.4, 5 + random() * 12, length * 0.3] : [];
    const points: Point[] =
      random() < 0.65
        ? [
            [0, 0],
            [length * 0.15, bend * 0.85],
            [length * 0.65, bend],
            [length, endBend],
          ]
        : [
            [0, 0],
            [length * 0.23, bend],
            [length * 0.66, -bend * 0.55],
            [length, endBend],
          ];
    const fiber: Fiber = {
      points,
      x,
      y,
      rotation,
      color: pale ? '#ffffff' : accent,
      opacity: pale ? (0.55 + random() * 0.4) * strength : (0.045 + random() * 0.055) * strength,
      lineWidth,
      dash,
      delay: (i / fiberCount) * 0.35,
    };
    fibers.push(fiber);

    if (random() < 0.2) {
      fibers.push({
        ...fiber,
        points: [
          [length * 0.12, 1.5],
          [length * 0.4, bend * 0.45 + 3],
          [length * 0.7, endBend + 2],
        ],
        opacity: fiber.opacity * (pale ? 0.7 : 0.45),
        lineWidth: lineWidth * 0.65,
        dash: [],
      });
    }
  }
  context.globalAlpha = 1;

  // Grain and color washes stay cached while only the light fiber layer animates.
  return (progress: number) => {
    fiberContext.clearRect(0, 0, width, height);
    fiberContext.lineCap = 'round';
    for (const fiber of fibers) {
      const t = Math.max(0, Math.min(1, (progress - fiber.delay) / (1 - fiber.delay)));
      if (t === 0) continue;
      fiberContext.save();
      fiberContext.translate(fiber.x, fiber.y);
      fiberContext.rotate(fiber.rotation);
      fiberContext.setLineDash(fiber.dash);
      fiberContext.strokeStyle = fiber.color;
      fiberContext.globalAlpha = fiber.opacity;
      fiberContext.lineWidth = fiber.lineWidth;
      traceFiber(fiberContext, fiber.points, t);
      fiberContext.restore();
    }
  };
}

export default function PaperBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fiberCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fiberCanvas = fiberCanvasRef.current;
    if (!canvas || !fiberCanvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let progress = isBackgroundEnabled() ? 1 : 0;
    let render: ReturnType<typeof drawPaper>;
    let animationFrame = 0;

    const redraw = () => {
      render = undefined;
      if (isBackgroundEnabled() || progress > 0) {
        render = drawPaper(canvas, fiberCanvas);
        render?.(progress);
      }
    };
    const animate = () => {
      cancelAnimationFrame(animationFrame);
      const target = isBackgroundEnabled() ? 1 : 0;
      if (!render && target === 1) redraw();
      if (reducedMotion.matches) {
        progress = target;
        render?.(progress);
        return;
      }
      const from = progress;
      const started = performance.now();
      const duration = (target === 1 ? 1600 : 750) * Math.abs(target - from);
      if (duration === 0) return;
      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - started) / duration);
        progress = from + (target - from) * elapsed;
        render?.(progress);
        if (elapsed < 1) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(redraw, 120);
    };

    // Initial loads stay still; only an explicit toggle draws or erases the fibers.
    redraw();
    window.addEventListener('resize', resize);
    window.addEventListener(paletteChangeEvent, redraw);
    window.addEventListener(backgroundChangeEvent, animate);
    reducedMotion.addEventListener('change', animate);
    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener(paletteChangeEvent, redraw);
      window.removeEventListener(backgroundChangeEvent, animate);
      reducedMotion.removeEventListener('change', animate);
    };
  }, []);

  return (
    <div className="paper-background" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={fiberCanvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
