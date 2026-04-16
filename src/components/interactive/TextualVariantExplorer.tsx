import { useState } from 'react';

interface VariantType {
  label: string;
  pct: number;
  color: string;
  description: string;
  example?: string;
}

interface Passage {
  id: string;
  name: string;
  location: string;
  summary: string;
  variantTypes: VariantType[];
  walllaceQuote: string;
  ehrmanQuote: string;
  resolution: string;
  doctrinalImpact: string;
}

const passages: Passage[] = [
  {
    id: 'mark16',
    name: 'The Ending of Mark',
    location: 'Mark 16:9–20',
    summary: 'The "long ending" of Mark — the familiar resurrection appearances, the Great Commission, signs following believers — is absent from the earliest complete manuscripts (Sinaiticus and Vaticanus) and several early church fathers.',
    variantTypes: [
      { label: 'No ending after 16:8', pct: 15, color: '#3b82f6', description: 'Codex Sinaiticus, Codex Vaticanus, and several early witnesses end at 16:8 with no subsequent material.', example: '"They said nothing to anyone, for they were afraid." (Full stop)' },
      { label: 'Short ending only', pct: 3, color: '#8b5cf6', description: 'A few manuscripts add a brief summary sentence before or instead of the long ending.', example: '"But they reported briefly to Peter and those around him all that they had been told. And afterward Jesus himself sent out through them, from east to west, the sacred and imperishable proclamation of eternal salvation."' },
      { label: 'Long ending (16:9–20)', pct: 80, color: '#6b7280', description: 'The majority of later manuscripts include the familiar long ending, which first appears in 4th–5th century manuscripts and is cited by Irenaeus (~180 AD).', example: '"He who believes and is baptized will be saved, but he who does not believe will be condemned…"' },
      { label: 'Both short and long', pct: 2, color: '#ec4899', description: 'A small number of manuscripts include both the short ending and the long ending, one after the other.', example: 'A scribal harmonization attempt, likely because the scribe knew of both traditions.' },
    ],
    walllaceQuote: 'The evidence is strongly against the long ending being original to Mark. Most evangelical textual scholars concede this. But no doctrine hangs uniquely on 16:9–20 — the resurrection, Great Commission, and ascension are all attested elsewhere.',
    ehrmanQuote: 'The last twelve verses of Mark are not found in our oldest and best manuscripts. They were added by scribes. This is one of the clearest and most certain results of textual criticism.',
    resolution: 'Both Ehrman and conservative scholars agree: Mark 16:9–20 is almost certainly not original. The original ending of Mark either ended at 16:8 (likely intentional — the Greek word *gar* [for] ending a text was known in antiquity) or the original ending was lost early and multiple scribes supplied alternatives.',
    doctrinalImpact: 'No fundamental doctrine depends uniquely on 16:9–20. The resurrection is attested in all four Gospels and Paul. The Great Commission appears in Matthew 28:18–20. The broader teaching about faith and signs is in other texts. Modern translations footnote the uncertain status of this passage.',
  },
  {
    id: 'john8',
    name: 'The Woman Caught in Adultery',
    location: 'John 7:53–8:11',
    summary: 'The famous passage in which Jesus writes in the dirt and says "Let him who is without sin cast the first stone" is absent from early manuscripts. Where it does appear in later manuscripts, it sometimes appears in different locations in the text.',
    variantTypes: [
      { label: 'Passage absent', pct: 40, color: '#3b82f6', description: 'Absent from P66, P75, Codex Sinaiticus, Codex Vaticanus, Codex Alexandrinus, and most early witnesses.', example: 'The story of John 7 moves directly from 7:52 to 8:12 ("I am the light of the world").' },
      { label: 'Present in current location', pct: 50, color: '#6b7280', description: 'Present after John 7:52 in the majority of later Greek manuscripts.', example: 'The version most readers know, placed within John 7–8.' },
      { label: 'Placed elsewhere in John', pct: 6, color: '#8b5cf6', description: 'Some manuscripts place the passage after John 7:36, or after 21:25.', example: 'Shows the story was floating — not fixed to a particular location.' },
      { label: 'Placed in Luke', pct: 4, color: '#ec4899', description: 'A small number of manuscripts place the passage within Luke\'s Gospel, after Luke 21:38.', example: 'The vocabulary of the passage is more Lukan than Johannine, possibly explaining this placement.' },
    ],
    walllaceQuote: 'This passage was almost certainly not part of the original Gospel of John. Most evangelical scholars acknowledge this. At the same time, most believe the story may well reflect a genuine historical event in Jesus\'s ministry that circulated in oral tradition before being inserted into John\'s Gospel.',
    ehrmanQuote: 'The story of the woman taken in adultery is not found in our oldest manuscripts of the New Testament…. It is certainly not original to John. It was added by scribes at a later point.',
    resolution: 'Broad scholarly consensus across the theological spectrum: the pericope adulterae is not original to John. Its Lukan vocabulary (several words appear in Luke but not John), its absence from early and geographically diverse manuscripts, and its floating location in different manuscripts all point to a later insertion. Many scholars believe it preserves an authentic tradition about Jesus.',
    doctrinalImpact: 'No doctrine depends uniquely on this passage. The themes of mercy, forgiveness, and the danger of self-righteous judgment are thoroughly attested throughout the Gospels. Modern translations universally footnote the uncertain status of this passage.',
  },
  {
    id: '1john57',
    name: 'The Comma Johanneum',
    location: '1 John 5:7–8',
    summary: 'The phrase "For there are three that bear witness in heaven: the Father, the Word, and the Holy Spirit, and these three are one" (the Comma Johanneum) is the most explicit Trinitarian formulation in the NT. It appears only in late Latin manuscripts.',
    variantTypes: [
      { label: 'Without Comma (original)', pct: 95, color: '#3b82f6', description: 'All early Greek manuscripts and the vast majority of the textual tradition read simply: "For there are three that testify: the Spirit, the water, and the blood; and these three agree."', example: '"For there are three that testify: the Spirit and the water and the blood, and these three agree." (ESV, following the critical text)' },
      { label: 'With Comma Johanneum', pct: 5, color: '#6b7280', description: 'The longer text with the explicit Trinitarian formula appears in late Latin manuscripts (from 4th century onward) and only in a handful of late Greek manuscripts (from 10th–16th centuries), at least one of which was likely created to order to satisfy Erasmus\'s challenge.', example: '"For there are three that bear witness in heaven: the Father, the Word, and the Holy Spirit; and these three are one." (KJV rendering)' },
    ],
    walllaceQuote: 'The Comma Johanneum is simply not a part of the original text of 1 John. This is the nearly universal consensus of New Testament textual scholars, including those with a very high view of scriptural authority. The doctrine of the Trinity does not depend on it.',
    ehrmanQuote: 'Most scholars have long recognized that this text does not belong in the New Testament. It was not originally part of the First Epistle of John. It was added to the manuscripts of the Latin Vulgate, and from there it made its way into later Greek manuscripts.',
    resolution: 'The Comma Johanneum is not original to 1 John. It originated in marginal glosses in Latin manuscripts, was incorporated into the Latin text, and eventually — under Erasmus\'s controversial capitulation — appeared in late Greek manuscripts. Critical editions and all modern translations exclude it or footnote it.',
    doctrinalImpact: 'The doctrine of the Trinity is extensively grounded throughout the New Testament without this verse — in the Baptism accounts, John\'s prologue, Jesus\'s own teaching, the Pauline letters, and the Revelation. No creed or council ever depended uniquely on 1 John 5:7 for its Trinitarian formulation.',
  },
];

