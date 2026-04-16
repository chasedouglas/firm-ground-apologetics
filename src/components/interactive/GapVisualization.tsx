import { useState } from 'react';

interface Work {
  name: string;
  composed: string;
  gap: number;
  manuscripts: number;
  color: string;
  highlight: boolean;
  note: string;
}

const works: Work[] = [
  {
    name: 'New Testament (Greek)',
    composed: '~50–100 AD',
    gap: 30,
    manuscripts: 5800,
    color: '#d4a820',
    highlight: true,
    note: 'Earliest fragment (P52) dated c. 100–150 AD; composed c. 50–100 AD. Gap ~30–50 years.',
  },
  {
    name: "Homer's Iliad",
    composed: '~750 BC',
    gap: 400,
    manuscripts: 1800,
    color: '#6b7280',
    highlight: false,
    note: 'Earliest papyrus fragments c. 300–200 BC; earliest complete manuscript ~10th c. AD. ~400-year gap to earliest substantial copy.',
  },
  {
    name: "Caesar's Gallic Wars",
    composed: '~51 BC',
    gap: 900,
    manuscripts: 251,
    color: '#6b7280',
    highlight: false,
    note: 'Composed ~51 BC; earliest manuscripts 9th century AD. ~900-year gap.',
  },
  {
    name: "Tacitus' Annals",
    composed: '~117 AD',
    gap: 750,
    manuscripts: 33,
    color: '#6b7280',
    highlight: false,
    note: 'Books 1–6 survive in a single 9th-century manuscript. Books 7–10 are lost entirely. ~750–800 year gap.',
  },
  {
    name: "Herodotus' Histories",
    composed: '~440 BC',
    gap: 1350,
    manuscripts: 109,
    color: '#6b7280',
    highlight: false,
    note: 'Composed c. 440 BC; earliest manuscripts c. 900 AD. ~1,350-year gap.',
  },
  {
    name: "Plato",
    composed: '~380 BC',
    gap: 1200,
    manuscripts: 210,
    color: '#6b7280',
    highlight: false,
    note: 'Earliest key manuscript (Codex Clarkianus) dated 895 AD; composed c. 380 BC. ~1,200-year gap.',
  },
  {
    name: "Thucydides",
    composed: '~400 BC',
    gap: 1300,
    manuscripts: 96,
    color: '#6b7280',
    highlight: false,
    note: 'Composed c. 400 BC; earliest manuscripts c. 900 AD. ~1,300-year gap.',
  },
];

const MAX_GAP = 1400;

export default function GapVisualization() {
  const [hovered, setHovered] = useState<string | null>(null);

  const sorted = [...works].sort((a, b) => a.gap - b.gap);

  return (
    <div className="my-10 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-950 p-6 shadow-sm font-sans">
      <div className="mb-6">
        <h3 className="font-semibold text-surface-900 dark:text-surface-100 text-base mb-1">
          Composition-to-Copy Gap
        </h3>
        <p className="text-xs text-surface-500 dark:text-surface-500">
          Years between original composition and earliest surviving manuscript copy.
          Shorter is better — less time for corruption to accumulate.
        </p>
      </div>

      <div className="space-y-4" role="list">
        {sorted.map((w) => {
          const widthPct = (w.gap / MAX_GAP) * 100;
          const isHovered = hovered === w.name;
          return (
            <div
              key={w.name}
              role="listitem"
              onMouseEnter={() => setHovered(w.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(w.name)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-label={`${w.name}: ${w.gap}-year gap, ${w.manuscripts.toLocaleString()} manuscripts`}
              className="group cursor-default"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-xs font-medium min-w-0 w-48 truncate ${w.highlight ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'text-surface-600 dark:text-surface-400'}`}>
                  {w.name}
                </span>
                <span className="text-xs text-surface-400 dark:text-parchment-600 ml-auto whitespace-nowrap">
                  ~{w.gap} years
                </span>
              </div>
              <div className="relative h-5 bg-surface-200 dark:bg-surface-800 rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-300"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: w.highlight ? '#d4a820' : '#9ca3af',
                    opacity: isHovered ? 1 : w.highlight ? 0.9 : 0.6,
                  }}
                />
                {w.highlight && (
                  <div className="absolute inset-y-0 left-0 flex items-center px-2">
                    <span className="text-xs font-bold text-surface-900">~{w.gap}yr</span>
                  </div>
                )}
              </div>
              {isHovered && (
                <p className="mt-1.5 text-xs text-surface-500 dark:text-surface-500 italic leading-relaxed">
                  {w.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Scale */}
      <div className="mt-5 flex justify-between text-xs text-surface-400 dark:text-parchment-600">
        <span>0 years</span>
        <span>700 years</span>
        <span>1,400 years</span>
      </div>
      <div className="h-px bg-surface-200 dark:bg-surface-800 mt-1" />

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-surface-500 dark:text-surface-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-500" />
          New Testament
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-gray-400" />
          Classical works
        </span>
      </div>

      <p className="mt-4 text-xs text-surface-400 dark:text-parchment-600">
        {/* VERIFY */} Sources: Reynolds &amp; Wilson, <em>Scribes and Scholars</em> (2013);
        Metzger & Ehrman, <em>The Text of the New Testament</em> (2005).
        Classical manuscript counts are approximate; see Methodology page.
        Hover/focus each bar for details.
      </p>
    </div>
  );
}
