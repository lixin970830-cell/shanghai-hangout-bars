import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bookmark,
  Check,
  Clock,
  ExternalLink,
  MapPin,
  Moon,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Sun,
  Users,
  Wine,
  X
} from 'lucide-react';
import './styles.css';

const bars = [
  {
    name: 'The Union Trading Company',
    area: '愚园路',
    scene: ['好聊天', '下班小喝', '适合约会'],
    price: '¥180-260',
    priceValue: 220,
    mood: ['松弛', '美式', '稳定'],
    bestFor: '朋友小聚、轻松约会',
    when: '工作日 19:00 前后',
    quiet: 4,
    freshness: 3,
    score: 95,
    note: '菜单有趣，氛围不端着，是那种不需要解释太多、坐下就能聊起来的安全牌。',
    avoid: '周末晚高峰会吵，想深聊建议早点到。',
    map: 'https://www.google.com/maps/search/?api=1&query=The+Union+Trading+Company+Shanghai'
  },
  {
    name: 'Sober Company',
    area: '新天地',
    scene: ['适合约会', '经典名店', '好聊天'],
    price: '¥220-350',
    priceValue: 285,
    mood: ['成熟', '精致', '稳'],
    bestFor: '认真喝一杯、重要约会',
    when: '晚餐后第一站',
    quiet: 3,
    freshness: 3,
    score: 93,
    note: '上海 cocktail 名片之一，适合想喝得认真但不想太浮夸的晚上。',
    avoid: '价格不低，临时去可能等位。',
    map: 'https://www.google.com/maps/search/?api=1&query=Sober+Company+Shanghai'
  },
  {
    name: 'Speak Low',
    area: '复兴中路',
    scene: ['Speakeasy', '适合约会', '经典名店'],
    price: '¥180-320',
    priceValue: 250,
    mood: ['隐藏', '热闹', '仪式感'],
    bestFor: '带人体验、第一次来上海酒吧',
    when: '饭后续摊',
    quiet: 2,
    freshness: 3,
    score: 91,
    note: '上海 speakeasy 代表，适合带人体验“找入口”的小惊喜。',
    avoid: '名气太大，不适合想要小众安静的人。',
    map: 'https://www.google.com/maps/search/?api=1&query=Speak+Low+Shanghai'
  },
  {
    name: 'Pony Up',
    area: '静安',
    scene: ['新店热门', '适合约会', '好聊天'],
    price: '¥180-280',
    priceValue: 230,
    mood: ['轻盈', '年轻', '有审美'],
    bestFor: '想尝新、审美在线的约会',
    when: '周中晚上更稳',
    quiet: 4,
    freshness: 5,
    score: 92,
    note: '近年口碑很强，适合想要新鲜感但不想踩雷的组合。',
    avoid: '热门时段座位紧张，建议提前确认。',
    map: 'https://www.google.com/maps/search/?api=1&query=Pony+Up+Shanghai+bar'
  },
  {
    name: 'Barules',
    area: '静安',
    scene: ['新店热门', '好聊天'],
    price: '¥180-300',
    priceValue: 240,
    mood: ['克制', '专业', '利落'],
    bestFor: '对酒有点要求的小局',
    when: '下班后两三杯',
    quiet: 4,
    freshness: 4,
    score: 89,
    note: '适合对 cocktail 有一点兴趣的人，不靠浮夸装修撑场面。',
    avoid: '如果同行只想热闹拍照，可能觉得不够外放。',
    map: 'https://www.google.com/maps/search/?api=1&query=Barules+Shanghai'
  },
  {
    name: 'EPIC',
    area: '静安',
    scene: ['经典名店', '下班小喝'],
    price: '¥180-300',
    priceValue: 240,
    mood: ['成熟', '稳定', '城市感'],
    bestFor: '不想研究、要稳妥',
    when: '临时约朋友',
    quiet: 3,
    freshness: 2,
    score: 86,
    note: '老牌稳妥选项，适合不想研究太多但要喝得像样。',
    avoid: '惊喜感不是最强。',
    map: 'https://www.google.com/maps/search/?api=1&query=EPIC+Shanghai+bar'
  },
  {
    name: 'Senator Saloon',
    area: '五原路',
    scene: ['好聊天', '下班小喝'],
    price: '¥150-240',
    priceValue: 195,
    mood: ['美式', '复古', '随意'],
    bestFor: '老朋友 casual hangout',
    when: '工作日早些时候',
    quiet: 4,
    freshness: 2,
    score: 88,
    note: '老派、舒服、不紧绷，适合把重点放在聊天本身。',
    avoid: '不是精致拍照型。',
    map: 'https://www.google.com/maps/search/?api=1&query=Senator+Saloon+Shanghai'
  },
  {
    name: 'COA Shanghai',
    area: '静安',
    scene: ['新店热门', '适合约会'],
    price: '¥200-320',
    priceValue: 260,
    mood: ['龙舌兰', '国际感', '鲜明'],
    bestFor: '喜欢 agave spirits 的人',
    when: '第二站更有记忆点',
    quiet: 3,
    freshness: 5,
    score: 90,
    note: '风格比普通 cocktail bar 更有记忆点，适合同行愿意尝鲜的晚上。',
    avoid: '不喝龙舌兰/梅斯卡尔的人可能没那么中。',
    map: 'https://www.google.com/maps/search/?api=1&query=COA+Shanghai+bar'
  },
  {
    name: 'Penicillin Shanghai',
    area: '静安',
    scene: ['新店热门', '适合约会'],
    price: '¥220-350',
    priceValue: 285,
    mood: ['可持续', '国际', '概念感'],
    bestFor: '想聊概念和体验的人',
    when: '约会或小型庆祝',
    quiet: 3,
    freshness: 5,
    score: 87,
    note: '有香港名店背景，适合想试新概念 cocktail 的场景。',
    avoid: '概念强，未必适合只想简单喝一杯的人。',
    map: 'https://www.google.com/maps/search/?api=1&query=Penicillin+Shanghai+bar'
  },
  {
    name: 'Bar Leone Shanghai',
    area: '静安',
    scene: ['新店热门', '适合约会'],
    price: '¥220-380',
    priceValue: 300,
    mood: ['意式', '热门', '社交'],
    bestFor: '带朋友尝鲜、社交感',
    when: '预留等位时间',
    quiet: 2,
    freshness: 5,
    score: 86,
    note: '自带话题，适合想要一点热度和社交氛围的夜晚。',
    avoid: '新店热度高，体验受排队和拥挤影响。',
    map: 'https://www.google.com/maps/search/?api=1&query=Bar+Leone+Shanghai'
  },
  {
    name: 'Flair Rooftop',
    area: '陆家嘴',
    scene: ['景观 rooftop', '适合约会'],
    price: '¥260-450',
    priceValue: 355,
    mood: ['高空', '夜景', '外地朋友'],
    bestFor: '外地朋友、仪式感夜景',
    when: '天气好的傍晚',
    quiet: 2,
    freshness: 2,
    score: 84,
    note: '看城市天际线很稳，适合外地朋友或有仪式感的晚上。',
    avoid: '更偏景观体验，酒本身不是唯一重点。',
    map: 'https://www.google.com/maps/search/?api=1&query=Flair+Rooftop+Shanghai'
  },
  {
    name: 'ROOF',
    area: '外滩/苏河湾',
    scene: ['景观 rooftop', '适合约会'],
    price: '¥240-420',
    priceValue: 330,
    mood: ['拍照', '夜景', '精致'],
    bestFor: '拍照、晚餐后续摊',
    when: '天黑后第一小时',
    quiet: 2,
    freshness: 3,
    score: 83,
    note: '适合想要城市感和照片的人，作为晚餐后续摊很顺。',
    avoid: '天气不好时体验会打折。',
    map: 'https://www.google.com/maps/search/?api=1&query=ROOF+Shanghai+bar'
  },
  {
    name: '和平饭店爵士酒吧',
    area: '外滩',
    scene: ['经典名店', '景观 rooftop'],
    price: '¥220-400',
    priceValue: 310,
    mood: ['爵士', '历史感', '经典上海'],
    bestFor: '听音乐、带外地朋友',
    when: '安排成目的地',
    quiet: 3,
    freshness: 2,
    score: 82,
    note: '不是潮流，但有上海老派质感，适合听音乐和带外地朋友。',
    avoid: '如果你想要年轻热闹，这里不够“燃”。',
    map: 'https://www.google.com/maps/search/?api=1&query=Fairmont+Peace+Hotel+Jazz+Bar+Shanghai'
  },
  {
    name: 'Bar No. 3',
    area: '徐汇',
    scene: ['好聊天', '适合约会'],
    price: '¥180-280',
    priceValue: 230,
    mood: ['安静', '成熟', '低调'],
    bestFor: '认真聊天、低调约会',
    when: '不赶时间的晚上',
    quiet: 5,
    freshness: 2,
    score: 90,
    note: '适合想认真聊天的人，整体比热门店更平稳。',
    avoid: '不适合想要很强社交场的人。',
    map: 'https://www.google.com/maps/search/?api=1&query=Bar+No.+3+Shanghai'
  },
  {
    name: 'Root Down',
    area: '静安',
    scene: ['下班小喝', '好聊天'],
    price: '¥160-260',
    priceValue: 210,
    mood: ['轻松', '社区感', '不装'],
    bestFor: '临时约、低压力喝一杯',
    when: '下班后直接过去',
    quiet: 4,
    freshness: 3,
    score: 87,
    note: '适合临时约朋友，不需要太多心理建设。',
    avoid: '不是仪式感场景。',
    map: 'https://www.google.com/maps/search/?api=1&query=Root+Down+Shanghai+bar'
  },
  {
    name: 'The Cannery',
    area: '愚园路',
    scene: ['下班小喝', '好聊天'],
    price: '¥180-320',
    priceValue: 250,
    mood: ['庭院', '热闹', '西式餐酒'],
    bestFor: '从晚饭自然过渡到喝酒',
    when: '晚饭前后都顺',
    quiet: 3,
    freshness: 3,
    score: 85,
    note: '有户外和餐食属性，适合从晚饭自然过渡到喝酒。',
    avoid: '人多时会偏吵。',
    map: 'https://www.google.com/maps/search/?api=1&query=The+Cannery+Shanghai'
  }
];

