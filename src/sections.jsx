// sections.jsx — all section components for the Gyeolhada landing page
var { useEffect, useRef, useState, useMemo } = React;

// ---------- Reveal-on-scroll wrapper ----------
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(()=> el.classList.add('is-in'), delay); io.unobserve(el); }
    }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

// ---------- Header ----------
function Header({ ctaPrimary, onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const fn = () => setScrolled(window.scrollY > 8);
    fn(); window.addEventListener('scroll', fn, {passive:true});
    return ()=> window.removeEventListener('scroll', fn);
  },[]);
  const nav = [
    {label:'결하다 방식', href:'#way'},
    {label:'신뢰 검증', href:'#trust'},
    {label:'매칭 프로세스', href:'#process'},
    {label:'비용', href:'#pricing'},
    {label:'FAQ', href:'#faq'},
  ];
  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      style={{ position:'fixed', top:0, left:0, right:0, zIndex:80 }}
    >
      <div
        className="px-6 md:px-10"
        style={{
          maxWidth:'1240px', margin:'0 auto',
          height:'64px',
          display:'flex', alignItems:'center', gap:'24px',
        }}
      >
        <a href="#" style={{flex:'0 0 auto', display:'flex', alignItems:'center'}}>
          <Sig.Logo height={26}/>
        </a>
        <nav
          className="hidden md:flex"
          style={{
            flex:'1 1 0%',
            alignItems:'center', justifyContent:'center',
            gap:'32px', fontSize:'14px', color:'rgba(44,42,53,.75)',
          }}
        >
          {nav.map(n => <a key={n.href} href={n.href} className="hover:text-lavender-deep whitespace-nowrap transition-colors">{n.label}</a>)}
        </nav>
        <div className="md:hidden" style={{flex:'1 1 0%'}}/>
        <div style={{display:'flex', alignItems:'center', gap:'12px', flex:'0 0 auto'}}>
          <a href="#download" className="hidden sm:inline-flex btn btn-primary btn-sm whitespace-nowrap">앱 다운로드</a>
          <button onClick={onOpenMenu} className="md:hidden w-10 h-10 grid place-items-center" aria-label="메뉴">
            <svg width="22" height="22" viewBox="0 0 20 20"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero({ heroH, heroSub, ctaState, ctaData, waveStyle, paletteIntensity, images, appScreens }) {
  const stageRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    const onScroll = () => {
      const el = stageRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = Math.min(Math.max(vh - rect.top, 0), total);
      const p = Math.max(0, Math.min(1, seen / total));
      setProgress(Math.min(1, p * 1.6));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  },[]);

  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  const heroImg = images && (Array.isArray(images.hero) ? images.hero[0] : images.hero);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-center" id="hero" ref={stageRef}>
      {/* Soft painterly background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(60% 50% at 78% 22%, rgba(216,183,106,.18), transparent 60%),
            radial-gradient(50% 60% at 12% 30%, rgba(200,182,226,.32), transparent 65%),
            radial-gradient(70% 60% at 50% 100%, rgba(184,197,176,.22), transparent 70%),
            linear-gradient(180deg, #faf7f2 0%, #f4eee2 60%, #ece4d3 100%)`
        }}/>
        <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
          <Sig.WaveCross progress={progress} scale={1.4} showRing={false} style={waveStyle}/>
        </div>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7">
          <Reveal>
            <div className="eyebrow mb-5 text-lavender-deep">Gyeolhada · 결혼을 위한 만남</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="gh-display gh-h1 text-ink">
              <span dangerouslySetInnerHTML={{__html: heroH}}/>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-6 max-w-[520px]" style={{textWrap:'pretty'}}>{heroSub}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="small mt-5 flex items-center gap-2 text-mute">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l5.5 2.5v4.2c0 3.2-2.3 5.5-5.5 6.3-3.2-.8-5.5-3.1-5.5-6.3V4L8 1.5z" stroke="#6B5B95" strokeWidth="1"/></svg>
              「결혼중개업법」에 따른 신고 절차를 갖춘 결혼정보 서비스 · 주식회사 린플
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap gap-3" id="download">
              {ctaButtons.map((b,i) => (
                <a key={i} href={b.href} className={i===0 ? "store-btn" : "store-btn outline"}
                   style={i!==0 ? {background:'rgba(255,255,255,.7)', backdropFilter:'blur(8px)'} : null}>
                  {b.icon === 'apple' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.4-2.8-.1 0-2.7-1-2.9-4.1zm-2.4-7.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/></svg>
                  )}
                  {b.icon === 'play' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.5c-.4.3-.6.7-.6 1.3v16.4c0 .6.2 1 .6 1.3l9.5-9.5L3.6 2.5z"/><path d="M16.7 8.8L4.6 1.9c-.4-.2-.8-.3-1.1-.1l9.6 9.6 3.6-2.6z"/><path d="M20.4 11.1l-3.7-2.1L13 12l3.7 3.7 3.7-2.1c1.2-.9 1.2-1.6 0-2.5z"/><path d="M3.5 22.1c.3.1.7.1 1.1-.1l12.1-6.9-3.6-3.6L3.5 22.1z"/></svg>
                  )}
                  {b.icon === 'bell' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
                  )}
                  {b.icon === 'edit' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>
                  )}
                  <div className="leading-tight text-left">
                    <div className="small">{b.eyebrow}</div>
                    <div className="big">{b.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-12 flex items-center gap-3 text-mute small">
              <span className="w-12 h-px bg-ink/20"/>
              <span>스크롤하면 결하다의 방식이 펼쳐집니다</span>
            </div>
          </Reveal>
        </div>

        {/* Phone mockups */}
        <div className="md:col-span-5 relative h-[460px] md:h-[600px]">
          <Reveal delay={200} className="absolute inset-0">
            <div className="relative w-full h-full">
              <div className="absolute right-[18%] top-[6%] hidden sm:block" style={{transform:'translateX(20%)'}}>
                <Sig.PhoneMock src={appScreens && appScreens.profile} alt="결하다 앱 — 프로필" width={220} tilt={6}/>
              </div>
              <div className="absolute right-[6%] sm:right-[8%] top-[10%] sm:top-[14%]">
                <Sig.PhoneMock src={appScreens && appScreens.card} alt="결하다 앱 — 매칭 카드" width={280} tilt={-3}/>
              </div>
              <div className="absolute right-[10%] top-[18%] w-[320px] h-[320px] rounded-full -z-10 pointer-events-none" style={{
                background:'radial-gradient(closest-side, rgba(168,143,206,.25), transparent)'
              }}/>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 2: Problem → Solution (tabbed, interactive) ----------
