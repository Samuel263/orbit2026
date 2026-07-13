// Shared style block for site pages.
export const siteStyles = `
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .animate-float{animation:float 6s ease-in-out infinite}

  @keyframes clientMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes clientMarqueeReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  .client-marquee { animation: clientMarquee 40s linear infinite; }
  .client-marquee-reverse { animation: clientMarqueeReverse 40s linear infinite; }
  .client-strip:hover .client-marquee,
  .client-strip:hover .client-marquee-reverse { animation-play-state: paused; }
  .client-logo-white { filter: brightness(0) invert(1); opacity: 0.92; }
  .client-logo-dark { filter: brightness(0); opacity: 0.75; transition: opacity 300ms ease; }
  .client-logo-dark:hover { opacity: 1; }


  @keyframes heroReveal {
    0% { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(12px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  .hero-line { opacity: 0; animation: heroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .hero-line-1 { animation-delay: 0.05s; }
  .hero-line-2 { animation-delay: 0.25s; }
  .hero-line-3 { animation-delay: 0.45s; }

  [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); will-change: opacity, transform; }
  [data-reveal].is-revealed { opacity: 1; transform: translateY(0); }

  .project-card { transform: translateY(0); transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1), border-color 600ms ease; will-change: transform; }
  .project-card:hover { transform: translateY(-10px); border-color: rgba(255,255,255,0.25); }
  .project-card-img { transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1); }
  .project-card:hover .project-card-img { transform: scale(1.05); }

  .solution-card { transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms ease, background-color 400ms ease; will-change: transform; }
  .solution-card:hover { transform: translateY(-6px); border-color: rgba(240,182,138,0.5); background-color: #14102a; }

  /* ---------- Sweep buttons (clean left-to-right fill) ---------- */
  .btn-sweep {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    transition: color 300ms ease, box-shadow 300ms ease;
  }
  .btn-sweep::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--sweep-bg, #ffffff);
    transform: translateX(-101%);
    transition: transform 550ms cubic-bezier(0.6, 0, 0.2, 1);
    z-index: -1;
    border-radius: inherit;
  }
  .btn-sweep:hover::before { transform: translateX(0); }
  .btn-sweep:hover {
    color: var(--sweep-fg, #000000);
  }
  .btn-sweep-label {
    display: inline-block;
    transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: center;
    will-change: transform;
  }
  .btn-sweep:hover .btn-sweep-label {
    transform: scaleX(0.86);
    letter-spacing: -0.04em;
  }


  /* ---------- Animated noise overlay (site-wide) ---------- */
  @keyframes noiseShift {
    0%   { background-position: 0 0; }
    10%  { background-position: -40px 20px; }
    20%  { background-position: 30px -15px; }
    30%  { background-position: -25px 35px; }
    40%  { background-position: 45px 10px; }
    50%  { background-position: -35px -30px; }
    60%  { background-position: 20px 40px; }
    70%  { background-position: -50px 5px; }
    80%  { background-position: 15px -40px; }
    90%  { background-position: -20px 25px; }
    100% { background-position: 0 0; }
  }
  .site-noise {
    position: fixed;
    inset: -80px;
    z-index: 5;
    pointer-events: none;
    opacity: 0.35;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 240px 240px;
    animation: noiseShift 1.6s steps(10) infinite;
  }

  /* ---------- Animated noise layer over hero video ---------- */
  .hero-noise {
    opacity: 0.25;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAxICAwIDAgMCAwIDEgIDAgMCAwIDAgMSAgMCAwIDAgMC45NSAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+");
    background-size: 220px 220px;
    background-repeat: repeat;
    pointer-events: none;
    animation: noiseShift 1.4s steps(10) infinite;
  }

  /* ---------- Google review pill (real backdrop blur) ---------- */
  .google-pill-wrap {
    isolation: isolate;
  }
  
 
  .google-pill {
    z-index: 1;
    background: rgba(255,255,255,0.10);
    backdrop-filter: blur(30px) saturate(190%) contrast(115%);
  }

  /* ---------- Mouse trail hero cards ---------- */
  .hero-stage {
    position: relative;
    min-height: 620px;
  }
  
  .hero-trail-hitarea {
    cursor: crosshair;
  }
  .hero-trail-card {
    position: absolute;
    width: 228px;
    min-height: 122px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 18px;
    padding: 18px;
    border-radius: 14px;
    overflow: hidden;
    color: #fff;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 55%, rgba(255,255,255,0.02)),
      rgba(13,16,28,0.78);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow:
      0 30px 60px -20px rgba(0,0,0,0.55),
      0 8px 24px -12px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(255,255,255,0.14);
    animation: heroTrailFade 2200ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    pointer-events: none;
    will-change: transform, opacity, filter;
    transform-origin: center 65%;
  }
  .hero-trail-card::after {
    content: "";
    position: absolute;
    width: 120px;
    height: 120px;
    right: -34px;
    bottom: -38px;
    border-radius: 9999px;
    background: radial-gradient(circle at 30% 30%, currentColor, transparent 70%);
    opacity: 0.35;
    filter: blur(2px);
  }
  .hero-trail-card--pink { color: #EC4392; }
  .hero-trail-card--green { color: #7EE640; }
  .hero-trail-card--white { color: #FFFFFF; }
  .hero-trail-card__eyebrow {
    color: rgba(255,255,255,0.72);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }
  .hero-trail-card__title {
    color: #ffffff;
    font-family: "Jumper", sans-serif;
    font-size: 25px;
    line-height: 1.02;
    letter-spacing: 0;
    position: relative;
    z-index: 1;
  }
  .hero-trail-card__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ---------- Image trail card: sized to the image's own aspect ratio ---------- */
  .hero-trail-card--image {
    width: auto;
    height: auto;
    max-width: 260px;
    max-height: 170px;
    padding: 0;
    display: inline-flex;
    background: rgba(13,16,28,0.4);
  }
  .hero-trail-card--image .hero-trail-card__image {
    position: static;
    display: block;
    width: auto;
    height: auto;
    max-width: 260px;
    max-height: 170px;
    object-fit: contain;
  }

  @keyframes heroTrailFade {
    0% {
      opacity: 0;
      transform: translate3d(0, 22px, 0) scale(0.6) rotate(calc(var(--card-rotate, 0deg) * 0.2));
      filter: blur(14px);
    }
    22% {
      opacity: 1;
      transform: translate3d(0, -4px, 0) scale(1.06) rotate(var(--card-rotate, 0deg));
      filter: blur(0);
    }
    36% {
      transform: translate3d(0, 1px, 0) scale(0.985) rotate(var(--card-rotate, 0deg));
    }
    55% {
      opacity: 1;
      transform: translate3d(0, -3px, 0) scale(1) rotate(var(--card-rotate, 0deg));
      filter: blur(0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -34px, 0) scale(0.94) rotate(calc(var(--card-rotate, 0deg) * 0.6));
      filter: blur(12px);
    }
  }
  @media (max-width: 768px) {
    .hero-stage { min-height: 590px; }
    .hero-trail-card { width: 178px; min-height: 98px; padding: 14px; border-radius: 20px; }
    .hero-trail-card__title { font-size: 19px; }
    .hero-trail-card--image { max-width: 200px; max-height: 130px; }
    .hero-trail-card--image .hero-trail-card__image { max-width: 200px; max-height: 130px; }
  }

  /* ---------- Floating WhatsApp button ---------- */
  .wa-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 82px;
    height: 82px;
    z-index: 60;
    display: grid;
    place-items: center;
    border-radius: 9999px;
    background-color: #62D468;
    transform: scale(1);
    overflow: hidden;
  }
  @media (min-width: 640px) {
    .wa-btn { width: 96px; height: 96px; right: 26px; bottom: 26px; }
  }

  .wa-btn--pop { animation: waBtnPop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .wa-btn--unpop { animation: waBtnUnpop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  @keyframes waBtnPop {
    0%   { transform: scale(1); }
    45%  { transform: scale(1.18); }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1.12); }
  }
  @keyframes waBtnUnpop {
    0%   { transform: scale(1.12); }
    40%  { transform: scale(0.96); }
    70%  { transform: scale(1.04); }
    100% { transform: scale(1); }
  }

  .wa-btn__ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    animation: waSpin 12s linear infinite;
    transform-origin: 50% 50%;
    z-index: 1;
  }
  @keyframes waSpin { to { transform: rotate(360deg); } }

  /* ---------- White reveal circle behind the icon ---------- */
  .wa-btn__circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 46%;
    height: 46%;
    border-radius: 9999px;
    background-color: #ffffff;
    transform: translate(-50%, -50%) scale(0);
    z-index: 2;
    pointer-events: none;
  }
  .wa-btn__circle--pop { animation: waCirclePop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .wa-btn__circle--unpop { animation: waCircleUnpop 350ms ease-in forwards; }
  @keyframes waCirclePop {
    0%   { transform: translate(-50%, -50%) scale(0); }
    60%  { transform: translate(-50%, -50%) scale(1.15); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes waCircleUnpop {
    0%   { transform: translate(-50%, -50%) scale(1); }
    100% { transform: translate(-50%, -50%) scale(0); }
  }

  .wa-btn__icon {
    position: relative;
    display: grid;
    place-items: center;
    color: #ffffff;
    transform: scale(1) rotate(0deg);
    z-index: 3;
    transition: color 350ms ease;
  }
  .wa-btn__icon--pop { animation: waPop 900ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; color: #62D468; }
  .wa-btn__icon--unpop { animation: waUnpop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; color: #ffffff; }
  @keyframes waPop {
    0%   { transform: scale(1) rotate(0deg); }
    20%  { transform: scale(1.18) rotate(-14deg); }
    45%  { transform: scale(1.25) rotate(12deg); }
    70%  { transform: scale(1.1) rotate(-6deg); }
    100% { transform: scale(1.15) rotate(-8deg); }
  }
  @keyframes waUnpop {
    0%   { transform: scale(1.15) rotate(-8deg); }
    40%  { transform: scale(0.95) rotate(4deg); }
    70%  { transform: scale(1.04) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-float, .client-marquee, .hero-line, .hero-trail-card, .wa-btn__ring { animation: none; opacity: 1; }
    [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
`;