const sceneOptions = ['全部', '好聊天', '适合约会', 'Speakeasy', '景观 rooftop', '新店热门', '下班小喝', '经典名店'];
const areaOptions = ['全部', ...Array.from(new Set(bars.map((bar) => bar.area)))];
const sortOptions = [
  ['recommended', '综合推荐'],
  ['quiet', '更好聊天'],
  ['fresh', '新鲜感'],
  ['budget', '预算友好']
];
const viewOptions = [
  ['all', '全部'],
  ['saved', '已收藏'],
  ['unvisited', '未去过']
];

function loadStoredSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch {
    return new Set();
  }
}

function applySort(items, sortBy) {
  return [...items].sort((a, b) => {
    if (sortBy === 'quiet') return b.quiet - a.quiet || b.score - a.score;
    if (sortBy === 'fresh') return b.freshness - a.freshness || b.score - a.score;
    if (sortBy === 'budget') return a.priceValue - b.priceValue || b.score - a.score;
    return b.score - a.score;
  });
}

function App() {
  const [scene, setScene] = useState('全部');
  const [area, setArea] = useState('全部');
  const [sortBy, setSortBy] = useState('recommended');
  const [view, setView] = useState('all');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(() => localStorage.getItem('sh-bars-theme') === 'dark');
  const [saved, setSaved] = useState(() => loadStoredSet('sh-bars-saved'));
  const [visited, setVisited] = useState(() => loadStoredSet('sh-bars-visited'));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = bars.filter((bar) => {
      const matchesScene = scene === '全部' || bar.scene.includes(scene);
      const matchesArea = area === '全部' || bar.area === area;
      const matchesView = view === 'all' || (view === 'saved' && saved.has(bar.name)) || (view === 'unvisited' && !visited.has(bar.name));
      const text = `${bar.name} ${bar.area} ${bar.scene.join(' ')} ${bar.mood.join(' ')} ${bar.bestFor} ${bar.when} ${bar.note} ${bar.avoid}`;
      return matchesScene && matchesArea && matchesView && (!q || text.toLowerCase().includes(q));
    });
    return applySort(matches, sortBy);
  }, [scene, area, sortBy, view, query, saved, visited]);

  const hasActiveFilters = scene !== '全部' || area !== '全部' || sortBy !== 'recommended' || view !== 'all' || query.trim();
  const lead = filtered[0];

  function resetFilters() {
    setScene('全部');
    setArea('全部');
    setSortBy('recommended');
    setView('all');
    setQuery('');
  }

  function toggleStored(name, key, value, setter) {
    const next = new Set(value);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    localStorage.setItem(key, JSON.stringify([...next]));
    setter(next);
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem('sh-bars-theme', next ? 'dark' : 'light');
  }

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <span className="brand-mark">SH</span>
            <span>Shanghai Hangout Bars</span>
          </div>
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label="切换主题">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <section className="hero-grid">
          <div>
            <p className="eyebrow"><Sparkles size={16} /> 第一版 · 16 家种子清单</p>
            <h1>
              <span>适合聊天、约会、续摊</span>
              <span>和下班小喝的</span>
              <span>上海酒吧地图。</span>
            </h1>
            <p className="subtitle">
              不追求“全上海最全”，只保留能快速判断的精选项：氛围、预算、适合谁，以及什么时候别去。
            </p>
            <div className="hero-actions">
              <a className="primary" href="#list">看清单</a>
              <a className="secondary" href="https://www.google.com/maps/search/Shanghai+cocktail+bar" target="_blank" rel="noreferrer">
                打开地图 <ExternalLink size={15} />
              </a>
            </div>
          </div>
          <div className="panel">
            <div className="metric">
              <span>{bars.length}</span>
              <p>Bars</p>
            </div>
            <div className="metric">
              <span>{filtered.length}</span>
              <p>Matches</p>
            </div>
            <div className="metric">
              <span>{saved.size}</span>
              <p>Saved</p>
            </div>
            <div className="metric">
              <span>{visited.size}</span>
              <p>Visited</p>
            </div>
          </div>
        </section>
      </header>

      <section className="filters" aria-label="筛选酒吧">
        <div className="filter-topline">
          <label className="search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索：静安 / rooftop / 好聊天" />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="清空搜索">
                <X size={16} />
              </button>
            )}
          </label>

          <div className="compact-controls">
            <SelectControl label="区域" options={areaOptions} value={area} onChange={setArea} />
            <SelectControl label="排序" options={sortOptions} value={sortBy} onChange={setSortBy} />
            <SelectControl label="状态" options={viewOptions} value={view} onChange={setView} />
            <button className="reset-btn" type="button" onClick={resetFilters} disabled={!hasActiveFilters}>
              <RotateCcw size={15} /> <span>重置</span>
            </button>
          </div>
        </div>

        <div className="scene-strip">
          <span>场景</span>
          <div className="chips scene-chips">
            {sceneOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={scene === option ? 'chip active' : 'chip'}
                aria-pressed={scene === option}
                onClick={() => setScene(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="list" className="list-head">
        <div>
          <p>{filtered.length} / {bars.length}</p>
          <h2>今晚可以去哪</h2>
        </div>
        <p className="hint">
          {lead ? `先看 ${lead.name}：${lead.bestFor}。` : '没有匹配项，换一个场景或区域会更快。'}
        </p>
      </section>

      <section className="grid">
        {filtered.length > 0 ? (
          filtered.map((bar, index) => (
            <article className="card" key={bar.name}>
              <div className="card-top">
                <div>
                  <p className="area"><MapPin size={14} /> {bar.area}</p>
                  <h3>{bar.name}</h3>
                </div>
                <span className="price">{bar.price}</span>
              </div>

              <div className="quick-line">
                <span>#{index + 1}</span>
                <span>{bar.score} 推荐度</span>
                <span>{bar.quiet}/5 安静度</span>
              </div>

              <div className="decision">
                <span><Users size={14} /> {bar.bestFor}</span>
                <span><Clock size={14} /> {bar.when}</span>
              </div>

              <div className="tag-row">
                {bar.scene.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <p className="note">{bar.note}</p>
              <p className="avoid"><strong>避雷：</strong>{bar.avoid}</p>

              <div className="moods">
                {bar.mood.map((item) => (
                  <span key={item}><Star size={12} /> {item}</span>
                ))}
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className={saved.has(bar.name) ? 'mini active' : 'mini'}
                  onClick={() => toggleStored(bar.name, 'sh-bars-saved', saved, setSaved)}
                >
                  <Bookmark size={15} /> {saved.has(bar.name) ? '已收藏' : '收藏'}
                </button>
                <button
                  type="button"
                  className={visited.has(bar.name) ? 'mini active' : 'mini'}
                  onClick={() => toggleStored(bar.name, 'sh-bars-visited', visited, setVisited)}
                >
                  <Check size={15} /> {visited.has(bar.name) ? '去过' : '标记去过'}
                </button>
                <a className="mini map" href={bar.map} target="_blank" rel="noreferrer">
                  <Wine size={15} /> 导航
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="empty">
            <p>没有匹配的酒吧</p>
            <h3>换个场景，或者先看全部清单。</h3>
            <button className="primary" type="button" onClick={resetFilters}>查看全部</button>
          </div>
        )}
      </section>
    </main>
  );
}

function SelectControl({ label, options, value, onChange }) {
  return (
    <label className="select-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => {
          const optionValue = Array.isArray(option) ? option[0] : option;
          const text = Array.isArray(option) ? option[1] : option;
          return <option key={optionValue} value={optionValue}>{text}</option>;
        })}
      </select>
    </label>
  );
}

createRoot(document.getElementById('root')).render(<App />);
