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
    label: '매칭 프로세스',
    href: '#process'
  }, {
    label: '비용',
    href: '#pricing'
  }, {
    label: 'FAQ',
    href: '#faq'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-offwhite/85 border-b border-black/5' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-[64px]' : 'h-[76px]'}`
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "flex items-center gap-3 shrink-0 py-2"
  }, /*#__PURE__*/React.createElement(Sig.Logo, {
    height: 28
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden xl:inline-flex pill ml-1 border border-lavender-deep/20 text-lavender-deep bg-lavender-soft/15 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-lavender-deep"
  }), " \uACB0\uD63C\uC911\uAC1C\uC5C5 \uC2E0\uACE0 \uC5C5\uCCB4")), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex items-center gap-7 lg:gap-9 text-[14px] text-ink/75"
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.href,
    href: n.href,
    className: "hover:text-lavender-deep transition-colors whitespace-nowrap"
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 shrink-0"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#download",
    className: "hidden sm:inline-flex btn btn-primary btn-sm whitespace-nowrap"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenMenu,
    className: "md:hidden w-10 h-10 -mr-2 grid place-items-center",
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
    ref: stageRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 -z-10"
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
    className: "absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
  }, /*#__PURE__*/React.createElement(Sig.WaveCross, {
    progress: progress,
    scale: 1.4,
    showRing: false,
    style: waveStyle
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-5 text-lavender-deep"
  }, "Gyeolhada \xB7 \uACB0\uD63C\uC744 \uC704\uD55C \uB9CC\uB0A8")), /*#__PURE__*/React.createElement(Reveal, {
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
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.6 2.5c-.4.3-.6.7-.6 1.3v16.4c0 .6.2 1 .6 1.3l9.5-9.5L3.6 2.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.7 8.8L4.6 1.9c-.4-.2-.8-.3-1.1-.1l9.6 9.6 3.6-2.6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.4 11.1l-3.7-2.1L13 12l3.7 3.7 3.7-2.1c1.2-.9 1.2-1.6 0-2.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 22.1c.3.1.7.1 1.1-.1l12.1-6.9-3.6-3.6L3.5 22.1z"
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
  }, b.label)))), /*#__PURE__*/React.createElement("a", {
    href: "#way",
    className: "btn btn-ghost",
    style: {
      background: 'rgba(255,255,255,.55)',
      backdropFilter: 'blur(8px)'
    }
  }, "\uB9E4\uCE6D \uBC29\uC2DD \uBCF4\uAE30 \u2192"))), /*#__PURE__*/React.createElement(Reveal, {
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

// ---------- Section 2: Problem ----------
function ProblemSection() {
  const items = [{
    t: '괜찮아 보이지만 대화가 이어지지 않는 만남',
    d: '몇 줄의 프로필로는 보이지 않는 결이 있습니다.'
  }, {
    t: '조건은 맞지만 가치관이 다른 관계',
    d: '숫자로는 정렬되지만 삶의 방향은 어긋날 수 있습니다.'
  }, {
    t: '가벼운 사용자 때문에 피로한 소개팅 앱',
    d: '결혼이라는 진지한 결정은 다른 환경을 필요로 합니다.'
  }, {
    t: '높은 가입비에도 결과가 불확실한 결혼정보회사',
    d: '먼저 큰 비용을 치러야만 시작할 수 있는 구조입니다.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite",
    id: "problem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Why a different way")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[18ch]"
  }, "\uC0AC\uC9C4\uACFC \uC870\uAC74\uB9CC\uC73C\uB85C\uB294", /*#__PURE__*/React.createElement("br", null), "\uACB0\uD63C\uC744 \uACB0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 max-w-[60ch] text-mute"
  }, "\uAC00\uBCBC\uC6B4 \uD638\uAC10\uC740 \uC27D\uAC8C \uC2DC\uC791\uB420 \uC218 \uC788\uC9C0\uB9CC, \uC624\uB798 \uD568\uAED8\uD560 \uAD00\uACC4\uC5D0\uB294 \uB354 \uAE4A\uC740 \uAE30\uC900\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid md:grid-cols-2 gap-4"
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 h-full grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-en text-mute text-[12px] tracking-widest"
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    className: "w-10 h-px bg-lavender"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-3"
  }, it.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, it.d))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-14 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block w-16 h-px bg-lavender-deep/40"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-serif text-[20px] md:text-[24px] text-ink/85",
    style: {
      fontFamily: '"Noto Serif KR", serif'
    }
  }, "\uACB0\uD63C\uC744 \uC704\uD55C \uB9CC\uB0A8\uC5D0\uB294 \uB354 \uAE4A\uC740 \uAE30\uC900\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.")))));
}

// ---------- Section 3: Three Gyeol ----------
function ThreeGyeolSection({
  appScreens
}) {
  const items = [{
    tag: '외면의 결',
    kr: '外',
    t: '현실적인 결혼 조건',
    d: '나이, 직업, 학력, 거주지, 자산 등 결혼 생활의 토대가 되는 정보를 인증 절차로 확인합니다.',
    screen: appScreens && appScreens.verifyMain,
    label: '인증 항목'
  }, {
    tag: '내면의 결',
    kr: '內',
    t: '관계를 만드는 태도',
    d: '성향, 감정 표현 방식, 관계 태도, 갈등을 마주하고 풀어가는 방식을 깊은 질문으로 살핍니다.',
    screen: appScreens && appScreens.inner,
    label: '내면 분석 리포트'
  }, {
    tag: '미래의 결',
    kr: '來',
    t: '함께 그리는 방향',
    d: '결혼관, 가족관, 경제관, 그리고 어떤 일상을 살아가고 싶은지 — 매칭 선호도로 표현됩니다.',
    screen: appScreens && appScreens.prefsMain,
    label: '매칭 선호도'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "way",
    className: "bg-veil grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-8 items-end"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uC758 \uBC29\uC2DD \u2014 \uC138 \uAC00\uC9C0 \uACB0"), /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uACB0\uD558\uB2E4\uB294 \uC0AC\uB78C\uC758 \uAC89\uACFC \uC18D\uC744", /*#__PURE__*/React.createElement("br", null), "\uD568\uAED8 \uBD05\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    className: "md:col-span-5",
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg text-mute"
  }, "\uC870\uAC74\uB9CC\uC73C\uB85C\uB294 \uBCF4\uC774\uC9C0 \uC54A\uB294 \uBD80\uBD84, \uB9C8\uC74C\uB9CC\uC73C\uB85C\uB294 \uC815\uB9AC\uB418\uC9C0 \uC54A\uB294 \uBD80\uBD84. \uACB0\uD558\uB2E4\uB294 \uC138 \uAC00\uC9C0 \uACB0\uC744 \uD568\uAED8 \uC0B4\uD3B4 \uB9CC\uB0A8\uC758 \uAE30\uC900\uC744 \uB354 \uAE4A\uAC8C \uB9CC\uB4ED\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid md:grid-cols-3 gap-5"
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 h-full flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative mb-7 rounded-xl overflow-hidden bg-gradient-to-b from-[#f4eee2] to-[#ece4d3] hairline",
    style: {
      height: 280
    }
  }, it.screen ? /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-6",
    style: {
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: it.screen,
    alt: `결하다 앱 — ${it.label}`,
    width: 170
  })) : /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-3"
  }, /*#__PURE__*/React.createElement(Sig.ThreeStrands, {
    palette: ['#C8B6E2', '#A88FCE', '#6B5B95']
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-4 bottom-3 small text-mute"
  }, it.label)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-serif text-lavender-deep text-[18px]",
    style: {
      fontFamily: '"Noto Serif KR", serif'
    }
  }, it.kr), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow !tracking-[.16em] !text-ink/55"
  }, it.tag)), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-2"
  }, it.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, it.d)))))));
}

// ---------- Section 4: Personality matching ----------
function PersonalitySection({
  appScreens
}) {
  const tags = ['Big Five 성격 5요인', '애착 유형', '관계 갈등 방식', '부부관계 연구'];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Relational fit")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uBA87 \uC7A5\uC758 \uC0AC\uC9C4\uBCF4\uB2E4,", /*#__PURE__*/React.createElement("br", null), "\uBA87 \uAC1C\uC758 \uAE4A\uC740 \uC9C8\uBB38\uC774", /*#__PURE__*/React.createElement("br", null), "\uB354 \uB9CE\uC740 \uAC83\uC744 \uC54C\uB824\uC90D\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[52ch]"
  }, "\uACB0\uD558\uB2E4\uB294 24\uAC1C\uC758 \uC8FC\uAD00\uC2DD \uC2EC\uB9AC \uC9C8\uBB38\uACFC 9\uAC1C\uC758 \uC120\uD638 \uC9C8\uBB38\uC744 \uD1B5\uD574 \uD55C \uC0AC\uB78C\uC758 \uAD00\uACC4 \uBC29\uC2DD\uACFC \uACB0\uD63C\uAD00\uC744 \uAE4A\uAC8C \uC774\uD574\uD569\uB2C8\uB2E4. \uADF8 \uC774\uD574\uB294 \uB450 \uC0AC\uB78C\uC774 \uD568\uAED8 \uBCF4\uB294 ", /*#__PURE__*/React.createElement("span", {
    className: "text-ink"
  }, "'\uC131\uD5A5 \uBD84\uC11D \uB9AC\uD3EC\uD2B8'"), "\uB85C \uC774\uC5B4\uC9D1\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-7 flex flex-wrap gap-2"
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "pill border border-ink/10 bg-white text-ink/75"
  }, t)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("p", {
    className: "small mt-7 text-mute max-w-[44ch]"
  }, "\uAD00\uACC4 \uC131\uD5A5 \uC5F0\uAD6C\uB97C \uCC38\uACE0\uD55C \uB9E4\uCE6D \uAE30\uC900\uC774\uBA70, \uC758\uD559\uC801 \uC9C4\uB2E8\uC774\uB098 \uC2EC\uB9AC \uC9C4\uB2E8\uC744 \uB300\uCCB4\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[560px] md:h-[620px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[2%] top-[8%] hidden sm:block"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.questions,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 24\uAC1C \uC2EC\uB9AC \uC9C8\uBB38",
    width: 210,
    tilt: -5
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[18%] top-[2%] hidden sm:block",
    style: {
      transform: 'translateX(30%)'
    }
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.matchReason,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uB9E4\uCE6D \uC774\uC720",
    width: 220,
    tilt: 5
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[6%] sm:right-[10%] top-[18%] sm:top-[20%]"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.tendency,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uC131\uD5A5 \uBD84\uC11D \uB9AC\uD3EC\uD2B8",
    width: 280,
    tilt: -2
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-[14%] top-[28%] w-[280px] h-[280px] rounded-full pointer-events-none -z-10",
    style: {
      background: 'radial-gradient(closest-side, rgba(168,143,206,.22), transparent)'
    }
  }))))));
}

// ---------- Section 5: Legal basis ----------
function LegalSection() {
  const points = [{
    n: '01',
    t: '법적 신고 절차',
    d: '「결혼중개업법」에 따른 신고 절차를 갖춘 결혼정보 서비스로 운영됩니다.'
  }, {
    n: '02',
    t: '계약·환불 기준 안내',
    d: '이용 조건과 환불 기준을 가입 단계에서 사전에 명확히 안내합니다.'
  }, {
    n: '03',
    t: '기본 정보 확인',
    d: '신뢰 있는 만남을 위해 본인 확인과 기본 정보 확인 절차를 운영합니다.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "trust",
    className: "bg-veil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Registered service")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[24ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \u300C\uACB0\uD63C\uC911\uAC1C\uC5C5\uBC95\u300D\uC5D0 \uB530\uB978", /*#__PURE__*/React.createElement("br", null), "\uC2E0\uACE0 \uC808\uCC28\uB97C \uAC16\uCD98 \uACB0\uD63C\uC815\uBCF4 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[60ch]"
  }, "\uB2E8\uC21C \uB9E4\uCE6D \uC571\uC774 \uC544\uB2C8\uB77C, \uACB0\uD63C\uC744 \uC9C4\uC9C0\uD558\uAC8C \uC900\uBE44\uD558\uB294 \uBD84\uB4E4\uC744 \uC704\uD574 \uD544\uC694\uD55C \uD655\uC778 \uC808\uCC28\uC640 \uC774\uC6A9 \uAE30\uC900\uC744 \uBA85\uD655\uD788 \uC6B4\uC601\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid md:grid-cols-3 gap-4"
  }, points.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-en text-lavender-deep text-[12px] tracking-widest mb-3"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-2"
  }, p.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, p.d)))))));
}

// ---------- Section 6: Trust verification process ----------
function TrustSection({
  images,
  appScreens
}) {
  const items = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남 진행'];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Approval-based")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uB204\uAD6C\uB098 \uBC14\uB85C \uB9CC\uB0A0 \uC218 \uC5C6\uAE30\uC5D0,", /*#__PURE__*/React.createElement("br", null), "\uB354 \uBBFF\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[58ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \uC9C4\uC9C0\uD55C \uB9CC\uB0A8\uC744 \uC704\uD574 \uAC00\uC785 \uB2E8\uACC4\uC5D0\uC11C \uAE30\uBCF8 \uC815\uBCF4\uC640 \uC2E0\uB8B0 \uC790\uB8CC\uB97C \uD655\uC778\uD569\uB2C8\uB2E4. \uC2B9\uC778\uAE4C\uC9C0 \uC2DC\uAC04\uC774 \uAC78\uB9B4 \uC218 \uC788\uC9C0\uB9CC, \uADF8 \uACFC\uC815\uC774 \uB354 \uC548\uC804\uD55C \uB9CC\uB0A8\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("ul", {
    className: "mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-3 body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full grid place-items-center bg-lavender-deep/10 text-lavender-deep"
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
  }))), /*#__PURE__*/React.createElement("span", null, it)))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[560px] flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[10%] top-[10%] hidden sm:block"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.verifyDetail,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uD544\uC218 \uC778\uC99D \uD56D\uBAA9",
    width: 200,
    tilt: -4
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.verifyMain,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uC778\uC99D \uD56D\uBAA9",
    width: 270,
    tilt: 3
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-1/2 w-[320px] h-[320px] rounded-full pointer-events-none -z-10",
    style: {
      transform: 'translate(-50%,-50%)',
      background: 'radial-gradient(closest-side, rgba(184,197,176,.25), transparent)'
    }
  }))))));
}

// ---------- Section 7: Privacy ----------
function PrivacySection() {
  const points = [{
    t: '검토 목적의 정보 확인',
    d: '제출하신 자료는 본인·기본 정보 검토 목적에 한해 사용됩니다.'
  }, {
    t: '민감 자료 원본 비공개',
    d: '민감한 원본 자료는 상대 회원에게 그대로 공개되지 않도록 설계합니다.'
  }, {
    t: '필요한 범위 내 정보 활용',
    d: '만남에 필요한 최소 범위 안에서만 정보를 활용합니다.'
  }, {
    t: '개인정보처리방침 명확히 안내',
    d: '정보의 수집·이용·보관·파기 기준을 명확히 안내합니다.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-veil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-8 items-end"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Privacy by design"), /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uC18C\uC911\uD55C \uC815\uBCF4\uB294 \uD544\uC694\uD55C \uB9CC\uD07C\uB9CC,", /*#__PURE__*/React.createElement("br", null), "\uC548\uC804\uD558\uAC8C \uB2E4\uB8F9\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    className: "md:col-span-5",
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg text-mute"
  }, "\uACB0\uD558\uB2E4\uB294 \uC2E0\uB8B0 \uC788\uB294 \uB9CC\uB0A8\uC744 \uC704\uD574 \uD544\uC694\uD55C \uC815\uBCF4\uB97C \uD655\uC778\uD558\uC9C0\uB9CC, \uBD88\uD544\uC694\uD55C \uC815\uBCF4 \uACF5\uAC1C\uB97C \uC694\uAD6C\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC81C\uCD9C\uB41C \uC790\uB8CC\uB294 \uAC80\uD1A0 \uBAA9\uC801\uC5D0 \uB9DE\uAC8C \uAD00\uB9AC\uB418\uBA70, \uC0C1\uB300\uC5D0\uAC8C \uACF5\uAC1C\uB418\uB294 \uC815\uBCF4\uB294 \uC81C\uD55C\uB41C \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC81C\uACF5\uB418\uB3C4\uB85D \uC124\uACC4\uD569\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid md:grid-cols-2 gap-4"
  }, points.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 flex items-start gap-5 h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-lg bg-lavender-soft/30 grid place-items-center text-lavender-deep shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "8",
    width: "12",
    height: "9",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 8V6a3.5 3.5 0 1 1 7 0v2"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-2"
  }, p.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, p.d))))))));
}

// ---------- Section 8: Process timeline ----------
function ProcessSection() {
  const steps = [{
    t: '앱 다운로드',
    d: '결하다 앱을 받아 시작합니다.'
  }, {
    t: '프로필 작성',
    d: '결혼을 위한 기본 정보를 정리합니다.'
  }, {
    t: '심리 질문 응답',
    d: '24개 주관식 + 9개 선호 질문에 답합니다.'
  }, {
    t: '신뢰 자료 제출',
    d: '본인 확인과 기본 정보 자료를 제출합니다.'
  }, {
    t: '승인 및 검토',
    d: '승인 절차를 거쳐 회원으로 가입됩니다.'
  }, {
    t: '결 기반 추천',
    d: '세 가지 결을 함께 본 추천이 도착합니다.'
  }, {
    t: '상호 호감 확인',
    d: '양쪽이 만남에 동의했을 때 다음 단계로 이어집니다.'
  }, {
    t: '일정 조율 및 실제 만남',
    d: '편한 일정을 조율하고 직접 만남을 진행합니다.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "process",
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "8 steps")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uC11C\uB85C\uC758 \uACB0\uC774 \uB9DE\uC744 \uB54C,", /*#__PURE__*/React.createElement("br", null), "\uB9CC\uB0A8\uC774 \uC2DC\uC791\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block absolute top-[42px] left-0 right-0 h-px bg-gradient-to-r from-lavender-soft via-lavender-deep to-sage"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-14 gap-x-5"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-[34px] h-[34px] rounded-full bg-offwhite hairline grid place-items-center font-en text-[12px] text-lavender-deep relative z-10",
    style: {
      boxShadow: '0 0 0 4px var(--offwhite)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 gh-h3"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "small mt-2 text-mute max-w-[24ch]"
  }, s.d)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-14 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#download",
    className: "btn btn-primary"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "btn btn-ghost"
  }, "\uBE44\uC6A9 \uC548\uB0B4 \uBCF4\uAE30")))));
}

// ---------- Section 9: Pricing ----------
function PricingSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    className: "bg-veil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Pricing")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uB192\uC740 \uAC00\uC785\uBE44 \uC5C6\uC774,", /*#__PURE__*/React.createElement("br", null), "\uB9CC\uB0A8\uC774 \uC131\uC0AC\uB420 \uB54C\uB9CC.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[50ch]"
  }, "\uBE44\uC6A9\uC740 \uAC00\uC785\uC774 \uC544\uB2C8\uB77C, \uC2E4\uC81C \uC5F0\uACB0\uC758 \uC21C\uAC04\uC5D0 \uBC1C\uC0DD\uD569\uB2C8\uB2E4. \uACB0\uD558\uB2E4\uB294 \uC9C4\uC9C0\uD55C \uB9CC\uB0A8\uC744 \uAC00\uBCBC\uC6B4 \uC2DC\uC791 \uBE44\uC6A9\uC73C\uB85C \uC2DC\uB3C4\uD574\uBCFC \uC218 \uC788\uB3C4\uB85D \uC124\uACC4\uD588\uC2B5\uB2C8\uB2E4."))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-6"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-8 md:p-10 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-20 -top-20 w-80 h-80 rounded-full",
    style: {
      background: 'radial-gradient(closest-side, rgba(200,182,226,.5), transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\uAC00\uC785\uBE44"), /*#__PURE__*/React.createElement("div", {
    className: "gh-display mt-1",
    style: {
      fontSize: '56px',
      lineHeight: 1
    }
  }, "0", /*#__PURE__*/React.createElement("span", {
    className: "text-[26px] ml-1 text-mute"
  }, "\uC6D0"))), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-lavender-deep text-white"
  }, "No upfront fee")), /*#__PURE__*/React.createElement("div", {
    className: "rule my-7"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\uB9E4\uCE6D + \uC0C1\uD638 \uB3D9\uC758 \uC2DC"), /*#__PURE__*/React.createElement("div", {
    className: "gh-display mt-1",
    style: {
      fontSize: '40px',
      lineHeight: 1.05
    }
  }, "\uB0A8\uB140 \uAC01 100,000", /*#__PURE__*/React.createElement("span", {
    className: "text-[20px] ml-1 text-mute"
  }, "\uC6D0")))), /*#__PURE__*/React.createElement("p", {
    className: "body mt-6 text-mute",
    style: {
      textWrap: 'pretty'
    }
  }, "\uC591\uCABD \uBAA8\uB450 \uB9CC\uB0A8\uC5D0 \uB3D9\uC758\uD558\uACE0 \uC77C\uC815 \uC870\uC728 \uB2E8\uACC4\uB85C \uB118\uC5B4\uAC08 \uB54C \uBE44\uC6A9\uC774 \uBC1C\uC0DD\uD569\uB2C8\uB2E4. \uAC00\uC785\uACFC \uC751\uB2F5, \uCD94\uCC9C \uD655\uC778 \uB2E8\uACC4\uC5D0\uC11C\uB294 \uBE44\uC6A9\uC774 \uBC1C\uC0DD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#download",
    className: "btn btn-primary"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement("a", {
    href: "#faq",
    className: "btn btn-ghost"
  }, "\uC790\uC138\uD788 \uBCF4\uAE30"))))))));
}

// ---------- Section 10: Comparison ----------
function ComparisonSection() {
  const rows = [['법적 지위', '미신고 다수', '등록', '결혼중개업 신고 절차'], ['목적', '가벼운 만남', '결혼', '결혼 중심'], ['가입비', '낮음 또는 반복 결제', '높음', '없음'], ['검증', '약함', '있음', '있음'], ['관계 성향 이해', '약함', '제한적', '깊게 반영'], ['매칭 비용', '아이템·구독', '고액 선결제', '만남 성사 시'], ['분위기', '빠르고 가벼움', '무겁고 비쌈', '신중하지만 유연함']];
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "A new option")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uACB0\uD558\uB2E4\uB294 \uC18C\uAC1C\uD305 \uC571\uACFC", /*#__PURE__*/React.createElement("br", null), "\uACB0\uD63C\uC815\uBCF4\uD68C\uC0AC \uC0AC\uC774\uC758 \uC0C8\uB85C\uC6B4 \uB300\uC548\uC785\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[60ch]"
  }, "\uAE30\uC874 \uC11C\uBE44\uC2A4\uB97C \uBE44\uB09C\uD558\uAE30\uBCF4\uB2E4, \uC120\uD0DD\uC9C0\uC758 \uCC28\uC774\uB97C \uBE44\uAD50\uD574 \uC9C4\uC9C0\uD55C \uACB0\uD63C\uC744 \uC900\uBE44\uD558\uB294 \uBD84\uAED8 \uB354 \uC798 \uB9DE\uB294 \uAE38\uC744 \uBCF4\uC5EC\uB4DC\uB9BD\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-12 overflow-x-auto card p-2 md:p-4"
  }, /*#__PURE__*/React.createElement("table", {
    className: "cmp"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "row-label"
  }), /*#__PURE__*/React.createElement("th", null, "\uC18C\uAC1C\uD305 \uC571"), /*#__PURE__*/React.createElement("th", null, "\uACB0\uD63C\uC815\uBCF4\uD68C\uC0AC"), /*#__PURE__*/React.createElement("th", {
    className: "col-gh-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Sig.Mark, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff'
    }
  }, "\uACB0\uD558\uB2E4"))))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "row-label"
  }, r[0]), /*#__PURE__*/React.createElement("td", {
    className: "text-mute"
  }, r[1]), /*#__PURE__*/React.createElement("td", {
    className: "text-mute"
  }, r[2]), /*#__PURE__*/React.createElement("td", {
    className: "col-gh font-medium text-ink"
  }, r[3])))))))));
}

// ---------- Section 11: FAQ ----------
function FAQSection() {
  const items = [['가입비가 정말 없나요?', '네. 결하다는 높은 가입비를 먼저 받지 않습니다. 서로 매칭되고 만남에 상호 동의했을 때만 만남 비용이 발생합니다.'], ['만남 비용은 언제 발생하나요?', '양쪽 모두 만남에 동의하고 일정 조율 단계로 넘어갈 때 발생합니다.'], ['아무나 가입할 수 있나요?', '결하다는 진지한 만남을 위해 기본 정보와 신뢰 자료를 확인한 뒤 가입을 승인합니다.'], ['제출한 서류가 상대방에게 공개되나요?', '제출 자료는 검토 목적에 사용되며, 상대에게는 필요한 범위의 확인 정보만 제공되도록 설계합니다.'], ['결하다는 소개팅 앱과 무엇이 다른가요?', '사진과 거리 중심의 즉흥적 매칭보다, 결혼관·가치관·관계 성향을 함께 살피는 결혼 중심 매칭 서비스입니다.']];
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

// ---------- Section 12: Brand philosophy ----------
function PhilosophySection({
  images
}) {
  const img = images && (Array.isArray(images.philosophy) ? images.philosophy[0] : images.philosophy);
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "relative aspect-[4/5] rounded-2xl overflow-hidden hairline"
  }, img ? /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "\uD568\uAED8 \uAE38\uC744 \uAC77\uB294 \uB450 \uC0AC\uB78C\uC758 \uB4B7\uBAA8\uC2B5",
    loading: "lazy",
    decoding: "async",
    className: "absolute inset-0 w-full h-full object-cover"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'linear-gradient(180deg, #e7e2d6 0%, #d8d2c5 100%)'
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 500",
    className: "absolute inset-0 w-full h-full",
    preserveAspectRatio: "xMidYMax slice"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "phx",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#e7e2d6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#bcb5a3"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "500",
    fill: "url(#phx)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "370",
    x2: "400",
    y2: "370",
    stroke: "#2C2A35",
    strokeOpacity: "0.08"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 480 Q 200 360 400 480 Z",
    fill: "#c9c0aa",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(150 280)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "22",
    fill: "#2C2A35",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -28 18 C -28 60, -10 90, -2 130 L 26 130 C 28 90, 30 60, 30 18 Z",
    fill: "#2C2A35",
    opacity: "0.85"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(220 285)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "20",
    fill: "#3a3744",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M -25 16 C -25 56, -8 84, 0 122 L 24 122 C 26 84, 28 56, 28 16 Z",
    fill: "#3a3744",
    opacity: "0.85"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "320",
    cy: "120",
    r: "80",
    fill: "#D8B76A",
    opacity: "0.18"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "Brand philosophy")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[22ch]"
  }, "\uACB0\uD63C\uC740 \uC870\uAC74\uC758 \uD569\uC774 \uC544\uB2C8\uB77C,", /*#__PURE__*/React.createElement("br", null), "\uC0B6\uC758 \uACB0\uC774 \uB9DE\uC544\uAC00\uB294 \uC77C\uC785\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[56ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \uD55C \uC0AC\uB78C\uC758 \uC870\uAC74, \uC131\uD5A5, \uAC00\uCE58\uAD00, \uAC10\uC815\uC758 \uD750\uB984\uC744 \uD568\uAED8 \uC0B4\uD53C\uBA70 \uC624\uB798 \uC774\uC5B4\uC9C8 \uC218 \uC788\uB294 \uB9CC\uB0A8\uC744 \uC124\uACC4\uD569\uB2C8\uB2E4. \uBE60\uB978 \uB9E4\uCE6D\uBCF4\uB2E4 \uB290\uB9AC\uC9C0\uB9CC \uB2E8\uB2E8\uD55C \uC2DC\uC791\uC744, \uD654\uB824\uD55C \uC57D\uC18D\uBCF4\uB2E4 \uC194\uC9C1\uD55C \uC548\uB0B4\uB97C \uC9C0\uD5A5\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-9 aspect-[16/7] max-w-[520px] rounded-xl overflow-hidden hairline"
  }, /*#__PURE__*/React.createElement(Sig.WaveCross, {
    progress: 1,
    scale: 1,
    showRing: true
  }))))));
}

// ---------- Section 13: Final CTA ----------
function FinalCTA({
  ctaState,
  ctaData
}) {
  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  return /*#__PURE__*/React.createElement("section", {
    className: "bg-veil tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1100px] mx-auto px-5 md:px-8 text-center"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto w-[280px] aspect-square mb-2 -mt-6"
  }, /*#__PURE__*/React.createElement(Sig.WaveCross, {
    progress: 1,
    showRing: true
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[24ch] mx-auto"
  }, "\uB2F9\uC2E0\uC758 \uACB0\uC740 \uC5B4\uB5A4 \uC0AC\uB78C\uACFC", /*#__PURE__*/React.createElement("br", null), "\uAC00\uC7A5 \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uC774\uC5B4\uC9C8\uAE4C\uC694?")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[56ch] mx-auto"
  }, "\uC9C0\uAE08 \uACB0\uD558\uB2E4 \uC571\uC5D0\uC11C \uAE4A\uC740 \uC9C8\uBB38\uC744 \uD1B5\uD574 \uB2F9\uC2E0\uC758 \uACB0\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-9 flex flex-wrap gap-3 justify-center"
  }, ctaButtons.map((b, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: b.href,
    className: i === 0 ? "store-btn" : "store-btn outline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leading-tight text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "small"
  }, b.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, b.label)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("p", {
    className: "small mt-7 text-mute"
  }, "\uAC00\uC785\uBE44 \uC5C6\uC774 \uC2DC\uC791\uD558\uACE0, \uB9CC\uB0A8\uC774 \uC131\uC0AC\uB420 \uB54C\uB9CC \uBE44\uC6A9\uC774 \uBC1C\uC0DD\uD569\uB2C8\uB2E4."))));
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
  }, "\uACB0\uC744 \uC787\uB294 \uACB0\uD63C \uB9E4\uCE6D"), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("dt", null, "\uD68C\uC0AC\uBA85"), /*#__PURE__*/React.createElement("dd", null, "\uC8FC\uC2DD\uD68C\uC0AC \uB9B0\uD50C (LINPLE)"), /*#__PURE__*/React.createElement("dt", null, "\uB300\uD45C\uC774\uC0AC"), /*#__PURE__*/React.createElement("dd", null, "\uC774\uC815\uD5CC"), /*#__PURE__*/React.createElement("dt", null, "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638"), /*#__PURE__*/React.createElement("dd", null, "000-00-00000"), /*#__PURE__*/React.createElement("dt", null, "\uD1B5\uC2E0\uD310\uB9E4\uC5C5\uC2E0\uACE0"), /*#__PURE__*/React.createElement("dd", null, "2026-\uC11C\uC6B8\uAC15\uC11C\uAD6C-0000"), /*#__PURE__*/React.createElement("dt", null, "\uAD6D\uB0B4\uACB0\uD63C\uC911\uAC1C\uC5C5"), /*#__PURE__*/React.createElement("dd", null, "\uC11C\uC6B8-\uAC15\uC11C\uAD6C-\uAD6D\uB0B4-26-0000\uD638"), /*#__PURE__*/React.createElement("dt", null, "\uBCF8\uC810"), /*#__PURE__*/React.createElement("dd", null, "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uAC15\uC11C\uAD6C"))), /*#__PURE__*/React.createElement("div", {
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
  }, "\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
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
function FloatingQR({
  show
}) {
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex fixed right-5 bottom-5 z-40 items-center gap-3 card p-3 pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-md bg-white relative overflow-hidden hairline"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    className: "w-full h-full"
  }, Array.from({
    length: 64
  }).map((_, i) => {
    const r = i % 8,
      c = Math.floor(i / 8);
    const filled = (r * c + r + c) % 3 === 0 || r < 3 && c < 3 || r > 4 && c < 3 || r < 3 && c > 4;
    return filled ? /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: r * 2,
      y: c * 2,
      width: "2",
      height: "2",
      fill: "#2C2A35"
    }) : null;
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-[12.5px] leading-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-medium"
  }, "QR\uB85C \uC571 \uB2E4\uC6B4\uB85C\uB4DC"), /*#__PURE__*/React.createElement("div", {
    className: "text-mute"
  }, "App Store \xB7 Google Play")));
}

// Export to window for app.jsx
Object.assign(window, {
  Reveal,
  Header,
  Hero,
  ProblemSection,
  ThreeGyeolSection,
  PersonalitySection,
  LegalSection,
  TrustSection,
  PrivacySection,
  ProcessSection,
  PricingSection,
  ComparisonSection,
  FAQSection,
  PhilosophySection,
  FinalCTA,
  Footer,
  MobileSticky,
  FloatingQR
});