function PieChart({ types }: { types: VariantType[] }) {
  let cumulative = 0;
  const total = types.reduce((s, t) => s + t.pct, 0);
  const r = 60;
  const cx = 70;
  const cy = 70;

  const slices = types.map((t) => {
    const start = (cumulative / total) * 360;
    const end = ((cumulative + t.pct) / total) * 360;
    cumulative += t.pct;
    const startRad = (start - 90) * (Math.PI / 180);
    const endRad = (end - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = (end - start) > 180 ? 1 : 0;
    return { ...t, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z` };
  });

  return (
    <svg viewBox="0 0 140 140" className="w-32 h-32 shrink-0" aria-hidden="true">
      {slices.map((s) => (
        <path key={s.label} d={s.d} fill={s.color} opacity={0.85} />
      ))}
    </svg>
  );
}

export default function TextualVariantExplorer() {
  const [passageId, setPassageId] = useState<string>('mark16');
  const [activeType, setActiveType] = useState<number | null>(null);

  const passage = passages.find((p) => p.id === passageId)!;

  return (
    <div className="my-10 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-950 p-6 shadow-sm font-sans">
      <div className="mb-5">
        <h3 className="font-semibold text-surface-900 dark:text-surface-100 text-base mb-1">
          Textual Variant Explorer
        </h3>
        <p className="text-xs text-surface-500 dark:text-surface-500">
          Three passages where textual questions are real and significant — examined honestly, with perspectives from both Ehrman and Wallace.
        </p>
      </div>

      {/* Passage selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {passages.map((p) => (
          <button
            key={p.id}
            onClick={() => { setPassageId(p.id); setActiveType(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              passageId === p.id
                ? 'bg-amber-500 dark:bg-amber-600 text-white'
                : 'bg-surface-200 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-300 dark:hover:bg-surface-700'
            }`}
          >
            {p.location}
          </button>
        ))}
      </div>

      <h4 className="font-semibold text-surface-900 dark:text-surface-100 text-sm mb-1">{passage.name}</h4>
      <p className="text-sm text-surface-700 dark:text-surface-300 mb-5 leading-relaxed">{passage.summary}</p>

      {/* Visual breakdown */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <PieChart types={passage.variantTypes} />
        <div className="flex-1 space-y-2">
          {passage.variantTypes.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveType(activeType === i ? null : i)}
              className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-all ${
                activeType === i
                  ? 'bg-white dark:bg-surface-800 shadow-sm border border-surface-200 dark:border-surface-600'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-900'
              }`}
            >
              <span className="mt-1 w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-surface-800 dark:text-surface-200">{t.label}</span>
                  <span className="text-xs font-mono text-surface-500 dark:text-surface-500">{t.pct}%</span>
                </div>
                {activeType === i && (
                  <div className="mt-2">
                    <p className="text-xs text-surface-600 dark:text-surface-400 mb-2">{t.description}</p>
                    {t.example && (
                      <blockquote className="text-xs italic text-surface-500 dark:text-surface-500 border-l-2 border-amber-400 pl-2">
                        {t.example}
                      </blockquote>
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scholar perspectives */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2 uppercase tracking-wide">Bart Ehrman (Skeptic)</p>
          <blockquote className="text-xs italic text-surface-700 dark:text-surface-300 leading-relaxed">
            "{passage.ehrmanQuote}"
          </blockquote>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wide">Daniel Wallace (Conservative)</p>
          <blockquote className="text-xs italic text-surface-700 dark:text-surface-300 leading-relaxed">
            "{passage.walllaceQuote}"
          </blockquote>
        </div>
      </div>

      {/* Resolution */}
      <div className="rounded-lg bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <p className="text-xs font-semibold text-surface-600 dark:text-surface-400 mb-2 uppercase tracking-wide">Scholarly Consensus</p>
        <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">{passage.resolution}</p>
      </div>
      <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4">
        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 uppercase tracking-wide">Doctrinal Impact</p>
        <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">{passage.doctrinalImpact}</p>
      </div>

      <p className="mt-4 text-xs text-surface-400 dark:text-parchment-600">
        Sources: Ehrman, <em>Misquoting Jesus</em> (2005); Metzger, <em>A Textual Commentary on the Greek NT</em> (1994); Wallace/CSNTM responses.
        Percentage distributions are approximate.
      </p>
    </div>
  );
}
