import { useState, useRef, useEffect } from 'react';

interface Props {
  label?: string;
  children: React.ReactNode;
}

export default function ExpandSection({ label = 'Read the full analysis', children }: Props) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [open, children]);

  return (
    <div className="my-8 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden font-sans">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-surface-50 dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-surface-700 dark:text-surface-300 group-hover:text-surface-900 dark:group-hover:text-surface-100">
          {open ? 'Collapse' : label}
        </span>
        <span
          className="ml-3 shrink-0 w-5 h-5 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-surface-500 dark:text-surface-400">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? `${height}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={bodyRef}
          className="px-5 py-5 border-t border-surface-100 dark:border-surface-800 prose dark:prose-invert max-w-none prose-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
