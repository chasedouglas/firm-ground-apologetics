import { useState } from 'react';

interface QuestionCard {
  question: string;
  shortAnswer: string;
  href: string;
  tag: string;
}

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

const stats: StatItem[] = [
  { value: '5,800+', label: 'Greek NT manuscripts', sublabel: 'vs. ~250 for Caesar' },
  { value: '~30 yrs', label: 'gap to earliest copy', sublabel: 'vs. 1,000+ yrs for most ancient texts' },
  { value: '99%+', label: 'text unaffected by variants', sublabel: 'per Metzger & Ehrman' },
  { value: '24,000+', label: 'manuscripts (all languages)', sublabel: 'more than any ancient work' },
];

const questions: QuestionCard[] = [
  {
    question: 'Do we even have the original words?',
    shortAnswer: '5,800+ Greek manuscripts — more than any ancient work by a factor of 10. The gap to the earliest copy is ~30 years, vs. 1,000+ for most classical texts.',
    href: '/bible-reliability/manuscript-evidence',
    tag: 'Manuscript Evidence',
  },
  {
    question: 'How different are the copies from each other?',
    shortAnswer: "There are ~400,000 variants across NT manuscripts — but 99%+ are spelling differences, word order, or clearly accidental. No doctrine hangs on any disputed passage.",
    href: '/bible-reliability/textual-criticism',
    tag: 'Textual Criticism',
  },
  {
    question: 'What about the Old Testament?',
    shortAnswer: 'The Dead Sea Scrolls (discovered 1947) are 1,000 years older than our next manuscripts — and match the text we had with remarkable fidelity.',
    href: '/bible-reliability/textual-criticism/dead-sea-scrolls',
    tag: 'Dead Sea Scrolls',
  },
  {
    question: "Didn't church councils choose which books to include?",
    shortAnswer: "Councils recognized books already in use — they didn't create a canon from scratch. The 27 NT books were widely accepted before any council formally listed them.",
    href: '/bible-reliability/canonization',
    tag: 'Canonization',
  },
  {
    question: "What do skeptical scholars actually say?",
    shortAnswer: 'Bart Ehrman — the most prominent popular skeptic — agrees the NT is the best-attested ancient document and that we can reconstruct the original text with confidence.',
    href: '/bible-reliability/common-objections',
    tag: 'Common Objections',
  },
];

export default function SectionHub() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="font-sans">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-4"
          >
            <div className="text-2xl font-display font-normal text-amber-700 dark:text-amber-400 leading-none mb-1">
              {s.value}
            </div>
            <div className="text-xs font-semibold text-surface-700 dark:text-surface-300 mb-0.5 leading-snug">
              {s.label}
            </div>
            {s.sublabel && (
              <div className="text-[10px] text-surface-400 dark:text-surface-500 leading-tight">
                {s.sublabel}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Question cards */}
      <div className="space-y-2">
        {questions.map((q, i) => {
          const isOpen = expanded === i;
          return (
            <div
              key={q.question}
              className={`rounded-xl border transition-colors duration-150 overflow-hidden ${
                isOpen
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20'
                  : 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 hover:border-surface-300 dark:hover:border-surface-600'
              }`}
            >
              <button
                className="w-full flex items-start gap-3 px-5 py-4 text-left"
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-surface-300 dark:border-surface-600 flex items-center justify-center transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <line x1="4" y1="1" x2="4" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-surface-500 dark:text-surface-400" />
                    <line x1="1" y1="4" x2="7" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-surface-500 dark:text-surface-400" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
                      {q.tag}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-surface-800 dark:text-surface-200 leading-snug">
                    {q.question}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pl-[3.25rem]">
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-3">
                    {q.shortAnswer}
                  </p>
                  <a
                    href={q.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                  >
                    Full analysis →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
