
import { useState } from 'react'
import './App.css'

const copy = {
  en: {
    resort: 'CHENGDE\nMOUNTAIN RESORT',
    chineseName: '承德避暑山庄',
    title: <>Explore<br />Chengde</>,
    introduction: <>A journey through<br />China’s imperial<br />summer retreat.</>,
    description: <>Between mountains and waters,<br />meet history, and meet a new you.</>,
    themes: ['LANDSCAPES', 'ARCHITECTURE', 'PEOPLE', 'STORIES'],
    begin: <>BEGIN<br />JOURNEY</>,
    photoAlt: 'Historic Chengde pavilion reflected in the lake',
    plan: {
      eyebrow: '01  /  PLAN YOUR VISIT',
      title: 'Plan Your Visit',
      subtitle: 'Make it your own.',
      timeQuestion: 'How much time do you have?',
      interestQuestion: 'What interests you most?',
      minute: 'min',
      interests: {
        history: 'Imperial History',
        nature: 'Nature & Gardens',
        architecture: 'Architecture',
        culture: 'Culture & Stories',
      },
      continue: 'Continue',
      back: 'Back to welcome',
    },
    preparation: {
      eyebrow: '03  /  YOUR ROUTE',
      title: 'Your Route Preview',
      description: 'See how your choices will shape a future recommendation.',
      prototype: 'PROTOTYPE PREVIEW',
      steps: ['Based on available time', 'Tailored to your interests', 'Connected to cultural stories'],
      preferences: 'Your selected preferences',
      duration: 'Duration',
      interest: 'Interest',
      back: 'Back to planning',
    },
  },
  zh: {
    resort: '承德\n避暑山庄',
    chineseName: 'CHENGDE MOUNTAIN RESORT',
    title: <>探索<br />承德</>,
    introduction: <>穿行山水之间<br />探访中国皇家<br />夏日胜境</>,
    description: <>于山水间遇见历史，<br />也遇见崭新的自己。</>,
    themes: ['山水', '建筑', '人物', '故事'],
    begin: <>开启<br />旅程</>,
    photoAlt: '倒映在湖水中的承德古建筑',
    plan: {
      eyebrow: '01  /  规划您的游览',
      title: '规划您的游览',
      subtitle: '定制专属于您的旅程。',
      timeQuestion: '您有多少游览时间？',
      interestQuestion: '您最感兴趣的是什么？',
      minute: '分钟',
      interests: {
        history: '皇家历史',
        nature: '自然与园林',
        architecture: '建筑',
        culture: '文化与故事',
      },
      continue: '继续',
      back: '返回欢迎页',
    },
    preparation: {
      eyebrow: '03  /  您的路线',
      title: '您的路线预览',
      description: '预览您的选择将如何影响未来的路线推荐。',
      prototype: '原型预览',
      steps: ['根据可用时间推荐', '依照您的兴趣定制', '串联文化故事'],
      preferences: '您选择的偏好',
      duration: '游览时长',
      interest: '兴趣主题',
      back: '返回规划',
    },
  },
} as const

type Page = 'welcome' | 'plan' | 'preparation'
type Duration = 30 | 60 | 90
type Interest = 'history' | 'nature' | 'architecture' | 'culture'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 24">
      <path d="M2 12h25M18 3l9 9-9 9" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 12H4M10 5l-7 7 7 7" />
    </svg>
  )
}

