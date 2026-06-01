// sections.jsx — all section components for the Gyeolhada landing page
var {
  useEffect,
  useRef,
  useState,
  useMemo
} = React;

// ---------- Reveal-on-scroll wrapper ----------
function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = ''
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      }
    }, {
      threshold: 0.12
    });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: `reveal ${className}`
  }, children);
}

// ---------- Header ----------
function Header({
  ctaPrimary,
  onOpenMenu
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const nav = [{
    label: '결하다 방식',
    href: '#way'
  }, {
    label: '신뢰 검증',
    href: '#trust'
  }, {
    label: '비용',
    href: '#pricing'
  }, {
    label: 'FAQ',
    href: '#faq'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: `site-header ${scrolled ? 'is-scrolled' : ''}`,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6 md:px-10",
    style: {
      maxWidth: '1240px',
      margin: '0 auto',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Sig.Logo, {
    height: 26
  })), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex",
    style: {
      flex: '1 1 0%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      fontSize: '14px',
      color: 'rgba(44,42,53,.75)'
    }
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.href,
    href: n.href,
    className: "hover:text-lavender-deep whitespace-nowrap transition-colors"
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    className: "md:hidden",
    style: {
      flex: '1 1 0%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#download",
    className: "hidden sm:inline-flex btn btn-primary btn-sm whitespace-nowrap"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenMenu,
    className: "md:hidden w-10 h-10 grid place-items-center",
    "aria-label": "\uBA54\uB274"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h14M3 10h14M3 14h14",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }))))));
}

// ---------- Hero ----------
function Hero({
  heroH,
  heroSub,
  ctaState,
  ctaData,
  waveStyle,
  paletteIntensity,
  images,
  appScreens
}) {
  const stageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = Math.min(Math.max(vh - rect.top, 0), total);
      const p = Math.max(0, Math.min(1, seen / total));
      setProgress(Math.min(1, p * 1.6));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  const heroImg = images && (Array.isArray(images.hero) ? images.hero[0] : images.hero);
  return /*#__PURE__*/React.createElement("section", {
    className: "relative min-h-[100svh] overflow-hidden flex items-center",
    id: "hero",
    ref: stageRef,
    style: {
      isolation: 'isolate'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: `
            radial-gradient(60% 50% at 78% 22%, rgba(216,183,106,.18), transparent 60%),
            radial-gradient(50% 60% at 12% 30%, rgba(200,182,226,.32), transparent 65%),
            radial-gradient(70% 60% at 50% 100%, rgba(184,197,176,.22), transparent 70%),
            linear-gradient(180deg, #faf7f2 0%, #f4eee2 60%, #ece4d3 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 pointer-events-none",
    style: {
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement(Sig.AnimatedWaves, {
    scale: 1.4
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-5 text-lavender-deep"
  }, "\uACB0\uD558\uB2E4 \xB7 \uACB0\uD63C\uC744 \uC704\uD55C \uB9CC\uB0A8")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h1", {
    className: "gh-display gh-h1 text-ink"
  }, /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: heroH
    }
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 max-w-[520px]",
    style: {
      textWrap: 'pretty'
    }
  }, heroSub)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("p", {
    className: "small mt-5 flex items-center gap-2 text-mute"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 1.5l5.5 2.5v4.2c0 3.2-2.3 5.5-5.5 6.3-3.2-.8-5.5-3.1-5.5-6.3V4L8 1.5z",
    stroke: "#6B5B95",
    strokeWidth: "1"
  })), "\u300C\uACB0\uD63C\uC911\uAC1C\uC5C5\uBC95\u300D\uC5D0 \uB530\uB978 \uC2E0\uACE0 \uC808\uCC28\uB97C \uAC16\uCD98 \uACB0\uD63C\uC815\uBCF4 \uC11C\uBE44\uC2A4 \xB7 \uC8FC\uC2DD\uD68C\uC0AC \uB9B0\uD50C")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-9 flex flex-wrap gap-3",
    id: "download"
  }, ctaButtons.map((b, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: b.href,
    className: i === 0 ? "store-btn" : "store-btn outline",
    style: i !== 0 ? {
      background: 'rgba(255,255,255,.7)',
      backdropFilter: 'blur(8px)'
    } : null
  }, b.icon === 'apple' && /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.4-2.8-.1 0-2.7-1-2.9-4.1zm-2.4-7.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 2.9 1.1.1 2.2-.5 2.9-1.3z"
  })), b.icon === 'play' && /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.6 2.5c-.4.3-.6.7-.6 1.3v16.4c0 .6.2 1 .6 1.3l9.5-9.5L3.6 2.5z",
    fill: "#00BCD4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.7 8.8L4.6 1.9c-.4-.2-.8-.3-1.1-.1l9.6 9.6 3.6-2.6z",
    fill: "#EA4335"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.4 11.1l-3.7-2.1L13 12l3.7 3.7 3.7-2.1c1.2-.9 1.2-1.6 0-2.5z",
    fill: "#FFC107"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 22.1c.3.1.7.1 1.1-.1l12.1-6.9-3.6-3.6L3.5 22.1z",
    fill: "#4CAF50"
  })), b.icon === 'bell' && /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 19a2 2 0 0 0 4 0"
  })), b.icon === 'edit' && /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 20h4l11-11-4-4L4 16v4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 6l4 4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "leading-tight text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "small"
  }, b.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, b.label)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 360
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-12 flex items-center gap-3 text-mute small"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-12 h-px bg-ink/20"
  }), /*#__PURE__*/React.createElement("span", null, "\uC2A4\uD06C\uB864\uD558\uBA74 \uACB0\uD558\uB2E4\uC758 \uBC29\uC2DD\uC774 \uD3BC\uCCD0\uC9D1\uB2C8\uB2E4")))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5 relative h-[460px] md:h-[600px]"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 200,
    className: "absolute inset-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[18%] top-[6%] hidden sm:block",
    style: {
      transform: 'translateX(20%)'
    }
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.profile,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uD504\uB85C\uD544",
    width: 220,
    tilt: 6
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[6%] sm:right-[8%] top-[10%] sm:top-[14%]"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.card,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uB9E4\uCE6D \uCE74\uB4DC",
    width: 280,
    tilt: -3
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[10%] top-[18%] w-[320px] h-[320px] rounded-full -z-10 pointer-events-none",
    style: {
      background: 'radial-gradient(closest-side, rgba(168,143,206,.25), transparent)'
    }
  }))))));
}

// ---------- Section 2: Problem → Solution (tabbed, interactive) ----------
function ProblemSection({
  appScreens
}) {
  const pairs = [{
    num: '01',
    problem: '면접처럼 스펙만 확인하는 자리',
    problemSub: '조건만 주고받다 보면 만남이 면접처럼 됩니다. 정작 또 만나고 싶은지는 알 수 없습니다.',
    problemIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "3",
      width: "16",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 18c1-2 3-3 5-3s4 1 5 3"
    })),
    solve: '심리 질문으로 관계의 결까지',
    solveSub: '성향·감정 표현·갈등 대처 방식을 묻고, 결과는 내면 분석과 리듬 상세로 보여드립니다.',
    solveIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21 12c0 4-4 7-9 7-1.3 0-2.5-.2-3.6-.6L3 20l1.7-4.7C3.6 14 3 13 3 12c0-4 4-7 9-7s9 3 9 7z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 11h6M9 14h4"
    })),
    screen: appScreens && appScreens.innerAlt,
    screenB: appScreens && appScreens.rhythmDetail,
    screenLabel: '내면 분석 · 리듬 상세'
  }, {
    num: '02',
    problem: '조건만 맞고 방향이 어긋남',
    problemSub: '숫자로는 정렬되지만 가치관·삶의 방향이 다를 수 있습니다.',
    problemIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 6h16M4 12h10M4 18h6"
    })),
    solve: '가치관과 생활 성향까지',
    solveSub: '라이프스타일 · 갈등 대처 방식 · 애착 성향 · 경제관 · 자녀관까지 함께 비교해, 어느 부분이 서로 맞는지 보여드립니다.',
    solveIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 9l-2.5 5.5L7 17l2.5-5.5L15 9z",
      fill: "currentColor",
      stroke: "none"
    })),
    screen: appScreens && appScreens.matchReason,
    screenB: appScreens && appScreens.tendency,
    screenLabel: '매칭 이유 · 성향 분석'
  }, {
    num: '03',
    problem: '가벼운 사용자들 사이에서 피로',
    problemSub: '즉흥적인 만남이 섞이면, 결혼을 위한 결정이 어렵습니다.',
    problemIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "3",
      width: "14",
      height: "18",
      rx: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "17.5",
      r: "0.8",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 7h4"
    })),
    solve: '본인 확인을 거친 회원만',
    solveSub: '본인·신원·직업·학력 검토를 거쳐 승인된 회원만 가입할 수 있도록 운영합니다.',
    solveIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2l8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5l8-3z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 12l2 2 4-4"
    })),
    screen: appScreens && appScreens.verifyDetail,
    screenY: 220,
    screenLabel: '필수 인증 · 승인 완료'
  }, {
    num: '04',
    problem: '굵직한 조건만 받아주는 필터',
    problemSub: '흡연·종교·음주처럼 신경 쓰는 세부 선호를 반영할 수 없습니다.',
    problemIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 6h16M7 12h10M10 18h4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "6",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "12",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "18",
      r: "1.5",
      fill: "currentColor",
      stroke: "none"
    })),
    solve: '원하는 결을 세세하게',
    solveSub: '스펙은 물론, 문신·흡연·음주·종교까지 — 다양한 선호도를 직접 설정합니다.',
    solveIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 6h16M7 12h10M10 18h4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "14",
      cy: "6",
      r: "1.6",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "12",
      r: "1.6",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "13",
      cy: "18",
      r: "1.6",
      fill: "currentColor",
      stroke: "none"
    })),
    screen: appScreens && appScreens.prefsDetail,
    screenLabel: '다양한 선호도 설정'
  }, {
    num: '05',
    problem: '높은 가입비, 불확실한 결과',
    problemSub: '먼저 큰 비용을 치러야 시작할 수 있는 구조. 결과가 보장되지 않는데도 선결제가 필요합니다.',
    problemIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .6 3 1.8c0 2.4-6 2.2-6 4.4 0 1.2 1.3 1.8 3 1.8s3-.6 3-2"
    })),
    solve: '커피 한잔 값으로 시작',
    solveSub: '가입은 커피 한잔 값. 양쪽이 만남에 동의해 확정될 때만 비용이 발생합니다.',
    solveIcon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 8h13v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 9h2.5a2 2 0 0 1 0 4H17"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 3c0 1-.8 1.5-.8 2.5M11 3c0 1-.8 1.5-.8 2.5"
    })),
    priceCard: true
  }];
  const [active, setActive] = useState(0);
  const cur = pairs[active];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite",
    id: "problem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4 \uBC29\uC2DD")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[22ch]"
  }, "\uC2A4\uD399\uB9CC \uB9DE\uCD98 \uC18C\uAC1C\uD305,", /*#__PURE__*/React.createElement("br", null), "\uBA74\uC811 \uAC19\uC9C0 \uC54A\uC558\uB098\uC694?")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "problem-layout mt-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "problem-list"
  }, pairs.map((p, i) => {
    const isActive = i === active;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: `problem-item${isActive ? ' is-active' : ''}`,
      onClick: () => setActive(i),
      "aria-pressed": isActive
    }, /*#__PURE__*/React.createElement("div", {
      className: "problem-item-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "problem-item-iconbox"
    }, p.problemIcon), /*#__PURE__*/React.createElement("span", {
      className: "problem-item-title"
    }, p.problem)), isActive && /*#__PURE__*/React.createElement("span", {
      className: "problem-item-arrow",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M14 6l6 6-6 6"
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "problem-detail",
    key: active
  }, /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-head"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/brand-mark.png",
    alt: "\uACB0\uD558\uB2E4",
    width: "36",
    height: "36",
    style: {
      borderRadius: '8px',
      display: 'block',
      flexShrink: 0,
      marginRight: '4px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow text-lavender-deep"
  }, "\uACB0\uD558\uB2E4\uB294")), /*#__PURE__*/React.createElement("div", {
    className: `problem-detail-body${cur.screenB ? ' is-dual' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 leading-snug"
  }, cur.solve), /*#__PURE__*/React.createElement("p", {
    className: "problem-detail-sub"
  }, cur.solveSub)), cur.priceCard ? /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price-card-cup",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "64",
    height: "64",
    viewBox: "0 0 64 64",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 24h30v13a13 13 0 0 1-13 13H27a13 13 0 0 1-13-13V24z",
    fill: "#EFE8F7",
    stroke: "#6B5B95",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 28h6a6 6 0 0 1 0 12h-6",
    fill: "#EFE8F7",
    stroke: "#6B5B95",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 9c0 3-2.2 3.5-2.2 6.5M31 9c0 3-2.2 3.5-2.2 6.5M40 9c0 3-2.2 3.5-2.2 6.5",
    stroke: "#A88FCE",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 56h36",
    stroke: "#6B5B95",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "price-card-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "price-card-label"
  }, "\uAC00\uC785\uBE44"), /*#__PURE__*/React.createElement("div", {
    className: "price-card-amount"
  }, "\u20A910,000")), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-lavender-deep text-white"
  }, "\uBD80\uB2F4 \uC5C6\uC774")), /*#__PURE__*/React.createElement("div", {
    className: "price-card-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "price-card-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "price-card-label"
  }, "\uB9CC\uB0A8 \uD655\uC815 \uC2DC"), /*#__PURE__*/React.createElement("div", {
    className: "price-card-amount"
  }, "\u20A9100,000"))), /*#__PURE__*/React.createElement("p", {
    className: "price-card-note"
  }, "\uC591\uCABD\uC774 \uB9CC\uB0A8\uC5D0 \uB3D9\uC758\uD560 \uB54C\uB9CC \uACB0\uC81C\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-cap"
  }, "\uC608\uCE21 \uAC00\uB2A5\uD55C \uBE44\uC6A9")) : cur.screen && /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-phone"
  }, cur.screenB ? /*#__PURE__*/React.createElement("div", {
    className: "screen-pair"
  }, /*#__PURE__*/React.createElement("div", {
    className: "screen-crop"
  }, /*#__PURE__*/React.createElement("img", {
    src: cur.screen,
    alt: "\uACB0\uD558\uB2E4 \uC571 \uD654\uBA74 1",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "screen-crop"
  }, /*#__PURE__*/React.createElement("img", {
    src: cur.screenB,
    alt: "\uACB0\uD558\uB2E4 \uC571 \uD654\uBA74 2",
    loading: "lazy"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "screen-crop"
  }, /*#__PURE__*/React.createElement("img", {
    src: cur.screen,
    alt: `결하다 앱 — ${cur.screenLabel}`,
    loading: "lazy",
    style: cur.screenY ? {
      transform: `translateY(-${cur.screenY}px)`
    } : undefined
  })), /*#__PURE__*/React.createElement("div", {
    className: "problem-detail-cap"
  }, cur.screenLabel))))))));
}

