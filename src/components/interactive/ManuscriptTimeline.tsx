import { useState, useEffect, useRef } from 'react';

interface Manuscript {
  id: string;
  name: string;
  shortName: string;
  date: number;
  dateLabel: string;
  contents: string;
  location: string;
  link: string;
  imageNote: string;
  significance: string;
  category: 'papyrus' | 'uncial' | 'minuscule' | 'discovery';
}

const manuscripts: Manuscript[] = [
  {
    id: 'p52',
    name: 'Papyrus 52 (P52)',
    shortName: 'P52',
    date: 125,
    dateLabel: 'c. 125 AD',
    contents: 'John 18:31–33, 37–38 (fragment)',
    location: 'John Rylands Library, Manchester',
    link: 'https://www.library.manchester.ac.uk/rylands/special-collections/',
    imageNote: 'High-resolution images available through the John Rylands Digital Collections.',
    significance: 'The earliest known fragment of any New Testament text. Its date demonstrates the Gospel of John was circulating within a generation of composition.',
    category: 'papyrus',
  },
  {
    id: 'p46',
    name: 'Chester Beatty Papyrus II (P46)',
    shortName: 'P46',
    date: 200,
    dateLabel: 'c. 175–225 AD',
    contents: "Romans, Hebrews, 1–2 Corinthians, Ephesians, Galatians, Philippians, Colossians, 1 Thessalonians (much of Paul's letters)",
    location: 'Chester Beatty Library, Dublin; University of Michigan',
    link: 'https://chesterbeatty.ie/',
    imageNote: 'Parts available through the Chester Beatty Library digital collection.',
    significance: "One of the earliest and most extensive collections of Paul's letters, demonstrating wide circulation of the Pauline corpus by ~200 AD.",
    category: 'papyrus',
  },
  {
    id: 'p66',
    name: 'Bodmer Papyrus II (P66)',
    shortName: 'P66',
    date: 200,
    dateLabel: 'c. 200 AD',
    contents: 'Most of the Gospel of John',
    location: 'Bodmer Library (Fondation Martin Bodmer), Geneva',
    link: 'https://www.fondationbodmer.ch/',
    imageNote: 'The Bodmer Library holds several early NT papyri.',
    significance: 'Extensive early witness to the Gospel of John, showing textual stability across early manuscripts.',
    category: 'papyrus',
  },
  {
    id: 'p75',
    name: 'Bodmer Papyri XIV–XV (P75)',
    shortName: 'P75',
    date: 210,
    dateLabel: 'c. 175–225 AD',
    contents: 'Significant portions of Luke and John',
    location: 'Vatican Apostolic Library (transferred 2007)',
    link: 'https://digi.vatlib.it/',
    imageNote: 'Available through the Vatican digital library.',
    significance: 'Notably close agreement with Codex Vaticanus (c. 325 AD) proves that the Vaticanus text type is ancient, not a later revision.',
    category: 'papyrus',
  },
  {
    id: 'p45',
    name: 'Chester Beatty Papyrus I (P45)',
    shortName: 'P45',
    date: 250,
    dateLabel: 'c. 225–250 AD',
    contents: 'Portions of all four Gospels and Acts',
    location: 'Chester Beatty Library, Dublin; Österreichische Nationalbibliothek, Vienna',
    link: 'https://chesterbeatty.ie/',
    imageNote: 'Parts at the Chester Beatty Library, Dublin.',
    significance: 'Demonstrates all four Gospels circulating together as a collection by the 3rd century.',
    category: 'papyrus',
  },
  {
    id: 'vaticanus',
    name: 'Codex Vaticanus (B)',
    shortName: 'Vaticanus',
    date: 330,
    dateLabel: 'c. 300–325 AD',
    contents: 'Most of the Old and New Testaments in Greek (Septuagint + NT)',
    location: 'Vatican Apostolic Library, Vatican City',
    link: 'https://digi.vatlib.it/',
    imageNote: 'Partially available through the Vatican digital library.',
    significance: 'Considered by many textual critics the single most important New Testament manuscript. High-quality text with widespread scholarly agreement.',
    category: 'uncial',
  },
  {
    id: 'sinaiticus',
    name: 'Codex Sinaiticus (ℵ)',
    shortName: 'Sinaiticus',
    date: 350,
    dateLabel: 'c. 330–360 AD',
    contents: 'Complete New Testament (oldest complete NT); much of the OT; Epistle of Barnabas; Shepherd of Hermas',
    location: 'British Library (347 leaves); Leipzig University Library; National Library of Russia; St. Catherine\'s Monastery, Sinai',
    link: 'https://www.codexsinaiticus.org/',
    imageNote: 'Fully digitized and freely accessible at codexsinaiticus.org — the entire manuscript in high resolution with transcription and translation.',
    significance: 'The oldest complete New Testament in existence. The Codex Sinaiticus Project has made it freely available online.',
    category: 'uncial',
  },
  {
    id: 'alexandrinus',
    name: 'Codex Alexandrinus (A)',
    shortName: 'Alexandrinus',
    date: 425,
    dateLabel: '5th century AD',
    contents: 'Most of the Bible (OT + NT); 1–2 Clement',
    location: 'British Library, London',
    link: 'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Royal_MS_1_D_VIII',
    imageNote: 'Digitized by the British Library.',
    significance: 'One of the four great uncials. Particularly important for the book of Revelation and the Catholic Epistles.',
    category: 'uncial',
  },
  {
    id: 'bezae',
    name: 'Codex Bezae (D)',
    shortName: 'Bezae',
    date: 450,
    dateLabel: '5th century AD',
    contents: 'Gospels and Acts (bilingual: Greek and Latin)',
    location: 'Cambridge University Library',
    link: 'https://cudl.lib.cam.ac.uk/view/MS-NN-00002-00041',
    imageNote: 'Digitized by Cambridge University Library.',
    significance: 'A "Western text" type with numerous unique readings in Acts, valuable for tracing textual diversity in the early tradition.',
    category: 'uncial',
  },
  {
    id: 'dss',
    name: 'Dead Sea Scrolls (Qumran)',
    shortName: 'DSS',
    date: 1947,
    dateLabel: '1947 discovery (scrolls c. 250 BC–68 AD)',
    contents: 'Fragments of every OT book except Esther; Great Isaiah Scroll (complete); community texts',
    location: 'Israel Museum (Shrine of the Book), Jerusalem; Israel Antiquities Authority',
    link: 'https://www.deadseascrolls.org.il/',
    imageNote: 'Fully digitized by the Israel Museum and IAA. High-resolution images freely available.',
    significance: 'Pushed OT manuscript evidence back ~1,000 years. Isaiah 53 in the Great Isaiah Scroll (c. 125 BC) agrees closely with the Masoretic Text.',
    category: 'discovery',
  },
];

