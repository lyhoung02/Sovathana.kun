/* global React, ReactDOM, PORTFOLIO_CONTENT */
const { useState, useEffect, useRef, useMemo } = React;
const C = window.PORTFOLIO_CONTENT;

/* ============== TWEAKS ============== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "fullbleed",
  "showGrain": true,
  "accent": "gold",
  "theme": "dark"
}/*EDITMODE-END*/;

/* ============== HELPERS ============== */
const T = (lang, obj) => {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj === "function") return obj;
  return obj[lang] ?? obj.en ?? "";
};

const langClass = (lang) => lang === "km" ? "km" : "en";

/* ============== HEADER ============== */
function Header({ lang, setLang, route, setRoute, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const goto = (id) => { setRoute(id); setMenuOpen(false); };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" onClick={(e)=>{e.preventDefault(); goto("home");}}>
            <Insignia />
            <div className="brand-text">
              <div className="brand-line-1">{lang==="km" ? "ឯកសារ​នាយទាហាន" : "Officer Dossier"}</div>
              <div className="brand-line-2">{lang==="km" ? "កងយោធពលខេមរភូមិន្ទ" : "Royal Cambodian Armed Forces"}</div>
            </div>
          </a>

          <nav className="site-nav">
            {C.nav.map((n,i) => (
              <a key={n.id} href={`#${n.id}`}
                 className={"nav-item" + (route===n.id ? " is-active" : "")}
                 onClick={(e)=>{e.preventDefault(); goto(n.id);}}>
                <span className="nav-num">{String(i+1).padStart(2,"0")}</span>
                <span className="nav-label">{T(lang, n)}</span>
              </a>
            ))}
          </nav>

          <div className="header-controls">
            <button className="theme-toggle" onClick={()=>setTheme(theme==="dark"?"light":"dark")}
                    aria-label="Toggle theme" title="Toggle theme">
              {theme === "dark" ? (
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11.5A6 6 0 0 1 8.5 4a6 6 0 1 0 7.5 7.5z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="3.5"/>
                  <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/>
                </svg>
              )}
            </button>
            <button className="lang-toggle" onClick={()=>setLang(lang==="km"?"en":"km")}>
              <span className={"lang-pill " + (lang==="km" ? "is-active":"")}>ខ្មែរ</span>
              <span className="lang-divider">/</span>
              <span className={"lang-pill " + (lang==="en" ? "is-active":"")}>EN</span>
            </button>
            <button className={"menu-toggle" + (menuOpen ? " is-open" : "")}
                    onClick={()=>setMenuOpen(o => !o)}
                    aria-label="Toggle menu" aria-expanded={menuOpen ? "true" : "false"}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      <div className={"mobile-nav" + (menuOpen ? " is-open" : "")}
           onClick={(e)=>{ if (e.target === e.currentTarget) setMenuOpen(false); }}
           aria-hidden={menuOpen ? "false" : "true"}>
        <nav className="mobile-nav-inner" role="navigation">
          <div className="mobile-nav-head">
            {lang==="km" ? "ផ្នែក" : "Sections"}
          </div>
          {C.nav.map((n,i) => (
            <a key={n.id} href={`#${n.id}`}
               className={"mobile-nav-item" + (route===n.id ? " is-active" : "")}
               onClick={(e)=>{e.preventDefault(); goto(n.id);}}>
              <span className="mobile-nav-num">{String(i+1).padStart(2,"0")}</span>
              <span className="mobile-nav-label">{T(lang, n)}</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

function Insignia() {
  return (
    <svg className="insignia" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1"/>
      <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M20 6 L23 17 L34 17 L25 24 L29 35 L20 28 L11 35 L15 24 L6 17 L17 17 Z"
            fill="currentColor" opacity="0.85"/>
      <text x="20" y="22" textAnchor="middle" fontSize="4" fontFamily="serif"
            fill="#1a2818" fontWeight="700" letterSpacing="0.5">911</text>
    </svg>
  );
}

/* ============== PAGE FRAME ============== */
function PageFrame({ lang, idx, total, label, title, kicker, children, route }) {
  return (
    <article className="page" data-screen-label={`${String(idx).padStart(2,"0")} ${route}`}>
      <div className="page-meta">
        <div className="page-meta-left">
          <span className="meta-tag">{T(lang, C.ui.sectionLabel)}</span>
          <span className="meta-divider">·</span>
          <span className="meta-tag">{T(lang, label)}</span>
        </div>
        <div className="page-meta-right">
          <span className="meta-num">{String(idx).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
        </div>
      </div>
      <div className="page-head">
        {kicker && <div className="page-kicker">{T(lang,kicker)}</div>}
        <h1 className={"page-title " + langClass(lang)}>{T(lang,title)}</h1>
      </div>
      <div className="page-body">{children}</div>
    </article>
  );
}

/* ============== HOME ============== */
function HomePage({ lang, tweaks }) {
  const m = C.meta;
  return (
    <article className="page page-home" data-screen-label="01 home">
      <div className={"hero hero-" + tweaks.heroLayout}>
        <div className="hero-photo-wrap">
          <img className="hero-photo" src="assets/profile.jpg" alt="" />
          <div className="hero-photo-meta">
            <span>{T(lang, m.serial)}</span>
            <span>·</span>
            <span>{T(lang, m.location)}</span>
          </div>
        </div>

        <div className="hero-text">
          <div className="hero-eyebrow">{T(lang, C.home.eyebrow)}</div>
          <div className="hero-rank">{T(lang, m.rank)}</div>
          <h1 className={"hero-name " + langClass(lang)}>{T(lang, m.name)}</h1>
          <div className="hero-role">{T(lang, m.role)}</div>
          <div className="hero-unit">{T(lang, m.unit)}</div>

          <div className="hero-rule"><span/></div>

          <p className={"hero-headline " + langClass(lang)}>{T(lang, C.home.headline)}</p>

          <div className="hero-motto">
            <span className="motto-mark">「</span>
            {T(lang, m.motto)}
            <span className="motto-mark">」</span>
          </div>
        </div>
      </div>

      <section className="home-summary">
        <div className="home-summary-label">{lang==="km" ? "សង្ខេបវិជ្ជាជីវៈ" : "Professional Summary"}</div>
        <p className={"home-summary-body " + langClass(lang)}>{T(lang, C.home.summary)}</p>
      </section>

      <section className="home-values">
        {C.home.coreValues.map((v,i) => (
          <div className="value-card" key={i}>
            <div className="value-num">{String(i+1).padStart(2,"0")}</div>
            <div className="value-label">{T(lang, v.label)}</div>
            <div className={"value-body " + langClass(lang)}>{T(lang, v.body)}</div>
          </div>
        ))}
      </section>

      <section className="home-stats">
        {C.home.stats.map((s,i)=>(
          <div className="stat" key={i}>
            <div className="stat-v">{s.v}</div>
            <div className="stat-k">{T(lang, s.k)}</div>
          </div>
        ))}
      </section>

      <section className="home-service">
        <div className="home-service-text">
          <div className="home-service-label">
            {lang==="km" ? "ក្នុងពេលបំពេញការងារ" : "On Duty"}
          </div>
          <h2 className={"home-service-title " + langClass(lang)}>
            {lang==="km"
              ? "ការបង្ហាញខ្លួនជាផ្លូវការ"
              : "On the record, in service."}
          </h2>
          <p className={"home-service-body " + langClass(lang)}>
            {lang==="km"
              ? "ការបំពេញមុខងារ​ផ្លូវការ​ក្នុង​ឋានៈ​ជា​មេបញ្ជាការ​ភូមិភាគ — ការ​បង្ហាត់​បង្រៀន ការ​ត្រួត​ពិនិត្យ និង​ការ​តំណាង​អង្គភាព​នៅ​ក្នុង​ពិធី​ផ្លូវការ។"
              : "Formal duties as a platoon leader — instruction, oversight, and representing the unit at official ceremonies."}
          </p>
        </div>
        <figure className="home-service-photo-wrap">
          <img className="home-service-photo" src="assets/podium.jpg" alt="Officer at podium" loading="lazy"
               onError={(e)=>{ e.currentTarget.parentElement.style.display = "none"; }} />
          <figcaption className="home-service-caption">
            <span>{T(lang, m.serial)}</span>
            <span>·</span>
            <span>{lang==="km" ? "ពិធី​ផ្លូវការ" : "Official ceremony"}</span>
          </figcaption>
        </figure>
      </section>
    </article>
  );
}

/* ============== TIMELINE ============== */
function TimelinePage({ lang }) {
  return (
    <PageFrame lang={lang} idx={2} total={9} route="timeline"
      label={{en:"Career",km:"មុខងារ"}}
      kicker={{en:"Duty stations & assignments",km:"ទីតាំង​បំពេញ​ការងារ និង​មុខងារ"}}
      title={{en:"A timeline of duty stations.", km:"កាលប្បវត្ត​ទីតាំង​បំពេញ​ការងារ។"}}>
      <ol className="timeline">
        {C.timeline.map((t,i)=>(
          <li className="tl-row" key={i}>
            <div className="tl-year">{t.year}</div>
            <div className="tl-line">
              <span className="tl-dot"/>
            </div>
            <div className="tl-card">
              <h3 className={"tl-title "+langClass(lang)}>{T(lang,t.title)}</h3>
              <div className="tl-unit">{T(lang,t.unit)}</div>
              <p className={"tl-body "+langClass(lang)}>{T(lang,t.body)}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageFrame>
  );
}

/* ============== ACHIEVEMENTS (STAR) ============== */
function AchievementsPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={3} total={9} route="achievements"
      label={{en:"Achievements",km:"សមិទ្ធផល"}}
      kicker={{en:"Situation · Task · Action · Result", km:"ស្ថានភាព · កិច្ចការ · សកម្មភាព · លទ្ធផល"}}
      title={{en:"Four moments that defined the work.", km:"បួនវេលា​ដែល​កំណត់​ការងារ។"}}>
      <div className="star-list">
        {C.achievements.map((a,i)=>(
          <article className="star-card" key={i}>
            <header className="star-head">
              <span className="star-num">{String(i+1).padStart(2,"0")}</span>
              <span className="star-tag">{T(lang,a.tag)}</span>
            </header>
            <h3 className={"star-title "+langClass(lang)}>{T(lang,a.title)}</h3>
            <dl className="star-dl">
              <div><dt>S</dt><dd className={langClass(lang)}>{T(lang,a.s)}</dd></div>
              <div><dt>T</dt><dd className={langClass(lang)}>{T(lang,a.t)}</dd></div>
              <div><dt>A</dt><dd className={langClass(lang)}>{T(lang,a.a)}</dd></div>
              <div><dt>R</dt><dd className={"result "+langClass(lang)}>{T(lang,a.r)}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}

/* ============== EDUCATION ============== */
function EducationPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={4} total={9} route="education"
      label={{en:"Training",km:"វគ្គបណ្តុះបណ្តាល"}}
      kicker={{en:"Schools, courses, and qualifications",km:"សាលា វគ្គ និង​លក្ខណៈ​សម្បត្តិ"}}
      title={{en:"Formal training & education.", km:"ការ​បណ្តុះបណ្ដាល​ផ្លូវ​ការ និង​ការ​សិក្សា។"}}>
      <table className="edu-table">
        <thead>
          <tr>
            <th>{lang==="km"?"ឆ្នាំ":"Year"}</th>
            <th>{lang==="km"?"វគ្គ / សញ្ញាបត្រ":"Course / Qualification"}</th>
            <th>{lang==="km"?"ស្ថាប័ន":"Institution"}</th>
            <th>{lang==="km"?"កំណត់ចំណាំ":"Notes"}</th>
          </tr>
        </thead>
        <tbody>
          {C.education.map((e,i)=>(
            <tr key={i}>
              <td className="edu-year">{e.year}</td>
              <td className={"edu-title "+langClass(lang)}>{T(lang,e.title)}</td>
              <td className={"edu-place "+langClass(lang)}>{T(lang,e.place)}</td>
              <td className={"edu-note "+langClass(lang)}>{T(lang,e.note)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageFrame>
  );
}

/* ============== AWARDS ============== */
function AwardsPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={5} total={9} route="awards"
      label={{en:"Awards",km:"គ្រឿងឥស្សរិយយស"}}
      kicker={{en:"Decorations & commendations",km:"គ្រឿងឥស្សរិយយស និង​ការ​សរសើរ"}}
      title={{en:"Decorations & commendations.", km:"គ្រឿង​ឥស្សរិយយស និង​ការ​សរសើរ។"}}>
      <div className="awards-grid">
        {C.awards.map((a,i)=>(
          <article className="award-card" key={i}>
            <Medal index={i}/>
            <div className="award-year">{a.year}</div>
            <h3 className={"award-name "+langClass(lang)}>{T(lang,a.name)}</h3>
            <p className={"award-why "+langClass(lang)}>{T(lang,a.why)}</p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}

function Medal({ index }) {
  const ribbons = [
    ["#a83232","#c8a24b","#a83232"],
    ["#1a3a52","#c8a24b","#1a3a52"],
    ["#3d4a2a","#c8a24b","#3d4a2a"],
    ["#c8a24b","#a83232","#c8a24b"],
    ["#2a5934","#ffffff","#a83232"],
    ["#1a2818","#c8a24b","#1a2818"],
    ["#a83232","#ffffff","#1a3a52"],
  ];
  const r = ribbons[index % ribbons.length];
  return (
    <svg className="medal" viewBox="0 0 60 80" aria-hidden="true">
      <rect x="14" y="2" width="32" height="22" fill={r[0]}/>
      <rect x="24" y="2" width="12" height="22" fill={r[1]}/>
      <rect x="14" y="2" width="32" height="22" fill="none" stroke="#0e1410" strokeWidth="0.5"/>
      <path d="M14 24 L46 24 L36 36 L24 36 Z" fill="#5a4a2a"/>
      <circle cx="30" cy="52" r="16" fill="#c8a24b" stroke="#8a6a1a" strokeWidth="1"/>
      <circle cx="30" cy="52" r="11" fill="none" stroke="#8a6a1a" strokeWidth="0.5"/>
      <path d="M30 42 L33 50 L41 50 L34.5 55 L37 63 L30 58 L23 63 L25.5 55 L19 50 L27 50 Z"
            fill="#1a2818"/>
    </svg>
  );
}

/* ============== SKILLS ============== */
function SkillsPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={6} total={9} route="skills"
      label={{en:"Skills",km:"ជំនាញ"}}
      kicker={{en:"Specialties and proficiency",km:"ឯកទេស និង​កម្រិត​ជំនាញ"}}
      title={{en:"Specialties.", km:"ឯកទេស។"}}>
      <div className="skills-cols">
        {C.skills.map((g,i)=>(
          <section className="skill-group" key={i}>
            <h3 className={"skill-group-title "+langClass(lang)}>{T(lang,g.group)}</h3>
            <ul className="skill-list">
              {g.items.map((it,j)=>(
                <li key={j} className="skill-row">
                  <div className={"skill-name "+langClass(lang)}>{T(lang,it.n)}</div>
                  <div className="skill-bar" aria-hidden="true">
                    {[1,2,3,4,5].map(k=>(
                      <span key={k} className={"skill-pip"+(k<=it.l?" filled":"")}/>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageFrame>
  );
}

/* ============== LANGUAGES ============== */
function LanguagesPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={7} total={9} route="languages"
      label={{en:"Languages",km:"ភាសា"}}
      kicker={{en:"Spoken & written proficiency",km:"និយាយ និង​សរសេរ"}}
      title={{en:"Languages.", km:"ភាសា។"}}>
      <ul className="lang-list">
        {C.languages.map((l,i)=>(
          <li className="lang-row" key={i}>
            <span className="lang-num">{String(i+1).padStart(2,"0")}</span>
            <span className={"lang-name "+langClass(lang)}>{T(lang,l.name)}</span>
            <span className="lang-dots">
              {[1,2,3,4,5].map(k=>(
                <span key={k} className={"dot"+(k<=l.l?" filled":"")}/>
              ))}
            </span>
            <span className={"lang-level "+langClass(lang)}>{T(lang,l.level)}</span>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}

/* ============== REFERENCES ============== */
function ReferencesPage({ lang }) {
  return (
    <PageFrame lang={lang} idx={8} total={9} route="references"
      label={{en:"References",km:"ឯកសារយោង"}}
      kicker={{en:"From those who supervised the work",km:"ពី​អ្នក​ដឹក​នាំ​ផ្ទាល់"}}
      title={{en:"On the record.", km:"និយាយ​ត្រង់ៗ។"}}>
      <div className="refs">
        {C.references.map((r,i)=>(
          <figure className="ref-card" key={i}>
            <blockquote className={"ref-quote "+langClass(lang)}>{T(lang, r.quote)}</blockquote>
            <figcaption className={"ref-who "+langClass(lang)}>— {T(lang, r.who)}</figcaption>
          </figure>
        ))}
      </div>
    </PageFrame>
  );
}

/* ============== CONTACT ============== */
function ContactPage({ lang }) {
  const c = C.contact;
  return (
    <PageFrame lang={lang} idx={9} total={9} route="contact"
      label={{en:"Contact",km:"ទំនាក់ទំនង"}}
      kicker={{en:"For board, panel, and selection correspondence", km:"សម្រាប់​គណៈ​កម្ម​ការ និង​បន្ទះ​ជ្រើស​រើស"}}
      title={{en:"Get in touch.", km:"ទាក់ទង​មក។"}}>
      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-label">{lang==="km"?"អ៊ីម៉ែល":"Email"}</div>
          <a className="contact-v" href={"mailto:"+c.email}>{c.email}</a>
        </div>
        <div className="contact-card">
          <div className="contact-label">{lang==="km"?"ទូរស័ព្ទ":"Phone"}</div>
          <a className="contact-v" href={"tel:"+c.phone.replace(/\s+/g,"")}>{c.phone}</a>
        </div>
        <div className="contact-card">
          <div className="contact-label">{lang==="km"?"ទីតាំង​បំពេញ​ការងារ":"Duty Station"}</div>
          <div className={"contact-v small "+langClass(lang)}>{T(lang, c.duty)}</div>
        </div>
        <div className="contact-card wide">
          <div className="contact-label">{lang==="km"?"កំណត់ចំណាំ":"Note"}</div>
          <p className={"contact-note "+langClass(lang)}>{T(lang, c.note)}</p>
        </div>
      </div>

      <div className="contact-confidential">
        <span className="conf-rule"/>
        <span>{T(lang, C.ui.confidential)}</span>
        <span className="conf-rule"/>
      </div>
    </PageFrame>
  );
}

/* ============== ROUTER ============== */
const PAGES = {
  home: HomePage, timeline: TimelinePage, achievements: AchievementsPage,
  education: EducationPage, awards: AwardsPage, skills: SkillsPage,
  languages: LanguagesPage, references: ReferencesPage, contact: ContactPage,
};

function PageFooter({ lang, route, setRoute }) {
  const idx = C.nav.findIndex(n => n.id === route);
  const prev = idx > 0 ? C.nav[idx-1] : null;
  const next = idx < C.nav.length-1 ? C.nav[idx+1] : null;
  return (
    <div className="page-footer">
      <div className="pf-side">
        {prev && (
          <button className="pf-btn" onClick={()=>setRoute(prev.id)}>
            <span className="pf-arrow">←</span>
            <span className="pf-stack">
              <span className="pf-tiny">{T(lang, C.ui.prev)}</span>
              <span className="pf-bold">{T(lang, prev)}</span>
            </span>
          </button>
        )}
      </div>
      <div className="pf-mid">{T(lang, C.ui.confidential)}</div>
      <div className="pf-side pf-side-r">
        {next && (
          <button className="pf-btn pf-btn-r" onClick={()=>setRoute(next.id)}>
            <span className="pf-stack pf-stack-r">
              <span className="pf-tiny">{T(lang, C.ui.next)}</span>
              <span className="pf-bold">{T(lang, next)}</span>
            </span>
            <span className="pf-arrow">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ============== TWEAKS UI ============== */
function PortfolioTweaks({ tweaks, setTweak }) {
  const TP = window.TweaksPanel;
  const TS = window.TweakSection;
  const TR = window.TweakRadio;
  const TT = window.TweakToggle;
  if (!TP) return null;
  return (
    <TP title="Tweaks">
      <TS title="Theme">
        <TR
          value={tweaks.theme || "dark"}
          onChange={(v)=>setTweak("theme", v)}
          options={[
            {label:"Dark", value:"dark"},
            {label:"Light", value:"light"},
          ]}
        />
      </TS>
      <TS title="Hero layout">
        <TR
          value={tweaks.heroLayout}
          onChange={(v)=>setTweak("heroLayout", v)}
          options={[
            {label:"Full-bleed", value:"fullbleed"},
            {label:"Framed", value:"framed"},
          ]}
        />
      </TS>
      <TS title="Texture">
        <TT label="Paper grain overlay"
            value={tweaks.showGrain}
            onChange={(v)=>setTweak("showGrain", v)}/>
      </TS>
    </TP>
  );
}

/* ============== APP ============== */
function App() {
  const [lang, setLang] = useState("km");
  const [route, setRoute] = useState(() => (location.hash||"#home").replace("#",""));
  const useTweaks = window.useTweaks;
  const [tweaks, setTweak] = useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, ()=>{}];

  useEffect(() => {
    const onHash = () => setRoute((location.hash||"#home").replace("#","") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (location.hash !== "#"+route) history.replaceState(null,"","#"+route);
    window.scrollTo({top:0, behavior:"instant"});
  }, [route]);

  const Page = PAGES[route] || HomePage;

  return (
    <div className={"app theme-"+(tweaks.theme||"dark")+" lang-"+lang + (tweaks.showGrain ? " grain":"") }>
      <Header lang={lang} setLang={setLang} route={route} setRoute={setRoute}
              theme={tweaks.theme||"dark"} setTheme={(v)=>setTweak("theme", v)}/>
      <main className="page-main" key={route}>
        <Page lang={lang} tweaks={tweaks}/>
      </main>
      <PageFooter lang={lang} route={route} setRoute={setRoute}/>
      <PortfolioTweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