// ---------- Section 3: Three Gyeol — matching method (merged with personality) ----------
function ThreeGyeolSection() {
  const items = [{
    tag: '외면의 결',
    kr: '外',
    t: '현실적인 결혼 조건',
    d: '나이, 직업, 학력, 거주지, 자산 등 결혼의 토대가 되는 정보를 인증으로 확인합니다.',
    photo: 'images/gyeol-card-external.png',
    photoAlt: '서류·반지·서신으로 표현한 결혼의 토대',
    note: '그래서 기본은 안심하고 시작합니다.'
  }, {
    tag: '내면의 결',
    kr: '內',
    t: '감정과 갈등을 다루는 방식',
    d: '심리 질문과 선호 질문으로 성향·감정 표현·갈등 대처 방식을 살핍니다.',
    photo: 'images/gyeol-card-inner.png',
    photoAlt: '심리 카드를 두고 마주 앉은 두 사람의 손',
    note: '그래서 대화가 통하는 사람을 만납니다.'
  }, {
    tag: '미래의 결',
    kr: '來',
    t: '미래의 결을 맞춰봅니다',
    d: '결혼관·가족관·경제관까지 살펴, 두 사람의 미래가 맞는지 확인합니다.',
    photo: 'images/gyeol-card-future.png',
    photoAlt: '집·달력·저축이 함께 놓인 미래 설계 장면',
    note: '그래서 방향이 어긋나 헤어지지 않습니다.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "way",
    className: "bg-veil grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uC758 \uBC29\uC2DD \u2014 \uC138 \uAC00\uC9C0 \uACB0"), /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[24ch]"
  }, "\uACB0\uC774 \uB9DE\uC744 \uB54C,", /*#__PURE__*/React.createElement("br", null), "\uB450 \uC0AC\uB78C\uC758 \uC2DC\uAC04\uC774 \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uC774\uC5B4\uC9D1\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid md:grid-cols-3 gap-5"
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 h-full flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-serif text-lavender-deep text-[18px]",
    style: {
      fontFamily: '"Noto Serif KR", serif'
    }
  }, it.kr), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow !tracking-[.16em] !text-ink/55"
  }, it.tag)), /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-xl overflow-hidden hairline mb-5",
    style: {
      aspectRatio: '4/5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.photo,
    alt: it.photoAlt,
    className: "absolute inset-0 w-full h-full object-cover",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-2"
  }, it.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, it.d), /*#__PURE__*/React.createElement("p", {
    className: "small mt-3 text-lavender-deep/80"
  }, "\u2014 ", it.note))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-10 small text-mute"
  }, "\xB7 \uC758\uD559\uC801\xB7\uC2EC\uB9AC \uC9C4\uB2E8\uC744 \uB300\uCCB4\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."))));
}

