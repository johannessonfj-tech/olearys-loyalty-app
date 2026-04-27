const JERSEYS = {
  'arsenal':    { primary: '#ef0107', sleeve: '#fff',    accent: '#ffd700', banner: '#ef0107', text: '#fff', label: 'ARSENAL',     sub: 'EST. 1886' },
  'chelsea':    { primary: '#034694', sleeve: '#034694', accent: '#fff',    banner: '#034694', text: '#fff', label: 'CHELSEA',     sub: 'THE BLUES' },
  'liverpool':  { primary: '#c8102e', sleeve: '#c8102e', accent: '#f6eb61', banner: '#c8102e', text: '#f6eb61', label: 'LIVERPOOL', sub: "YOU'LL NEVER WALK ALONE" },
  'man-city':   { primary: '#6cabdd', sleeve: '#6cabdd', accent: '#fdb913', banner: '#6cabdd', text: '#fff', label: 'MAN CITY',   sub: 'CITIZENS' },
  'man-utd':    { primary: '#da291c', sleeve: '#da291c', accent: '#ffe500', banner: '#da291c', text: '#ffe500', label: 'MAN UNITED', sub: 'RED DEVILS' },
  'tottenham':  { primary: '#fff',    sleeve: '#132257', accent: '#132257', banner: '#132257', text: '#fff', label: 'TOTTENHAM',  sub: 'SPURS' },
  'barcelona':  { primary: '#a50044', sleeve: '#004d98', accent: '#ffd700', banner: '#a50044', text: '#ffd700', label: 'BARCELONA', sub: 'BLAUGRANA' },
  'real-madrid':{ primary: '#fff',    sleeve: '#fff',    accent: '#febe10', banner: '#febe10', text: '#00529f', label: 'REAL MADRID', sub: 'LOS BLANCOS' },
  'bayern':     { primary: '#dc052d', sleeve: '#dc052d', accent: '#0066b2', banner: '#dc052d', text: '#fff', label: 'FC BAYERN',  sub: 'MÜNCHEN' },
  'psg':        { primary: '#004170', sleeve: '#004170', accent: '#dc143c', banner: '#dc143c', text: '#fff', label: 'PARIS SG',   sub: "ICI C'EST PARIS" },
  'juventus':   { primary: '#000',    sleeve: '#fff',    accent: '#ffd700', banner: '#000',    text: '#fff', label: 'JUVENTUS',   sub: 'BIANCONERI' },
  'ac-milan':   { primary: '#fb090b', sleeve: '#000',    accent: '#fff',    banner: '#fb090b', text: '#fff', label: 'AC MILAN',   sub: 'ROSSONERI' },
  'inter':      { primary: '#0068a8', sleeve: '#000',    accent: '#ffd700', banner: '#0068a8', text: '#fff', label: 'INTER',      sub: 'NERAZZURRI' },
  'dortmund':   { primary: '#fde100', sleeve: '#000',    accent: '#000',    banner: '#000',    text: '#fde100', label: 'DORTMUND', sub: 'BVB' },
  'aik':        { primary: '#000',    sleeve: '#000',    accent: '#ffd700', banner: '#000',    text: '#ffd700', label: 'AIK',      sub: 'GNAGET' },
  'djurgarden': { primary: '#004b8d', sleeve: '#ffd700', accent: '#ffd700', banner: '#004b8d', text: '#ffd700', label: 'DJURGÅRDEN', sub: 'JÄRNKAMINERNA' },
  'hammarby':   { primary: '#00a650', sleeve: '#fff',    accent: '#ffd700', banner: '#00a650', text: '#fff', label: 'HAMMARBY',   sub: 'BAJEN' },
  'ifk-goteborg':{ primary: '#1a5ca8', sleeve: '#fff',   accent: '#fff',    banner: '#1a5ca8', text: '#fff', label: 'IFK GÖTEBORG', sub: 'BLÅVITT' },
  'malmo-ff':   { primary: '#87ceeb', sleeve: '#87ceeb', accent: '#fff',    banner: '#87ceeb', text: '#fff', label: 'MALMÖ FF',   sub: 'HIMMELSBLÅTT' },
  'lulea-hf':   { primary: '#000',    sleeve: '#fff',    accent: '#fff',    banner: '#000',    text: '#fff', label: 'LULEÅ HF',   sub: 'STÅLBJÖRNARNA' },
  'farjestad':  { primary: '#003580', sleeve: '#fff',    accent: '#cf142b', banner: '#003580', text: '#fff', label: 'FÄRJESTAD',  sub: 'BILEN' },
  'frolunda':   { primary: '#c8102e', sleeve: '#fff',    accent: '#fff',    banner: '#c8102e', text: '#fff', label: 'FRÖLUNDA',   sub: 'INDIANS' },
  'hv71':       { primary: '#000',    sleeve: '#f4c100', accent: '#f4c100', banner: '#000',    text: '#f4c100', label: 'HV71',    sub: 'JÖNKÖPING' },
  'skelleftea': { primary: '#000',    sleeve: '#fff200', accent: '#fff200', banner: '#000',    text: '#fff200', label: 'SKELLEFTEÅ', sub: 'NORRSKEN' },
  'ny-rangers': { primary: '#0038a8', sleeve: '#0038a8', accent: '#ce1126', banner: '#0038a8', text: '#fff', label: 'NY RANGERS', sub: 'BLUESHIRTS' },
  'toronto':    { primary: '#00205b', sleeve: '#00205b', accent: '#fff',    banner: '#00205b', text: '#fff', label: 'TORONTO',    sub: 'MAPLE LEAFS' },
  __default:    { primary: '#2d9b87', sleeve: '#1a6f60', accent: '#ffdc1e', banner: '#1a6f60', text: '#fff', label: "O'LEARYS",   sub: 'LOYALTY CLUB' },
}

