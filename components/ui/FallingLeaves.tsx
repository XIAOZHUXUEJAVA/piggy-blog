'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { createLeafSprites } from './leafSprites';

const START_DELAY = 3000;
const FRAME_INTERVAL = 1000 / 30;
const MAPLE_SHARE = 0.7;

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  angle: number;
  spin: number;
  opacity: number;
  age: number;
  delay: number;
  sprite: number;
}

const random = (min: number, max: number) => min + Math.random() * (max - min);

export default function FallingLeaves() {
  const [started, setStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const darkRef = useRef(resolvedTheme === 'dark');

  useEffect(() => {
    darkRef.current = resolvedTheme === 'dark';
  }, [resolvedTheme]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      clearTimeout(timer);
      setStarted(false);
      if (!preference.matches) timer = setTimeout(() => setStarted(true), START_DELAY);
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const lightSprites = createLeafSprites();
    const darkSprites = createLeafSprites(true);
    const variantsPerType = lightSprites.length / 2;
    let leaves: Leaf[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let disposed = false;
    let printing = false;

    const createLeaf = (initial = false): Leaf => ({
      x: random(-32, width + 32),
      y: initial ? random(-32, height) : random(-90, -35),
      size: random(20, 36) * 1.1 * (width < 640 ? 0.8 : 1),
      speed: random(16, 32),
      drift: random(-7, 11),
      phase: random(0, Math.PI * 2),
      angle: random(0, Math.PI * 2),
      spin: random(-0.35, 0.35),
      opacity: random(0.3, 0.52),
      age: 0,
      delay: initial ? random(0, 3.5) : 0,
      // The atlas contains ginkgo variants first, followed by maple variants.
      sprite: Math.floor(random(0, variantsPerType)) + (Math.random() < MAPLE_SHARE ? variantsPerType : 0),
    });

    const resize = () => {
      const nextWidth = document.documentElement.clientWidth;
      const nextHeight = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      for (const leaf of leaves) {
        leaf.x *= nextWidth / (width || nextWidth);
        leaf.y *= nextHeight / (height || nextHeight);
      }
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(6, Math.min(width < 640 ? 10 : 34, Math.round((width * height) / 55000)));
      leaves = leaves.slice(0, count);
      while (leaves.length < count) leaves.push(createLeaf(true));
    };

    const animate = (time: number) => {
      frame = 0;
      if (disposed || document.hidden || printing) return;
      frame = requestAnimationFrame(animate);
      if (!previousTime) {
        previousTime = time;
        return;
      }
      const interval = time - previousTime;
      if (interval < FRAME_INTERVAL) return;
      const delta = Math.min(interval / 1000, 0.08);
      previousTime = time;
      elapsed += delta;
      context.clearRect(0, 0, width, height);
      const dark = darkRef.current;
      const sprites = dark ? darkSprites : lightSprites;

      for (const leaf of leaves) {
        leaf.age += delta;
        if (leaf.age < leaf.delay) continue;
        leaf.x += (leaf.drift + Math.sin(elapsed * 0.45 + leaf.phase) * 12) * delta;
        leaf.y += leaf.speed * delta;
        leaf.angle += leaf.spin * delta;
        if (leaf.y > height + 40 || leaf.x < -80 || leaf.x > width + 80) {
          Object.assign(leaf, createLeaf());
          continue;
        }

        const fadeIn = Math.min(1, (leaf.age - leaf.delay) / 2);
        const fadeOut = Math.min(1, Math.max(0, (height + 24 - leaf.y) / 100));
        // Keep the reading column quieter; the wider margins carry most of the motion.
        const distanceFromCenter = Math.abs(leaf.x - width / 2);
        const centerWeight = Math.min(1, distanceFromCenter / Math.min(width * 0.4, 520));
        const readingOpacity = 0.38 + 0.62 * centerWeight;
        context.save();
        context.globalAlpha = leaf.opacity * fadeIn * fadeOut * readingOpacity * (dark ? 0.85 : 1);
        context.translate(leaf.x, leaf.y);
        context.rotate(leaf.angle + Math.sin(elapsed * 0.6 + leaf.phase) * 0.35);
        const tilt = Math.cos(elapsed * 0.9 + leaf.phase);
        context.scale(tilt, 1);
        const sprite = tilt >= 0 ? sprites[leaf.sprite].front : sprites[leaf.sprite].back;
        context.drawImage(sprite, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
        context.restore();
      }
    };

    const syncPlayback = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      if (!document.hidden && !printing) frame = requestAnimationFrame(animate);
    };
    const beforePrint = () => {
      printing = true;
      syncPlayback();
    };
    const afterPrint = () => {
      printing = false;
      syncPlayback();
    };

    resize();
    syncPlayback();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', syncPlayback);
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', syncPlayback);
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, [started]);

  if (!started) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full motion-reduce:hidden print:hidden"
    />
  );
}
