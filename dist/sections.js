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
    className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${scrolled ? 'bg-offwhite/90 border-black/10 shadow-[0_2px_12px_rgba(44,42,53,0.04)]' : 'bg-offwhite/70 border-black/5'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6 transition-all duration-300 h-[64px]`
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
    className: "relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center"
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

// ---------- Section 2: Problem (interactive — cards expand to show how 결하다 solves) ----------
function ProblemSection() {
  const items = [{
    t: '괜찮아 보이지만 대화가 이어지지 않는 만남',
    d: '몇 줄의 프로필로는 보이지 않는 결이 있습니다.',
    solveTitle: '결하다는 — 내면의 결을 함께 봅니다',
    solve: '24개의 주관식 심리 질문으로 관계 태도와 감정 표현 방식을 살펴, 대화의 결이 이어질 사람을 찾습니다.',
    anchor: '#way'
  }, {
    t: '조건은 맞지만 가치관이 다른 관계',
    d: '숫자로는 정렬되지만 삶의 방향은 어긋날 수 있습니다.',
    solveTitle: '결하다는 — 미래의 결을 매칭에 반영합니다',
    solve: '결혼관·가족관·경제관을 매칭 추천에 반영해, 비슷한 삶의 방향을 가진 사람을 우선 보여드립니다.',
    anchor: '#way'
  }, {
    t: '가벼운 사용자 때문에 피로한 소개팅 앱',
    d: '결혼이라는 진지한 결정은 다른 환경을 필요로 합니다.',
    solveTitle: '결하다는 — 승인제로 운영합니다',
    solve: '본인 확인과 기본 정보 검토를 거친 회원만 가입할 수 있습니다. 진지한 만남을 위한 환경을 유지합니다.',
    anchor: '#trust'
  }, {
    t: '높은 가입비에도 결과가 불확실한 결혼정보회사',
    d: '먼저 큰 비용을 치러야만 시작할 수 있는 구조입니다.',
    solveTitle: '결하다는 — 만남이 성사될 때만 비용이 발생합니다',
    solve: '가입비 0원. 양쪽이 만남에 동의하고 일정 조율 단계로 넘어갈 때 남녀 각 100,000원의 비용이 발생합니다.',
    anchor: '#pricing'
  }];
  const [openIdx, setOpenIdx] = useState(null);
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
  }, "\uCE74\uB4DC\uB97C \uB20C\uB7EC\uBCF4\uC138\uC694. \uACB0\uD558\uB2E4\uAC00 \uC5B4\uB5BB\uAC8C \uD480\uC5B4\uAC00\uB294\uC9C0 \uBCF4\uC5EC\uB4DC\uB9BD\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid md:grid-cols-2 gap-4"
  }, items.map((it, i) => {
    const isOpen = openIdx === i;
    return /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 70
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setOpenIdx(isOpen ? null : i),
      className: `card p-7 md:p-8 h-full grain text-left w-full transition-all ${isOpen ? 'shadow-lg' : 'hover:shadow-md'}`,
      style: {
        borderColor: isOpen ? 'rgba(107,91,149,.35)' : undefined
      },
      "aria-expanded": isOpen
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-baseline gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-en text-mute text-[12px] tracking-widest"
    }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
      className: "w-10 h-px bg-lavender"
    }), /*#__PURE__*/React.createElement("span", {
      className: "ml-auto small text-lavender-deep flex items-center gap-1"
    }, isOpen ? '닫기' : '결하다의 답', /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      style: {
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform .25s ease'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 1v10M1 6h10",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "gh-h3 mb-3"
    }, it.t), /*#__PURE__*/React.createElement("p", {
      className: "body text-mute"
    }, it.d), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height .35s ease, opacity .25s ease',
        opacity: isOpen ? 1 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mt-5 pt-5 border-t border-lavender-deep/15"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow mb-2"
    }, it.solveTitle), /*#__PURE__*/React.createElement("p", {
      className: "body text-ink/85"
    }, it.solve), /*#__PURE__*/React.createElement("a", {
      href: it.anchor,
      className: "inline-flex items-center gap-1 mt-4 small text-lavender-deep hover:underline"
    }, "\uC790\uC138\uD788 \uBCF4\uAE30", /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 6h8M6 2l4 4-4 4",
      stroke: "currentColor",
      strokeWidth: "1.4",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })))))));
  }))));
}

// ---------- Section 3: Three Gyeol — matching method (merged with personality) ----------
function ThreeGyeolSection({
  appScreens
}) {
  const items = [{
    tag: '외면의 결',
    kr: '外',
    t: '현실적인 결혼 조건',
    d: '나이, 직업, 학력, 거주지, 자산 등 결혼 생활의 토대가 되는 정보를 인증 절차로 확인합니다.',
    screen: appScreens && appScreens.verifyMain,
    label: '인증 항목',
    note: '선호도 설정으로 필터링됩니다.'
  }, {
    tag: '내면의 결',
    kr: '內',
    t: '관계를 만드는 태도',
    d: '24개 주관식 심리 질문과 9개 선호 질문으로 성향·감정 표현·갈등 대처 방식을 살핍니다.',
    screen: appScreens && appScreens.inner,
    label: '내면 분석 리포트',
    note: 'Big Five · 애착 유형 · 부부관계 연구를 참고한 매칭 기준.'
  }, {
    tag: '미래의 결',
    kr: '來',
    t: '함께 그리는 방향',
    d: '결혼관, 가족관, 경제관 — 두 사람이 함께 그릴 삶의 방향을 살핍니다.',
    screen: appScreens && appScreens.prefsMain,
    label: '매칭 선호도',
    note: '결혼관·가족관·경제관이 매칭 추천에 반영됩니다.'
  }];
  const tags = ['Big Five 성격 5요인', '애착 유형', '관계 갈등 방식', '부부관계 연구'];
  return /*#__PURE__*/React.createElement("section", {
    id: "way",
    className: "bg-veil grain"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uC758 \uBC29\uC2DD \u2014 \uC138 \uAC00\uC9C0 \uACB0"), /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[22ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \uC0AC\uB78C\uC758 \uAC89\uACFC \uC18D,", /*#__PURE__*/React.createElement("br", null), "\uADF8\uB9AC\uACE0 \uD568\uAED8 \uADF8\uB9B4 \uBBF8\uB798\uB97C \uBD05\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid md:grid-cols-3 gap-5"
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 h-full flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-[#f4eee2] to-[#ece4d3] hairline",
    style: {
      height: 260
    }
  }, it.screen ? /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-6",
    style: {
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: it.screen,
    alt: `결하다 앱 — ${it.label}`,
    width: 160
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
  }, it.d), /*#__PURE__*/React.createElement("p", {
    className: "small mt-3 text-lavender-deep/80"
  }, "\u2014 ", it.note))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-10 flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "small text-mute mr-2"
  }, "\uCC38\uACE0 \uAE30\uC900"), tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "pill border border-ink/10 bg-white text-ink/75"
  }, t)), /*#__PURE__*/React.createElement("span", {
    className: "small text-mute ml-2"
  }, "\xB7 \uC758\uD559\uC801\xB7\uC2EC\uB9AC \uC9C4\uB2E8\uC744 \uB300\uCCB4\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.")))));
}

// ---------- Section 4: Trust — 결혼중개업법 + 인증 + 개인정보 통합 ----------
function TrustSection({
  images,
  appScreens
}) {
  const verifyItems = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남'];
  const privacyPoints = ['검토 목적의 정보 확인', '민감 자료 원본 비공개', '필요한 범위 내 정보 활용', '개인정보처리방침 명확히 안내'];
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
  }, "Registered \xB7 Verified \xB7 Private")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2 max-w-[24ch]"
  }, "\uC2E0\uACE0\uB41C \uC11C\uBE44\uC2A4\uB85C,", /*#__PURE__*/React.createElement("br", null), "\uBBFF\uC744 \uC218 \uC788\uB294 \uB9CC\uB0A8\uC744 \uC6B4\uC601\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[58ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \u300C\uACB0\uD63C\uC911\uAC1C\uC5C5\uBC95\u300D\uC5D0 \uB530\uB978 \uC2E0\uACE0 \uC808\uCC28\uB97C \uAC16\uCD98 \uACB0\uD63C\uC815\uBCF4 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4. \uBCF8\uC778 \uD655\uC778\uACFC \uAE30\uBCF8 \uC815\uBCF4 \uAC80\uD1A0\uB97C \uAC70\uCE5C \uD68C\uC6D0\uB9CC \uAC00\uC785\uD560 \uC218 \uC788\uC73C\uBA70, \uC81C\uCD9C\uB41C \uC790\uB8CC\uB294 \uAC80\uD1A0 \uBAA9\uC801\uC5D0 \uB9DE\uAC8C \uC548\uC804\uD558\uAC8C \uAD00\uB9AC\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-3"
  }, "\uC2B9\uC778\uC81C \uAC80\uC99D \uC808\uCC28"), /*#__PURE__*/React.createElement("ul", {
    className: "grid sm:grid-cols-2 gap-x-6 gap-y-2.5"
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
    className: "mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-3"
  }, "\uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638"), /*#__PURE__*/React.createElement("ul", {
    className: "grid sm:grid-cols-2 gap-x-6 gap-y-2.5"
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
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-[440px] md:h-[500px] flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[8%] top-[8%] hidden sm:block"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.verifyDetail,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uD544\uC218 \uC778\uC99D \uD56D\uBAA9",
    width: 180,
    tilt: -4
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Sig.PhoneMock, {
    src: appScreens && appScreens.verifyMain,
    alt: "\uACB0\uD558\uB2E4 \uC571 \u2014 \uC778\uC99D \uD56D\uBAA9",
    width: 240,
    tilt: 3
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-1/2 w-[300px] h-[300px] rounded-full pointer-events-none -z-10",
    style: {
      transform: 'translate(-50%,-50%)',
      background: 'radial-gradient(closest-side, rgba(184,197,176,.25), transparent)'
    }
  })))))));
}

// ---------- Section 5: Process timeline ----------
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
    className: "bg-veil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "8 steps")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uC11C\uB85C\uC758 \uACB0\uC774 \uB9DE\uC744 \uB54C,", /*#__PURE__*/React.createElement("br", null), "\uB9CC\uB0A8\uC774 \uC2DC\uC791\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 relative"
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
  }, s.d))))))));
}

// ---------- Section 6: Pricing + Differentiation (merged) ----------
function PricingSection() {
  const points = [{
    eyebrow: '가입비',
    t: '0원으로 시작',
    d: '높은 선결제 없이 결혼을 위한 만남을 시도해볼 수 있습니다.',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10 3v14M6 6.5h6.5a2 2 0 0 1 0 4H7.5a2 2 0 0 0 0 4H14"
    }))
  }, {
    eyebrow: '관계 성향',
    t: '깊게 살피는 매칭',
    d: '24개 심리 질문 + 결혼관·가족관·경제관까지 매칭에 반영됩니다.',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10 17s-6-4-6-9a4 4 0 0 1 7-2.5A4 4 0 0 1 16 8c0 5-6 9-6 9z"
    }))
  }, {
    eyebrow: '신뢰',
    t: '승인제 가입',
    d: '본인 확인과 기본 정보 검토를 거친 회원만 가입할 수 있습니다.',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10 2l6 2.5v5c0 4-3 6.5-6 7.5-3-1-6-3.5-6-7.5v-5L10 2z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 10l2 2 4-4"
    }))
  }, {
    eyebrow: '법적 신뢰',
    t: '결혼중개업 신고 절차',
    d: '「결혼중개업법」에 따른 신고 절차를 갖춘 결혼정보 서비스입니다.',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "14",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 10l2 2 4-4"
    }))
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    className: "bg-offwhite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1200px] mx-auto px-5 md:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-12 gap-10 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-4"
  }, "\uACB0\uD558\uB2E4\uC758 \uCC28\uBCC4\uC810")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gh-display gh-h2"
  }, "\uB192\uC740 \uAC00\uC785\uBE44 \uC5C6\uC774,", /*#__PURE__*/React.createElement("br", null), "\uB9CC\uB0A8\uC774 \uC131\uC0AC\uB420 \uB54C\uB9CC.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg mt-6 text-mute max-w-[44ch]"
  }, "\uACB0\uD558\uB2E4\uB294 \uC18C\uAC1C\uD305 \uC571\uACFC \uACB0\uD63C\uC815\uBCF4\uD68C\uC0AC \uC0AC\uC774\uC758 \uC0C8\uB85C\uC6B4 \uB300\uC548\uC785\uB2C8\uB2E4. \uC9C4\uC9C0\uD55C \uB9CC\uB0A8\uC744 \uAC00\uBCBC\uC6B4 \uC2DC\uC791 \uBE44\uC6A9\uC73C\uB85C \uC2DC\uB3C4\uD560 \uC218 \uC788\uB3C4\uB85D \uC124\uACC4\uD588\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-7 md:p-8 mt-8 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-16 -top-16 w-56 h-56 rounded-full",
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
      fontSize: '44px',
      lineHeight: 1
    }
  }, "0", /*#__PURE__*/React.createElement("span", {
    className: "text-[20px] ml-1 text-mute"
  }, "\uC6D0"))), /*#__PURE__*/React.createElement("span", {
    className: "pill bg-lavender-deep text-white"
  }, "No upfront fee")), /*#__PURE__*/React.createElement("div", {
    className: "rule my-5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\uB9CC\uB0A8 \uBE44\uC6A9"), /*#__PURE__*/React.createElement("p", {
    className: "body mt-2 text-ink"
  }, "\uC591\uCABD\uC774 \uB9CC\uB0A8\uC5D0 \uB3D9\uC758\uD558\uACE0 \uC77C\uC815 \uC870\uC728 \uB2E8\uACC4\uB85C \uB118\uC5B4\uAC08 \uB54C\uB9CC \uBC1C\uC0DD\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("p", {
    className: "small mt-4 text-mute"
  }, "\uC815\uD655\uD55C \uAE08\uC561\uC740 \uC571 \uAC00\uC785 \uB2E8\uACC4\uC5D0\uC11C \uC548\uB0B4\uB429\uB2C8\uB2E4."))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-4"
  }, points.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    className: "card p-6 h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-lg bg-lavender-soft/30 grid place-items-center text-lavender-deep mb-4"
  }, p.icon), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow mb-1.5"
  }, p.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "gh-h3 mb-2"
  }, p.t), /*#__PURE__*/React.createElement("p", {
    className: "body text-mute"
  }, p.d)))))))));
}

// ---------- Section 7: FAQ ----------
function FAQSection() {
  const items = [['가입비가 정말 없나요?', '네. 결하다는 높은 가입비를 먼저 받지 않습니다. 서로 매칭되고 만남에 상호 동의했을 때만 만남 비용이 발생합니다.'], ['만남 비용은 언제 발생하나요?', '양쪽 모두 만남에 동의하고 일정 조율 단계로 넘어갈 때 발생합니다.'], ['아무나 가입할 수 있나요?', '결하다는 진지한 만남을 위해 기본 정보와 신뢰 자료를 확인한 뒤 가입을 승인합니다.'], ['결혼관·가족관·경제관은 어떻게 반영되나요?', '이 항목들은 매칭 추천에 반영됩니다. 비슷한 방향을 가진 사람을 우선 보여드리는 방식으로, 두 사람의 결을 함께 살핍니다.'], ['제출한 서류가 상대방에게 공개되나요?', '제출 자료는 검토 목적에 사용되며, 상대에게는 필요한 범위의 확인 정보만 제공되도록 설계합니다.'], ['결하다는 소개팅 앱과 무엇이 다른가요?', '사진과 거리 중심의 즉흥적 매칭보다, 결혼관·가치관·관계 성향을 함께 살피는 결혼 중심 매칭 서비스입니다.']];
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
  TrustSection,
  ProcessSection,
  PricingSection,
  FAQSection,
  Footer,
  MobileSticky,
  FloatingQR
});