function PlayerAvatar({ jersey, photo, sport }) {
  if (photo) return <div className="absolute inset-0 overflow-hidden"><img src={photo} alt="" className="w-full h-full object-cover" /></div>
  const j = jersey
  const isHockey = sport === 'hockey'
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfd9e8" /><stop offset="0.6" stopColor="#e8d4a8" /><stop offset="1" stopColor="#a4794d" />
        </linearGradient>
        <pattern id="grassLines" x="0" y="0" width="20" height="6" patternUnits="userSpaceOnUse">
          <rect width="20" height="6" fill="#5a8c4a" /><rect x="0" y="0" width="10" height="6" fill="#6ba055" />
        </pattern>
      </defs>
      <rect width="200" height="240" fill="url(#skyGrad)" />
      <rect y="135" width="200" height="2" fill="#5d4220" opacity="0.4" />
      <rect y="180" width="200" height="60" fill="url(#grassLines)" />
      <circle cx="100" cy="78" r="20" fill="#e8c4a0" />
      <path d="M82 75 Q82 60 100 58 Q118 60 118 75 Q118 70 113 67 Q108 64 100 64 Q92 64 87 67 Q82 70 82 75 Z" fill="#3a2a1a" />
      <ellipse cx="93" cy="80" rx="1.3" ry="1.6" fill="#3a2a1a" /><ellipse cx="107" cy="80" rx="1.3" ry="1.6" fill="#3a2a1a" />
      <path d="M93 88 Q100 92 107 88" stroke="#7a4a30" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {isHockey && <>
        <path d="M78 70 Q78 52 100 50 Q122 52 122 70 L122 78 L78 78 Z" fill={j.primary} stroke="#1a1a1a" strokeWidth="0.8" />
        <rect x="80" y="76" width="40" height="3" fill="#1a1a1a" />
        <path d="M82 80 L82 92 Q82 98 90 100 L110 100 Q118 98 118 92 L118 80" fill="none" stroke="#888" strokeWidth="1" />
      </>}
      <rect x="92" y="94" width="16" height="10" fill="#d4a87a" />
      <path d="M55 110 L70 100 Q80 98 92 100 Q100 105 108 100 Q120 98 130 100 L145 110 L150 145 L138 150 L138 200 L62 200 L62 150 L50 145 Z" fill={j.primary} stroke="#1a1a1a" strokeWidth="0.6" />
      <path d="M55 110 L70 100 Q80 100 86 105 L80 130 L60 138 L50 145 Z" fill={j.sleeve} stroke="#1a1a1a" strokeWidth="0.6" />
      <path d="M145 110 L130 100 Q120 100 114 105 L120 130 L140 138 L150 145 Z" fill={j.sleeve} stroke="#1a1a1a" strokeWidth="0.6" />
      <path d="M88 100 Q100 110 112 100 L108 105 Q100 110 92 105 Z" fill={j.accent} />
      <g transform="translate(78, 122)">
        <path d="M0 0 L18 0 L18 14 Q18 22 9 26 Q0 22 0 14 Z" fill={j.accent} stroke="#1a1a1a" strokeWidth="0.5" />
        <text x="9" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill={j.primary} fontFamily="Georgia">{j.label[0]}</text>
      </g>
      <text x="118" y="148" fontSize="22" fontWeight="900" fill={j.accent} fontFamily="Arial" stroke="#1a1a1a" strokeWidth="0.6">10</text>
      <path d="M50 145 Q44 158 46 175 Q48 178 54 176 Q56 165 62 152 Z" fill="#e8c4a0" stroke="#1a1a1a" strokeWidth="0.4" />
      <path d="M150 145 Q156 158 154 175 Q152 178 146 176 Q144 165 138 152 Z" fill="#e8c4a0" stroke="#1a1a1a" strokeWidth="0.4" />
      <rect x="62" y="200" width="76" height="32" fill={isHockey ? j.primary : '#fff'} stroke="#1a1a1a" strokeWidth="0.6" />
      {!isHockey && <g transform="translate(120, 222)"><circle r="9" fill="#fff" stroke="#1a1a1a" strokeWidth="0.6" /><path d="M0 -9 L3 -3 L9 0 L3 3 L0 9 L-3 3 L-9 0 L-3 -3 Z" fill="#1a1a1a" /></g>}
      {isHockey && <><rect x="42" y="155" width="3" height="80" fill="#a87045" stroke="#1a1a1a" strokeWidth="0.4" transform="rotate(-15 43 195)" /></>}
    </svg>
  )
}

