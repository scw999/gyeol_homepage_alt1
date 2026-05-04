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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-offwhite/85 border-b border-black/5' : ''}`}>
      <div className={`max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? 'h-[64px]' : 'h-[76px]'}`}>
        <a href="#" className="flex items-center gap-3 shrink-0 py-2">
          <Sig.Logo height={28}/>
          <span className="hidden xl:inline-flex pill ml-1 border border-lavender-deep/20 text-lavender-deep bg-lavender-soft/15 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-lavender-deep"/> 결혼중개업 신고 업체
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] text-ink/75">
          {nav.map(n => <a key={n.href} href={n.href} className="hover:text-lavender-deep transition-colors whitespace-nowrap">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          <a href="#download" className="hidden sm:inline-flex btn btn-primary btn-sm whitespace-nowrap">앱 다운로드</a>
          <button onClick={onOpenMenu} className="md:hidden w-10 h-10 -mr-2 grid place-items-center" aria-label="메뉴">
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
        {/* signature wave — very subtle, behind everything */}
        <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
          <Sig.WaveCross progress={progress} scale={1.4} showRing={false} style={waveStyle}/>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
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
              <a href="#way" className="btn btn-ghost" style={{background:'rgba(255,255,255,.55)', backdropFilter:'blur(8px)'}}>매칭 방식 보기 →</a>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-12 flex items-center gap-3 text-mute small">
              <span className="w-12 h-px bg-ink/20"/>
              <span>스크롤하면 결하다의 방식이 펼쳐집니다</span>
            </div>
          </Reveal>
        </div>

        {/* Phone mockups — real app screens */}
        <div className="md:col-span-5 relative h-[460px] md:h-[600px]">
          <Reveal delay={200} className="absolute inset-0">
            <div className="relative w-full h-full">
              {/* Background phone — profile detail, behind */}
              <div className="absolute right-[18%] top-[6%] hidden sm:block" style={{transform:'translateX(20%)'}}>
                <Sig.PhoneMock src={appScreens && appScreens.profile} alt="결하다 앱 — 프로필" width={220} tilt={6}/>
              </div>
              {/* Foreground phone — matching card */}
              <div className="absolute right-[6%] sm:right-[8%] top-[10%] sm:top-[14%]">
                <Sig.PhoneMock src={appScreens && appScreens.card} alt="결하다 앱 — 매칭 카드" width={280} tilt={-3}/>
              </div>
              {/* soft halo behind phones */}
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

// ---------- Section 2: Problem ----------
function ProblemSection() {
  const items = [
    { t:'괜찮아 보이지만 대화가 이어지지 않는 만남', d:'몇 줄의 프로필로는 보이지 않는 결이 있습니다.' },
    { t:'조건은 맞지만 가치관이 다른 관계', d:'숫자로는 정렬되지만 삶의 방향은 어긋날 수 있습니다.' },
    { t:'가벼운 사용자 때문에 피로한 소개팅 앱', d:'결혼이라는 진지한 결정은 다른 환경을 필요로 합니다.' },
    { t:'높은 가입비에도 결과가 불확실한 결혼정보회사', d:'먼저 큰 비용을 치러야만 시작할 수 있는 구조입니다.' },
  ];
  return (
    <section className="bg-offwhite" id="problem">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">Why a different way</div></Reveal>
        <Reveal delay={80}>
          <h2 className="gh-display gh-h2 max-w-[18ch]">사진과 조건만으로는<br/>결혼을 결정할 수 없습니다.</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="body-lg mt-6 max-w-[60ch] text-mute">가벼운 호감은 쉽게 시작될 수 있지만, 오래 함께할 관계에는 더 깊은 기준이 필요합니다.</p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {items.map((it,i)=>(
            <Reveal key={i} delay={i*70}>
              <div className="card p-7 md:p-8 h-full grain">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-en text-mute text-[12px] tracking-widest">0{i+1}</span>
                  <span className="w-10 h-px bg-lavender"/>
                </div>
                <div className="gh-h3 mb-3">{it.t}</div>
                <p className="body text-mute">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-14 flex items-center gap-4">
            <div className="hidden md:block w-16 h-px bg-lavender-deep/40"/>
            <p className="font-serif text-[20px] md:text-[24px] text-ink/85" style={{fontFamily:'"Noto Serif KR", serif'}}>
              결혼을 위한 만남에는 더 깊은 기준이 필요합니다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section 3: Three Gyeol ----------
function ThreeGyeolSection({ appScreens }) {
  const items = [
    { tag:'외면의 결', kr:'外', t:'현실적인 결혼 조건', d:'나이, 직업, 학력, 거주지, 자산 등 결혼 생활의 토대가 되는 정보를 인증 절차로 확인합니다.', screen: appScreens && appScreens.verifyMain, label:'인증 항목' },
    { tag:'내면의 결', kr:'內', t:'관계를 만드는 태도', d:'성향, 감정 표현 방식, 관계 태도, 갈등을 마주하고 풀어가는 방식을 깊은 질문으로 살핍니다.', screen: appScreens && appScreens.inner, label:'내면 분석 리포트' },
    { tag:'미래의 결', kr:'來', t:'함께 그리는 방향', d:'결혼관, 가족관, 경제관, 그리고 어떤 일상을 살아가고 싶은지 — 매칭 선호도로 표현됩니다.', screen: appScreens && appScreens.prefsMain, label:'매칭 선호도' },
  ];
  return (
    <section id="way" className="bg-veil grain">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <Reveal className="md:col-span-7">
            <div className="eyebrow mb-4">결하다의 방식 — 세 가지 결</div>
            <h2 className="gh-display gh-h2">결하다는 사람의 겉과 속을<br/>함께 봅니다.</h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={120}>
            <p className="body-lg text-mute">조건만으로는 보이지 않는 부분, 마음만으로는 정리되지 않는 부분. 결하다는 세 가지 결을 함께 살펴 만남의 기준을 더 깊게 만듭니다.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <Reveal key={i} delay={i*100}>
              <div className="card p-7 md:p-8 h-full flex flex-col">
                <div className="relative mb-7 rounded-xl overflow-hidden bg-gradient-to-b from-[#f4eee2] to-[#ece4d3] hairline" style={{height: 280}}>
                  {it.screen ? (
                    <div className="absolute left-1/2 top-6" style={{transform:'translateX(-50%)'}}>
                      <Sig.PhoneMock src={it.screen} alt={`결하다 앱 — ${it.label}`} width={170}/>
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Personality matching ----------
function PersonalitySection({ appScreens }) {
  const tags = ['Big Five 성격 5요인', '애착 유형', '관계 갈등 방식', '부부관계 연구'];
  return (
    <section className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <Reveal><div className="eyebrow mb-4">Relational fit</div></Reveal>
          <Reveal delay={80}>
            <h2 className="gh-display gh-h2">몇 장의 사진보다,<br/>몇 개의 깊은 질문이<br/>더 많은 것을 알려줍니다.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-6 text-mute max-w-[52ch]">결하다는 24개의 주관식 심리 질문과 9개의 선호 질문을 통해 한 사람의 관계 방식과 결혼관을 깊게 이해합니다. 그 이해는 두 사람이 함께 보는 <span className="text-ink">'성향 분석 리포트'</span>로 이어집니다.</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="pill border border-ink/10 bg-white text-ink/75">{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={280}>
            <p className="small mt-7 text-mute max-w-[44ch]">관계 성향 연구를 참고한 매칭 기준이며, 의학적 진단이나 심리 진단을 대체하지 않습니다.</p>
          </Reveal>
        </div>
        <div className="md:col-span-6">
          <Reveal delay={150}>
            <div className="relative h-[560px] md:h-[620px]">
              {/* Background phone — questions list */}
              <div className="absolute left-[2%] top-[8%] hidden sm:block">
                <Sig.PhoneMock src={appScreens && appScreens.questions} alt="결하다 앱 — 24개 심리 질문" width={210} tilt={-5}/>
              </div>
              {/* Mid phone — match reason */}
              <div className="absolute right-[18%] top-[2%] hidden sm:block" style={{transform:'translateX(30%)'}}>
                <Sig.PhoneMock src={appScreens && appScreens.matchReason} alt="결하다 앱 — 매칭 이유" width={220} tilt={5}/>
              </div>
              {/* Foreground phone — tendency analysis */}
              <div className="absolute right-[6%] sm:right-[10%] top-[18%] sm:top-[20%]">
                <Sig.PhoneMock src={appScreens && appScreens.tendency} alt="결하다 앱 — 성향 분석 리포트" width={280} tilt={-2}/>
              </div>
              {/* halo */}
              <div className="absolute right-[14%] top-[28%] w-[280px] h-[280px] rounded-full pointer-events-none -z-10" style={{
                background:'radial-gradient(closest-side, rgba(168,143,206,.22), transparent)'
              }}/>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 5: Legal basis ----------
function LegalSection() {
  const points = [
    { n:'01', t:'법적 신고 절차', d:'「결혼중개업법」에 따른 신고 절차를 갖춘 결혼정보 서비스로 운영됩니다.' },
    { n:'02', t:'계약·환불 기준 안내', d:'이용 조건과 환불 기준을 가입 단계에서 사전에 명확히 안내합니다.' },
    { n:'03', t:'기본 정보 확인', d:'신뢰 있는 만남을 위해 본인 확인과 기본 정보 확인 절차를 운영합니다.' },
  ];
  return (
    <section id="trust" className="bg-veil">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">Registered service</div></Reveal>
        <Reveal delay={80}><h2 className="gh-display gh-h2 max-w-[24ch]">결하다는 「결혼중개업법」에 따른<br/>신고 절차를 갖춘 결혼정보 서비스입니다.</h2></Reveal>
        <Reveal delay={160}><p className="body-lg mt-6 text-mute max-w-[60ch]">단순 매칭 앱이 아니라, 결혼을 진지하게 준비하는 분들을 위해 필요한 확인 절차와 이용 기준을 명확히 운영합니다.</p></Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {points.map((p,i)=>(
            <Reveal key={i} delay={i*100}>
              <div className="card p-7 h-full">
                <div className="font-en text-lavender-deep text-[12px] tracking-widest mb-3">{p.n}</div>
                <div className="gh-h3 mb-2">{p.t}</div>
                <p className="body text-mute">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 6: Trust verification process ----------
function TrustSection({ images, appScreens }) {
  const items = ['본인 확인', '신원 검토', '직업·학력 확인', '승인제 가입', '상호 동의 후 만남 진행'];
  return (
    <section className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <Reveal><div className="eyebrow mb-4">Approval-based</div></Reveal>
          <Reveal delay={80}><h2 className="gh-display gh-h2">누구나 바로 만날 수 없기에,<br/>더 믿을 수 있습니다.</h2></Reveal>
          <Reveal delay={160}><p className="body-lg mt-6 text-mute max-w-[58ch]">결하다는 진지한 만남을 위해 가입 단계에서 기본 정보와 신뢰 자료를 확인합니다. 승인까지 시간이 걸릴 수 있지만, 그 과정이 더 안전한 만남을 만듭니다.</p></Reveal>
          <Reveal delay={220}>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {items.map((it,i)=>(
                <li key={i} className="flex items-center gap-3 body">
                  <span className="w-5 h-5 rounded-full grid place-items-center bg-lavender-deep/10 text-lavender-deep">
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.2l2.4 2.3 4.6-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={150}>
            {/* Real app verify screen in phone mockup */}
            <div className="relative h-[560px] flex items-center justify-center">
              <div className="absolute left-[10%] top-[10%] hidden sm:block">
                <Sig.PhoneMock src={appScreens && appScreens.verifyDetail} alt="결하다 앱 — 필수 인증 항목" width={200} tilt={-4}/>
              </div>
              <div className="relative">
                <Sig.PhoneMock src={appScreens && appScreens.verifyMain} alt="결하다 앱 — 인증 항목" width={270} tilt={3}/>
              </div>
              <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] rounded-full pointer-events-none -z-10" style={{
                transform:'translate(-50%,-50%)',
                background:'radial-gradient(closest-side, rgba(184,197,176,.25), transparent)'
              }}/>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 7: Privacy ----------
function PrivacySection() {
  const points = [
    {t:'검토 목적의 정보 확인', d:'제출하신 자료는 본인·기본 정보 검토 목적에 한해 사용됩니다.'},
    {t:'민감 자료 원본 비공개', d:'민감한 원본 자료는 상대 회원에게 그대로 공개되지 않도록 설계합니다.'},
    {t:'필요한 범위 내 정보 활용', d:'만남에 필요한 최소 범위 안에서만 정보를 활용합니다.'},
    {t:'개인정보처리방침 명확히 안내', d:'정보의 수집·이용·보관·파기 기준을 명확히 안내합니다.'},
  ];
  return (
    <section className="bg-veil">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <Reveal className="md:col-span-7">
            <div className="eyebrow mb-4">Privacy by design</div>
            <h2 className="gh-display gh-h2">소중한 정보는 필요한 만큼만,<br/>안전하게 다룹니다.</h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={120}>
            <p className="body-lg text-mute">결하다는 신뢰 있는 만남을 위해 필요한 정보를 확인하지만, 불필요한 정보 공개를 요구하지 않습니다. 제출된 자료는 검토 목적에 맞게 관리되며, 상대에게 공개되는 정보는 제한된 범위 안에서만 제공되도록 설계합니다.</p>
          </Reveal>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {points.map((p,i)=>(
            <Reveal key={i} delay={i*70}>
              <div className="card p-7 flex items-start gap-5 h-full">
                <div className="w-10 h-10 rounded-lg bg-lavender-soft/30 grid place-items-center text-lavender-deep shrink-0">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="4" y="8" width="12" height="9" rx="1.5"/><path d="M6.5 8V6a3.5 3.5 0 1 1 7 0v2"/></svg>
                </div>
                <div>
                  <div className="gh-h3 mb-2">{p.t}</div>
                  <p className="body text-mute">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 8: Process timeline ----------
function ProcessSection() {
  const steps = [
    {t:'앱 다운로드', d:'결하다 앱을 받아 시작합니다.'},
    {t:'프로필 작성', d:'결혼을 위한 기본 정보를 정리합니다.'},
    {t:'심리 질문 응답', d:'24개 주관식 + 9개 선호 질문에 답합니다.'},
    {t:'신뢰 자료 제출', d:'본인 확인과 기본 정보 자료를 제출합니다.'},
    {t:'승인 및 검토', d:'승인 절차를 거쳐 회원으로 가입됩니다.'},
    {t:'결 기반 추천', d:'세 가지 결을 함께 본 추천이 도착합니다.'},
    {t:'상호 호감 확인', d:'양쪽이 만남에 동의했을 때 다음 단계로 이어집니다.'},
    {t:'일정 조율 및 실제 만남', d:'편한 일정을 조율하고 직접 만남을 진행합니다.'},
  ];
  return (
    <section id="process" className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">8 steps</div></Reveal>
        <Reveal delay={80}><h2 className="gh-display gh-h2">서로의 결이 맞을 때,<br/>만남이 시작됩니다.</h2></Reveal>

        <div className="mt-14 relative">
          {/* connecting line */}
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

        <Reveal delay={300}>
          <div className="mt-14 flex items-center gap-3">
            <a href="#download" className="btn btn-primary">앱 다운로드</a>
            <a href="#pricing" className="btn btn-ghost">비용 안내 보기</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section 9: Pricing ----------
function PricingSection() {
  return (
    <section id="pricing" className="bg-veil">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <Reveal><div className="eyebrow mb-4">Pricing</div></Reveal>
          <Reveal delay={80}><h2 className="gh-display gh-h2">높은 가입비 없이,<br/>만남이 성사될 때만.</h2></Reveal>
          <Reveal delay={160}><p className="body-lg mt-6 text-mute max-w-[50ch]">비용은 가입이 아니라, 실제 연결의 순간에 발생합니다. 결하다는 진지한 만남을 가벼운 시작 비용으로 시도해볼 수 있도록 설계했습니다.</p></Reveal>
        </div>
        <div className="md:col-span-6">
          <Reveal delay={150}>
            <div className="card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full" style={{background:'radial-gradient(closest-side, rgba(200,182,226,.5), transparent)'}}/>
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="eyebrow">가입비</div>
                    <div className="gh-display mt-1" style={{fontSize:'56px', lineHeight:1}}>0<span className="text-[26px] ml-1 text-mute">원</span></div>
                  </div>
                  <span className="pill bg-lavender-deep text-white">No upfront fee</span>
                </div>
                <div className="rule my-7"/>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="eyebrow">매칭 + 상호 동의 시</div>
                    <div className="gh-display mt-1" style={{fontSize:'40px', lineHeight:1.05}}>남녀 각 100,000<span className="text-[20px] ml-1 text-mute">원</span></div>
                  </div>
                </div>
                <p className="body mt-6 text-mute" style={{textWrap:'pretty'}}>양쪽 모두 만남에 동의하고 일정 조율 단계로 넘어갈 때 비용이 발생합니다. 가입과 응답, 추천 확인 단계에서는 비용이 발생하지 않습니다.</p>
                <div className="mt-7 flex items-center gap-3">
                  <a href="#download" className="btn btn-primary">앱 다운로드</a>
                  <a href="#faq" className="btn btn-ghost">자세히 보기</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 10: Comparison ----------
function ComparisonSection() {
  const rows = [
    ['법적 지위', '미신고 다수', '등록', '결혼중개업 신고 절차'],
    ['목적', '가벼운 만남', '결혼', '결혼 중심'],
    ['가입비', '낮음 또는 반복 결제', '높음', '없음'],
    ['검증', '약함', '있음', '있음'],
    ['관계 성향 이해', '약함', '제한적', '깊게 반영'],
    ['매칭 비용', '아이템·구독', '고액 선결제', '만남 성사 시'],
    ['분위기', '빠르고 가벼움', '무겁고 비쌈', '신중하지만 유연함'],
  ];
  return (
    <section className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <Reveal><div className="eyebrow mb-4">A new option</div></Reveal>
        <Reveal delay={80}><h2 className="gh-display gh-h2">결하다는 소개팅 앱과<br/>결혼정보회사 사이의 새로운 대안입니다.</h2></Reveal>
        <Reveal delay={160}><p className="body-lg mt-6 text-mute max-w-[60ch]">기존 서비스를 비난하기보다, 선택지의 차이를 비교해 진지한 결혼을 준비하는 분께 더 잘 맞는 길을 보여드립니다.</p></Reveal>

        <Reveal delay={220}>
          <div className="mt-12 overflow-x-auto card p-2 md:p-4">
            <table className="cmp">
              <thead>
                <tr>
                  <th className="row-label"></th>
                  <th>소개팅 앱</th>
                  <th>결혼정보회사</th>
                  <th className="col-gh-head">
                    <div className="flex items-center gap-2"><Sig.Mark size={18}/><span style={{color:'#fff'}}>결하다</span></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={i}>
                    <td className="row-label">{r[0]}</td>
                    <td className="text-mute">{r[1]}</td>
                    <td className="text-mute">{r[2]}</td>
                    <td className="col-gh font-medium text-ink">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section 11: FAQ ----------
function FAQSection() {
  const items = [
    ['가입비가 정말 없나요?','네. 결하다는 높은 가입비를 먼저 받지 않습니다. 서로 매칭되고 만남에 상호 동의했을 때만 만남 비용이 발생합니다.'],
    ['만남 비용은 언제 발생하나요?','양쪽 모두 만남에 동의하고 일정 조율 단계로 넘어갈 때 발생합니다.'],
    ['아무나 가입할 수 있나요?','결하다는 진지한 만남을 위해 기본 정보와 신뢰 자료를 확인한 뒤 가입을 승인합니다.'],
    ['제출한 서류가 상대방에게 공개되나요?','제출 자료는 검토 목적에 사용되며, 상대에게는 필요한 범위의 확인 정보만 제공되도록 설계합니다.'],
    ['결하다는 소개팅 앱과 무엇이 다른가요?','사진과 거리 중심의 즉흥적 매칭보다, 결혼관·가치관·관계 성향을 함께 살피는 결혼 중심 매칭 서비스입니다.'],
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

// ---------- Section 12: Brand philosophy ----------
function PhilosophySection({ images }) {
  const img = images && (Array.isArray(images.philosophy) ? images.philosophy[0] : images.philosophy);
  return (
    <section className="bg-offwhite">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline">
              {img ? (
                <img src={img} alt="함께 길을 걷는 두 사람의 뒷모습" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover"/>
              ) : (
              <React.Fragment>
              <div className="absolute inset-0" style={{background:'linear-gradient(180deg, #e7e2d6 0%, #d8d2c5 100%)'}}/>
              {/* abstract: two figures walking, back view */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
                <defs>
                  <linearGradient id="phx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e7e2d6"/>
                    <stop offset="100%" stopColor="#bcb5a3"/>
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#phx)"/>
                {/* horizon */}
                <line x1="0" y1="370" x2="400" y2="370" stroke="#2C2A35" strokeOpacity="0.08"/>
                {/* path */}
                <path d="M 0 480 Q 200 360 400 480 Z" fill="#c9c0aa" opacity="0.7"/>
                {/* two silhouettes from back */}
                <g transform="translate(150 280)">
                  <circle cx="0" cy="0" r="22" fill="#2C2A35" opacity="0.85"/>
                  <path d="M -28 18 C -28 60, -10 90, -2 130 L 26 130 C 28 90, 30 60, 30 18 Z" fill="#2C2A35" opacity="0.85"/>
                </g>
                <g transform="translate(220 285)">
                  <circle cx="0" cy="0" r="20" fill="#3a3744" opacity="0.85"/>
                  <path d="M -25 16 C -25 56, -8 84, 0 122 L 24 122 C 26 84, 28 56, 28 16 Z" fill="#3a3744" opacity="0.85"/>
                </g>
                {/* warm light */}
                <circle cx="320" cy="120" r="80" fill="#D8B76A" opacity="0.18"/>
              </svg>
              </React.Fragment>
              )}
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={120}><div className="eyebrow mb-4">Brand philosophy</div></Reveal>
          <Reveal delay={160}>
            <h2 className="gh-display gh-h2 max-w-[22ch]">결혼은 조건의 합이 아니라,<br/>삶의 결이 맞아가는 일입니다.</h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="body-lg mt-6 text-mute max-w-[56ch]">결하다는 한 사람의 조건, 성향, 가치관, 감정의 흐름을 함께 살피며 오래 이어질 수 있는 만남을 설계합니다. 빠른 매칭보다 느리지만 단단한 시작을, 화려한 약속보다 솔직한 안내를 지향합니다.</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 aspect-[16/7] max-w-[520px] rounded-xl overflow-hidden hairline">
              <Sig.WaveCross progress={1} scale={1} showRing={true}/>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 13: Final CTA ----------
function FinalCTA({ ctaState, ctaData }) {
  const ctaButtons = ctaState === 'pre' ? ctaData.pre : ctaData.post;
  return (
    <section className="bg-veil tight">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="mx-auto w-[280px] aspect-square mb-2 -mt-6">
            <Sig.WaveCross progress={1} showRing={true}/>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="gh-display gh-h2 max-w-[24ch] mx-auto">당신의 결은 어떤 사람과<br/>가장 자연스럽게 이어질까요?</h2>
        </Reveal>
        <Reveal delay={160}><p className="body-lg mt-6 text-mute max-w-[56ch] mx-auto">지금 결하다 앱에서 깊은 질문을 통해 당신의 결을 확인해보세요.</p></Reveal>
        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            {ctaButtons.map((b,i)=>(
              <a key={i} href={b.href} className={i===0 ? "store-btn" : "store-btn outline"}>
                <div className="leading-tight text-left">
                  <div className="small">{b.eyebrow}</div>
                  <div className="big">{b.label}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={280}><p className="small mt-7 text-mute">가입비 없이 시작하고, 만남이 성사될 때만 비용이 발생합니다.</p></Reveal>
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
              <dt>사업자등록번호</dt><dd>000-00-00000</dd>
              <dt>통신판매업신고</dt><dd>2026-서울강서구-0000</dd>
              <dt>국내결혼중개업</dt><dd>서울-강서구-국내-26-0000호</dd>
              <dt>본점</dt><dd>서울특별시 강서구</dd>
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
        {/* placeholder QR pattern */}
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
  ProblemSection, ThreeGyeolSection, PersonalitySection, LegalSection, TrustSection,
  PrivacySection, ProcessSection, PricingSection, ComparisonSection,
  FAQSection, PhilosophySection, FinalCTA, Footer, MobileSticky, FloatingQR,
});