// ---------- Connection band: full-width horizontal photo break ----------
function ConnectionBand({
  images
}) {
  const img = images && (Array.isArray(images.band) ? images.band[0] : images.band);
  if (!img) return null;
  return /*#__PURE__*/React.createElement("section", {
    id: "connection",
    className: "relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full",
    style: {
      aspectRatio: '16/7',
      maxHeight: '520px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "\uB450 \uC0AC\uB78C\uC774 \uD568\uAED8 \uBC18\uC9C0\uB97C \uB193\uB294 \uBAA8\uC2B5",
    className: "absolute inset-0 w-full h-full object-cover",
    loading: "lazy"
  })));
}

// ---------- Brand band: emotional break with couple photo ----------
function PhilosophyBand({
  images
}) {
  const img = images && (Array.isArray(images.philosophy) ? images.philosophy[0] : images.philosophy);
  if (!img) return null;
  return /*#__PURE__*/React.createElement("section", {
    id: "philosophy",
    className: "bg-veil grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-10 md:gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-2xl overflow-hidden hairline",
    style: {
      aspectRatio: '4/5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "\uC2E0\uBD80\uAC00 \uC2E0\uB791\uC758 \uC5B4\uAE68\uB97C \uAC10\uC2FC \uBAA8\uC2B5",
    className: "absolute inset-0 w-full h-full object-cover",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'linear-gradient(135deg, rgba(107,91,149,.05), rgba(0,0,0,0) 40%, rgba(0,0,0,.18))'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uAC00 \uADF8\uB9AC\uB294 \uACB0\uD63C")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[18ch]"
  }, "\uC11C\uB85C\uC758 \uACB0\uC744 \uC54C\uC544\uBCF4\uACE0,", /*#__PURE__*/React.createElement("br", null), "\uC624\uB798 \uD568\uAED8 \uAC77\uB294 \uC77C.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[44ch]"
  }, "\uACB0\uD63C\uC740 \uC7A0\uAE50\uC758 \uD638\uAC10\uC774 \uC544\uB2C8\uB77C, \uB450 \uC0AC\uB78C\uC758 \uACB0\uC774 \uB9DE\uC544\uAC08 \uB54C \uC2DC\uC791\uB429\uB2C8\uB2E4. \uACB0\uD558\uB2E4\uB294 \uADF8 \uACB0\uC744 \uD568\uAED8 \uC0B4\uD53C\uBA70, \uC624\uB798 \uD568\uAED8\uD560 \uC218 \uC788\uB294 \uB9CC\uB0A8\uC744 \uB3D5\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill border border-ink/10 bg-white text-ink/75"
  }, "\uACB0\uD63C \uAC00\uCE58\uAD00"), /*#__PURE__*/React.createElement("span", {
    className: "pill border border-ink/10 bg-white text-ink/75"
  }, "\uAC10\uC815\xB7\uAC08\uB4F1 \uB300\uCC98"), /*#__PURE__*/React.createElement("span", {
    className: "pill border border-ink/10 bg-white text-ink/75"
  }, "\uD568\uAED8 \uADF8\uB9AC\uB294 \uBBF8\uB798")))))));
}

