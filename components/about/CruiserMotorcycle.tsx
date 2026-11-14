import styles from './AboutPage.module.css';

function CruiserWheel({ x, radius }: { x: number; radius: number }) {
  return (
    <g transform={`translate(${x} 185)`}>
      <circle r={radius} fill="url(#cruiser-rubber)" stroke="#161a1d" strokeWidth="2" />
      <circle r={radius - 4} stroke="#414548" strokeWidth="1.5" />
      <circle r={radius - 7} stroke="#161e21" strokeWidth="1" />
      {Array.from({ length: 24 }, (_, index) => (
        <path
          key={index}
          d={`M-2-${radius - 2} 1-${radius - 5}`}
          stroke="#515653"
          strokeWidth="1"
          opacity="0.5"
          transform={`rotate(${index * 15})`}
        />
      ))}
      <circle r={radius - 11} fill="#22282c" stroke="url(#cruiser-chrome)" strokeWidth="2.5" />
      <circle r={radius - 15} stroke="#565e61" strokeWidth="1.2" />
      <g className={styles.cruiserSpokes}>
        {Array.from({ length: 8 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 45})`}>
            <path d={`M-4-9-8-${radius - 12}h5L5-9Z`} fill="url(#cruiser-chrome)" stroke="#454e52" strokeWidth="1" />
            <path d={`M-3-15-5-${radius - 15}`} stroke="#e2e3d9" strokeWidth="1" />
          </g>
        ))}
      </g>
      <circle r="24" fill="#727c7c" fillOpacity="0.28" stroke="#8a9390" strokeWidth="1.5" />
      <circle r="18" stroke="#4b5559" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, index) => (
        <circle
          key={index}
          cx={21 * Math.cos((index * Math.PI) / 5)}
          cy={21 * Math.sin((index * Math.PI) / 5)}
          r="1.3"
          fill="#222a2d"
        />
      ))}
      <circle r="10" fill="url(#cruiser-engine)" stroke="#b9bfb7" strokeWidth="1.5" />
      <circle r="4" fill="#b9beb6" stroke="#697673" />
      <path
        d={`M-${radius - 5}-10a${radius - 4} ${radius - 4} 0 0 1 10-${radius - 17}`}
        stroke="#565b5b"
        strokeWidth="1.5"
      />
    </g>
  );
}

export default function CruiserMotorcycle() {
  const jacketBody = 'M187 41c-9 4-13 14-16 28l-7 26c10 8 25 11 40 7l8-29 4-17c-1-8-5-13-12-15l-8-3Z';
  const nearSleeve =
    'M208 49c6-3 12 0 17 7l13 17c2 3 4 3 7 2l13-4 38-14 5 8-39 18-20 5c-6 2-10-1-14-5l-23-25c-3-4-2-7 3-9Z';
  const trousers = 'M177 94c-11 3-15 13-4 19 14 6 36 7 63 11l11 3c5 8 9 25 14 41l15-2-9-47c-1-6-6-11-15-13l-50-10Z';

  return (
    <svg className={styles.cruiserIllustration} viewBox="0 -18 420 273" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cruiser-tank" x1="236" y1="69" x2="247" y2="117" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7b827b" />
          <stop offset="0.18" stopColor="#535f5e" />
          <stop offset="0.42" stopColor="#354146" />
          <stop offset="0.78" stopColor="#222e33" />
          <stop offset="1" stopColor="#151f25" />
        </linearGradient>
        <linearGradient id="cruiser-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e6e5d9" />
          <stop offset="0.22" stopColor="#a7b1aa" />
          <stop offset="0.46" stopColor="#5d6b69" />
          <stop offset="0.52" stopColor="#d8dfd1" />
          <stop offset="0.72" stopColor="#9ba9a0" />
          <stop offset="1" stopColor="#465654" />
        </linearGradient>
        <linearGradient id="cruiser-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7f8b84" />
          <stop offset="0.16" stopColor="#505e5c" />
          <stop offset="0.4" stopColor="#344342" />
          <stop offset="0.68" stopColor="#202e31" />
          <stop offset="0.86" stopColor="#394944" />
          <stop offset="1" stopColor="#18262a" />
        </linearGradient>
        <radialGradient id="cruiser-rubber" cx="38%" cy="28%" r="75%">
          <stop stopColor="#414643" />
          <stop offset="0.65" stopColor="#292e2e" />
          <stop offset="1" stopColor="#171d20" />
        </radialGradient>
        <linearGradient id="cruiser-engine" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#78867e" />
          <stop offset="0.35" stopColor="#435653" />
          <stop offset="0.75" stopColor="#26373b" />
          <stop offset="1" stopColor="#17282d" />
        </linearGradient>
        <linearGradient id="cruiser-drive-case" x1="0" y1="0" x2="0.3" y2="1">
          <stop stopColor="#68776f" />
          <stop offset="0.3" stopColor="#43544f" />
          <stop offset="1" stopColor="#253639" />
        </linearGradient>
        <linearGradient id="cruiser-leather" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#4e5550" />
          <stop offset="0.3" stopColor="#303934" />
          <stop offset="1" stopColor="#182326" />
        </linearGradient>
        <linearGradient id="cruiser-fender" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#66736d" />
          <stop offset="0.35" stopColor="#3c4b4d" />
          <stop offset="1" stopColor="#1c292f" />
        </linearGradient>
        <radialGradient id="cruiser-lens" cx="36%" cy="32%" r="70%">
          <stop stopColor="#fff7dc" />
          <stop offset="0.6" stopColor="#e5dfbd" />
          <stop offset="1" stopColor="#a5b0a0" />
        </radialGradient>
        <linearGradient id="cruiser-jacket" x1="0" y1="0" x2="1" y2="0.7">
          <stop stopColor="#9da687" />
          <stop offset="0.28" stopColor="#7f8f6c" />
          <stop offset="0.65" stopColor="#657956" />
          <stop offset="1" stopColor="#40553d" />
        </linearGradient>
        <linearGradient id="cruiser-sleeve" x1="0.2" y1="0" x2="0.6" y2="1">
          <stop stopColor="#9aa784" />
          <stop offset="0.45" stopColor="#7c8e68" />
          <stop offset="1" stopColor="#4a6144" />
        </linearGradient>
        <radialGradient id="cruiser-helmet" cx="30%" cy="20%" r="85%">
          <stop stopColor="#fbf0d1" />
          <stop offset="0.4" stopColor="#e5d7b1" />
          <stop offset="0.75" stopColor="#c4bd97" />
          <stop offset="1" stopColor="#90967a" />
        </radialGradient>
        <linearGradient id="cruiser-visor" x1="0" y1="0" x2="0.6" y2="1">
          <stop stopColor="#91afa5" />
          <stop offset="0.2" stopColor="#536f6a" />
          <stop offset="0.55" stopColor="#2f4948" />
          <stop offset="1" stopColor="#1c3035" />
        </linearGradient>
        <linearGradient id="cruiser-denim" x1="0.2" y1="0" x2="0.5" y2="1">
          <stop stopColor="#778e91" />
          <stop offset="0.32" stopColor="#536d76" />
          <stop offset="0.72" stopColor="#354e5a" />
          <stop offset="1" stopColor="#243d47" />
        </linearGradient>
        <linearGradient id="cruiser-rider-leather" x1="0" y1="0" x2="0.4" y2="1">
          <stop stopColor="#8b785e" />
          <stop offset="0.35" stopColor="#66533f" />
          <stop offset="1" stopColor="#352f28" />
        </linearGradient>
        <linearGradient id="cruiser-skin" x1="0" y1="0" x2="0.7" y2="1">
          <stop stopColor="#d7b48b" />
          <stop offset="0.5" stopColor="#b88f6b" />
          <stop offset="1" stopColor="#876e51" />
        </linearGradient>
        <pattern id="cruiser-canvas-weave" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
          <path d="M0 0.4h1.6M0.4 0v1.6" stroke="#e4dfb8" strokeWidth="0.22" opacity="0.1" />
          <path d="M0 1.2h1.6M1.2 0v1.6" stroke="#253d2c" strokeWidth="0.18" opacity="0.08" />
        </pattern>
        <pattern id="cruiser-denim-weave" width="1.8" height="1.8" patternUnits="userSpaceOnUse">
          <path d="m-0.6 0.6 1.8-1.8M0 1.8 1.8 0m-0.6 2.4L3 0.6" stroke="#ccd5c5" strokeWidth="0.25" opacity="0.1" />
        </pattern>
      </defs>
      <ellipse cx="212" cy="242" rx="176" ry="5" fill="currentColor" opacity="0.07" />
      <g stroke="#263136" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 241h359" stroke="currentColor" opacity="0.12" />
        <CruiserWheel x={100} radius={54} />
        <CruiserWheel x={331} radius={55} />
        {/* Primary drive housing joins the rear frame bay to the crankcase, behind the frame tubes. */}
        <path
          d="M148 171c6-10 18-14 31-11l25 7 16 11-6 13-21 6-43-5c-10-2-12-12-2-21Z"
          fill="url(#cruiser-drive-case)"
          stroke="#1d2e32"
          strokeWidth="2"
        />
        <path d="M150 173c6-8 15-10 26-8l25 7m-51 15 39 5 19-4" stroke="#92a18f" strokeWidth="1.2" />
        <path d="m160 171 27 5m-28 0 27 5m-27 0 23 4" stroke="#253a39" strokeWidth="1.5" />
        <path d="m160 170 26 5m-27-1 25 5" stroke="#697e70" strokeWidth="0.8" />
        <circle cx="149" cy="179" r="2" fill="#b0bcaa" stroke="#455e50" strokeWidth="0.8" />
        <circle cx="195" cy="186" r="2" fill="#b0bcaa" stroke="#455e50" strokeWidth="0.8" />
        {/* Low tubular chassis, swingarm and rear suspension. */}
        <path d="m100 185 65-35 72 39-76 9-61-13 49-61m16 26 28-40 76-9-27 81" stroke="#202a2d" strokeWidth="8" />
        <path d="m103 185 61-31 69 35m-62 13 71-7 35-60 16-40" stroke="#515b5b" strokeWidth="2" />
        <path d="m159 117-32 58" stroke="#161e23" strokeWidth="11" />
        <path d="m156 122-26 49" stroke="#7b8580" strokeWidth="4" />
        <path d="m150 126 7 7-13 1 7 8-13 1 7 8-13 1 7 8-12 1" stroke="#abb1a6" strokeWidth="2.4" />
        <circle cx="158" cy="119" r="4" fill="#aeb6aa" />
        <circle cx="128" cy="173" r="4" fill="#aeb6aa" />
        <path d="M161 122h31l14 16-16 26-26-3-11-23Z" fill="url(#cruiser-fender)" stroke="#19262b" strokeWidth="2" />
        <path d="m166 126 23 1 8 9" stroke="#656e6d" strokeWidth="1.3" />
        <path d="m164 153 22 5 9-13" stroke="#1c2e32" strokeWidth="1.2" />
        <circle cx="172" cy="134" r="1.7" fill="#9caa99" stroke="#42584e" strokeWidth="0.8" />
        {/* The V-twin sits directly below the tank, ahead of the seat. */}
        <path
          d="m206 153 16-6 29 4 13 33-16 16h-33l-17-18Z"
          fill="url(#cruiser-engine)"
          stroke="#18272b"
          strokeWidth="2"
        />
        <path d="m222 169-25-43 20-11 25 42m-1 8 17-47 23 9-21 47" fill="#2b363a" stroke="#17272b" strokeWidth="2" />
        <path
          d="m194 125 24-13 6 10-25 13Zm62-10 28 11-4 11-28-12Z"
          fill="url(#cruiser-chrome)"
          stroke="#657471"
          strokeWidth="1.5"
        />
        <path
          d="m201 136 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m-21 17 24-12m18-16 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10m-29-4 27 10"
          stroke="#8c9c98"
          strokeWidth="2"
        />
        <path d="m208 129 21 35m39-33-15 35" stroke="#c1c9bd" strokeWidth="2.2" />
        <path d="m205 116-3-6m66 9 3-7" stroke="#ccd0bf" strokeWidth="3" />
        <path d="m203 110-5-3m73 5 7-5" stroke="#313d3d" strokeWidth="2" />
        <circle cx="240" cy="137" r="14" fill="#252f33" stroke="#66746f" strokeWidth="2" />
        <circle cx="240" cy="137" r="8" fill="#a8b3a6" stroke="#d9ded0" strokeWidth="1.5" />
        <circle cx="240" cy="137" r="4" fill="#3c4c4b" />
        <ellipse cx="231" cy="179" rx="23" ry="20" fill="url(#cruiser-engine)" stroke="#18292d" strokeWidth="2.5" />
        <circle cx="231" cy="179" r="15" fill="url(#cruiser-chrome)" stroke="#7d8e86" strokeWidth="1.5" />
        <circle cx="231" cy="179" r="9" fill="#586c69" stroke="#d5dbcd" />
        <path d="m228 179 6-1" stroke="#e6e8db" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <circle
            key={angle}
            cx={231 + 19 * Math.cos((angle * Math.PI) / 180)}
            cy={179 + 16 * Math.sin((angle * Math.PI) / 180)}
            r="1.5"
            fill="#a2afa2"
            stroke="none"
          />
        ))}
        <path d="m193 175-16 3-9 13 17 8 27-4" fill="#455552" stroke="#213336" strokeWidth="2" />
        <path d="m179 184 19 4" stroke="#8b9c8e" strokeWidth="1.5" />
        {/* Lower frame cradle sits behind the exhaust and its mounting hardware. */}
        <path d="M192 201c22 11 61 12 82-1l18-48" stroke="#1d2c30" strokeWidth="7" />
        <path d="m198 202 36 8 32-8" stroke="#59685f" strokeWidth="1.4" />
        {/* Both headers leave a cylinder port, sweep around the crankcase and enter a silencer. */}
        <path
          d="M219 141c2 10 20 14 28 27 10 17 5 33-18 33h-44M275 141c14 17 23 41 10 59-10 14-29 20-55 20h-48"
          stroke="#18262b"
          strokeWidth="10"
        />
        <path
          d="M219 141c2 10 20 14 28 27 10 17 5 33-18 33h-44M275 141c14 17 23 41 10 59-10 14-29 20-55 20h-48"
          stroke="url(#cruiser-chrome)"
          strokeWidth="6.5"
        />
        <path d="M220 143c4 9 21 14 27 27m29-26c9 14 17 32 11 46" stroke="#d0c4a0" strokeWidth="2" />
        <path
          d="M248 181c1 10-6 17-19 17h-33m87 3c-12 12-31 16-53 16h-36"
          stroke="#d6ddcc"
          strokeWidth="1.1"
          opacity="0.7"
        />
        {/* Flanges, a shared frame hanger and two straps make the exhaust attachment visible. */}
        <path d="m214 142 8-4m49 5 8-5" stroke="#253739" strokeWidth="4" />
        <circle cx="215" cy="139" r="1.5" fill="#c7d0bf" stroke="none" />
        <circle cx="278" cy="139" r="1.5" fill="#c7d0bf" stroke="none" />
        <path d="m161 175-9 10-3 13 3 20" stroke="#1f2e31" strokeWidth="6" />
        <path d="m161 176-7 10-3 11 3 21" stroke="#8f9e91" strokeWidth="2.5" />
        <circle cx="161" cy="176" r="3.5" fill="url(#cruiser-chrome)" stroke="#344841" strokeWidth="1.2" />
        <circle cx="161" cy="176" r="1.1" fill="#273a37" stroke="none" />
        <path
          d="m183 197 8 1v7l-8-1Zm-3 19 9 1v7l-9-1Z"
          fill="url(#cruiser-chrome)"
          stroke="#53665e"
          strokeWidth="1.2"
        />
        <path
          d="m104 188 68 7 11 2v9l-13 1-68-5c-4 0-6-4-5-8s3-6 7-6Z"
          fill="url(#cruiser-pipe)"
          stroke="#1c2b2e"
          strokeWidth="2"
        />
        <path
          d="m104 208 64 7 12 2v9l-13 1-65-5c-4 0-6-4-5-8s3-6 7-6Z"
          fill="url(#cruiser-pipe)"
          stroke="#1c2b2e"
          strokeWidth="2"
        />
        <path d="m107 191 61 6m-61 14 57 6" stroke="#a4b0a1" strokeWidth="1.2" />
        <path d="m108 200 59 5m-59 15 55 5" stroke="#52665b" strokeWidth="1" />
        <path d="m148 193-1 11m4 9-1 12" stroke="#a9b4a5" strokeWidth="3.5" />
        <path d="m150 194-1 9m4 12-1 8" stroke="#3f544b" strokeWidth="1" />
        <ellipse
          cx="101"
          cy="195"
          rx="4"
          ry="7"
          fill="url(#cruiser-chrome)"
          stroke="#53665e"
          strokeWidth="1.2"
          transform="rotate(8 101 195)"
        />
        <ellipse
          cx="101"
          cy="195"
          rx="2"
          ry="4.5"
          fill="#172629"
          stroke="#64776a"
          strokeWidth="0.8"
          transform="rotate(8 101 195)"
        />
        <ellipse
          cx="101"
          cy="215"
          rx="4"
          ry="7"
          fill="url(#cruiser-chrome)"
          stroke="#53665e"
          strokeWidth="1.2"
          transform="rotate(8 101 215)"
        />
        <ellipse
          cx="101"
          cy="215"
          rx="2"
          ry="4.5"
          fill="#172629"
          stroke="#64776a"
          strokeWidth="0.8"
          transform="rotate(8 101 215)"
        />
        {/* Forward control and footboard overlap the front header. */}
        <path d="m260 194 15-2 7 5-21 3Z" fill="#535e58" stroke="#223531" strokeWidth="1.5" />
        <path d="m262 196 14-1" stroke="#acb8a5" />
        {/* Rounded rear fender and two low, stepped saddles. */}
        <path
          d="M60 143c20-29 60-33 88-12l-5 9c-24-17-52-14-75 11Z"
          fill="url(#cruiser-fender)"
          stroke="#1c292e"
          strokeWidth="2"
        />
        <path d="M65 140c20-20 48-26 73-12" stroke="#737b77" strokeWidth="1.5" />
        <path d="M93 115c1-8 18-11 39-9l14 7-3 9h-44Z" fill="url(#cruiser-leather)" stroke="#18272b" strokeWidth="2" />
        <path d="m100 111 29-1 10 5" stroke="#6f7770" strokeWidth="1.5" />
        <path
          d="M139 112c13-3 24 3 35 4l23-6c6-1 10 2 10 7-1 7-12 11-25 11l-32-3c-9-1-14-7-11-13Z"
          fill="url(#cruiser-leather)"
          stroke="#14252b"
          strokeWidth="2"
        />
        <path d="M145 116c10 1 20 6 32 5l22-6" stroke="#747c73" strokeWidth="1.3" />
        <path d="M146 119c12 4 22 6 33 5l19-5" stroke="#a0a48d" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
        <path d="m66 144-13 16-10 27" stroke="#242f32" strokeWidth="5" />
        <path d="m46 172 12 4-5 16-14-4Z" fill="#89968a" stroke="#34443d" strokeWidth="1.5" />
        <path d="M58 143h9v6h-9Z" fill="#aa6859" stroke="#4a4237" />
        <circle cx="71" cy="144" r="3" fill="#ba9261" stroke="#5e6551" />
        {/* Exposed steering head and frame gusset leave clearance ahead of the tank. */}
        <path d="m187 116 81-10 19-13m-18 13 8 20 14-17" stroke="#1c2b30" strokeWidth="7" />
        <path d="m264 105 17-9 8 13-12 12Z" fill="url(#cruiser-engine)" stroke="#283b3d" strokeWidth="1.5" />
        <path d="m283 83 10 28" stroke="#18292d" strokeWidth="11" />
        <path d="m284 84 9 25" stroke="url(#cruiser-chrome)" strokeWidth="5" />
        <path d="m279 83 8-3m3 31 7-3" stroke="#455a54" strokeWidth="3" />
        {/* The tank tapers before the steering head instead of touching the lamp shell. */}
        <path
          d="M199 99c18-19 39-29 62-29 11 0 18 4 19 11 1 12-8 27-21 32l-42-1c-13 0-21-5-18-13Z"
          fill="url(#cruiser-tank)"
          stroke="#1c2a2f"
          strokeWidth="2.5"
        />
        <path d="M207 96c17-14 34-22 54-22 7 0 12 1 15 5" stroke="#adb4a2" strokeWidth="1.3" />
        <path d="M211 100c13-11 28-17 44-19" stroke="#83978a" strokeWidth="4" opacity="0.16" />
        <path d="M210 108c13 3 31 4 46 1" stroke="#61726b" strokeWidth="1.2" />
        <ellipse
          cx="247"
          cy="72"
          rx="7"
          ry="2.5"
          fill="url(#cruiser-chrome)"
          stroke="#495d54"
          transform="rotate(-8 247 72)"
        />
        <path d="m226 91 24-4m-23 8 15-3" stroke="#b6c0ae" strokeWidth="1.4" />
        <path d="m249 86 5 3-6 2" stroke="#b6c0ae" strokeWidth="1.1" />
        {/* Raked telescopic fork, round headlamp and compact front fender. */}
        <path d="m295 94 36 91m-27-92 34 89" stroke="#1b292d" strokeWidth="9" />
        <path d="m299 108 15 39m-6-40 14 38" stroke="url(#cruiser-chrome)" strokeWidth="5" />
        <path d="m288 96 19-7m-11 25 19-7" stroke="#25373a" strokeWidth="5" />
        <path d="m289 94 17-6m-9 24 17-6" stroke="#98a79a" strokeWidth="1.5" />
        <circle cx="290" cy="96" r="2" fill="#cbd4c1" stroke="#4d6358" strokeWidth="0.8" />
        <circle cx="307" cy="90" r="2" fill="#cbd4c1" stroke="#4d6358" strokeWidth="0.8" />
        <path d="m314 147 17 38m-9-39 16 36" stroke="#3a4849" strokeWidth="8" />
        <path d="m316 152 11 27" stroke="#6b7a72" strokeWidth="1.5" />
        <path d="m299 122 5-2 6 15-5 2Z" fill="#c59b52" stroke="#7c7954" />
        <path
          d="M301 151c17-13 38-14 56-4l7 9-7 2c-16-10-36-9-51 2Z"
          fill="url(#cruiser-fender)"
          stroke="#1b2b30"
          strokeWidth="2"
        />
        <path d="M307 150c16-8 32-8 46-1" stroke="#7a837b" strokeWidth="1.3" />
        {/* A separate bucket bolts to the fork ears; the steering gap stays open behind it. */}
        <path d="m301 99 11 1m-16-11 12-4" stroke="#273c3e" strokeWidth="4" />
        <path d="m302 98 8 1" stroke="#a3b1a0" strokeWidth="1.2" />
        <path d="M303 79c-8 3-9 12-5 21l15 8 7-5-4-25Z" fill="url(#cruiser-fender)" stroke="#182b30" strokeWidth="2" />
        <path d="M302 83c-3 4-2 9 0 12" stroke="#8f9d90" strokeWidth="1.4" />
        <circle cx="303" cy="98" r="2.5" fill="url(#cruiser-chrome)" stroke="#3d564b" strokeWidth="1" />
        <ellipse
          cx="317"
          cy="92"
          rx="10"
          ry="17"
          fill="url(#cruiser-chrome)"
          stroke="#667d74"
          strokeWidth="1.8"
          transform="rotate(-17 317 92)"
        />
        <ellipse
          cx="318"
          cy="92"
          rx="7"
          ry="13"
          fill="url(#cruiser-lens)"
          stroke="#a7b2a0"
          strokeWidth="1"
          transform="rotate(-17 318 92)"
        />
        <path d="m315 82 5 19m-8-14 5 15m-5-10 11-3m-9 8 10-3" stroke="#f9f1d6" strokeWidth="1" opacity="0.75" />
        <path d="m314 80 4-1" stroke="#fff9e5" strokeWidth="1.8" />
        <circle cx="291" cy="114" r="4" fill="#bb9255" stroke="#52634f" strokeWidth="1.5" />
        {/* Swept bars, cables, instrument pod and two mirrors. */}
        <path d="m287 88-10-22-15-9m15 9 14-13 17 6" stroke="#26383b" strokeWidth="5" />
        <path d="m264 59-12-4m52 3 11 4" stroke="#182c30" strokeWidth="6" />
        <path d="m281 78 5-17 13-1" stroke="#8b9a8d" strokeWidth="1.5" />
        <path d="M261 61c18 5 26 18 25 36m15-36c-4 16-3 27-5 39" stroke="#4e635e" strokeWidth="1.3" />
        <path d="m261 56-2-21-5-5m47 27 8-18 7-5" stroke="#485f56" strokeWidth="2" />
        <ellipse
          cx="252"
          cy="25"
          rx="7"
          ry="11"
          fill="#263b3a"
          stroke="#718374"
          strokeWidth="1.5"
          transform="rotate(-12 252 25)"
        />
        <path d="m250 19-1 7" stroke="#9da998" strokeWidth="1.5" />
        <ellipse
          cx="320"
          cy="31"
          rx="9"
          ry="6"
          fill="#4c6158"
          stroke="#839483"
          strokeWidth="1.5"
          transform="rotate(-23 320 31)"
        />
        <path d="m316 29 6-2" stroke="#bcc5b1" strokeWidth="1.3" />
        <path d="m275 65 5-8 10 1 4 6-8 5Z" fill="#263c3d" stroke="#849483" strokeWidth="1.5" />
        <path d="m280 61 6 1" stroke="#c6cfb6" strokeWidth="1.5" />
        {/* Relaxed cruiser posture, with forward controls and an exposed engine. */}
        <path
          d="M204 48c7-4 12 1 17 9l10 13 20-15 6 7-24 20c-5 4-10 1-13-3l-21-23Z"
          fill="url(#cruiser-jacket)"
          stroke="#354732"
          strokeWidth="1.8"
        />
        <path d="M208 54c5-1 9 6 12 11l10 12 19-15" stroke="#b2bd9a" strokeWidth="1" />
        <path d="m249 56 7-5 6 2 2 6-8 4Z" fill="url(#cruiser-rider-leather)" stroke="#303d2e" strokeWidth="1.3" />
        {/* Diagonal denim weave, a pocket and knee folds follow the bent leg. */}
        <path d={trousers} fill="url(#cruiser-denim)" stroke="#2e4249" strokeWidth="2" />
        <path d={trousers} fill="url(#cruiser-denim-weave)" stroke="none" opacity="0.55" />
        <path d="M173 108c19 8 47 8 71 15l5 7 10 33-8-37-17-8-55-13Z" fill="#203b47" fillOpacity="0.32" stroke="none" />
        <path d="M179 102c18 6 47 7 65 15 7 3 10 10 12 18l10 27" stroke="#9daea6" strokeWidth="1.1" />
        <path
          d="M180 105c15 5 40 7 59 13m18 20 8 26"
          stroke="#b5bba2"
          strokeWidth="0.6"
          strokeDasharray="1.5 2"
          opacity="0.6"
        />
        <path d="m186 99-1 8 10 4 8-4m-27-2 7 2m10 5 9-1" stroke="#314d57" strokeWidth="1.2" />
        <path d="m248 120 10 5-4 5m-5-1 8 4m1 13 6 3m-4 4 6 3" stroke="#2a4551" strokeWidth="1.3" />
        <path d="m250 122 5 3m-2 7 5 3m-2 14 6 3" stroke="#829c9d" strokeWidth="0.8" />
        <path d="m260 160 12-3 2 9-12 3Z" fill="#4d6771" stroke="#2b4650" strokeWidth="1.1" />
        <path d="m262 162 10-3" stroke="#b0b7a2" strokeWidth="0.7" strokeDasharray="1.4 1.8" />
        {/* Leather boot: ankle crease, laces, toe cap and a separate rubber sole. */}
        <path
          d="M263 167c4 0 8-1 13-3l9 10 10 3c6 2 7 7 1 9h-28l-8-5Z"
          fill="url(#cruiser-rider-leather)"
          stroke="#303d31"
          strokeWidth="1.8"
        />
        <path d="m262 179 7 4h27l2 3h-30l-8-4Z" fill="#252d28" stroke="#25342d" strokeWidth="0.8" />
        <path d="M281 176c4-1 8 0 10 3m-26-10 4 4-2 5m1-1 8 2" stroke="#b49a76" strokeWidth="0.9" />
        <path d="m272 169 6 2m-5 1 7 2m-6 1 7 2m-11 5 24 1" stroke="#c0ae87" strokeWidth="0.8" />
        {/* Waxed canvas uses soft volume, reinforced panels and quiet stitched seams. */}
        <path d={jacketBody} fill="url(#cruiser-jacket)" stroke="#344832" strokeWidth="1.8" />
        <path d={jacketBody} fill="url(#cruiser-canvas-weave)" stroke="none" opacity="0.55" />
        <path d="M184 47c-6 9-10 24-13 39l-3 8 10 5 5-23 12-30Z" fill="#314d34" fillOpacity="0.2" stroke="none" />
        <path d="M188 46c-5 5-7 14-10 22l-5 21m0 3c8 4 16 6 25 6" stroke="#b8c19b" strokeWidth="1" />
        <path d="M190 48c-3 10-5 17-7 24m-7 17 11 4m-11-8 7 1m14 3-6 5" stroke="#425b3e" strokeWidth="1.2" />
        <path d="m179 59 11 4-5 16-11-4Z" fill="#738460" stroke="#526a47" strokeWidth="0.9" />
        <path d="m179 62 9 3-2 4-9-3m-1 8 7 2" stroke="#b0ba91" strokeWidth="0.7" />
        <circle cx="183" cy="66" r="0.9" fill="#c5c6a3" stroke="none" />
        <path d="m205 50-7 22-4 24" stroke="#314a36" strokeWidth="2.5" />
        <path d="m205 50-7 22-4 24" stroke="#b6b99a" strokeWidth="0.75" strokeDasharray="1 1.4" />
        <path d="m198 72 2 1-1 4-2-1Z" fill="#d1ccaa" stroke="#53664a" strokeWidth="0.5" />
        <path d="M167 94c10 6 22 8 35 6" stroke="#40583c" strokeWidth="3" />
        <path d="M169 95c10 5 20 6 30 5" stroke="#b0ba92" strokeWidth="0.7" strokeDasharray="1.5 2" />
        <path d={nearSleeve} fill="url(#cruiser-sleeve)" stroke="#344832" strokeWidth="1.8" />
        <path d={nearSleeve} fill="url(#cruiser-canvas-weave)" stroke="none" opacity="0.55" />
        <path d="M209 51c5-1 9 3 13 8l13 17c3 4 6 5 11 3l47-17" stroke="#c2c9a4" strokeWidth="1.1" />
        <path d="M218 66c5 5 10 13 15 17 4 3 7 3 12 1l46-18" stroke="#354e36" strokeWidth="2" opacity="0.6" />
        <path d="M209 51c5 1 9 6 11 11l-7 4-9-10" stroke="#637c53" strokeWidth="1" />
        <path d="m212 53 5 7m5 6 5-1m-1 5 4-2m5 9 4 5m1-8 4 6m11-10 3 6m-1-7 4 5" stroke="#526c47" strokeWidth="1" />
        <path d="m224 67 3 2m12 5 3 3m14-5 2 2" stroke="#b7c29a" strokeWidth="0.7" />
        <path d="m289 59 5-2 5 10-5 2Z" fill="#526b47" stroke="#354e36" strokeWidth="1" />
        <path d="m291 60 4 7" stroke="#bcc5a0" strokeWidth="0.7" strokeDasharray="1.2 1.5" />
        {/* A shaped glove wraps the grip, with knuckle pads and finger seams. */}
        <path
          d="M296 58c2-2 5-4 8-3l7 3c3 1 4 4 3 6l-6 5-9-3Z"
          fill="url(#cruiser-rider-leather)"
          stroke="#34432f"
          strokeWidth="1.3"
        />
        <path d="m300 58 7 2 2 3-4 2-6-2Z" fill="#8c795d" stroke="#62553f" strokeWidth="0.6" />
        <path d="m304 59 5 2m-6 1 5 2m-7 1 4 2" stroke="#c2ae87" strokeWidth="0.7" />
        <path d="m298 60 2 5" stroke="#382f25" strokeWidth="0.9" />
        {/* Collar, neck and chin strap sit under the helmet rim. */}
        <path d="m198 43 3-13 17 2-7 16" fill="url(#cruiser-skin)" stroke="#685d44" strokeWidth="1.2" />
        <path d="m201 34 12 8-4 4-10-7Z" fill="#806a4d" fillOpacity="0.45" stroke="none" />
        <path d="m194 41 6-4 10 9 4-1 1 7-10-3-9-5Z" fill="#3d573c" stroke="#344a32" strokeWidth="1" />
        <path d="m197 40 9 6 6 1" stroke="#a0af86" strokeWidth="0.8" />
        {/* Rounded enamel shell, smoked visor, rubber edging and a ventilated chin bar. */}
        <path
          d="M188 17c-1-15 9-25 23-25 15-1 26 10 26 23l-2 9c-3 7-8 12-16 14l-18-3c-8-3-12-9-13-18Z"
          fill="url(#cruiser-helmet)"
          stroke="#5f6b52"
          strokeWidth="1.8"
        />
        <path d="M192 18c-1-12 7-21 19-22" stroke="#fff5d9" strokeWidth="2.3" />
        <path d="M196 3c6-7 17-9 25-4" stroke="#fff8e3" strokeWidth="0.8" opacity="0.8" />
        <path d="M193 24c3 6 8 9 14 10l12 2" stroke="#929879" strokeWidth="2" />
        <path
          d="M215 7c8 0 15 2 21 5l-2 12c-5 3-11 4-18 2l-6-7 2-8Z"
          fill="#263e3d"
          stroke="#475d50"
          strokeWidth="1.5"
        />
        <path
          d="M216 9c7 0 13 2 18 4l-2 10c-4 2-9 2-15 1l-5-6 2-6Z"
          fill="url(#cruiser-visor)"
          stroke="#89a094"
          strokeWidth="0.6"
        />
        <path d="M216 11c6 0 11 2 16 4m-17-1 10 3" stroke="#d3dfce" strokeWidth="1" opacity="0.7" />
        <path d="m229 15-4 8m5-7-2 6" stroke="#a6c5b9" strokeWidth="1.8" opacity="0.2" />
        <path
          d="M216 27c7 2 13 1 18-3l-3 7-12 7-12-4Z"
          fill="url(#cruiser-helmet)"
          stroke="#65735a"
          strokeWidth="1.1"
        />
        <path d="m220 30 8-1m-8 3 6-1" stroke="#64755e" strokeWidth="1.1" />
        <path d="M200 33c5 2 10 2 15 3l5 1 9-5" stroke="#374c41" strokeWidth="1.7" />
        <circle cx="211" cy="20" r="3.3" fill="#9daa8c" stroke="#65775e" strokeWidth="1.1" />
        <circle cx="211" cy="20" r="1.4" fill="url(#cruiser-chrome)" stroke="#5d715b" strokeWidth="0.6" />
        <path d="m196 23 3 2m-2-6 3 1" stroke="#9b9f7e" strokeWidth="0.8" />
        <path d="m203 35 5 8 7 1 5-6" stroke="#374b3b" strokeWidth="1.8" />
        <path d="m209 41 5 1-1 3-4-1Z" fill="url(#cruiser-chrome)" stroke="#4e604b" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
