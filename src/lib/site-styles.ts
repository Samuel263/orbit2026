// Shared style block for site pages.
export const siteStyles = `
  html.lenis { scroll-behavior: auto; }
  .paint-hover [data-paint-char] { will-change: color; }

  /* ---------- Projects vertical marquee ---------- */
  @keyframes projMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .proj-marquee { animation: projMarquee 55s linear infinite; will-change: transform; }
  @media (prefers-reduced-motion: reduce) { .proj-marquee { animation: none; } }

  /* ---------- Review notes (light, no glow) ---------- */
  .review-note {
    transform: rotate(var(--rot, 0deg));
    transition: transform 500ms cubic-bezier(0.22,1,0.36,1), border-color 400ms ease;
  }
  .review-note:hover {
    transform: rotate(0deg) translateY(-4px);
    border-color: #D97757;
  }
  .review-note__tape {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(-3deg);
    width: 78px;
    height: 20px;
    background: rgba(236, 67, 146, 0.28);
    border-left: 1px dashed rgba(0,0,0,0.08);
    border-right: 1px dashed rgba(0,0,0,0.08);
    pointer-events: none;
  }
  .reviews-noise, .paper-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.85;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 240px 240px;
  }

  /* ---------- Reviews double marquee ---------- */
  @keyframes revMarqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes revMarqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  .rev-marquee-l { animation: revMarqueeL 60s linear infinite; }
  .rev-marquee-r { animation: revMarqueeR 60s linear infinite; }
  .rev-band:hover .rev-marquee-l,
  .rev-band:hover .rev-marquee-r { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .rev-marquee-l, .rev-marquee-r { animation: none; }
  }

  /* ---------- Services detail switch ---------- */
  @keyframes serviceIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .service-detail { animation: serviceIn 450ms cubic-bezier(0.22, 1, 0.36, 1); }


  /* ---------- Editorial service rows ---------- */
  .service-row { transition: background-color 400ms ease; }
  .service-row:hover { background-color: rgba(255,255,255,0.02); }
  .service-row__desc {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 500ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease, margin-top 400ms ease;
    margin-top: 0;
  }
  @media (min-width: 640px) {
    .service-row .service-row__desc { max-height: 0; margin-top: 0; }
    .service-row:hover .service-row__desc { max-height: 200px; opacity: 1; margin-top: 12px; }
  }
  @media (max-width: 639px) {
    .service-row__desc { max-height: none; opacity: 1; margin-top: 12px; }
  }

  /* ---------- Portfolio cards (light) ---------- */
  .portfolio-item__img { transition: transform 1000ms cubic-bezier(0.22, 1, 0.36, 1); }
  .portfolio-item:hover .portfolio-item__img { transform: scale(1.04); }
  .portfolio-item__overlay { opacity: 0; transition: opacity 400ms ease; background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%); }
  .portfolio-item:hover .portfolio-item__overlay { opacity: 1; }

  /* ---------- Portfolio modal ---------- */
  .portfolio-modal { animation: portfolioModalIn 350ms cubic-bezier(0.22, 1, 0.36, 1); }
  @keyframes portfolioModalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }



  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  .animate-float{animation:float 6s ease-in-out infinite}

  @keyframes clientMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes clientMarqueeReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  .client-marquee { animation: clientMarquee 40s linear infinite; }
  .client-marquee-reverse { animation: clientMarqueeReverse 40s linear infinite; }
  .client-strip:hover .client-marquee,
  .client-strip:hover .client-marquee-reverse { animation-play-state: paused; }
  .client-logo-white { filter: brightness(0) invert(1); opacity: 0.92; }
  .client-logo-dark { filter: grayscale(0%) opacity(1); transition: filter 300ms ease; }
.client-logo-dark:hover { filter: grayscale(0%) opacity(1); }


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
    transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: center;
    will-change: transform;
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
    border-radius: 10px;
    overflow: hidden;
    color: #fff;
    background-color: #1c1c1c;
    background-image:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 160px 160px;
    border: none;
    box-shadow: none;
    animation: heroTrailFade 2400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    pointer-events: none;
    will-change: transform, opacity;
    transform-origin: center 60%;
  }
  .hero-trail-card--pink { }
  .hero-trail-card--green { }
  .hero-trail-card--white { }
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
    background: transparent;
  }
  .hero-trail-card--image .hero-trail-card__image {
    position: static;
    display: block;
    width: auto;
    height: auto;
    max-width: 260px;
    max-height: 170px;
    object-fit: contain;
    border-radius: 14px;
  }

  /* Spring-y, physics-inspired entrance with a subtle settle wobble */
  @keyframes heroTrailFade {
    0% {
      opacity: 0;
      transform: translate3d(0, 28px, 0) scale(0.55) rotate(calc(var(--card-rotate, 0deg) * 0.1));
    }
    18% {
      opacity: 1;
      transform: translate3d(0, -6px, 0) scale(1.09) rotate(calc(var(--card-rotate, 0deg) * 1.1));
    }
    30% {
      transform: translate3d(0, 3px, 0) scale(0.97) rotate(calc(var(--card-rotate, 0deg) * 0.92));
    }
    42% {
      transform: translate3d(0, -2px, 0) scale(1.02) rotate(calc(var(--card-rotate, 0deg) * 1.03));
    }
    54% {
      transform: translate3d(0, 1px, 0) scale(0.995) rotate(var(--card-rotate, 0deg));
    }
    68% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1) rotate(var(--card-rotate, 0deg));
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -40px, 0) scale(0.9) rotate(calc(var(--card-rotate, 0deg) * 0.4));
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