// ---------- Section 4: Trust — 결혼중개업법 + 인증 + 개인정보 통합 ----------
function TrustSection({
  images,
  appScreens
}) {
  const trustImg = images && (Array.isArray(images.trust) ? images.trust[0] : images.trust);
  const verifyItems = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남'];
  const privacyPoints = ['검토 목적의 정보 확인', '민감 자료 원본 비공개', '필요한 범위 내 정보 활용', '개인정보 처리방침 명확히 안내'];
  return /*#__PURE__*/React.createElement("section", {
    id: "trust",
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-10 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uB4F1\uB85D \uACB0\uC815\uC0AC \xB7 \uC778\uC99D\uB41C \uD68C\uC6D0 \xB7 \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[24ch]"
  }, "\uC544\uBB34\uB098 \uB4E4\uC774\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4,", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB798\uC11C \uBBFF\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[52ch]"
  }, "\u300C\uACB0\uD63C\uC911\uAC1C\uC5C5\uBC95\u300D\uC5D0 \uB530\uB77C \uC2E0\uACE0\uB41C \uACB0\uD63C\uC815\uBCF4 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4. \uBCF8\uC778\xB7\uC2E0\uC6D0\xB7\uC9C1\uC5C5\xB7\uD559\uB825\uC744 \uAC80\uD1A0\uD574 \uD1B5\uACFC\uD55C \uC0AC\uB78C\uB9CC \uBC1B\uACE0, \uC131\uD5A5\uC740 Big5\xB7\uC560\uCC29\uC774\uB860\uC744 \uD1A0\uB300\uB85C \uC0B4\uD54D\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-panel mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uC2B9\uC778\uC81C \uAC80\uC99D \uC808\uCC28"), /*#__PURE__*/React.createElement("ul", {
    className: "grid sm:grid-cols-2 gap-x-6 gap-y-3"
  }, verifyItems.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-3 body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full grid place-items-center bg-lavender-deep/10 text-lavender-deep shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2l2.4 2.3 4.6-5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", null, it)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-panel mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638"), /*#__PURE__*/React.createElement("ul", {
    className: "grid sm:grid-cols-2 gap-x-6 gap-y-3"
  }, privacyPoints.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-3 body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full grid place-items-center bg-sage/30 text-ink/70 shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "5",
    width: "7",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 5V3.5a2 2 0 0 1 4 0V5"
  }))), /*#__PURE__*/React.createElement("span", null, p))))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-2xl overflow-hidden hairline",
    style: {
      aspectRatio: '3/4'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: trustImg,
    alt: "\uAC80\uC99D \uD56D\uBAA9\uACFC \uC790\uBB3C\uC1E0\uAC00 \uB193\uC778 \uCC45\uC0C1 \u2014 \uC2E0\uB8B0\uC758 \uD655\uC778",
    className: "absolute inset-0 w-full h-full object-cover",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,.12))'
    }
  })))))));
}

