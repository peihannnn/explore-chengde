const copy = {
  en: {
    resort: 'CHENGDE\nMOUNTAIN RESORT', chineseName: '承德避暑山庄',
    title: 'Explore<br>Chengde', introduction: 'A journey through<br>China’s imperial<br>summer retreat.',
    description: 'Between mountains and waters,<br>meet history, and meet a new you.',
    themes: ['LANDSCAPES', 'ARCHITECTURE', 'PEOPLE', 'STORIES'], begin: 'BEGIN<br>JOURNEY',
    photoAlt: 'Historic Chengde pavilion reflected in the lake', chooseLanguage: 'Choose language', journeyThemes: 'Journey themes', beginLabel: 'Begin journey',
    plan: {
      eyebrow: '01  /  PLAN YOUR VISIT', title: 'Plan Your Visit', subtitle: 'Make it your own.',
      timeQuestion: 'How much time do you have?', interestQuestion: 'What interests you most?', minute: 'min',
      interests: { history: 'Imperial History', nature: 'Nature & Gardens', architecture: 'Architecture', culture: 'Culture & Stories' },
      continue: 'Continue', back: 'Back to welcome',
    },
    preparation: {
      eyebrow: '03  /  YOUR ROUTE', title: 'Your Route Preview', description: 'See how your choices will shape a future recommendation.',
      prototype: 'PROTOTYPE PREVIEW', steps: ['Based on available time', 'Tailored to your interests', 'Connected to cultural stories'],
      preferences: 'Your selected preferences', duration: 'Duration', interest: 'Interest', back: 'Back to planning',
    },
  },
  zh: {
    resort: '承德\n避暑山庄', chineseName: 'CHENGDE MOUNTAIN RESORT',
    title: '探索<br>承德', introduction: '穿行山水之间<br>探访中国皇家<br>夏日胜境',
    description: '于山水间遇见历史，<br>也遇见崭新的自己。', themes: ['山水', '建筑', '人物', '故事'], begin: '开启<br>旅程',
    photoAlt: '倒映在湖水中的承德古建筑', chooseLanguage: '选择语言', journeyThemes: '旅程主题', beginLabel: '开启旅程',
    plan: {
      eyebrow: '01  /  规划您的游览', title: '规划您的游览', subtitle: '定制专属于您的旅程。',
      timeQuestion: '您有多少游览时间？', interestQuestion: '您最感兴趣的是什么？', minute: '分钟',
      interests: { history: '皇家历史', nature: '自然与园林', architecture: '建筑', culture: '文化与故事' },
      continue: '继续', back: '返回欢迎页',
    },
    preparation: {
      eyebrow: '03  /  您的路线', title: '您的路线预览', description: '预览您的选择将如何影响未来的路线推荐。',
      prototype: '原型预览', steps: ['根据可用时间推荐', '依照您的兴趣定制', '串联文化故事'],
      preferences: '您选择的偏好', duration: '游览时长', interest: '兴趣主题', back: '返回规划',
    },
  },
};

const state = { language: 'en', page: 'welcome', duration: 60, interest: 'history' };

function getCopy(path) {
  return path.split('.').reduce((value, key) => value[key], copy[state.language]);
}

function showPage(page) {
  state.page = page;
  document.querySelectorAll('[data-page]').forEach((section) => {
    section.hidden = section.dataset.page !== page;
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function render() {
  const content = copy[state.language];
  const isEnglish = state.language === 'en';
  document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';

  document.querySelectorAll('[data-copy]').forEach((element) => { element.textContent = getCopy(element.dataset.copy); });
  document.querySelectorAll('[data-copy-html]').forEach((element) => { element.innerHTML = getCopy(element.dataset.copyHtml); });
  document.querySelectorAll('[data-interest-label]').forEach((element) => { element.textContent = content.plan.interests[element.dataset.interestLabel]; });
  document.querySelectorAll('[data-photo]').forEach((element) => { element.setAttribute('aria-label', content.photoAlt); });

  document.querySelectorAll('.language-switcher').forEach((switcher) => { switcher.setAttribute('aria-label', content.chooseLanguage); });
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  document.querySelector('.welcome-page').classList.toggle('welcome-page--zh', !isEnglish);
  document.querySelector('.plan-page').classList.toggle('plan-page--zh', !isEnglish);
  document.querySelector('.preparation-page').classList.toggle('preparation-page--zh', !isEnglish);

  const themeIndex = document.querySelector('#theme-index');
  themeIndex.setAttribute('aria-label', content.journeyThemes);
  themeIndex.querySelectorAll(':scope > span:not(.theme-index__dot)').forEach((item) => item.remove());
  content.themes.forEach((theme) => {
    const item = document.createElement('span');
    item.textContent = theme;
    themeIndex.append(item);
  });

  document.querySelector('#start-button').setAttribute('aria-label', content.beginLabel);
  document.querySelector('[data-go="welcome"]').setAttribute('aria-label', content.plan.back);
  document.querySelector('[data-go="plan"]').setAttribute('aria-label', content.preparation.back);
  document.querySelector('.duration-options').setAttribute('aria-label', content.plan.timeQuestion);
  document.querySelector('.interest-options').setAttribute('aria-label', content.plan.interestQuestion);
  document.querySelector('#preference-summary').setAttribute('aria-label', content.preparation.preferences);

  document.querySelectorAll('[data-duration]').forEach((button) => {
    const selected = Number(button.dataset.duration) === state.duration;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-checked', String(selected));
  });
  document.querySelectorAll('[data-interest]').forEach((button) => {
    const selected = button.dataset.interest === state.interest;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-checked', String(selected));
  });

  const routeSteps = document.querySelector('#route-steps');
  routeSteps.replaceChildren();
  content.preparation.steps.forEach((step, index) => {
    const item = document.createElement('li');
    const number = document.createElement('span');
    const label = document.createElement('span');
    number.className = 'route-step-number';
    number.setAttribute('aria-hidden', 'true');
    number.textContent = `0${index + 1}`;
    label.textContent = step;
    item.append(number, label);
    routeSteps.append(item);
  });

  document.querySelector('#summary-duration').textContent = `${state.duration} ${content.plan.minute}`;
  document.querySelector('#summary-interest').textContent = content.plan.interests[state.interest];
}

document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
  state.language = button.dataset.language;
  render();
}));
document.querySelector('#start-button').addEventListener('click', () => showPage('plan'));
document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.go)));
document.querySelectorAll('[data-duration]').forEach((button) => button.addEventListener('click', () => {
  state.duration = Number(button.dataset.duration);
  render();
}));
document.querySelectorAll('[data-interest]').forEach((button) => button.addEventListener('click', () => {
  state.interest = button.dataset.interest;
  render();
}));
document.querySelector('#plan-form').addEventListener('submit', (event) => {
  event.preventDefault();
  render();
  showPage('preparation');
});

render();
showPage('welcome');
