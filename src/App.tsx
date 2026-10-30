
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
    placeholder: 'PLACEHOLDER LANDSCAPE',
  },
  zh: {
    resort: '承德\n避暑山庄',
    chineseName: 'CHENGDE MOUNTAIN RESORT',
    title: <>探索<br />承德</>,
    introduction: <>穿行山水之间<br />探访中国皇家<br />夏日胜境</>,
    description: <>于山水间遇见历史，<br />也遇见崭新的自己。</>,
    themes: ['山水', '建筑', '人物', '故事'],
    begin: <>开启<br />旅程</>,
    placeholder: '风景图片占位',
  },
} as const

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 24">
      <path d="M2 12h25M18 3l9 9-9 9" />
    </svg>
  )
}

function App() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const content = copy[language]
  const isEnglish = language === 'en'

  return (
    <main className="app">
      <section className={`welcome-page ${isEnglish ? '' : 'welcome-page--zh'}`}>
        <div className="navy-shape navy-shape--top" aria-hidden="true" />

        <svg className="route-line" viewBox="0 0 390 844" preserveAspectRatio="none" aria-hidden="true">
          <path d="M238 -18 C244 78 302 141 346 181 C398 229 392 308 349 355 C315 391 286 413 276 469 C260 563 212 620 162 696 C134 739 90 808 26 852" />
        </svg>

        <header className="welcome-header">
          <div className="brand-lockup">
            <span>{content.resort}</span>
            <span className="brand-lockup__secondary">{content.chineseName}</span>
          </div>

          <div className="language-switcher" role="group" aria-label="Choose language">
            <button type="button" onClick={() => setLanguage('en')} className={isEnglish ? 'active' : ''} aria-pressed={isEnglish}>EN</button>
            <button type="button" onClick={() => setLanguage('zh')} className={!isEnglish ? 'active' : ''} aria-pressed={!isEnglish}>中</button>
          </div>
        </header>

        <div className="welcome-copy">
          <h1>{content.title}</h1>
          <p className="welcome-copy__intro">{content.introduction}</p>
          <span className="gold-rule" aria-hidden="true" />
          <p className="welcome-copy__description">{content.description}</p>
        </div>

        <div className="landscape" role="img" aria-label={content.placeholder}>
          <span>{content.placeholder}</span>
        </div>
        <div className="navy-shape navy-shape--bottom" aria-hidden="true" />

        <div className="theme-index" aria-label={isEnglish ? 'Journey themes' : '旅程主题'}>
          <span className="theme-index__dot" aria-hidden="true" />
          {content.themes.map((theme) => <span key={theme}>{theme}</span>)}
        </div>

        <button className="start-button" type="button" aria-label={isEnglish ? 'Begin journey' : '开启旅程'}>
          <span>{content.begin}</span>
          <ArrowIcon />
        </button>
      </section>
    </main>
  )
}

export default App