export default function PlayerCard({ name, jerseyId, sport, photo, number = '10' }) {
  const j = JERSEYS[jerseyId] || JERSEYS.__default
  const first = (name?.split(' ')[0] || 'PLAYER').toUpperCase()
  const last = (name?.split(' ').slice(1).join(' ') || '').toUpperCase()
  const positionLabel = sport === 'hockey' ? 'CENTER' : 'FORWARD'

  return (
    <div className="relative" style={{ width: 260, aspectRatio: '0.72', filter: 'drop-shadow(0 14px 26px rgba(40,28,8,0.32))' }}>
      {/* SVG filters */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="cardNoise"><feTurbulence type="fractalNoise" baseFrequency="2.6" numOctaves="2" seed="7" /><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.22  0 0 0 0.5 0" /><feComposite in2="SourceGraphic" operator="in" /></filter>
          <pattern id="halftoneDots" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.55" fill="#000" opacity="0.18" /></pattern>
        </defs>
      </svg>

      {/* Cream paper card */}
      <div className="absolute inset-0 rounded-[5px] overflow-hidden" style={{
        backgroundColor: '#f1e6c4', border: '1px solid #b89d5e',
        backgroundImage: 'radial-gradient(ellipse at 50% 45%, #f9efd0 0%, #f1e6c4 55%, #d9c89a 100%), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 30%, rgba(110,80,30,0.15) 100%)',
        backgroundBlendMode: 'multiply, normal',
      }} />

      {/* Inner art window */}
      <div className="absolute" style={{ inset: 8 }}>
        <div className="absolute inset-0 rounded-[3px]" style={{ border: '1px solid #1a1a1a', opacity: 0.85 }} />
        <div className="absolute" style={{ inset: 4, borderRadius: 2, border: `4px solid ${j.banner}`, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.35)' }} />

        {/* Photo window */}
        <div className="absolute overflow-hidden" style={{ inset: 8, borderRadius: 1 }}>
          <PlayerAvatar jersey={j} photo={photo} sport={sport} />

          {/* Halftone */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none" style={{ mixBlendMode: 'multiply', opacity: 0.35 }}>
            <rect width="100%" height="100%" fill="url(#halftoneDots)" />
          </svg>

          {/* Corner star */}
          <div className="absolute" style={{ top: 4, left: 4, zIndex: 5 }}>
            <svg viewBox="0 0 40 40" width="34" height="34" style={{ filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,0.25))' }}>
              <path d="M20 2 L24 14 L37 14 L26.5 22 L30.5 34 L20 26.5 L9.5 34 L13.5 22 L3 14 L16 14 Z" fill="#ffdc1e" stroke="#1a1a1a" strokeWidth="1" strokeLinejoin="round" />
              <text x="20" y="20" textAnchor="middle" fontSize="7" fontWeight="900" fill="#1a1a1a" fontFamily="Arial" letterSpacing="0.05em">ROOKIE</text>
              <text x="20" y="27" textAnchor="middle" fontSize="6" fontWeight="700" fill="#1a1a1a" fontFamily="Arial">'88</text>
            </svg>
          </div>

          {/* Position stamp */}
          <div className="absolute" style={{ top: 6, right: 6, zIndex: 5 }}>
            <div style={{ padding: '3px 7px', border: '2px double #1a1a1a', transform: 'rotate(-3deg)', fontFamily: 'Arial', fontSize: 7, fontWeight: 900, letterSpacing: '0.18em', color: '#1a1a1a', opacity: 0.78 }}>{positionLabel}</div>
          </div>

          {/* Signature */}
          <div className="absolute" style={{ bottom: 4, left: 6, zIndex: 5, transform: 'rotate(-4deg)' }}>
            <svg viewBox="0 0 90 22" width="80" height="20">
              <path d="M2 14 Q8 4 16 12 Q24 20 30 8 Q38 2 46 14 T 60 12 Q68 8 74 14 L 84 14" stroke="#1a3a6e" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85" />
            </svg>
          </div>

          {/* Number disc */}
          <div className="absolute" style={{ bottom: 4, right: 4, zIndex: 5 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#fffaf0', border: '1.5px solid #1a1a1a', boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.12), 1px 1px 0 rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', fontWeight: 900, fontSize: 16, color: '#1a1a1a' }}>{number}</div>
          </div>
        </div>
      </div>

      {/* Bottom name plate */}
      <div className="absolute" style={{ left: 14, right: 14, bottom: 12, zIndex: 6 }}>
        <div style={{ backgroundColor: j.banner, padding: '4px 8px 5px', borderRadius: 1, border: '1px solid #1a1a1a', boxShadow: '0 2px 0 rgba(0,0,0,0.25)', transform: 'rotate(-0.6deg)' }}>
          <div className="flex items-baseline justify-between gap-2">
            <span style={{ color: j.text, opacity: 0.9, fontFamily: 'Arial', fontSize: 6, fontWeight: 900, letterSpacing: '0.32em' }}>{j.sub}</span>
          </div>
          <div className="flex items-end justify-between gap-2 mt-0.5">
            <span style={{ color: j.text, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 900, fontSize: 16, lineHeight: 1, textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>{j.label}</span>
          </div>
        </div>
      </div>

      {/* Player name strip */}
      <div className="absolute pointer-events-none" style={{ left: 0, right: 0, top: 'calc(100% - 52px)', textAlign: 'center', zIndex: 7 }}>
        <div style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: 'rgba(241,230,196,0.9)' }}>
          <span style={{ display: 'block', color: '#1a1a1a', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 11, letterSpacing: '0.08em', lineHeight: 1 }}>{first}</span>
          {last && <span style={{ display: 'block', color: '#1a1a1a', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 11, letterSpacing: '0.08em', lineHeight: 1, marginTop: 1 }}>{last}</span>}
        </div>
      </div>

      {/* Aging effects */}
      <div className="absolute inset-0 rounded-[5px] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(90,55,15,0.32) 0%, transparent 14%), radial-gradient(circle at 100% 100%, rgba(90,55,15,0.26) 0%, transparent 13%)',
        mixBlendMode: 'multiply',
      }} />
      <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-[5px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)', mixBlendMode: 'screen' }} />
    </div>
  )
}

export { JERSEYS }
