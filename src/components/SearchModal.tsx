import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
  sub_results?: Array<{ title: string; url: string; excerpt: string }>;
}

declare global {
  interface Window {
    pagefind?: {
      search: (query: string) => Promise<{ results: Array<{ id: string; data: () => Promise<SearchResult> }> }>;
      init: () => Promise<void>;
    };
  }
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [pfLoaded, setPfLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load pagefind lazily
  const loadPagefind = useCallback(async () => {
    if (pfLoaded || window.pagefind) { setPfLoaded(true); return; }
    try {
      // @ts-ignore — pagefind is injected at build time
      const pf = await import('/pagefind/pagefind.js');
      await pf.init();
      window.pagefind = pf;
      setPfLoaded(true);
    } catch {
      // Pagefind not available in dev mode
    }
  }, [pfLoaded]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      loadPagefind();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open, loadPagefind]);

  // Search with debounce
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim() || !window.pagefind) { setResults([]); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await window.pagefind!.search(query);
        const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search (Cmd+K)"
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-parchment-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-500 dark:text-parchment-500 text-sm font-sans hover:border-parchment-400 dark:hover:border-ink-500 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
        </svg>
        <span className="text-xs">Search</span>
        <kbd className="ml-1 text-[10px] bg-parchment-100 dark:bg-ink-800 border border-parchment-200 dark:border-ink-700 rounded px-1 py-0.5 font-mono">⌘K</kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl bg-white dark:bg-ink-900 rounded-xl shadow-2xl border border-parchment-200 dark:border-ink-700 overflow-hidden font-sans">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-parchment-100 dark:border-ink-800">
          <svg className="w-4 h-4 text-ink-400 dark:text-parchment-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, manuscripts, topics…"
            className="flex-1 bg-transparent text-sm text-ink-900 dark:text-parchment-100 placeholder-ink-400 dark:placeholder-parchment-600 outline-none"
            aria-label="Search query"
          />
          {loading && (
            <span className="w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin shrink-0" />
          )}
          <button onClick={() => setOpen(false)} className="text-xs text-ink-400 dark:text-parchment-600 hover:text-ink-700 dark:hover:text-parchment-400 shrink-0">
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {!pfLoaded && query.trim() && (
            <p className="px-4 py-6 text-sm text-ink-400 dark:text-parchment-600 text-center">
              Search is available after build. Run <code className="font-mono text-xs bg-parchment-100 dark:bg-ink-800 px-1 rounded">npm run build</code> to enable.
            </p>
          )}
          {pfLoaded && query.trim() && results.length === 0 && !loading && (
            <p className="px-4 py-6 text-sm text-ink-400 dark:text-parchment-600 text-center">
              No results for "<strong className="text-ink-700 dark:text-parchment-300">{query}</strong>"
            </p>
          )}
          {results.map((r, i) => (
            <a
              key={i}
              href={r.url}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-parchment-50 dark:hover:bg-ink-800 border-b border-parchment-50 dark:border-ink-800 last:border-0 transition-colors"
            >
              <div className="text-sm font-semibold text-ink-800 dark:text-parchment-200 mb-1 leading-tight">
                {r.meta?.title ?? r.url}
              </div>
              <div
                className="text-xs text-ink-500 dark:text-parchment-500 leading-relaxed line-clamp-2"
                dangerouslySetInnerHTML={{ __html: r.excerpt }}
              />
            </a>
          ))}
        </div>

        {!query.trim() && (
          <div className="px-4 py-4">
            <p className="text-xs text-ink-400 dark:text-parchment-600 mb-3">Quick links</p>
            <div className="flex flex-wrap gap-2">
              {['Manuscript Evidence', 'Textual Variants', 'Dead Sea Scrolls', 'Common Objections'].map((t) => (
                <a
                  key={t}
                  href={`/bible-reliability/manuscript-evidence`}
                  onClick={() => setOpen(false)}
                  className="text-xs px-2.5 py-1 rounded-md bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700 transition-colors"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