const MIN_YEAR = 100;
const MAX_YEAR = 1960;

function categoryColor(cat: Manuscript['category']) {
  switch (cat) {
    case 'papyrus': return 'bg-amber-500';
    case 'uncial': return 'bg-blue-500';
    case 'minuscule': return 'bg-green-500';
    case 'discovery': return 'bg-rose-500';
    default: return 'bg-gray-400';
  }
}

function categoryLabel(cat: Manuscript['category']) {
  switch (cat) {
    case 'papyrus': return 'Papyrus';
    case 'uncial': return 'Uncial Codex';
    case 'minuscule': return 'Minuscule';
    case 'discovery': return 'Discovery';
    default: return cat;
  }
}

export default function ManuscriptTimeline() {
  const [scrubYear, setScrubYear] = useState(500);
  const [selected, setSelected] = useState<Manuscript | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const visible = manuscripts.filter(
    (m) => m.category === 'discovery' ? m.date <= scrubYear : m.date <= scrubYear
  );

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;
    const step = (ts: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = ts - lastTimeRef.current;
      lastTimeRef.current = ts;
      setScrubYear((prev) => {
        const next = prev + dt * 0.7;
        if (next >= MAX_YEAR) { setIsPlaying(false); return MAX_YEAR; }
        return next;
      });
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, prefersReducedMotion]);

  const pct = ((scrubYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  return (
    <div className="my-10 rounded-xl border border-parchment-200 dark:border-ink-700 bg-parchment-50 dark:bg-ink-950 p-6 shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-ink-900 dark:text-parchment-100 text-base">
            Manuscript Discovery Timeline
          </h3>
          <p className="text-xs text-ink-500 dark:text-parchment-500 mt-1">
            Drag the slider to see manuscripts accumulate. Click any to open its record.
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          {(['papyrus', 'uncial', 'discovery'] as Manuscript['category'][]).map((cat) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${categoryColor(cat)}`} />
              <span className="text-ink-500 dark:text-parchment-500">{categoryLabel(cat)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scrubber */}
      <div className="relative mb-8">
        <div className="flex justify-between text-xs text-ink-400 dark:text-parchment-600 mb-2">
          <span>100 AD</span>
          <span>Today</span>
        </div>
        <div className="relative h-2 bg-parchment-200 dark:bg-ink-800 rounded-full">
          <div
            className="absolute left-0 top-0 h-2 bg-gold-500 rounded-full transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={Math.round(scrubYear)}
          onChange={(e) => { setIsPlaying(false); setScrubYear(Number(e.target.value)); }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          aria-label="Drag to explore manuscripts by date"
        />
        <div
          className="absolute top-6 text-xs font-semibold text-gold-600 dark:text-gold-400 -translate-x-1/2"
          style={{ left: `${pct}%` }}
        >
          {Math.round(scrubYear) >= 1960 ? 'Today' : `${Math.round(scrubYear)} AD`}
        </div>
      </div>

      {!prefersReducedMotion && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => { setScrubYear(MIN_YEAR); setIsPlaying(true); lastTimeRef.current = 0; }}
            disabled={isPlaying}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gold-500 dark:bg-gold-600 text-white disabled:opacity-50 transition-opacity"
          >
            ▶ Auto-play
          </button>
          <button
            onClick={() => setIsPlaying(false)}
            disabled={!isPlaying}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-parchment-200 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 disabled:opacity-50"
          >
            ■ Pause
          </button>
          <button
            onClick={() => { setIsPlaying(false); setScrubYear(MAX_YEAR); }}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-parchment-200 dark:bg-ink-800 text-ink-600 dark:text-parchment-400"
          >
            Show All
          </button>
        </div>
      )}

      {/* Manuscript dots */}
      <div className="flex flex-wrap gap-3 min-h-16" role="list" aria-label="Manuscripts visible at selected date">
        {visible.length === 0 && (
          <p className="text-sm text-ink-400 dark:text-parchment-600 italic">
            Drag the slider forward to reveal manuscripts…
          </p>
        )}
        {visible.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(selected?.id === m.id ? null : m)}
            role="listitem"
            aria-label={`${m.name}, ${m.dateLabel}`}
            aria-expanded={selected?.id === m.id}
            className={`group relative flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all cursor-pointer ${
              selected?.id === m.id
                ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 shadow-md'
                : 'border-parchment-200 dark:border-ink-700 bg-white dark:bg-ink-900 hover:border-gold-400 dark:hover:border-gold-600 hover:shadow-sm'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${categoryColor(m.category)}`} />
            <span className="font-semibold text-ink-800 dark:text-parchment-200">{m.shortName}</span>
            <span className="text-ink-400 dark:text-parchment-600">{m.dateLabel}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="mt-6 p-5 rounded-lg border border-gold-300 dark:border-gold-800 bg-white dark:bg-ink-900 shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-ink-900 dark:text-parchment-100 text-sm mb-1">
                {selected.name}
              </h4>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white ${categoryColor(selected.category)}`}>
                {categoryLabel(selected.category)}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-ink-400 dark:text-parchment-500 hover:text-ink-700 dark:hover:text-parchment-300 text-lg leading-none"
              aria-label="Close detail panel"
            >
              ×
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-ink-500 dark:text-parchment-500 uppercase tracking-wide mb-1">Date</dt>
              <dd className="text-ink-800 dark:text-parchment-200">{selected.dateLabel}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-500 dark:text-parchment-500 uppercase tracking-wide mb-1">Location</dt>
              <dd className="text-ink-800 dark:text-parchment-200">{selected.location}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-ink-500 dark:text-parchment-500 uppercase tracking-wide mb-1">Contents</dt>
              <dd className="text-ink-800 dark:text-parchment-200">{selected.contents}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-ink-500 dark:text-parchment-500 uppercase tracking-wide mb-1">Significance</dt>
              <dd className="text-ink-700 dark:text-parchment-300">{selected.significance}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-ink-500 dark:text-parchment-500 uppercase tracking-wide mb-1">Digital Access</dt>
              <dd className="text-ink-700 dark:text-parchment-300 text-xs mb-2">{selected.imageNote}</dd>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium text-gold-700 dark:text-gold-400 underline"
              >
                Visit digital archive →
              </a>
            </div>
          </dl>
        </div>
      )}

      <p className="mt-6 text-xs text-ink-400 dark:text-parchment-600">
        Sources: INTF Münster manuscript registry; Metzger & Ehrman,{' '}
        <em>The Text of the New Testament</em>, 4th ed. (2005); Israel Museum Dead Sea Scrolls Project.
      </p>
    </div>
  );
}
