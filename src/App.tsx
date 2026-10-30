
import { useState } from 'react'
import './App.css'

function App() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')

  const isEnglish = language === 'en'

  return (
    <div className="app">
      <section className="hero">

        <div className="language-switcher">
          <button
            onClick={() => setLanguage('en')}
            className={isEnglish ? 'active' : ''}
          >
            EN
          </button>

          <button
            onClick={() => setLanguage('zh')}
            className={!isEnglish ? 'active' : ''}
          >
            中文
          </button>
        </div>

        <span className="hero-label">
          CHENGDE MOUNTAIN RESORT
        </span>

        <h1>
          {isEnglish ? (
            <>Explore<br />Chengde</>
          ) : (
            <>探索承德</>
          )}
        </h1>

        <p>
          {isEnglish
            ? 'Navigate to Discover, Discover to Learn.'
            : '在探索中发现，在旅途中学习。'}
        </p>

        <button className="start-button">
          {isEnglish ? 'Start Exploring' : '开始探索'}
        </button>

      </section>
    </div>
  )
}

export default App