// ---------- Section 5: Pricing — low entry, on-success only ----------
function PricingSection({
  images
}) {
  const pricingImg = images && (Array.isArray(images.pricing) ? images.pricing[0] : images.pricing);
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-10 md:gap-12 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uC758 \uCC28\uBCC4\uC810")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uCEE4\uD53C \uD55C\uC794 \uAC12\uC73C\uB85C \uC2DC\uC791,", /*#__PURE__*/React.createElement("br", null), "\uB9CC\uB0A8 \uD655\uC815 \uC2DC\uC5D0\uB9CC \uACB0\uC81C.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 mt-10 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-16 -top-16 w-56 h-56 rounded-full",
    style: {
      background: 'radial-gradient(closest-side, rgba(200,182,226,.5), transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\uAC00\uC785\uBE44"), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-lavender-deep text-white"
  }, "\uBD80\uB2F4 \uC5C6\uC774")), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mt-2",
    style: {
      fontSize: '34px',
      letterSpacing: '-0.02em'
    }
  }, "\u20A910,000"), /*#__PURE__*/React.createElement("p", {
    className: "body mt-2 text-mute"
  }, "\uC120\uACB0\uC81C \uBD80\uB2F4 \uC5C6\uC774 \uAC00\uBCCD\uAC8C \uC2DC\uC791\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\uB9CC\uB0A8 \uD655\uC815 \uC2DC"), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mt-2",
    style: {
      fontSize: '34px',
      letterSpacing: '-0.02em'
    }
  }, "\u20A9100,000"), /*#__PURE__*/React.createElement("p", {
    className: "body mt-2 text-mute"
  }, "\uC591\uCABD\uC774 \"\uB9CC\uB098\uBCFC\uB798\uC694\"\uB97C \uB204\uB974\uACE0 \uB9CC\uB0A8\uC774 \uD655\uC815\uB420 \uB54C\uB9CC \uBC1C\uC0DD\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    className: "small mt-3 text-mute"
  }, "\uACB0\uC81C \uC2DC\uC810\xB7\uD658\uBD88 \uC815\uCC45\uC740 \uC571 \uAC00\uC785 \uB2E8\uACC4\uC5D0\uC11C \uC0C1\uC138 \uC548\uB0B4\uB429\uB2C8\uB2E4.")))))), pricingImg && /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-2xl overflow-hidden hairline md:mt-16",
    style: {
      aspectRatio: '4/5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: pricingImg,
    alt: "\uBC18\uC9C0\uB97C \uB080 \uB450 \uC0AC\uB78C\uC758 \uC190 \u2014 \uC57D\uC18D\uC758 \uC21C\uAC04",
    className: "absolute inset-0 w-full h-full object-cover",
    loading: "lazy"
  })))))));
}

