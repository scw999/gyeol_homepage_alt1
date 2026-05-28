// signatures.jsx — abstract wave + circular brand signatures
// Style 'A' = the picked option: two crossing curves (lavender × sage)

var { useEffect, useRef } = React;

const Sig = {};

// Two crossing waves that meet in the middle. progress 0..1 controls overlap and ring formation.
Sig.WaveCross = function WaveCross({ progress = 1, scale = 1, showRing = true, style = 'A', dim = 560 }) {
  const p = Math.max(0, Math.min(1, progress));
  const w = 800, h = 560;
  // Wave A path: top arc, becomes flatter/centered as progress -> 1
  // We animate the control y so the two waves meet at the midline.
  const baseAmp = 90 * scale;
  const amp = baseAmp * (1 - 0.55 * p); // slightly settles
  const sep = 60 * (1 - p); // separation between two waves' centerlines, collapses as they meet

  // Lavender wave (top)
  const yA = h / 2 - sep;
  const aPath = `M -40 ${yA}
    C 120 ${yA - amp}, 280 ${yA + amp}, 400 ${yA}
    S 680 ${yA - amp}, 840 ${yA}`;
  // Sage wave (bottom)
  const yB = h / 2 + sep;
  const bPath = `M -40 ${yB}
    C 120 ${yB + amp}, 280 ${yB - amp}, 400 ${yB}
    S 680 ${yB + amp}, 840 ${yB}`;

  // Ring (signature pattern that "completes" as progress -> 1)
  const ringR = 130 * scale;
  const ringDash = 2 * Math.PI * ringR;
  const ringOffset = ringDash * (1 - p);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="sig-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#C8B6E2" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#C8B6E2" stopOpacity="0.0" />
        </radialGradient>
        <linearGradient id="lav-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8B6E2" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#C8B6E2" stopOpacity="1" />
          <stop offset="80%" stopColor="#A88FCE" stopOpacity="1" />
          <stop offset="100%" stopColor="#A88FCE" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="sage-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8C5B0" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#B8C5B0" stopOpacity="1" />
          <stop offset="80%" stopColor="#9DB098" stopOpacity="1" />
          <stop offset="100%" stopColor="#9DB098" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8B6E2"/>
          <stop offset="50%" stopColor="#6B5B95"/>
          <stop offset="100%" stopColor="#B8C5B0"/>
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* glow */}
      <rect x="0" y="0" width={w} height={h} fill="url(#sig-glow)" />

      {/* Echo waves (faint, multiple lines) */}
      {[-40, -20, 20, 40].map((dy,i)=>(
        <path key={'eA'+i}
          d={`M -40 ${yA+dy} C 120 ${yA+dy-amp*0.9}, 280 ${yA+dy+amp*0.9}, 400 ${yA+dy} S 680 ${yA+dy-amp*0.9}, 840 ${yA+dy}`}
          fill="none" stroke="#C8B6E2" strokeOpacity={0.10 + (1-Math.abs(dy)/40)*0.08} strokeWidth="1" />
      ))}
      {[-40, -20, 20, 40].map((dy,i)=>(
        <path key={'eB'+i}
          d={`M -40 ${yB+dy} C 120 ${yB+dy+amp*0.9}, 280 ${yB+dy-amp*0.9}, 400 ${yB+dy} S 680 ${yB+dy+amp*0.9}, 840 ${yB+dy}`}
          fill="none" stroke="#B8C5B0" strokeOpacity={0.09 + (1-Math.abs(dy)/40)*0.08} strokeWidth="1" />
      ))}

      {/* Main waves */}
      <path d={aPath} fill="none" stroke="url(#lav-line)" strokeWidth="2.4" filter="url(#soft)" />
      <path d={bPath} fill="none" stroke="url(#sage-line)" strokeWidth="2.4" filter="url(#soft)" />

      {/* Ring forms in center as progress increases */}
      {showRing && (
        <g transform={`translate(${w/2} ${h/2})`} opacity={Math.max(0, p*1.05 - 0.05)}>
          <circle r={ringR} fill="none" stroke="url(#ring-grad)" strokeWidth="1.4"
                  strokeDasharray={ringDash} strokeDashoffset={ringOffset} transform="rotate(-90)" />
          <circle r={ringR*0.72} fill="none" stroke="#6B5B95" strokeOpacity="0.35" strokeWidth="0.8" />
          <circle r={ringR*0.42} fill="none" stroke="#6B5B95" strokeOpacity="0.55" strokeWidth="0.8" />
          <circle r={3.2} fill="#6B5B95" />
        </g>
      )}
    </svg>
  );
};

