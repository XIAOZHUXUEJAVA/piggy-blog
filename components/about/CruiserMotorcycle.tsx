import styles from './AboutPage.module.css';

function CruiserWheel({ x, radius }: { x: number; radius: number }) {
  return (
    <g transform={`translate(${x} 185)`}>
      <circle r={radius} fill="#25282a" stroke="#161a1d" strokeWidth="2" />
      <circle r={radius - 4} stroke="#414548" strokeWidth="1.5" />
      <circle r={radius - 11} fill="#22282c" stroke="#9a9d99" strokeWidth="2" />
      <circle r={radius - 15} stroke="#565e61" strokeWidth="1.2" />
      <g className={styles.cruiserSpokes}>
        {Array.from({ length: 8 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 45})`}>
            <path d={`M-4-9-8-${radius - 12}h5L5-9Z`} fill="#aeb3ae" stroke="#454e52" strokeWidth="1" />
            <path d={`M-3-15-5-${radius - 15}`} stroke="#e2e3d9" strokeWidth="1" />
          </g>
        ))}
      </g>
      <circle r="24" fill="#727c7c" fillOpacity="0.28" stroke="#8a9390" strokeWidth="1.5" />
      <circle r="18" stroke="#4b5559" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, index) => (
        <circle key={index} cx={21 * Math.cos((index * Math.PI) / 5)} cy={21 * Math.sin((index * Math.PI) / 5)} r="1.3" fill="#222a2d" />
      ))}
      <circle r="10" fill="#505b60" stroke="#b9bfb7" strokeWidth="1.5" />
      <circle r="4" fill="#b9beb6" stroke="#697673" />
      <path d={`M-${radius - 5}-10a${radius - 4} ${radius - 4} 0 0 1 10-${radius - 17}`} stroke="#565b5b" strokeWidth="1.5" />
    </g>
  );
}

export default function CruiserMotorcycle() {
  return (
    <svg className={styles.cruiserIllustration} viewBox="0 -18 420 273" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cruiser-tank" x1="239" y1="64" x2="253" y2="114" gradientUnits="userSpaceOnUse">
          <stop stopColor="#555a5c" />
          <stop offset="0.36" stopColor="#33393d" />
          <stop offset="1" stopColor="#1e252a" />
        </linearGradient>
        <linearGradient id="cruiser-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#d9ddd3" />
          <stop offset="0.35" stopColor="#9da8a4" />
          <stop offset="0.55" stopColor="#e0e4da" />
          <stop offset="1" stopColor="#687674" />
        </linearGradient>
        <linearGradient id="cruiser-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#656d6e" />
          <stop offset="0.25" stopColor="#383f43" />
          <stop offset="1" stopColor="#20272c" />
        </linearGradient>
      </defs>
      <ellipse cx="212" cy="242" rx="176" ry="5" fill="currentColor" opacity="0.07" />
      <g stroke="#263136" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 241h359" stroke="currentColor" opacity="0.12" />
        <CruiserWheel x={100} radius={54} />
        <CruiserWheel x={331} radius={55} />
        {/* Low tubular chassis, swingarm and rear suspension. */}
        <path d="m100 185 65-35 72 39-76 9-61-13 49-61m16 26 28-40 76-9-27 81" stroke="#202a2d" strokeWidth="8" />
        <path d="m103 185 61-31 69 35m-62 13 71-7 35-60 16-40" stroke="#515b5b" strokeWidth="2" />
        <path d="m159 117-32 58" stroke="#161e23" strokeWidth="11" />
        <path d="m156 122-26 49" stroke="#7b8580" strokeWidth="4" />
        <path d="m150 126 7 7-13 1 7 8-13 1 7 8-13 1 7 8-12 1" stroke="#abb1a6" strokeWidth="2.4" />
        <circle cx="158" cy="119" r="4" fill="#aeb6aa" />
        <circle cx="128" cy="173" r="4" fill="#aeb6aa" />
        <path d="M161 122h31l14 16-18 20h-26l-9-20Z" fill="#343d42" stroke="#19262b" strokeWidth="2" />
        <path d="m166 126 23 1 8 9" stroke="#656e6d" strokeWidth="1.3" />
        {/* The V-twin sits directly below the tank, ahead of the seat. */}
        <path d="m206 153 16-6 29 4 13 33-16 16h-33l-17-18Z" fill="#303b3f" stroke="#18272b" strokeWidth="2" />
        <path d="m222 169-25-43 20-11 25 42m-1 8 17-47 23 9-21 47" fill="#2b363a" stroke="#17272b" strokeWidth="2" />
        <path d="m194 125 24-13 6 10-25 13Zm62-10 28 11-4 11-28-12Z" fill="url(#cruiser-chrome)" stroke="#657471" strokeWidth="1.5" />
        <path d="m201 136 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m18-16 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10" stroke="#8c9c98" strokeWidth="2" />
        <path d="m208 129 21 35m39-33-15 35" stroke="#c1c9bd" strokeWidth="2.2" />
        <path d="m205 116-3-6m66 9 3-7" stroke="#ccd0bf" strokeWidth="3" />
        <path d="m203 110-5-3m73 5 7-5" stroke="#313d3d" strokeWidth="2" />
        <circle cx="240" cy="137" r="14" fill="#252f33" stroke="#66746f" strokeWidth="2" />
        <circle cx="240" cy="137" r="8" fill="#a8b3a6" stroke="#d9ded0" strokeWidth="1.5" />
        <circle cx="240" cy="137" r="4" fill="#3c4c4b" />
        <ellipse cx="231" cy="179" rx="23" ry="20" fill="#344246" stroke="#18292d" strokeWidth="2.5" />
        <circle cx="231" cy="179" r="15" fill="url(#cruiser-chrome)" stroke="#7d8e86" strokeWidth="1.5" />
        <circle cx="231" cy="179" r="9" fill="#586c69" stroke="#d5dbcd" />
        <path d="m228 179 6-1" stroke="#e6e8db" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <circle key={angle} cx={231 + 19 * Math.cos((angle * Math.PI) / 180)} cy={179 + 16 * Math.sin((angle * Math.PI) / 180)} r="1.5" fill="#a2afa2" stroke="none" />
        ))}
        <path d="m193 175-16 3-9 13 17 8 27-4" fill="#455552" stroke="#213336" strokeWidth="2" />
        <path d="m179 184 19 4" stroke="#8b9c8e" strokeWidth="1.5" />
        {/* Separate headers turn down, then back toward the rear wheel. */}
        <path d="M207 148c-5 5-9 13-9 20 0 10-10 16-24 16h-49m148-35c-7 8-6 18-13 29-9 16-26 28-51 28h-82" stroke="#19272c" strokeWidth="10" />
        <path d="M207 148c-5 5-9 13-9 20 0 10-10 16-24 16h-49m148-35c-7 8-6 18-13 29-9 16-26 28-51 28h-82" stroke="#566461" strokeWidth="5.5" />
        <path d="M207 149c-5 7-6 13-7 19m73-18c-6 8-5 17-13 29" stroke="#8b9690" strokeWidth="1.8" />
        <path d="M91 174h83c4 0 5 4 5 10s-1 10-5 10H91Z" fill="url(#cruiser-pipe)" stroke="#1b292e" strokeWidth="2" />
        <path d="M90 197h88c4 0 5 4 5 10s-1 10-5 10H90Z" fill="url(#cruiser-pipe)" stroke="#1b292e" strokeWidth="2" />
        <path d="M89 174h8v20h-8c-3 0-4-4-4-10s1-10 4-10Zm-1 23h8v20h-8c-3 0-4-4-4-10s1-10 4-10Z" fill="url(#cruiser-chrome)" stroke="#65756f" strokeWidth="1.3" />
        <path d="m102 177 65 1m-65 22 68 1" stroke="#7e8982" strokeWidth="1.2" />
        <path d="m162 176 1 16m2 7 1 16" stroke="#626f68" strokeWidth="2" />
        <path d="m88 179-1 10m0 13-1 10" stroke="#253633" strokeWidth="2.5" />
        <path d="M192 201c22 11 61 12 82-1l18-48" stroke="#1d2c30" strokeWidth="7" />
        <path d="m198 202 36 8 32-8" stroke="#59685f" strokeWidth="1.4" />
        <path d="m260 194 15-2 7 5-21 3Z" fill="#535e58" stroke="#223531" strokeWidth="1.5" />
        <path d="m262 196 14-1" stroke="#acb8a5" />
        {/* Rounded rear fender and two low, stepped saddles. */}
        <path d="M60 143c20-29 60-33 88-12l-5 9c-24-17-52-14-75 11Z" fill="#30393e" stroke="#1c292e" strokeWidth="2" />
        <path d="M65 140c20-20 48-26 73-12" stroke="#737b77" strokeWidth="1.5" />
        <path d="M93 115c1-8 18-11 39-9l14 7-3 9h-44Z" fill="#222b2e" stroke="#18272b" strokeWidth="2" />
        <path d="m100 111 29-1 10 5" stroke="#6f7770" strokeWidth="1.5" />
        <path d="M139 112c13-3 24 3 35 4l23-6c6-1 10 2 10 7-1 7-12 11-25 11l-32-3c-9-1-14-7-11-13Z" fill="#252e32" stroke="#14252b" strokeWidth="2" />
        <path d="M145 116c10 1 20 6 32 5l22-6" stroke="#747c73" strokeWidth="1.3" />
        <path d="m66 144-13 16-10 27" stroke="#242f32" strokeWidth="5" />
        <path d="m46 172 12 4-5 16-14-4Z" fill="#89968a" stroke="#34443d" strokeWidth="1.5" />
        <path d="M58 143h9v6h-9Z" fill="#aa6859" stroke="#4a4237" />
        <circle cx="71" cy="144" r="3" fill="#ba9261" stroke="#5e6551" />
        {/* Broad teardrop fuel tank; engine remains directly underneath. */}
        <path d="M199 99c17-20 38-32 66-33 12 0 22 5 23 14 0 14-11 30-24 35l-47-2c-13-1-21-5-18-14Z" fill="url(#cruiser-tank)" stroke="#1c2a2f" strokeWidth="2.5" />
        <path d="M207 96c18-17 35-25 57-26 9 0 15 2 18 7" stroke="#8b9187" strokeWidth="1.5" />
        <path d="M210 108c13 4 34 5 51 2" stroke="#4c5958" strokeWidth="1.2" />
        <path d="m243 68 10-2 3 3-10 3Z" fill="#a1aca0" stroke="#495d54" />
        <path d="m225 90 28-5m-27 9 18-3" stroke="#b6c0ae" strokeWidth="1.6" />
        <path d="m252 84 5 4-6 2" stroke="#b6c0ae" strokeWidth="1.2" />
        {/* Raked telescopic fork, round headlamp and compact front fender. */}
        <path d="m295 94 36 91m-27-92 34 89" stroke="#1b292d" strokeWidth="9" />
        <path d="m299 108 15 39m-6-40 14 38" stroke="url(#cruiser-chrome)" strokeWidth="5" />
        <path d="m314 147 17 38m-9-39 16 36" stroke="#3a4849" strokeWidth="8" />
        <path d="m316 152 11 27" stroke="#6b7a72" strokeWidth="1.5" />
        <path d="m299 122 5-2 6 15-5 2Z" fill="#c59b52" stroke="#7c7954" />
        <path d="M301 151c17-13 38-14 56-4l7 9-7 2c-16-10-36-9-51 2Z" fill="#313d42" stroke="#1b2b30" strokeWidth="2" />
        <path d="M307 150c16-8 32-8 46-1" stroke="#7a837b" strokeWidth="1.3" />
        <path d="m285 84 14-12 14 5 4 24-18 10-13-9Z" fill="#29373c" stroke="#182b30" strokeWidth="2" />
        <path d="m291 83 10-6 9 3" stroke="#6e7e77" strokeWidth="1.5" />
        <ellipse cx="314" cy="92" rx="10" ry="17" fill="url(#cruiser-chrome)" stroke="#667d74" strokeWidth="2" transform="rotate(-17 314 92)" />
        <ellipse cx="315" cy="92" rx="7" ry="13" fill="#e0dec5" stroke="#a7b2a0" strokeWidth="1.5" transform="rotate(-17 315 92)" />
        <path d="m313 82 3 15m-5-11 6 14m-6-5 8-2" stroke="#f9f1d6" strokeWidth="1.5" />
        <circle cx="291" cy="114" r="4" fill="#bb9255" stroke="#52634f" strokeWidth="1.5" />
        {/* Swept bars, cables, instrument pod and two mirrors. */}
        <path d="m287 88-10-22-15-9m15 9 14-13 17 6" stroke="#26383b" strokeWidth="5" />
        <path d="m264 59-12-4m52 3 11 4" stroke="#182c30" strokeWidth="6" />
        <path d="m281 78 5-17 13-1" stroke="#8b9a8d" strokeWidth="1.5" />
        <path d="M261 61c18 5 26 18 25 36m15-36c-4 16-3 27-5 39" stroke="#4e635e" strokeWidth="1.3" />
        <path d="m261 56-2-21-5-5m47 27 8-18 7-5" stroke="#485f56" strokeWidth="2" />
        <ellipse cx="252" cy="25" rx="7" ry="11" fill="#263b3a" stroke="#718374" strokeWidth="1.5" transform="rotate(-12 252 25)" />
        <path d="m250 19-1 7" stroke="#9da998" strokeWidth="1.5" />
        <ellipse cx="320" cy="31" rx="9" ry="6" fill="#4c6158" stroke="#839483" strokeWidth="1.5" transform="rotate(-23 320 31)" />
        <path d="m316 29 6-2" stroke="#bcc5b1" strokeWidth="1.3" />
        <path d="m275 65 5-8 10 1 4 6-8 5Z" fill="#263c3d" stroke="#849483" strokeWidth="1.5" />
        <path d="m280 61 6 1" stroke="#c6cfb6" strokeWidth="1.5" />
        {/* Relaxed cruiser posture, with forward controls and an exposed engine. */}
        <path d="M204 47c8-3 12 2 17 10l10 13 20-15 6 7-25 21c-4 3-9 1-12-3l-22-23Z" fill="#5c6a55" stroke="#354732" strokeWidth="2" />
        <path d="m249 56 7-5 6 2 2 6-8 4Z" fill="#453f34" stroke="#303d2e" strokeWidth="1.5" />
        <path d="M176 92c-12 6-12 17-3 22 12 6 32 6 47 8l28 3 15 43 14-2-10-50c-1-6-5-10-12-11l-52-9Z" fill="#4b5c63" stroke="#2e4249" strokeWidth="2" />
        <path d="m179 103 67 11c6 1 10 3 12 10l12 36" stroke="#8b9b9a" strokeWidth="1.5" />
        <path d="m249 111 11 6-4 9m-62-19 8 3" stroke="#30454b" strokeWidth="1.5" />
        <path d="m262 166 15-3 9 10 11 4c4 2 4 7-1 8h-29l-7-5Z" fill="#4d4236" stroke="#303d31" strokeWidth="2" />
        <path d="m268 181 26 1m-23-11 7 2m-5 2 7 2" stroke="#a59478" strokeWidth="1.5" />
        <path d="M187 40c-10 5-13 16-16 29l-7 27c11 7 26 10 41 6l7-29 4-19-11-13Z" fill="#6e7d60" stroke="#344832" strokeWidth="2" />
        <path d="m189 47-11 35 20 13m-30-1 30 6m-15-33 9 3m-12 4 9 3" stroke="#a4b18d" strokeWidth="1.5" />
        <path d="m200 47-8 25-2 17m-12-34 7 4-5 11" stroke="#43583b" strokeWidth="1.5" />
        <path d="M207 48c6-4 12-1 17 6l16 19 18-4 39-13 4 9-40 18-21 5c-5 1-9-1-13-5l-24-23Z" fill="#7c8b6b" stroke="#344832" strokeWidth="2" />
        <path d="m213 53 23 27c2 2 4 2 7 1l50-19" stroke="#b1bd98" strokeWidth="1.5" />
        <path d="m236 75 6 7m13-11 3 8" stroke="#516544" strokeWidth="1.5" />
        <path d="m296 57 8-3 9 4 2 6-7 5-9-3Z" fill="#4b4436" stroke="#34432f" strokeWidth="1.5" />
        <path d="m304 59 5 2m-6 1 5 2" stroke="#9f9378" strokeWidth="1.2" />
        <path d="m197 43 3-13 18 1-8 18" fill="#bf9875" stroke="#605d44" strokeWidth="1.5" />
        <path d="m199 38 12 7" stroke="#8b795c" strokeWidth="1.5" />
        <path d="M189 20c-3-15 7-27 22-27 16 0 26 11 24 26l-12 17-26-1Z" fill="#daceab" stroke="#626e51" strokeWidth="2" />
        <path d="M194 15c0-10 8-18 18-18" stroke="#f7edcd" strokeWidth="3" />
        <path d="m217 9 17 4-2 14-15 1-5-8Z" fill="#3d5350" stroke="#354c41" strokeWidth="1.5" />
        <path d="m219 13 10 3m-9 1 5 1" stroke="#9bb5a7" strokeWidth="1.5" />
        <path d="m197 32 9 7 16-4" stroke="#6c6b50" strokeWidth="2" />
        <circle cx="202" cy="21" r="4" fill="#b7bd9e" stroke="#788461" strokeWidth="1.5" />
        <circle cx="202" cy="21" r="1.5" fill="#748263" stroke="none" />
        <path d="m208 37 4 7 7-5" stroke="#4c5840" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
