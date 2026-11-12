interface LeafPalette {
  tip: string;
  body: string;
  base: string;
  vein: string;
}

export interface LeafSprite {
  front: HTMLCanvasElement;
  back: HTMLCanvasElement;
}

const GINKGO_PALETTES: LeafPalette[] = [
  { tip: '#dbbc51', body: '#c6a146', base: '#8e8748', vein: '#80713b' },
  { tip: '#c2ba68', body: '#a4ad5c', base: '#748547', vein: '#63763f' },
  { tip: '#e3be6a', body: '#c99b4d', base: '#a47a3f', vein: '#8c6337' },
];
const MAPLE_PALETTES: LeafPalette[] = [
  { tip: '#c17849', body: '#bc8c4e', base: '#d2ae65', vein: '#885735' },
  { tip: '#ad6451', body: '#ba7559', base: '#d1a26d', vein: '#804b3d' },
  { tip: '#9b9e57', body: '#a8a663', base: '#c5b775', vein: '#6e7944' },
];

// Small irregularities keep the fan edge and seven lobes from looking like icons.
const GINKGO_OUTLINE =
  'M -.03 .57 C -.2 .38 -.56 .28 -.79 .04 C -.96 -.14 -1.03 -.38 -.97 -.53 ' +
  'Q -.94 -.62 -.88 -.64 Q -.85 -.74 -.76 -.74 Q -.7 -.84 -.61 -.82 ' +
  'Q -.53 -.92 -.43 -.88 Q -.34 -.97 -.25 -.91 Q -.16 -.95 -.09 -.85 ' +
  'C -.05 -.79 -.05 -.7 .01 -.66 C .07 -.71 .06 -.81 .13 -.86 ' +
  'Q .23 -.96 .32 -.89 Q .43 -.94 .52 -.84 Q .62 -.86 .7 -.76 ' +
  'Q .82 -.76 .86 -.65 Q .97 -.61 .97 -.48 C 1 -.25 .86 -.01 .65 .15 ' +
  'C .39 .34 .14 .39 .04 .57 Z';
const MAPLE_OUTLINE =
  'M -.02 .64 C -.14 .58 -.26 .56 -.37 .6 L -.35 .48 L -.55 .51 L -.48 .36 ' +
  'Q -.65 .29 -.81 .3 L -.72 .18 L -.94 .02 L -.76 -.02 L -.85 -.18 ' +
  'L -.66 -.14 L -.69 -.32 L -.5 -.2 Q -.42 -.17 -.37 -.2 ' +
  'L -.52 -.58 L -.36 -.5 L -.4 -.73 L -.25 -.61 L -.25 -.83 ' +
  'L -.12 -.71 L -.08 -.92 L .02 -1.1 L .12 -.86 L .14 -.72 L .26 -.84 ' +
  'L .25 -.62 L .4 -.74 L .37 -.51 L .53 -.58 L .38 -.2 ' +
  'Q .46 -.17 .51 -.23 L .7 -.34 L .65 -.14 L .84 -.19 L .77 -.02 ' +
  'L .96 .01 L .74 .17 L .83 .28 Q .65 .28 .49 .37 L .55 .5 ' +
  'L .35 .47 L .36 .59 Q .15 .54 .03 .64 Z';

function drawVein(context: CanvasRenderingContext2D, x: number, y: number, endX: number, endY: number) {
  context.beginPath();
  context.moveTo(x, y);
  context.quadraticCurveTo(x * 0.55 + endX * 0.45, y * 0.3 + endY * 0.7, endX, endY);
  context.stroke();
}

function drawVeins(context: CanvasRenderingContext2D, ginkgo: boolean) {
  if (ginkgo) {
    // Ginkgo veins radiate and fork; they do not share a central midrib.
    for (let index = 0; index < 15; index++) {
      const angle = -2.4 + (index / 14) * 1.68;
      const endX = Math.cos(angle) * 1.19;
      const endY = 0.4 + Math.sin(angle) * 1.4;
      drawVein(context, 0, 0.55, endX, endY);
      drawVein(context, endX * 0.58, 0.55 + (endY - 0.55) * 0.58, endX + 0.065, endY - 0.025);
    }
    return;
  }

  const tips = [
    [0.02, -1.02],
    [-0.38, -0.67],
    [0.39, -0.68],
    [-0.86, 0.015],
    [0.87, 0.01],
    [-0.47, 0.45],
    [0.48, 0.44],
  ];
  for (const [x, y] of tips) {
    context.lineWidth = 0.012;
    drawVein(context, 0, 0.56, x, y);
    context.lineWidth = 0.005;
    for (let index = 1; index <= 4; index++) {
      const amount = index / 5;
      const startX = x * amount;
      const startY = 0.56 + (y - 0.56) * amount;
      const spread = (1 - amount) * 0.2;
      drawVein(context, startX, startY, startX + spread, startY - 0.16);
      drawVein(context, startX, startY, startX - spread, startY - 0.13);
    }
  }
}