// Animated flowing waves — driven by anime.js for hero background
// Two parallel cubic-bezier sine ribbons sharing the same wavelength so they
// look like a matched pair. Each drifts in the same direction at slightly
// different speeds, with very subtle synchronized breathing — gentle and
// continuous, no popping or pulsing.
Sig.AnimatedWaves = function AnimatedWaves({ scale = 1 }) {
  const w = 800, h = 560;
  const baseY = h / 2;
  const sep = 56;
  const yA0 = baseY - sep;
  const yB0 = baseY + sep;

  const aRef = useRef(null);
  const bRef = useRef(null);

  // Build a smooth cubic-bezier sine wave path. Each segment's control points
  // are derived from the analytic derivative so the curve is mathematically smooth.
  const build = (yBase, t, breath, flip, wavelength, amp) => {
    const xStart = -180, xEnd = 980;
    const step = 70;
    const k = (Math.PI * 2) / wavelength;
    const a = breath * amp;
    let d = '';
    let prevX = 0, prevY = 0, prevDy = 0;
    for (let x = xStart; x <= xEnd; x += step) {
      const y = yBase + flip * a * Math.sin(x * k + t);
      const dy = flip * a * k * Math.cos(x * k + t);
      if (d === '') {
        d = 'M ' + x.toFixed(1) + ' ' + y.toFixed(1);
      } else {
        const alpha = step / 3;
        const cx1 = prevX + alpha;
        const cy1 = prevY + prevDy * alpha;
        const cx2 = x - alpha;
        const cy2 = y - dy * alpha;
        d += ' C ' + cx1.toFixed(1) + ' ' + cy1.toFixed(1) + ', ' +
                     cx2.toFixed(1) + ' ' + cy2.toFixed(1) + ', ' +
                     x.toFixed(1) + ' ' + y.toFixed(1);
      }
      prevX = x; prevY = y; prevDy = dy;
    }
    return d;
  };

  // Shared wavelength so the two ribbons feel like a matched pair.
  const wavelength = 520;
  const ampA = 30 * scale;
  const ampB = 26 * scale;

  const apply = (tA, tB, breath) => {
    if (aRef.current) aRef.current.setAttribute('d', build(yA0, tA, breath, 1, wavelength, ampA));
    if (bRef.current) bRef.current.setAttribute('d', build(yB0, tB, breath, -1, wavelength, ampB));
  };

  useEffect(() => {
    apply(0, Math.PI * 0.35, 1);
    if (typeof window === 'undefined' || !window.anime) return;
    const anime = window.anime;
    const state = { tA: 0, tB: Math.PI * 0.35, breath: 1 };
    // Both waves drift the same direction; slightly different speeds so they
    // slowly slide past each other without ever feeling out of sync.
    const flowA = anime({
      targets: state, tA: Math.PI * 2,
      duration: 26000, easing: 'linear', loop: true,
      update: () => apply(state.tA, state.tB, state.breath),
    });
    const flowB = anime({
      targets: state, tB: state.tB + Math.PI * 2,
      duration: 32000, easing: 'linear', loop: true,
    });
    // Very subtle shared breathing — both waves swell and ebb together.
    const breath = anime({
      targets: state,
      breath: [{ value: 1.04, duration: 6000 }, { value: 0.97, duration: 6000 }],
      easing: 'easeInOutSine', loop: true,
    });
    return () => { flowA.pause(); flowB.pause(); breath.pause(); };
  }, []);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="aw-lav" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E72BD" stopOpacity="0" />
          <stop offset="18%" stopColor="#8E72BD" stopOpacity="0.42" />
          <stop offset="82%" stopColor="#A88FCE" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#A88FCE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="aw-mist" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A095B5" stopOpacity="0" />
          <stop offset="18%" stopColor="#A095B5" stopOpacity="0.34" />
          <stop offset="82%" stopColor="#9AA0B8" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#9AA0B8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path ref={aRef} fill="none" stroke="url(#aw-lav)" strokeWidth="1.5" strokeLinecap="round" />
      <path ref={bRef} fill="none" stroke="url(#aw-mist)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

// Small variation for cards / 3 strands
Sig.ThreeStrands = function ThreeStrands({ palette = ['#C8B6E2','#A88FCE','#B8C5B0'] }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="ts-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FAF7F2"/>
          <stop offset="100%" stopColor="#FFFEFB"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#ts-bg)" />
      <g fill="none" strokeWidth="1.3" strokeLinecap="round">
        {[0,1,2].map((i)=>(
          <path key={i}
            d={`M 14 ${50 + i*10}
                C 34 ${30 + i*10}, 50 ${78 + i*10}, 60 ${60 + i*0}
                S 90 ${30 + i*10}, 106 ${50 + i*10}`}
            stroke={palette[i]} opacity={0.85}/>
        ))}
        <circle cx="60" cy="60" r="22" stroke="#6B5B95" opacity="0.35"/>
        <circle cx="60" cy="60" r="3" fill="#6B5B95" stroke="none"/>
      </g>
    </svg>
  );
};

