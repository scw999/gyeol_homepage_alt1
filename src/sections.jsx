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
    <section className="relative min-h-[100svh] overflow-hidden flex items-center" id="hero" ref={stageRef} style={{isolation:'isolate'}}>
      {/* Soft painterly background */}
      <div className="absolute inset-0" style={{zIndex:0}}>
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(60% 50% at 78% 22%, rgba(216,183,106,.18), transparent 60%),
            radial-gradient(50% 60% at 12% 30%, rgba(200,182,226,.32), transparent 65%),
            radial-gradient(70% 60% at 50% 100%, rgba(184,197,176,.22), transparent 70%),
            linear-gradient(180deg, #faf7f2 0%, #f4eee2 60%, #ece4d3 100%)`
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{opacity:0.9}}>
          <Sig.AnimatedWaves scale={1.4}/>
        </div>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7">
          <Reveal>
            <div className="eyebrow mb-5 text-lavender-deep">결하다 · 결혼을 위한 만남</div>
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
                    <svg width="22" height="22" viewBox="0 0 24 24">
                      <path d="M3.6 2.5c-.4.3-.6.7-.6 1.3v16.4c0 .6.2 1 .6 1.3l9.5-9.5L3.6 2.5z" fill="#00BCD4"/>
                      <path d="M16.7 8.8L4.6 1.9c-.4-.2-.8-.3-1.1-.1l9.6 9.6 3.6-2.6z" fill="#EA4335"/>
                      <path d="M20.4 11.1l-3.7-2.1L13 12l3.7 3.7 3.7-2.1c1.2-.9 1.2-1.6 0-2.5z" fill="#FFC107"/>
                      <path d="M3.5 22.1c.3.1.7.1 1.1-.1l12.1-6.9-3.6-3.6L3.5 22.1z" fill="#4CAF50"/>
                    </svg>
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
      problem:'면접처럼 스펙만 확인하는 자리',
      problemSub:'조건만 주고받다 보면 만남이 면접처럼 됩니다. 정작 또 만나고 싶은지는 알 수 없습니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 18c1-2 3-3 5-3s4 1 5 3"/></svg>),
      solve:'심리 질문으로 관계의 결까지',
      solveSub:'성향·감정 표현·갈등 대처 방식을 묻고, 결과는 내면 분석 리포트로 보여드립니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 4-4 7-9 7-1.3 0-2.5-.2-3.6-.6L3 20l1.7-4.7C3.6 14 3 13 3 12c0-4 4-7 9-7s9 3 9 7z"/><path d="M9 11h6M9 14h4"/></svg>),
      screen: appScreens && appScreens.innerAlt,
      screenLabel:'내면 분석 리포트',
    },
    {
      num:'02',
      problem:'조건만 맞고 방향이 어긋남',
      problemSub:'숫자로는 정렬되지만 가치관·삶의 방향이 다를 수 있습니다.',
      problemIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>),
      solve:'가치관과 답변이 맞는지까지',
      solveSub:'사과·사랑·위로처럼 관계에서 중요한 질문의 답변까지 비교해, 어느 부분이 서로 맞는지 보여드립니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2.5 5.5L7 17l2.5-5.5L15 9z" fill="currentColor" stroke="none"/></svg>),
      screen: appScreens && appScreens.matchReason,
      screenLabel:'매칭 이유',
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
      solve:'커피 한잔 값으로 시작',
      solveSub:'가입은 커피 한잔 값. 매칭이 성사돼 양쪽이 만남에 동의했을 때만 비용이 발생합니다.',
      solveIcon:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"/><path d="M17 9h2.5a2 2 0 0 1 0 4H17"/><path d="M7 3c0 1-.8 1.5-.8 2.5M11 3c0 1-.8 1.5-.8 2.5"/></svg>),
      priceCard:true,
    },
  ];
  const [active, setActive] = useState(0);
  const cur = pairs[active];
  return (
    <section className="bg-offwhite" id="problem">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">결하다 방식</div></Reveal>
        <Reveal delay={80}>
          <h2 className="gh-display gh-h2 max-w-[22ch]">스펙만 맞춘 소개팅,<br/>면접 같지 않았나요?</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="body-lg mt-6 text-mute" style={{maxWidth:'44ch'}}>가장 공감되는 어려움을 눌러보세요. 결하다가 어떻게 풀어가는지 보여드립니다.</p>
        </Reveal>

        {/* Vertical tab list (left) + solution detail (right) */}
        <Reveal delay={200}>
          <div className="problem-layout mt-10">
            <div className="problem-list">
              {pairs.map((p,i)=>{
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`problem-item${isActive ? ' is-active' : ''}`}
                    onClick={()=>setActive(i)}
                    aria-pressed={isActive}
                  >
                    <div className="problem-item-head">
                      <span className="problem-item-iconbox">{p.problemIcon}</span>
                      <span className="problem-item-title">{p.problem}</span>
                    </div>
                    {isActive && <p className="problem-item-desc">{p.problemSub}</p>}
                    {isActive && (
                      <span className="problem-item-arrow" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M14 6l6 6-6 6"/></svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="problem-detail" key={active}>
              <div className="problem-detail-head">
                <img
                  src="images/brand-mark.png"
                  alt="결하다"
                  width="36" height="36"
                  style={{borderRadius:'8px', display:'block', flexShrink:0}}
                />
                <span className="eyebrow text-lavender-deep">결하다는</span>
              </div>
              <div className="problem-detail-body">
                <div className="problem-detail-text">
                  <div className="gh-h3 leading-snug">{cur.solve}</div>
                  <p className="problem-detail-sub">{cur.solveSub}</p>
                </div>
                {cur.priceCard ? (
                  <div className="problem-detail-phone">
                    <div className="price-card">
                      <div className="price-card-cup" aria-hidden="true">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                          <path d="M14 24h30v13a13 13 0 0 1-13 13H27a13 13 0 0 1-13-13V24z" fill="#EFE8F7" stroke="#6B5B95" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M44 28h6a6 6 0 0 1 0 12h-6" fill="#EFE8F7" stroke="#6B5B95" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M22 9c0 3-2.2 3.5-2.2 6.5M31 9c0 3-2.2 3.5-2.2 6.5M40 9c0 3-2.2 3.5-2.2 6.5" stroke="#A88FCE" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M12 56h36" stroke="#6B5B95" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="price-card-row">
                        <div>
                          <div className="price-card-label">가입비</div>
                          <div className="price-card-amount">₩10,000</div>
                        </div>
                        <span className="pill bg-lavender-deep text-white">Low entry</span>
                      </div>
                      <div className="price-card-rule"/>
                      <div className="price-card-row">
                        <div>
                          <div className="price-card-label">매칭 성사 시</div>
                          <div className="price-card-amount">₩100,000</div>
                        </div>
                      </div>
                      <p className="price-card-note">양쪽이 만남에 동의할 때만 결제됩니다.</p>
                    </div>
                    <div className="problem-detail-cap">예측 가능한 비용</div>
                  </div>
                ) : cur.screen && (
                  <div className="problem-detail-phone">
                    <div className="screen-crop">
                      <img src={cur.screen} alt={`결하다 앱 — ${cur.screenLabel}`} loading="lazy"/>
                    </div>
                    <div className="problem-detail-cap">{cur.screenLabel}</div>
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
function ThreeGyeolSection() {
  const items = [
    {
      tag:'외면의 결', kr:'外',
      t:'현실적인 결혼 조건',
      d:'나이, 직업, 학력, 거주지, 자산 등 결혼의 토대가 되는 정보를 인증으로 확인합니다.',
      photo:'images/gyeol-card-external.png',
      photoAlt:'서류·반지·서신으로 표현한 결혼의 토대',
      note:'그래서 기본은 안심하고 시작합니다.',
    },
    {
      tag:'내면의 결', kr:'內',
      t:'감정과 갈등을 다루는 방식',
      d:'심리 질문과 선호 질문으로 성향·감정 표현·갈등 대처 방식을 살핍니다.',
      photo:'images/gyeol-card-inner.png',
      photoAlt:'심리 카드를 두고 마주 앉은 두 사람의 손',
      note:'그래서 대화가 통하는 사람을 만납니다.',
    },
    {
      tag:'미래의 결', kr:'來',
      t:'미래의 결을 맞춰봅니다',
      d:'결혼관·가족관·경제관까지 살펴, 두 사람의 미래가 맞는지 확인합니다.',
      photo:'images/gyeol-card-future.png',
      photoAlt:'집·달력·저축이 함께 놓인 미래 설계 장면',
      note:'그래서 방향이 어긋나 헤어지지 않습니다.',
    },
  ];
  return (
    <section id="way" className="bg-veil grain">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal>
          <div className="eyebrow mb-4">결하다의 방식 — 세 가지 결</div>
          <h2 className="gh-display gh-h2 max-w-[22ch]">결이 맞아야,<br/>오래 함께할 수 있습니다.</h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <Reveal key={i} delay={i*100}>
              <div className="card p-7 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-serif text-lavender-deep text-[18px]" style={{fontFamily:'"Noto Serif KR", serif'}}>{it.kr}</span>
                  <span className="eyebrow !tracking-[.16em] !text-ink/55">{it.tag}</span>
                </div>
                <div className="relative rounded-xl overflow-hidden hairline mb-5" style={{aspectRatio:'4/5'}}>
                  <img src={it.photo} alt={it.photoAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
                </div>
                <div className="gh-h3 mb-2">{it.t}</div>
                <p className="body text-mute">{it.d}</p>
                <p className="small mt-3 text-lavender-deep/80">— {it.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 small text-mute">· 의학적·심리 진단을 대체하지 않습니다.</div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Connection band: full-width horizontal photo break ----------
function ConnectionBand({ images }) {
  const img = images && (Array.isArray(images.band) ? images.band[0] : images.band);
  if (!img) return null;
  return (
    <section id="connection" className="relative overflow-hidden" style={{background:'#f6f0e6'}}>
      <div className="relative">
        <div className="relative w-full" style={{aspectRatio:'16/7', maxHeight:'520px'}}>
          <img src={img} alt="두 사람이 함께 반지를 놓는 모습" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
          <div className="absolute inset-0" style={{background:'linear-gradient(90deg, rgba(250,247,242,.88) 0%, rgba(250,247,242,.55) 38%, rgba(0,0,0,0) 62%)'}}/>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 w-full">
              <div className="max-w-[28ch]">
                <Reveal><div className="eyebrow mb-4 text-lavender-deep">두 사람의 결</div></Reveal>
                <Reveal delay={80}>
                  <h2 className="gh-display gh-h2" style={{color:'#2C2A35'}}>결이 맞을 때,<br/>두 사람의 시간이 자연스럽게 이어집니다.</h2>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Brand band: emotional break with couple photo ----------
function PhilosophyBand({ images }) {
  const img = images && (Array.isArray(images.philosophy) ? images.philosophy[0] : images.philosophy);
  if (!img) return null;
  return (
    <section id="philosophy" className="bg-veil grain">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-6">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden hairline" style={{aspectRatio:'4/5'}}>
                <img src={img} alt="신부가 신랑의 어깨를 감싼 모습" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
                <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(107,91,149,.05), rgba(0,0,0,0) 40%, rgba(0,0,0,.18))'}}/>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <Reveal><div className="eyebrow mb-4">결하다가 그리는 결혼</div></Reveal>
            <Reveal delay={80}>
              <h2 className="gh-display gh-h2 max-w-[18ch]">서로의 결을 알아보고,<br/>오래 함께 걷는 일.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg mt-6 text-mute max-w-[44ch]">
                결혼은 잠깐의 호감이 아니라, 두 사람의 결이 맞아갈 때 시작됩니다.
                결하다는 그 결을 함께 살피며, 오래 함께할 수 있는 만남을 돕습니다.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="pill border border-ink/10 bg-white text-ink/75">결혼 가치관</span>
                <span className="pill border border-ink/10 bg-white text-ink/75">감정·갈등 대처</span>
                <span className="pill border border-ink/10 bg-white text-ink/75">함께 그리는 미래</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Trust — 결혼중개업법 + 인증 + 개인정보 통합 ----------
function TrustSection({ images, appScreens }) {
  const trustImg = images && (Array.isArray(images.trust) ? images.trust[0] : images.trust);
  const verifyItems = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남'];
  const privacyPoints = [
    '검토 목적의 정보 확인',
    '민감 자료 원본 비공개',
    '필요한 범위 내 정보 활용',
    '개인정보 처리방침 명확히 안내',
  ];
  return (
    <section id="trust" className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <Reveal><div className="eyebrow mb-4">등록 결정사 · 인증된 회원 · 개인정보 보호</div></Reveal>
            <Reveal delay={80}>
              <h2 className="gh-display gh-h2 max-w-[24ch]">아무나 들이지 않습니다,<br/>그래서 믿을 수 있습니다.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg mt-6 text-mute max-w-[52ch]">
                「결혼중개업법」에 따라 신고된 결혼정보 서비스입니다. 본인·신원·직업·학력을 검토해 통과한 사람만 받고, 성향은 Big5·애착이론을 토대로 살핍니다.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="trust-panel mt-8">
                <div className="eyebrow mb-4">승인제 검증 절차</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
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
              <div className="trust-panel mt-4">
                <div className="eyebrow mb-4">개인정보 보호</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
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
            <Reveal delay={120}>
              <div className="relative rounded-2xl overflow-hidden hairline" style={{aspectRatio:'3/4'}}>
                <img src={trustImg} alt="검증 항목과 자물쇠가 놓인 책상 — 신뢰의 확인" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
                <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,.12))'}}/>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 5: Pricing — low entry, on-success only ----------
function PricingSection({ images }) {
  const pricingImg = images && (Array.isArray(images.pricing) ? images.pricing[0] : images.pricing);
  return (
    <section id="pricing" className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-7">
            <Reveal><div className="eyebrow mb-4">결하다의 차별점</div></Reveal>
            <Reveal delay={80}>
              <h2 className="gh-display gh-h2">커피 한잔 값으로 시작,<br/>매칭 성사 시에만 결제.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg mt-6 text-mute max-w-[44ch]">
                선결제 부담 없이 시작하고, 양쪽이 만남에 동의했을 때만 비용이 발생합니다.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="card p-7 md:p-8 mt-10 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full" style={{background:'radial-gradient(closest-side, rgba(200,182,226,.5), transparent)'}}/>
                <div className="relative space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <div className="eyebrow">가입비</div>
                      <span className="pill bg-lavender-deep text-white">Low entry</span>
                    </div>
                    <div className="gh-h3 mt-2" style={{fontSize:'34px', letterSpacing:'-0.02em'}}>₩10,000</div>
                    <p className="body mt-2 text-mute">선결제 부담 없이 가볍게 시작합니다.</p>
                  </div>
                  <div className="rule"/>
                  <div>
                    <div className="eyebrow">매칭 성사 시</div>
                    <div className="gh-h3 mt-2" style={{fontSize:'34px', letterSpacing:'-0.02em'}}>₩100,000</div>
                    <p className="body mt-2 text-mute">양쪽이 만남에 동의하고 일정 조율 단계로 넘어갈 때만 발생합니다.</p>
                    <p className="small mt-3 text-mute">결제 시점·환불 정책은 앱 가입 단계에서 상세 안내됩니다.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {pricingImg && (
            <div className="md:col-span-5">
              <Reveal delay={140}>
                <div className="relative rounded-2xl overflow-hidden hairline md:mt-16" style={{aspectRatio:'4/5'}}>
                  <img src={pricingImg} alt="반지를 낀 두 사람의 손 — 약속의 순간" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 7: FAQ ----------
function FAQSection() {
  const items = [
    ['가입비는 얼마인가요?','가입비는 ₩10,000입니다. 커피 한잔 값으로 부담 없이 시작할 수 있도록 설계했습니다. 가입 이후 매칭을 받고 프로필을 검토하는 단계까지는 추가 비용이 없습니다.'],
    ['만남 비용은 언제 얼마나 발생하나요?','매칭된 두 사람이 모두 "만나볼래요"를 누르고 일정 조율 단계로 넘어갈 때 ₩100,000이 발생합니다. 가입·응답·추천 확인 단계에서는 비용이 발생하지 않습니다.'],
    ['누구나 매칭해 주나요?','아니요. 핵심 선호가 정면으로 어긋나거나, 자녀관·경제관 같은 가치관이 충돌하면 매칭하지 않습니다. 억지로 붙이지 않는 것이 결하다의 기준입니다.'],
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
            <p className="mt-4 text-[15px] text-white/70">결하다 — 또 만나고 싶은 사람을, 처음부터.</p>
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
              <li><a href="#" className="hover:text-white">개인정보 처리방침</a></li>
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

// Export to window for app.jsx
Object.assign(window, {
  Reveal, Header, Hero,
  ProblemSection, ConnectionBand, ThreeGyeolSection, PhilosophyBand, TrustSection,
  PricingSection,
  FAQSection, Footer, MobileSticky,
});