function ProblemSection({ appScreens }) {
  const pairs = [
    {
      num:'01',
      problem:'사진과 조건만으로 판단',
      problemSub:'몇 줄의 프로필로는 보이지 않는 결이 있습니다. 만나도 대화가 이어지지 않는 경우가 많습니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 18c1-2 3-3 5-3s4 1 5 3"/></svg>),
      solve:'심리 질문으로 관계의 결까지',
      solveSub:'24개 심리 질문과 9개 선호 질문으로 성향·감정 표현·갈등 대처 방식을 함께 살펴 매칭합니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 4-4 7-9 7-1.3 0-2.5-.2-3.6-.6L3 20l1.7-4.7C3.6 14 3 13 3 12c0-4 4-7 9-7s9 3 9 7z"/><path d="M9 11h6M9 14h4"/></svg>),
      screen: appScreens && appScreens.tendency,
      screenLabel:'성향 분석 리포트',
    },
    {
      num:'02',
      problem:'조건만 맞고 방향이 어긋남',
      problemSub:'숫자로는 정렬되지만 가치관·삶의 방향이 다를 수 있습니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>),
      solve:'결혼관·가족관·경제관까지 매칭',
      solveSub:'세 가지 가치관을 매칭 추천에 반영해, 비슷한 삶의 방향을 가진 사람을 우선 보여드립니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2.5 5.5L7 17l2.5-5.5L15 9z" fill="currentColor" stroke="none"/></svg>),
      screen: appScreens && appScreens.prefsDetail,
      screenLabel:'매칭 선호도',
    },
    {
      num:'03',
      problem:'가벼운 사용자들 사이에서 피로',
      problemSub:'진지한 결정에는 다른 환경이 필요합니다. 즉흥적인 만남이 섞인 환경에서는 결혼을 위한 결정이 어렵습니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 7h4"/></svg>),
      solve:'본인 확인을 거친 회원만',
      solveSub:'본인·신원·직업·학력 검토를 거쳐 승인된 회원만 가입할 수 있도록 운영합니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>),
      screen: appScreens && appScreens.verifyDetail,
      screenLabel:'인증 항목',
    },
    {
      num:'04',
      problem:'높은 가입비, 불확실한 결과',
      problemSub:'먼저 큰 비용을 치러야 시작할 수 있는 구조. 결과가 보장되지 않는데도 선결제가 필요합니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .6 3 1.8c0 2.4-6 2.2-6 4.4 0 1.2 1.3 1.8 3 1.8s3-.6 3-2"/></svg>),
      solve:'낮은 가입비, 만남 성사 시에만',
      solveSub:'선결제 부담 없이 시작하고, 양쪽이 만남에 동의해 일정 조율 단계로 넘어갈 때만 비용이 발생합니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>),
      screen: appScreens && appScreens.matchReason,
      screenLabel:'매칭 이유',
    },
  ];
  const [active, setActive] = useState(0);
  const cur = pairs[active];
  return (
    <section className="bg-offwhite" id="problem">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">Why a different way</div></Reveal>
        <Reveal delay={80}>
          <h2 className="gh-display gh-h2 max-w-[20ch]">이런 어려움,<br/>결하다는 이렇게 풉니다.</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="body-lg mt-6 text-mute" style={{maxWidth:'44ch'}}>가장 공감되는 어려움을 눌러보세요. 결하다가 어떻게 풀어가는지 보여드립니다.</p>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={200}>
          <div className="problem-tabs mt-10">
            {pairs.map((p,i)=>(
              <button
                key={i}
                type="button"
                className="problem-tab"
                data-active={i === active ? '1' : '0'}
                onClick={()=>setActive(i)}
                aria-pressed={i === active}
              >
                <span className="problem-tab-num">{p.num}</span>
                <span className="problem-tab-text">{p.problem}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Comparison */}
        <Reveal delay={280}>
          <div className="problem-compare mt-5" key={active}>
            <div className="problem-pane problem-pane-bad">
              <div className="problem-pane-head">
                <div className="problem-icon problem-icon-bad">{cur.problemIcon}</div>
                <div className="eyebrow text-mute">기존의 만남</div>
              </div>
              <div className="problem-title-bad">{cur.problem}</div>
              <p className="problem-sub">{cur.problemSub}</p>
            </div>
            <div className="problem-compare-arrow">
              <div className="problem-arrow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M14 6l6 6-6 6"/></svg>
              </div>
            </div>
            <div className="problem-pane problem-pane-good">
              <div className="problem-pane-head">
                <div className="problem-icon problem-icon-good">{cur.solveIcon}</div>
                <div className="eyebrow text-lavender-deep">결하다는</div>
              </div>
              <div className="problem-good-body">
                <div className="problem-good-text">
                  <div className="gh-h3 leading-snug">{cur.solve}</div>
                  <p className="problem-sub problem-sub-good">{cur.solveSub}</p>
                </div>
                {cur.screen && (
                  <div className="problem-good-phone">
                    <Sig.PhoneMock src={cur.screen} alt={`결하다 앱 — ${cur.screenLabel}`} width={200} tilt={0}/>
                    <div className="small text-mute mt-2 text-center">{cur.screenLabel}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section 3: Three Gyeol — matching method (merged with personality) ----------
function ThreeGyeolSection({ appScreens }) {
  const items = [
    {
      tag:'외면의 결', kr:'外',
      t:'현실적인 결혼 조건',
      d:'나이, 직업, 학력, 거주지, 자산 등 결혼의 토대가 되는 정보를 인증으로 확인합니다.',
      screen: appScreens && appScreens.verifyMain, label:'인증 항목',
      note:'선호도 설정으로 필터링됩니다.',
    },
    {
      tag:'내면의 결', kr:'內',
      t:'관계를 만드는 태도',
      d:'24개 심리 질문 + 9개 선호 질문으로 성향·감정·갈등 대처 방식을 살핍니다.',
      screen: appScreens && appScreens.inner, label:'내면 분석 리포트',
      note:'Big Five · 애착 유형 · 부부관계 연구를 참고합니다.',
    },
    {
      tag:'미래의 결', kr:'來',
      t:'함께 그리는 방향',
      d:'결혼관·가족관·경제관 — 두 사람이 함께 그릴 삶의 방향을 살핍니다.',
      screen: appScreens && appScreens.prefsMain, label:'매칭 선호도',
      note:'결혼관·가족관·경제관이 매칭 추천에 반영됩니다.',
    },
  ];
  const tags = ['Big Five', '애착 유형', '관계 갈등 방식', '부부관계 연구'];
  return (
    <section id="way" className="bg-veil grain">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="eyebrow mb-4">결하다의 방식 — 세 가지 결</div>
          <h2 className="gh-display gh-h2 max-w-[22ch]">사람의 겉과 속,<br/>그리고 함께 그릴 미래까지.</h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <Reveal key={i} delay={i*100}>
              <div className="card p-7 md:p-8 h-full flex flex-col">
                <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-[#f4eee2] to-[#ece4d3] hairline" style={{height: 340}}>
                  {it.screen ? (
                    <div className="absolute left-1/2" style={{transform:'translateX(-50%)', top:24}}>
                      <Sig.PhoneMock src={it.screen} alt={`결하다 앱 — ${it.label}`} width={200} tilt={0}/>
                    </div>
                  ) : (
                    <div className="absolute inset-3"><Sig.ThreeStrands palette={['#C8B6E2','#A88FCE','#6B5B95']}/></div>
                  )}
                  <div className="absolute left-4 bottom-3 small text-mute">{it.label}</div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-lavender-deep text-[18px]" style={{fontFamily:'"Noto Serif KR", serif'}}>{it.kr}</span>
                  <span className="eyebrow !tracking-[.16em] !text-ink/55">{it.tag}</span>
                </div>
                <div className="gh-h3 mb-2">{it.t}</div>
                <p className="body text-mute">{it.d}</p>
                <p className="small mt-3 text-lavender-deep/80">— {it.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="small text-mute mr-2">참고 기준</span>
            {tags.map(t => (
              <span key={t} className="pill border border-ink/10 bg-white text-ink/75">{t}</span>
            ))}
            <span className="small text-mute ml-2">· 의학적·심리 진단을 대체하지 않습니다.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section 4: Trust — 결혼중개업법 + 인증 + 개인정보 통합 ----------
function TrustSection({ images, appScreens }) {
  const verifyItems = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남'];
  const privacyPoints = [
    '검토 목적의 정보 확인',
    '민감 자료 원본 비공개',
    '필요한 범위 내 정보 활용',
    '개인정보처리방침 명확히 안내',
  ];
  return (
    <section id="trust" className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal><div className="eyebrow mb-4">Registered · Verified · Private</div></Reveal>
            <Reveal delay={80}>
              <h2 className="gh-display gh-h2 max-w-[24ch]">신고된 서비스로,<br/>믿을 수 있는 만남을 운영합니다.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg mt-6 text-mute max-w-[52ch]">
                「결혼중개업법」에 따라 신고된 결혼정보 서비스로, 검증을 거친 회원만 가입할 수 있도록 운영합니다.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8">
                <div className="eyebrow mb-3">승인제 검증 절차</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {verifyItems.map((it,i)=>(
                    <li key={i} className="flex items-center gap-3 body">
                      <span className="w-5 h-5 rounded-full grid place-items-center bg-lavender-deep/10 text-lavender-deep shrink-0">
                        <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.2l2.4 2.3 4.6-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8">
                <div className="eyebrow mb-3">개인정보 보호</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {privacyPoints.map((p,i)=>(
                    <li key={i} className="flex items-center gap-3 body">
                      <span className="w-5 h-5 rounded-full grid place-items-center bg-sage/30 text-ink/70 shrink-0">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2.5" y="5" width="7" height="5" rx="1"/><path d="M4 5V3.5a2 2 0 0 1 4 0V5"/></svg>
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={150}>
              <div className="relative flex items-center justify-center" style={{height:520, gap:20}}>
                <div className="relative" style={{zIndex:2}}>
                  <Sig.PhoneMock src={appScreens && appScreens.verifyMain} alt="결하다 앱 — 인증 항목" width={260} tilt={0}/>
                </div>
                <div className="hidden md:block" style={{position:'absolute', right:0, bottom:24, zIndex:1}}>
                  <Sig.PhoneMock src={appScreens && appScreens.verifyDetail} alt="결하다 앱 — 필수 인증 항목" width={200} tilt={0}/>
                </div>
                <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{
                  transform:'translate(-50%,-50%)',
                  width:340, height:340, borderRadius:'50%',
                  background:'radial-gradient(closest-side, rgba(184,197,176,.25), transparent)',
                  zIndex:0,
                }}/>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 5: Process timeline ----------
function ProcessSection({ appScreens }) {
  const steps = [
    {t:'앱 다운로드', d:'결하다 앱으로 시작합니다.'},
    {t:'프로필 작성', d:'결혼을 위한 기본 정보를 정리합니다.'},
    {t:'심리 질문 응답', d:'24개 + 9개 질문에 답합니다.'},
    {t:'신뢰 자료 제출', d:'본인·기본 정보를 제출합니다.'},
    {t:'승인 검토', d:'검토 후 회원으로 가입됩니다.'},
    {t:'결 기반 추천', d:'세 가지 결로 본 추천이 도착합니다.'},
    {t:'상호 호감 확인', d:'양쪽이 동의하면 다음 단계로.'},
    {t:'실제 만남', d:'일정을 조율해 직접 만남을 진행합니다.'},
  ];
  const previews = [
    {label:'심리 질문', title:'성향을 깊게 살핍니다', src: appScreens && appScreens.questions},
    {label:'결 기반 추천', title:'매칭 이유까지 확인', src: appScreens && appScreens.matchReason},
    {label:'리듬 매칭', title:'두 사람의 결 비교', src: appScreens && appScreens.rhythmDetail2},
  ];
  return (
    <section id="process" className="bg-veil">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">8 steps</div></Reveal>
        <Reveal delay={80}><h2 className="gh-display gh-h2">서로의 결이 맞을 때,<br/>만남이 시작됩니다.</h2></Reveal>

        {/* Phone preview strip */}
        <Reveal delay={140}>
          <div className="process-preview">
            {previews.map((p,i)=>(
              <div key={i} className="process-preview-card">
                <div className="process-preview-phone">
                  <Sig.PhoneMock src={p.src} alt={`결하다 앱 — ${p.label}`} width={210} tilt={0}/>
                </div>
                <div className="process-preview-label">{p.label}</div>
                <div className="process-preview-title">{p.title}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-2 relative">
          <div className="hidden md:block absolute top-[42px] left-0 right-0 h-px bg-gradient-to-r from-lavender-soft via-lavender-deep to-sage" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-14 gap-x-5">
            {steps.map((s,i)=>(
              <Reveal key={i} delay={i*60}>
                <div className="relative">
                  <div className="w-[34px] h-[34px] rounded-full bg-offwhite hairline grid place-items-center font-en text-[12px] text-lavender-deep relative z-10" style={{boxShadow:'0 0 0 4px var(--offwhite)'}}>{String(i+1).padStart(2,'0')}</div>
                  <div className="mt-5 gh-h3">{s.t}</div>
                  <p className="small mt-2 text-mute max-w-[24ch]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 6: Pricing + Differentiation (merged) ----------
function PricingSection({ appScreens }) {
  const points = [
    {
      eyebrow:'관계 성향',
      t:'깊게 살피는 매칭',
      d:'심리 질문 + 결혼관·가족관·경제관까지 매칭에 반영.',
      icon:(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M10 17s-6-4-6-9a4 4 0 0 1 7-2.5A4 4 0 0 1 16 8c0 5-6 9-6 9z"/></svg>),
    },
    {
      eyebrow:'신뢰',
      t:'승인제 가입',
      d:'본인·신원·직업 검토를 거친 회원만 가입할 수 있습니다.',
      icon:(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M10 2l6 2.5v5c0 4-3 6.5-6 7.5-3-1-6-3.5-6-7.5v-5L10 2z"/><path d="M7 10l2 2 4-4"/></svg>),
    },
    {
      eyebrow:'법적 신뢰',
      t:'결혼중개업 신고',
      d:'「결혼중개업법」에 따라 신고된 결혼정보 서비스입니다.',
      icon:(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 10l2 2 4-4"/></svg>),
    },
    {
      eyebrow:'투명성',
      t:'이용 조건 사전 안내',
      d:'계약·환불 기준을 가입 단계에서 명확히 안내합니다.',
      icon:(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M7 8h6M7 11h6M7 14h4"/></svg>),
    },
  ];
  return (
    <section id="pricing" className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <Reveal><div className="eyebrow mb-4">결하다의 차별점</div></Reveal>
            <Reveal delay={80}>
              <h2 className="gh-display gh-h2">낮은 가입비,<br/>만남이 성사될 때만.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg mt-6 text-mute max-w-[40ch]">
                소개팅 앱과 결혼정보회사 사이의 새로운 대안. 가벼운 시작 비용으로 진지한 만남을 시도할 수 있습니다.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="card p-7 md:p-8 mt-8 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full" style={{background:'radial-gradient(closest-side, rgba(200,182,226,.5), transparent)'}}/>
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <div className="eyebrow">가입비</div>
                    <span className="pill bg-lavender-deep text-white">Low entry</span>
                  </div>
                  <div className="gh-h3 mt-2">선결제 부담 없이 시작</div>
                  <p className="body mt-2 text-mute">결혼을 위한 만남을 가벼운 시작 비용으로 시도해볼 수 있도록 설계했습니다.</p>
                  <div className="rule my-5"/>
                  <div className="eyebrow">만남 비용</div>
                  <p className="body mt-2 text-ink">양쪽이 만남에 동의하고 일정 조율 단계로 넘어갈 때만 발생합니다.</p>
                  <p className="small mt-3 text-mute">정확한 금액은 앱 가입 단계에서 안내됩니다.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            {/* Feature highlight with phone */}
            <Reveal delay={100}>
              <div className="card p-6 md:p-7 mb-4 relative overflow-hidden flex flex-col sm:flex-row items-center gap-5" style={{background:'linear-gradient(135deg, rgba(200,182,226,.18), rgba(184,197,176,.10))'}}>
                <div className="flex-shrink-0">
                  <Sig.PhoneMock src={appScreens && appScreens.innerAlt} alt="결하다 앱 — 내면 분석 리포트" width={170} tilt={0}/>
                </div>
                <div className="min-w-0">
                  <div className="eyebrow text-lavender-deep mb-2">매칭 이유까지 보여드립니다</div>
                  <div className="gh-h3 mb-2">왜 이 사람과 결이 맞는지<br/>설명되는 매칭</div>
                  <p className="body text-mute">단순 추천이 아니라, 두 사람의 성향·가치관이 어떻게 만나는지 함께 보여드립니다.</p>
                </div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((p,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div className="card p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-lavender-soft/30 grid place-items-center text-lavender-deep mb-4">
                      {p.icon}
                    </div>
                    <div className="eyebrow mb-1.5">{p.eyebrow}</div>
                    <div className="gh-h3 mb-2">{p.t}</div>
                    <p className="body text-mute">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 7: FAQ ----------
function FAQSection() {
  const items = [
    ['가입비는 어떻게 되나요?','결하다는 높은 가입비를 먼저 받지 않습니다. 낮은 시작 비용으로 가입할 수 있으며, 서로 매칭되고 만남에 상호 동의했을 때만 만남 비용이 추가로 발생합니다.'],
    ['만남 비용은 언제 발생하나요?','양쪽 모두 만남에 동의하고 일정 조율 단계로 넘어갈 때 발생합니다. 가입, 응답, 추천 확인 단계에서는 비용이 발생하지 않습니다.'],
    ['아무나 가입할 수 있나요?','결하다는 진지한 만남을 위해 기본 정보와 신뢰 자료를 확인한 뒤 가입을 승인합니다. 본인 확인, 신원·직업·학력 검토를 거친 회원만 가입할 수 있습니다.'],
    ['결혼관·가족관·경제관은 어떻게 반영되나요?','이 항목들은 매칭 추천에 반영됩니다. 비슷한 방향을 가진 사람을 우선 보여드리는 방식으로, 두 사람의 결을 함께 살핍니다.'],
    ['제출한 서류가 상대방에게 공개되나요?','제출 자료는 검토 목적에 사용되며, 상대에게는 필요한 범위의 확인 정보만 제공되도록 설계합니다. 민감한 원본 자료가 그대로 공개되지 않도록 관리합니다.'],
    ['결하다는 소개팅 앱과 무엇이 다른가요?','사진과 거리 중심의 즉흥적 매칭보다, 결혼관·가치관·관계 성향을 함께 살피는 결혼 중심 매칭 서비스입니다. 「결혼중개업법」에 따라 신고된 결혼정보 서비스로 운영됩니다.'],
  ];
  return (
    <section id="faq" className="bg-veil">
      <div className="max-w-[1000px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">FAQ</div></Reveal>
        <Reveal delay={80}><h2 className="gh-display gh-h2">자주 묻는 질문</h2></Reveal>
        <div className="mt-10 card divide-y divide-ink/[.08]">
          {items.map(([q,a],i)=>(
            <details key={i} className="group p-6 md:p-7">
              <summary className="flex items-start justify-between gap-6">
                <span className="gh-h3 leading-snug">{q}</span>
                <span className="faq-q-icon mt-1.5 w-6 h-6 grid place-items-center text-lavender-deep shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </span>
              </summary>
              <p className="body mt-3 text-mute max-w-[68ch]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ ctaState, ctaData }) {
  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  return (
    <footer className="bg-deep">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Sig.Logo height={30} light={true}/>
            <p className="mt-4 text-[15px] text-white/70">결을 잇는 결혼 매칭</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              {ctaButtons.map((b,i)=>(
                <a key={i} href={b.href} className="store-btn" style={{background:'#fff', color:'#1c1a23'}}>
                  <div className="leading-tight text-left">
                    <div className="small" style={{color:'rgba(28,26,35,.6)'}}>{b.eyebrow}</div>
                    <div className="big">{b.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="eyebrow !text-white/60">Company</div>
            <dl className="mt-4 grid grid-cols-[7em_1fr] gap-y-2 text-[13.5px] text-white/75">
              <dt>회사명</dt><dd>주식회사 린플 (LINPLE)</dd>
              <dt>대표이사</dt><dd>이정헌</dd>
              <dt>사업자등록번호</dt><dd>425-87-04263</dd>
              <dt>통신판매업신고</dt><dd>2026-서울강서구-0000</dd>
              <dt>국내결혼중개업</dt><dd>서울-강서구-국내-26-0000호</dd>
              <dt>본점</dt><dd>서울특별시 강서구 공항대로 190, 푸리마타워 1006호 </dd>
            </dl>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow !text-white/60">Links</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-white/75">
              <li><a href="#" className="hover:text-white">이용약관</a></li>
              <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white">결혼중개표준약관</a></li>
              <li><a href="#" className="hover:text-white">고객센터</a></li>
            </ul>
          </div>
        </div>

        <div className="rule mt-12 mb-8" style={{background:'rgba(255,255,255,.12)'}}/>
        <p className="small max-w-[80ch] text-white/55">
          결하다는 만남의 기회를 연결하는 서비스이며, 결혼 성사나 관계 결과를 보장하지 않습니다. 회원 정보와 제출 자료는 확인 절차를 거치지만, 모든 정보의 절대적 진실성을 보증하는 것은 아닙니다.
        </p>
        <p className="small mt-5 text-white/40">© 2026 LINPLE Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ---------- Mobile sticky bar + Desktop floating QR ----------
function MobileSticky({ ctaState, ctaData }) {
  const primary = (ctaState === 'pre' ? ctaData.pre : ctaData.post)[0];
  return (
    <div className="mobile-sticky">
      <div className="flex items-center gap-2.5 min-w-0">
        <Sig.Logo height={20} light={true}/>
        <div className="text-[12.5px] leading-tight ml-1">
          <div className="text-white/65">결혼을 위한 신뢰 매칭</div>
        </div>
      </div>
      <a href={primary.href} className="btn btn-sm" style={{background:'#fff', color:'#1c1a23'}}>{primary.shortLabel || '앱 다운로드'}</a>
    </div>
  );
}

function FloatingQR({ show }) {
  if (!show) return null;
  return (
    <div className="hidden md:flex fixed right-5 bottom-5 z-40 items-center gap-3 card p-3 pr-4">
      <div className="w-16 h-16 rounded-md bg-white relative overflow-hidden hairline">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          {Array.from({length:64}).map((_,i)=>{
            const r = i%8, c = Math.floor(i/8);
            const filled = ((r*c+r+c) % 3 === 0) || (r<3 && c<3) || (r>4 && c<3) || (r<3 && c>4);
            return filled ? <rect key={i} x={r*2} y={c*2} width="2" height="2" fill="#2C2A35"/> : null;
          })}
        </svg>
      </div>
      <div className="text-[12.5px] leading-tight">
        <div className="font-medium">QR로 앱 다운로드</div>
        <div className="text-mute">App Store · Google Play</div>
      </div>
    </div>
  );
}

// Export to window for app.jsx
Object.assign(window, {
  Reveal, Header, Hero,
  ProblemSection, ThreeGyeolSection, TrustSection,
  ProcessSection, PricingSection,
  FAQSection, Footer, MobileSticky, FloatingQR,
});