// Personalized wave from "responses" — for the personality section
Sig.WavePortrait = function WavePortrait({ seed = 7, palette = ['#C8B6E2','#A88FCE','#B8C5B0','#D8B76A'] }) {
  // deterministic pseudo wave shape from seed
  const pts = [];
  const rng = (n) => {
    let x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  for (let i=0;i<20;i++){
    pts.push({ x: i*16, y: 80 + Math.sin(i*0.6 + rng(i)*2)*30 + (rng(i+50)-0.5)*16 });
  }
  const d = pts.reduce((acc,p,i)=> i===0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="wp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette[0]}/>
          <stop offset="50%" stopColor={palette[1]}/>
          <stop offset="100%" stopColor={palette[2]}/>
        </linearGradient>
      </defs>
      {/* baseline */}
      <line x1="0" y1="80" x2="320" y2="80" stroke="#2C2A35" strokeOpacity="0.08"/>
      {/* response dots */}
      {pts.map((p,i)=>(
        <g key={i}>
          <line x1={p.x} y1="80" x2={p.x} y2={p.y} stroke="#6B5B95" strokeOpacity="0.18" strokeWidth="1"/>
          <circle cx={p.x} cy={p.y} r="2.4" fill={palette[i%palette.length]}/>
        </g>
      ))}
      {/* connector */}
      <path d={d} fill="none" stroke="url(#wp)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
};

// "결" character motif as a tiny mark
Sig.Mark = function Mark({ size = 28, deep = '#6B5B95' }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="mk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8B6E2"/>
          <stop offset="100%" stopColor="#B8C5B0"/>
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="none" stroke="url(#mk)" strokeWidth="1.2"/>
      <path d="M 4 16 C 10 8, 22 24, 28 16" fill="none" stroke="#C8B6E2" strokeWidth="1.4"/>
      <path d="M 4 16 C 10 24, 22 8, 28 16" fill="none" stroke="#B8C5B0" strokeWidth="1.4"/>
      <circle cx="16" cy="16" r="1.6" fill={deep}/>
    </svg>
  );
};

// Phone mockup frame — for showing app screenshots
// width prop sets pixel width; height auto by aspect ratio (822/1918 ≈ source ratio)
Sig.PhoneMock = function PhoneMock({ src, alt = '', width = 280, tilt = 0, shadow = true, screenSrc, scrollY = 0 }) {
  const w = width;
  const ratio = 822 / 1918; // matches source screenshots
  const h = w / ratio;
  const radius = w * 0.13;
  const innerInset = w * 0.025;
  const screen = src || screenSrc;
  return (
    <div className="relative" style={{ width: w, height: h, transform: `rotate(${tilt}deg)`, transition:'transform .4s ease' }}>
      {/* outer frame */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #2c2a35 0%, #1a1820 60%, #2c2a35 100%)',
          borderRadius: radius,
          boxShadow: shadow
            ? '0 30px 60px -25px rgba(44,42,53,.45), 0 8px 24px -10px rgba(44,42,53,.3), inset 0 1px 0 rgba(255,255,255,.06)'
            : 'none',
          padding: innerInset,
        }}
      >
        {/* inner bezel */}
        <div
          className="relative w-full h-full overflow-hidden bg-offwhite"
          style={{ borderRadius: radius - innerInset }}
        >
          {screen ? (
            <img src={screen} alt={alt} loading="lazy" decoding="async"
                 className="w-full h-full object-cover object-top"
                 style={{transform: `translateY(-${scrollY}px)`}}/>
          ) : (
            <div className="w-full h-full grid place-items-center text-mute small">App preview</div>
          )}
          {/* subtle screen sheen */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(125deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,.04) 100%)'
          }}/>
        </div>
      </div>
      {/* side button hint */}
      <div className="absolute" style={{ left: -1, top: '22%', width: 2, height: '8%', borderRadius: 1, background: '#1a1820' }}/>
      <div className="absolute" style={{ right: -1, top: '18%', width: 2, height: '5%', borderRadius: 1, background: '#1a1820' }}/>
    </div>
  );
};

// Logo wordmark — uses the real cropped logo PNG
Sig.Logo = function Logo({ height = 26, light = false, style = {} }) {
  const filter = light ? 'brightness(0) invert(1)' : 'none';
  return (
    <img src="images/logo-wordmark.png" alt="결하다" decoding="async"
         style={{ height, width: 'auto', display: 'block', filter, ...style }}/>
  );
};

window.Sig = Sig;
