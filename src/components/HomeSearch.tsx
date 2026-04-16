import { useState, useRef, useEffect } from 'react';

interface Bubble {
  text: string;
  href: string;
  dx: number; // horizontal offset in px from center (desktop)
  dy: number; // vertical offset in px from center (desktop)
}

// Positions are from the viewport center.
// Keep |dx| > 310 OR |dy| > 120 to stay clear of the search+wordmark block
// (which spans roughly ±300px wide × ±100px tall from center).
const bubbles: Bubble[] = [
  { text: 'Has the Bible been changed over time?',     href: '/bible-reliability',                                           dx: -380, dy: -100 },
  { text: 'Who chose what books are in the Bible?',   href: '/bible-reliability/canonization',                              dx:  340, dy: -120 },
  { text: 'What do the Dead Sea Scrolls prove?',      href: '/bible-reliability/textual-criticism/dead-sea-scrolls',        dx: -390, dy:   80 },
  { text: 'How many Bible manuscripts exist?',        href: '/bible-reliability/manuscript-evidence',                       dx:  360, dy:   90 },
  { text: 'Are there errors in the Bible?',           href: '/bible-reliability/textual-criticism/variants-explained',      dx: -160, dy:  200 },
  { text: 'Did Jesus really exist?',                  href: '/bible-reliability/common-objections',                         dx:  130, dy:  210 },
  { text: 'What does Bart Ehrman actually say?',      href: '/bible-reliability/textual-criticism',                         dx:  -80, dy: -210 },
  { text: 'Can we trust the Gospel accounts?',        href: '/bible-reliability/manuscript-evidence/new-testament',         dx:   90, dy: -200 },
];

export default function HomeSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 3.25rem)' }}>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div
          className="w-[700px] h-[400px] rounded-full blur-3xl transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at center, #f59e0b 0%, transparent 70%)',
            opacity: focused ? 0.18 : 0.09,
          }}
        />
      </div>

      {/* Desktop bubbles — rendered first (behind center), z-0 */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {bubbles.map((b, i) => (
          <a
            key={i}
            href={b.href}
            className="pointer-events-auto absolute left-1/2 top-1/2 whitespace-nowrap"
            style={{
              transform: `translate(calc(-50% + ${b.dx}px), calc(-50% + ${b.dy}px))`,
              opacity: focused ? 0.2 : 1,
              transition: 'opacity 0.35s ease',
            }}
            tabIndex={focused ? -1 : 0}
          >
            <span className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-sans font-medium border border-surface-200 dark:border-surface-700 bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm text-surface-600 dark:text-surface-400 shadow-sm hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50/80 dark:hover:bg-amber-950/30 hover:shadow-md hover:shadow-amber-200/40 dark:hover:shadow-amber-900/20 transition-all duration-200 cursor-pointer select-none">
              {b.text}
            </span>
          </a>
        ))}
      </div>

      {/* Center content — pointer-events-none on wrapper so bubbles behind are still clickable */}
      <div className="relative z-10 flex flex-col items-center w-full px-5 pointer-events-none">

        {/* Wordmark */}
        <div className="mb-8 text-center pointer-events-none">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-500 mb-3">
            Firm Ground
          </p>
          <h1 className="font-display font-normal text-[2rem] md:text-[2.6rem] text-surface-950 dark:text-surface-50 leading-[1.1] tracking-tight">
            Ask anything.
          </h1>
        </div>

        {/* Search form — pointer-events-auto re-enabled */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl pointer-events-auto">
          <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
            focused
              ? 'border-amber-400 dark:border-amber-600 shadow-lg shadow-amber-200/40 dark:shadow-amber-900/30 bg-white dark:bg-surface-900'
              : 'border-surface-200 dark:border-surface-700 bg-white/90 dark:bg-surface-900/90 shadow-md shadow-surface-200/50 dark:shadow-surface-950/50'
          }`}>
            <svg className="absolute left-4 w-5 h-5 text-surface-400 dark:text-surface-500 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search or ask a question…"
              className="w-full bg-transparent pl-12 pr-24 py-4 text-base md:text-lg font-sans text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-600 focus:outline-none rounded-2xl"
              autoComplete="off"
              spellCheck={false}
            />
            <div className="absolute right-3 flex items-center gap-2">
              {query ? (
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 dark:bg-amber-600 text-white text-xs font-semibold font-sans hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                >
                  Search
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md border border-surface-200 dark:border-surface-700 text-[10px] font-mono text-surface-400 dark:text-surface-600 bg-surface-50 dark:bg-surface-800">
                  <span className="text-xs">⌘</span>K
                </kbd>
              )}
            </div>
          </div>
        </form>

        {/* Mobile bubbles */}
        <div className="md:hidden mt-8 w-full max-w-xl pointer-events-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {bubbles.map((b, i) => (
              <a
                key={i}
                href={b.href}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-medium border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-150"
              >
                {b.text}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
