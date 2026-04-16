import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

declare global {
  interface Window {
    pagefind?: {
      search: (q: string) => Promise<{ results: Array<{ id: string; data: () => Promise<SearchResult> }> }>;
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

  const loadPagefind = useCallback(async () => {
    if (pfLoaded || window.pagefind) { setPfLoaded(true); return; }
    try {
      const pf = await import('/pagefind/pagefind.js' as string);
      await pf.init();
      window.pagefind = pf;
      setPfLoaded(true);
    } catch { /* dev mode — no pagefind */ }
  }, [pfLoaded]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) { loadPagefind(); setTimeout(() => inputRef.current?.focus(), 50); }
    else { setQuery(''); setResults([]); }
  }, [open, loadPagefind]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim() || !window.pagefind) { setResults([]); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await window.pagefind!.search(query);
        const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
        setResults(data);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 200);
  }, [query]);

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Open search (Cmd+K)"
      className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 text-surface-400 dark:text-surface-500 text-xs font-sans hover:border-surface-300 dark:hover:border-surface-600 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
      </svg>
      <span>Search</span>
      <kbd className="text-[10px] bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded px-1 py-px font-mono">⌘K</kbd>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-white dark:bg-surface-900 rounded-2xl shadow-2xl shadow-surface-900/20 border border-surface-200 dark:border-surface-700 overflow-hidden font-sans">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-100 dark:border-surface-800">
          <svg className="w-4 h-4 text-surface-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, manuscripts, topics…"
            className="flex-1 bg-transparent text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 outline-none"
          />
          {loading && <span className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin shrink-0" />}
          <button onClick={() => setOpen(false)} className="text-xs text-surface-400 hover:text-surface-600 shrink-0 font-mono">ESC</button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {!pfLoaded && query.trim() && (
            <p className="px-4 py-6 text-sm text-surface-400 text-center">
              Search available after <code className="font-mono text-xs bg-surface-100 dark:bg-surface-800 px-1 rounded">npm run build</code>
            </p>
          )}
          {pfLoaded && query.trim() && results.length === 0 && !loading && (
            <p className="px-4 py-6 text-sm text-surface-400 text-center">No results for "<strong className="text-surface-700 dark:text-surface-300">{query}</strong>"</p>
          )}
          {results.map((r, i) => (
            <a key={i} href={r.url} onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800 border-b border-surface-50 dark:border-surface-800 last:border-0 transition-colors">
              <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 mb-1">{r.meta?.title ?? r.url}</p>
              <p className="text-xs text-surface-500 leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
            </a>
          ))}
        </div>

        {!query.trim() && (
          <div className="px-4 py-4">
            <p className="text-xs text-surface-400 mb-3">Quick links</p>
            <div className="flex flex-wrap gap-2">
              {['Manuscript Evidence', 'Textual Variants', 'Dead Sea Scrolls', 'Common Objections'].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