// ---------- Section 7: FAQ ----------
function FAQSection() {
  const items = [['가입비는 얼마인가요?', '가입비는 ₩10,000입니다. 커피 한잔 값으로 부담 없이 시작할 수 있도록 설계했습니다. 가입 이후 매칭을 받고 프로필을 검토하는 단계까지는 추가 비용이 없습니다.'], ['만남 비용은 언제 얼마나 발생하나요?', '매칭된 두 사람이 모두 "만나볼래요"를 누르고 만남이 확정될 때 ₩100,000이 발생합니다. 그 외 응답·추천 확인 단계에는 추가 비용이 없습니다.'], ['누구나 매칭해 주나요?', '아니요. 핵심 선호가 정면으로 어긋나거나, 자녀관·경제관 같은 가치관이 충돌하면 매칭하지 않습니다. 억지로 붙이지 않는 것이 결하다의 기준입니다.'], ['아무나 가입할 수 있나요?', '결하다는 진지한 만남을 위해 기본 정보와 신뢰 자료를 확인한 뒤 가입을 승인합니다. 본인 확인, 신원·직업·학력 검토를 거친 회원만 가입할 수 있습니다.'], ['결혼관·가족관·경제관은 어떻게 반영되나요?', '이 항목들은 매칭 추천에 반영됩니다. 비슷한 방향을 가진 사람을 우선 보여드리는 방식으로, 두 사람의 결을 함께 살핍니다.'], ['제출한 서류가 상대방에게 공개되나요?', '제출 자료는 검토 목적에 사용되며, 상대에게는 필요한 범위의 확인 정보만 제공되도록 설계합니다. 민감한 원본 자료가 그대로 공개되지 않도록 관리합니다.'], ['결하다는 소개팅 앱과 무엇이 다른가요?', '사진과 거리 중심의 즉흥적 매칭보다, 결혼관·가치관·관계 성향을 함께 살피는 결혼 중심 매칭 서비스입니다. 「결혼중개업법」에 따라 신고된 결혼정보 서비스로 운영됩니다.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    className: "bg-veil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1000px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "FAQ")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38")), /*#__PURE__*/React.createElement("div", {
    className: "mt-10 card divide-y divide-ink/[.08]"
  }, items.map(([q, a], i) => /*#__PURE__*/React.createElement("details", {
    key: i,
    className: "group p-6 md:p-7"
  }, /*#__PURE__*/React.createElement("summary", {
    className: "flex items-start justify-between gap-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gh-h3 leading-snug"
  }, q), /*#__PURE__*/React.createElement("span", {
    className: "faq-q-icon mt-1.5 w-6 h-6 grid place-items-center text-lavender-deep shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1v12M1 7h12",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "body mt-3 text-mute max-w-[68ch]"
  }, a))))));
}