function createFace(shape: Path2D, palette: LeafPalette, ginkgo: boolean, back: boolean, seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 160;
  const context = canvas.getContext('2d');
  if (!context) return canvas;

  // Texture is baked once into a high resolution sprite, never generated per frame.
  let noise = seed;
  const next = () => {
    noise = (Math.imul(noise, 1664525) + 1013904223) >>> 0;
    return noise / 4294967296;
  };
  context.translate(80, 78);
  context.scale(61 * (seed % 2 ? 1 : -0.96), 61);
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.save();
  context.clip(shape);
  const color = context.createLinearGradient(-0.45, -0.9, 0.35, 0.65);
  color.addColorStop(0, palette.tip);
  color.addColorStop(0.48, palette.body);
  color.addColorStop(1, palette.base);
  context.fillStyle = color;
  context.fillRect(-1.2, -1.2, 2.4, 2.4);

  const light = context.createRadialGradient(-0.35, -0.45, 0.03, 0, -0.2, 1.25);
  light.addColorStop(0, `rgba(255, 244, 190, ${back ? 0.4 : 0.27})`);
  light.addColorStop(0.5, 'rgba(255, 238, 186, 0.04)');
  light.addColorStop(1, 'rgba(100, 58, 25, 0.16)');
  context.fillStyle = light;
  context.fillRect(-1.2, -1.2, 2.4, 2.4);

  for (let index = 0; index < 150; index++) {
    context.fillStyle = index % 3 ? 'rgba(255, 246, 210, 0.13)' : 'rgba(111, 67, 29, 0.09)';
    context.beginPath();
    context.ellipse(
      next() * 2.1 - 1.05,
      next() * 2 - 1,
      0.003 + next() * 0.011,
      0.004 + next() * 0.02,
      next() * Math.PI,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  context.strokeStyle = palette.vein;
  context.globalAlpha = back ? 0.32 : 0.48;
  context.lineWidth = 0.006;
  drawVeins(context, ginkgo);
  context.globalAlpha = 1;

  // A narrow crease suggests a curved surface without a drop shadow or hard outline.
  const fold = context.createLinearGradient(-0.12, 0, 0.12, 0);
  fold.addColorStop(0, 'rgba(255, 244, 200, 0)');
  fold.addColorStop(0.43, 'rgba(255, 244, 200, 0.18)');
  fold.addColorStop(0.52, 'rgba(116, 77, 33, 0.1)');
  fold.addColorStop(1, 'rgba(116, 77, 33, 0)');
  context.fillStyle = fold;
  context.fillRect(-0.14, -1.15, 0.28, 1.8);
  if (back) {
    context.fillStyle = 'rgba(255, 236, 192, 0.15)';
    context.fillRect(-1.2, -1.2, 2.4, 2.4);
  }
  context.restore();

  context.strokeStyle = palette.base;
  context.globalAlpha = 0.35;
  context.lineWidth = 0.009;
  context.stroke(shape);
  context.globalAlpha = 0.8;
  context.strokeStyle = palette.vein;
  context.lineWidth = 0.019;
  context.beginPath();
  context.moveTo(0, 0.53);
  context.bezierCurveTo(0.015, 0.74, 0.13, 0.86, 0.09, 1.07);
  context.stroke();
  return canvas;
}

export function createLeafSprites(): LeafSprite[] {
  return [GINKGO_PALETTES, MAPLE_PALETTES].flatMap((palettes, shapeIndex) => {
    const ginkgo = shapeIndex === 0;
    const shape = new Path2D(ginkgo ? GINKGO_OUTLINE : MAPLE_OUTLINE);
    return palettes.map((palette, index) => ({
      front: createFace(shape, palette, ginkgo, false, index + 41),
      back: createFace(shape, palette, ginkgo, true, index + 41),
    }));
  });
}