function App() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const [page, setPage] = useState<Page>('welcome')
  const [duration, setDuration] = useState<Duration>(60)
  const [interest, setInterest] = useState<Interest>('history')
  const content = copy[language]
  const isEnglish = language === 'en'

  const languageSwitcher = (
    <div className="language-switcher" role="group" aria-label={isEnglish ? 'Choose language' : '选择语言'}>
      <button type="button" onClick={() => setLanguage('en')} className={isEnglish ? 'active' : ''} aria-pressed={isEnglish}>EN</button>
      <button type="button" onClick={() => setLanguage('zh')} className={!isEnglish ? 'active' : ''} aria-pressed={!isEnglish}>中</button>
    </div>
  )

  const interests: Interest[] = ['history', 'nature', 'architecture', 'culture']

  return (
    <main className="app">
      {page === 'welcome' && <section className={`welcome-page ${isEnglish ? '' : 'welcome-page--zh'}`}>
        <div className="navy-shape navy-shape--top" aria-hidden="true" />

        <svg className="route-line" viewBox="0 0 390 844" preserveAspectRatio="none" aria-hidden="true">
          <path d="M236 -16 C243 65 275 111 327 145 C369 173 384 217 364 268" />
        </svg>

        <header className="welcome-header">
          <div className="brand-lockup">
            <span>{content.resort}</span>
            <span className="brand-lockup__secondary">{content.chineseName}</span>
          </div>

          {languageSwitcher}
        </header>

        <div className="welcome-copy">
          <h1>{content.title}</h1>
          <p className="welcome-copy__intro">{content.introduction}</p>
          <span className="gold-rule" aria-hidden="true" />
          <p className="welcome-copy__description">{content.description}</p>
        </div>

        <svg className="welcome-defs" aria-hidden="true">
          <defs>
            <clipPath id="welcome-photo-clip" clipPathUnits="objectBoundingBox">
              <path d="M0,0.27 C0.13,0.34 0.25,0.36 0.37,0.31 C0.51,0.25 0.58,0.16 0.72,0.11 C0.83,0.07 0.92,0.055 1,0.035 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="landscape" role="img" aria-label={content.photoAlt} />
        <div className="navy-shape navy-shape--bottom" aria-hidden="true" />

        <div className="theme-index" aria-label={isEnglish ? 'Journey themes' : '旅程主题'}>
          <span className="theme-index__dot" aria-hidden="true" />
          {content.themes.map((theme) => <span key={theme}>{theme}</span>)}
        </div>

        <button className="start-button" type="button" onClick={() => setPage('plan')} aria-label={isEnglish ? 'Begin journey' : '开启旅程'}>
          <span>{content.begin}</span>
          <ArrowIcon />
        </button>
      </section>}

      {page === 'plan' && (
        <section className={`plan-page ${isEnglish ? '' : 'plan-page--zh'}`}>
          <div className="plan-corner-shape" aria-hidden="true" />
          <svg className="plan-gold-line" viewBox="0 0 390 210" preserveAspectRatio="none" aria-hidden="true">
            <path d="M225 -12 C234 61 271 91 330 116 C362 130 383 152 398 194" />
          </svg>

          <header className="plan-topbar">
            <button className="back-button" type="button" onClick={() => setPage('welcome')} aria-label={content.plan.back}>
              <BackIcon />
            </button>
            {languageSwitcher}
          </header>

          <div className="plan-heading">
            <p className="plan-eyebrow">{content.plan.eyebrow}</p>
            <h1>{content.plan.title}</h1>
            <p className="plan-subtitle">{content.plan.subtitle}</p>
          </div>

          <div className="plan-banner" aria-hidden="true" />

          <form className="plan-form" onSubmit={(event) => { event.preventDefault(); setPage('preparation') }}>
            <fieldset className="plan-fieldset duration-fieldset">
              <legend><span>01</span>{content.plan.timeQuestion}</legend>
              <div className="duration-options" role="radiogroup" aria-label={content.plan.timeQuestion}>
                {([30, 60, 90] as Duration[]).map((value) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={duration === value}
                    className={duration === value ? 'selected' : ''}
                    onClick={() => setDuration(value)}
                    key={value}
                  >
                    <strong>{value}</strong>
                    <span>{content.plan.minute}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="plan-fieldset interests-fieldset">
              <legend><span>02</span>{content.plan.interestQuestion}</legend>
              <div className="interest-options" role="radiogroup" aria-label={content.plan.interestQuestion}>
                {interests.map((value) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={interest === value}
                    className={`interest-row ${interest === value ? 'selected' : ''}`}
                    onClick={() => setInterest(value)}
                    key={value}
                  >
                    <span className={`interest-thumb interest-thumb--${value}`} aria-hidden="true" />
                    <span className="interest-label">{content.plan.interests[value]}</span>
                    <ArrowIcon />
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="continue-button" type="submit">
              <span>{content.plan.continue}</span>
              <ArrowIcon />
            </button>
          </form>
        </section>
      )}

      {page === 'preparation' && (
        <section className={`preparation-page ${isEnglish ? '' : 'preparation-page--zh'}`}>
          <div className="preparation-shape" aria-hidden="true" />
          <svg className="route-preview-line" viewBox="0 0 390 844" preserveAspectRatio="none" aria-hidden="true">
            <path d="M301 -12 C292 98 342 145 396 181 M203 378 C273 421 277 514 218 577 C181 617 170 663 187 714" />
          </svg>
          <header className="plan-topbar">
            <button className="back-button" type="button" onClick={() => setPage('plan')} aria-label={content.preparation.back}>
              <BackIcon />
            </button>
            {languageSwitcher}
          </header>

          <div className="route-preview-heading">
            <p className="plan-eyebrow">{content.preparation.eyebrow}</p>
            <h1>{content.preparation.title}</h1>
            <p>{content.preparation.description}</p>
          </div>

          <div className="route-photo" role="img" aria-label={content.photoAlt} />

          <section className="route-flow" aria-labelledby="prototype-label">
            <p className="prototype-label" id="prototype-label">{content.preparation.prototype}</p>
            <ol>
              {content.preparation.steps.map((step, index) => (
                <li key={step}>
                  <span className="route-step-number" aria-hidden="true">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <aside className="preference-summary" aria-label={content.preparation.preferences}>
            <p>{content.preparation.preferences}</p>
            <dl>
              <div><dt>{content.preparation.duration}</dt><dd>{duration} {content.plan.minute}</dd></div>
              <div><dt>{content.preparation.interest}</dt><dd>{content.plan.interests[interest]}</dd></div>
            </dl>
          </aside>
        </section>
      )}
    </main>
  )
}

export default App