// ---------- Footer ----------
function Footer({
  ctaState,
  ctaData
}) {
  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-deep"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Sig.Logo, {
    height: 30,
    light: true
  }), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-[15px] text-white/70"
  }, "\uACB0\uD558\uB2E4 \u2014 \uB610 \uB9CC\uB098\uACE0 \uC2F6\uC740 \uC0AC\uB78C\uC744, \uCC98\uC74C\uBD80\uD130."), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 flex flex-col sm:flex-row gap-3"
  }, ctaButtons.map((b, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: b.href,
    className: "store-btn",
    style: {
      background: '#fff',
      color: '#1c1a23'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "leading-tight text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "small",
    style: {
      color: 'rgba(28,26,35,.6)'
    }
  }, b.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, b.label)))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow !text-white/60"
  }, "Company"), /*#__PURE__*/React.createElement("dl", {
    className: "mt-4 grid grid-cols-[7em_1fr] gap-y-2 text-[13.5px] text-white/75"
  }, /*#__PURE__*/React.createElement("dt", null, "\uD68C\uC0AC\uBA85"), /*#__PURE__*/React.createElement("dd", null, "\uC8FC\uC2DD\uD68C\uC0AC \uB9B0\uD50C (LINPLE)"), /*#__PURE__*/React.createElement("dt", null, "\uB300\uD45C\uC774\uC0AC"), /*#__PURE__*/React.createElement("dd", null, "\uC774\uC815\uD5CC"), /*#__PURE__*/React.createElement("dt", null, "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638"), /*#__PURE__*/React.createElement("dd", null, "425-87-04263"), /*#__PURE__*/React.createElement("dt", null, "\uD1B5\uC2E0\uD310\uB9E4\uC5C5\uC2E0\uACE0"), /*#__PURE__*/React.createElement("dd", null, "2026-\uC11C\uC6B8\uAC15\uC11C\uAD6C-0000"), /*#__PURE__*/React.createElement("dt", null, "\uAD6D\uB0B4\uACB0\uD63C\uC911\uAC1C\uC5C5"), /*#__PURE__*/React.createElement("dd", null, "\uC11C\uC6B8-\uAC15\uC11C\uAD6C-\uAD6D\uB0B4-26-0000\uD638"), /*#__PURE__*/React.createElement("dt", null, "\uBCF8\uC810"), /*#__PURE__*/React.createElement("dd", null, "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uAC15\uC11C\uAD6C \uACF5\uD56D\uB300\uB85C 190, \uD478\uB9AC\uB9C8\uD0C0\uC6CC 1006\uD638 "))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow !text-white/60"
  }, "Links"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-4 space-y-2.5 text-[13.5px] text-white/75"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white"
  }, "\uC774\uC6A9\uC57D\uAD00")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white"
  }, "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white"
  }, "\uACB0\uD63C\uC911\uAC1C\uD45C\uC900\uC57D\uAD00")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white"
  }, "\uACE0\uAC1D\uC13C\uD130"))))), /*#__PURE__*/React.createElement("div", {
    className: "rule mt-12 mb-8",
    style: {
      background: 'rgba(255,255,255,.12)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "small max-w-[80ch] text-white/55"
  }, "\uACB0\uD558\uB2E4\uB294 \uB9CC\uB0A8\uC758 \uAE30\uD68C\uB97C \uC5F0\uACB0\uD558\uB294 \uC11C\uBE44\uC2A4\uC774\uBA70, \uACB0\uD63C \uC131\uC0AC\uB098 \uAD00\uACC4 \uACB0\uACFC\uB97C \uBCF4\uC7A5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD68C\uC6D0 \uC815\uBCF4\uC640 \uC81C\uCD9C \uC790\uB8CC\uB294 \uD655\uC778 \uC808\uCC28\uB97C \uAC70\uCE58\uC9C0\uB9CC, \uBAA8\uB4E0 \uC815\uBCF4\uC758 \uC808\uB300\uC801 \uC9C4\uC2E4\uC131\uC744 \uBCF4\uC99D\uD558\uB294 \uAC83\uC740 \uC544\uB2D9\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    className: "small mt-5 text-white/40"
  }, "\xA9 2026 LINPLE Inc. All rights reserved.")));
}

// ---------- Mobile sticky bar + Desktop floating QR ----------
function MobileSticky({
  ctaState,
  ctaData
}) {
  const primary = (ctaState === 'pre' ? ctaData.pre : ctaData.post)[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "mobile-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 min-w-0"
  }, /*#__PURE__*/React.createElement(Sig.Logo, {
    height: 20,
    light: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-[12.5px] leading-tight ml-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white/65"
  }, "\uACB0\uD63C\uC744 \uC704\uD55C \uC2E0\uB8B0 \uB9E4\uCE6D"))), /*#__PURE__*/React.createElement("a", {
    href: primary.href,
    className: "btn btn-sm",
    style: {
      background: '#fff',
      color: '#1c1a23'
    }
  }, primary.shortLabel || '앱 다운로드'));
}

// Export to window for app.jsx
Object.assign(window, {
  Reveal,
  Header,
  Hero,
  ProblemSection,
  ConnectionBand,
  ThreeGyeolSection,
  PhilosophyBand,
  TrustSection,
  PricingSection,
  FAQSection,
  Footer,
  MobileSticky
});