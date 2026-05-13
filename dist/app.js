// app.jsx — root assembly + Tweaks
var {
  useState,
  useEffect
} = React;

// =============================================================================
// IMAGE ASSETS — paste your image URLs/paths here.
// 각 항목은 단일 문자열 또는 배열(여러 장)을 허용합니다. 배열인 경우 첫 장이 기본.
// 추가 사진은 array 형태로 넣어주세요. 예: hero: ['images/hero1.png','images/hero2.png']
// =============================================================================
const IMAGES = {
  hero: [],
  // 히어로 — 폰 목업 사용 (이미지 없음)
  trust: [],
  // 신뢰 — 폰 목업 사용 (이미지 없음)
  philosophy: ['images/philosophy.jpg'] // 브랜드 철학 섹션
};

// App screenshot screens — used inside phone mockups
const APP_SCREENS = {
  card: 'images/app-card.jpg',
  // 매칭 카드 (홈)
  profile: 'images/app-profile.jpg',
  // 상세 프로필
  tendency: 'images/app-tendency.jpg',
  // 성향 분석 리포트
  inner: 'images/app-inner.jpg',
  // 내면 분석 리포트
  innerAlt: 'images/app-inner-2.jpg',
  // 내면 분석 리포트 2
  matchReason: 'images/app-match-reason.jpg',
  // 매칭 이유
  rhythmDetail: 'images/app-rhythm-detail1.jpg',
  // 리듬 상세 분석 (상대)
  rhythmDetail2: 'images/app-rhythm-detail2.jpg',
  // 리듬 상세 분석 (회원)
  verifyMain: 'images/app-verify-1.jpg',
  // 인증 항목
  verifyDetail: 'images/app-verify-2.jpg',
  // 인증 항목 (필수)
  questions: 'images/app-questions.jpg',
  // 주관적 선호 & 성향
  prefsMain: 'images/app-prefs-1.jpg',
  // 매칭 선호도
  prefsDetail: 'images/app-prefs-2.jpg' // 스펙 선호 설정
};
// helper: pick the first available image from a slot
const pickImg = slot => {
  if (!slot) return '';
  if (Array.isArray(slot)) return slot[0] || '';
  return slot;
};

// =============================================================================
// CTA DATA — change this block to switch app pre/post launch CTAs
// =============================================================================
const CTA_DATA = {
  // 앱 출시 후
  post: [{
    eyebrow: 'Download on the',
    label: 'App Store',
    shortLabel: 'App Store',
    icon: 'apple',
    href: 'https://apps.apple.com/'
  }, {
    eyebrow: 'GET IT ON',
    label: 'Google Play',
    shortLabel: 'Google Play',
    icon: 'play',
    href: 'https://play.google.com/'
  }],
  // 앱 출시 전
  pre: [{
    eyebrow: 'Coming soon',
    label: '출시 알림 받기',
    shortLabel: '알림 받기',
    icon: 'bell',
    href: '#notify'
  }, {
    eyebrow: 'Limited',
    label: '사전 신청하기',
    shortLabel: '사전 신청',
    icon: 'edit',
    href: '#preapply'
  }]
};

