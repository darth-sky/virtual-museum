import React from 'react';

const CANDI_LEFT_PATH =
  "M212 40 L208 62 " +
  "C200 62 196 70 200 78 C190 74 184 84 190 94 " +
  "C178 92 172 104 180 112 C166 110 160 124 168 134 " +
  "C150 128 142 142 150 152 C138 150 134 166 142 176 " +
  "C128 176 118 192 124 206 C132 196 142 200 140 214 C150 220 150 232 138 238 " +
  "L124 244 " +
  "C108 244 98 258 106 272 C112 262 126 266 124 282 C112 284 104 292 100 304 " +
  "L90 314 C76 314 72 328 80 336 L70 346 " +
  "C58 350 54 366 64 374 C58 380 58 388 66 392 " +
  "L62 398 L62 432 L68 438 L60 446 L58 468 " +
  "L44 468 L44 488 L32 488 L32 506 L18 506 L18 525 " +
  "L277 525 L277 488 L212 488 Z";

export default function CandiKiri() {
  return (
    <div className="absolute left-0 bottom-0 h-[65%] sm:h-[75%] md:h-[85%] shrink-0 pointer-events-none" style={{ aspectRatio: '277 / 525' }}>
      <svg
        viewBox="0 0 277 525"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradKiri" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a0605" />
            <stop offset="70%" stopColor="#2a180d" />
            <stop offset="100%" stopColor="#4a2e14" />
          </linearGradient>
        </defs>
        <path d={CANDI_LEFT_PATH} fill="url(#gradKiri)" stroke="#d4af37" strokeWidth="2" strokeLinejoin="round" />
        <path d="M212 40 L212 488" stroke="#f3d77a" strokeWidth="2" />
        <path d="M18 506 H277 M32 488 H212 M44 468 H62" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="1.2" />
      </svg>
    </div>
  );
}