// Tweakable defaults persisted to disk
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "ctaState": "post",
  "paletteIntensity": "balanced",
  "waveStyle": "A",
  "headlineVariant": "primary",
  "fontFamily": "pretendard"
} /*EDITMODE-END*/;
const HEADLINES = {
  primary: {
    h: '결이 맞아야,<br/><span style="color:#6B5B95">결혼도 맞다.</span>',
    sub: '결하다는 외면의 조건과 내면의 성향을 함께 살펴, 진지한 결혼을 원하는 사람들을 신뢰 기반으로 연결합니다.'
  },
  warm: {
    h: '천천히, 그러나 깊게.<br/><span style="color:#6B5B95">결이 맞는 사람을 만나는 일.</span>',
    sub: '결하다는 사람의 겉과 속, 그리고 함께 그릴 미래를 함께 살펴 진지한 만남을 연결합니다.'
  },
  direct: {
    h: '결혼을 위한 만남,<br/><span style="color:#6B5B95">결이 맞아야 합니다.</span>',
    sub: '가벼운 매칭도, 무거운 가입비도 아닌 — 신뢰 검증과 관계 성향 이해를 바탕으로 한 결혼 중심 매칭.'
  }
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply font on body
  useEffect(() => {
    document.body.classList.toggle('font-noto', t.fontFamily === 'noto');
  }, [t.fontFamily]);

  // Apply palette intensity via CSS var on html
  useEffect(() => {
    const root = document.documentElement;
    if (t.paletteIntensity === 'restrained') {
      root.style.setProperty('--lav-soft', '#D6CAE8');
      root.style.setProperty('--sage', '#C5CFBE');
    } else if (t.paletteIntensity === 'rich') {
      root.style.setProperty('--lav-soft', '#B89FD6');
      root.style.setProperty('--sage', '#A6B79C');
    } else {
      root.style.setProperty('--lav-soft', '#C8B6E2');
      root.style.setProperty('--sage', '#B8C5B0');
    }
  }, [t.paletteIntensity]);
  const heroCopy = HEADLINES[t.headlineVariant] || HEADLINES.primary;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Gyeolhada Landing"
  }, /*#__PURE__*/React.createElement(Header, {
    onOpenMenu: () => setMenuOpen(true)
  }), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] bg-offwhite md:hidden flex flex-col",
    onClick: () => setMenuOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-16 px-5 flex items-center justify-between border-b border-black/5"
  }, /*#__PURE__*/React.createElement(Sig.Logo, {
    height: 28
  }), /*#__PURE__*/React.createElement("button", {
    className: "w-10 h-10 grid place-items-center",
    "aria-label": "\uB2EB\uAE30"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l12 12M15 3L3 15",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "px-6 py-8 space-y-5 text-[20px]"
  }, [['결하다 방식', '#way'], ['신뢰 검증', '#trust'], ['매칭 프로세스', '#process'], ['비용', '#pricing'], ['FAQ', '#faq']].map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    className: "block"
  }, l)), /*#__PURE__*/React.createElement("a", {
    href: "#download",
    className: "btn btn-primary mt-6 w-full"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"))), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    heroH: heroCopy.h,
    heroSub: heroCopy.sub,
    ctaState: t.ctaState,
    ctaData: CTA_DATA,
    waveStyle: t.waveStyle,
    paletteIntensity: t.paletteIntensity,
    images: IMAGES,
    appScreens: APP_SCREENS
  }), /*#__PURE__*/React.createElement(ProblemSection, null), /*#__PURE__*/React.createElement(ThreeGyeolSection, {
    appScreens: APP_SCREENS
  }), /*#__PURE__*/React.createElement(TrustSection, {
    images: IMAGES,
    appScreens: APP_SCREENS
  }), /*#__PURE__*/React.createElement(ProcessSection, null), /*#__PURE__*/React.createElement(PricingSection, null), /*#__PURE__*/React.createElement(FAQSection, null), /*#__PURE__*/React.createElement(PhilosophySection, {
    images: IMAGES
  })), /*#__PURE__*/React.createElement(Footer, {
    ctaState: t.ctaState,
    ctaData: CTA_DATA
  }), /*#__PURE__*/React.createElement(MobileSticky, {
    ctaState: t.ctaState,
    ctaData: CTA_DATA
  }), /*#__PURE__*/React.createElement(FloatingQR, {
    show: true
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "CTA"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uC571 \uCD9C\uC2DC \uC0C1\uD0DC",
    value: t.ctaState,
    options: [{
      value: 'post',
      label: '출시 후'
    }, {
      value: 'pre',
      label: '출시 전'
    }],
    onChange: v => setTweak('ctaState', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Palette"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uAC15\uB3C4",
    value: t.paletteIntensity,
    options: [{
      value: 'restrained',
      label: '절제'
    }, {
      value: 'balanced',
      label: '균형'
    }, {
      value: 'rich',
      label: '풍부'
    }],
    onChange: v => setTweak('paletteIntensity', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Wave signature"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "\uC2DC\uADF8\uB2C8\uCC98 \uC2A4\uD0C0\uC77C",
    value: t.waveStyle,
    options: [{
      value: 'A',
      label: 'A — 두 곡선 교차 (기본)'
    }, {
      value: 'B',
      label: 'B — 두 곡선 교차 (굵은)'
    }],
    onChange: v => setTweak('waveStyle', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Copy"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "\uD5E4\uB4DC\uB77C\uC778 \uCE74\uD53C",
    value: t.headlineVariant,
    options: [{
      value: 'primary',
      label: '기본 — 조건보다 깊게'
    }, {
      value: 'warm',
      label: '따뜻한 — 천천히 그러나 깊게'
    }, {
      value: 'direct',
      label: '직설적 — 결이 맞아야 합니다'
    }],
    onChange: v => setTweak('headlineVariant', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Typography"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uD55C\uAE00 \uAE00\uAF34",
    value: t.fontFamily,
    options: [{
      value: 'pretendard',
      label: 'Pretendard'
    }, {
      value: 'noto',
      label: 'Noto Sans KR'
    }],
    onChange: v => setTweak('fontFamily', v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));