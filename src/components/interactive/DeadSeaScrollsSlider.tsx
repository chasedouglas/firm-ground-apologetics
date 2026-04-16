import { useState } from 'react';

interface Verse {
  number: string;
  dss: string;
  mt: string;
  translation: string;
  notes: string;
}

// Isaiah 53:1-6 comparison (1QIsaᵃ vs. Masoretic Text)
// DSS readings based on Abegg-Flint-Ulrich translation; MT based on BHS
// VERIFY: These verse-level comparisons should be checked against the critical apparatus in Abegg, Flint & Ulrich, *The Dead Sea Scrolls Bible* (1999) and Tov's edition. The general point (remarkable agreement) is undisputed; specific wording needs verification.
const verses: Verse[] = [
  {
    number: '53:1',
    dss: 'Who has believed what we have heard? And the arm of the LORD, to whom has it been revealed?',
    mt: 'Who has believed our report? And to whom has the arm of the LORD been revealed?',
    translation: 'Who has believed what he has heard from us? And to whom has the arm of the LORD been revealed?',
    notes: 'Slight variation in phrasing ("what we have heard" vs. "our report"). The meaning is functionally identical. This is representative of the minor stylistic variants throughout the chapter.',
  },
  {
    number: '53:2',
    dss: 'For he grew up before him like a young plant, and like a root out of dry ground; he had no form or majesty that we should look at him, and no beauty that we should desire him.',
    mt: 'For he grew up before him like a young plant, and like a root out of dry ground; he had no form or majesty that we should look at him, and no beauty that we should desire him.',
    translation: 'For he grew up before him like a young plant, and like a root out of dry ground; he had no form or majesty that we should look at him, and no beauty that we should desire him.',
    notes: 'Near-identical. Both texts agree completely on this verse.',
  },
  {
    number: '53:3',
    dss: 'He was despised and rejected by men; a man of sorrows, and acquainted with grief; and as one from whom men hide their faces he was despised, and we esteemed him not.',
    mt: 'He was despised and rejected by men, a man of sorrows and acquainted with grief; and as one from whom men hide their faces he was despised, and we esteemed him not.',
    translation: 'He was despised and rejected by men, a man of sorrows and acquainted with grief; and as one from whom men hide their faces he was despised, and we esteemed him not.',
    notes: 'Virtually identical. Minor punctuation/conjunction differences that do not affect meaning.',
  },
  {
    number: '53:4',
    dss: 'Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted.',
    mt: 'Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted.',
    translation: 'Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted.',
    notes: 'Complete agreement between DSS and MT on this verse.',
  },
  {
    number: '53:5',
    dss: 'But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his stripes we are healed.',
    mt: 'But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his stripes we are healed.',
    translation: 'But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.',
    notes: 'The key verse on substitutionary suffering. Both DSS and MT read identically here — including the crucial "pierced" (chalal). This verse predates Jesus by ~150 years in the Great Isaiah Scroll.',
  },
  {
    number: '53:6',
    dss: 'All we like sheep have gone astray; we have turned — every one — to his own way; and the LORD has laid on him the iniquity of us all.',
    mt: 'All we like sheep have gone astray; we have turned — every one — to his own way; and the LORD has laid on him the iniquity of us all.',
    translation: 'All we like sheep have gone astray; we have turned — every one — to his own way; and the LORD has laid on him the iniquity of us all.',
    notes: 'Agreement throughout. The substitutionary atonement language ("laid on him the iniquity of us all") is identical in both traditions.',
  },
];

type View = 'dss' | 'mt' | 'compare';

export default function DeadSeaScrollsSlider() {
  const [view, setView] = useState<View>('compare');
  const [activeVerse, setActiveVerse] = useState<number>(0);

  const verse = verses[activeVerse];

  const hasDiff = verse.dss !== verse.mt;

  function highlightDiff(text: string, other: string) {
    if (!hasDiff) return <span>{text}</span>;
    const words = text.split(' ');
    const otherWords = other.split(' ');
    return (
      <>
        {words.map((w, i) => (
          <span
            key={i}
            className={otherWords[i] !== w ? 'bg-amber-200 dark:bg-amber-900/50 rounded px-0.5' : ''}
          >
            {w}{' '}
          </span>
        ))}
      </>
    );
  }

  return (
    <div className="my-10 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-950 p-6 shadow-sm font-sans">
      <div className="mb-5">
        <h3 className="font-semibold text-surface-900 dark:text-surface-100 text-base mb-1">
          Dead Sea Scrolls / Masoretic Text: Isaiah 53
        </h3>
        <p className="text-xs text-surface-500 dark:text-surface-500">
          Comparing the Great Isaiah Scroll (1QIsa^a, c. 125 BC) with the Masoretic Text (c. 1000 AD) — ~1,125 years apart.
          Highlighted words indicate differences.
        </p>
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['compare', 'dss', 'mt'] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === v
                ? 'bg-amber-500 dark:bg-amber-600 text-white'
                : 'bg-surface-200 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-300 dark:hover:bg-surface-700'
            }`}
          >
            {v === 'compare' ? 'Side by Side' : v === 'dss' ? 'DSS Only (c. 125 BC)' : 'Masoretic Only (c. 1000 AD)'}
          </button>
        ))}
      </div>

      {/* Verse selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {verses.map((v, i) => (
          <button
            key={v.number}
            onClick={() => setActiveVerse(i)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeVerse === i
                ? 'bg-surface-800 dark:bg-surface-200 text-white dark:text-surface-900'
                : 'bg-surface-200 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-300 dark:hover:bg-surface-700'
            }`}
          >
            v. {v.number}
          </button>
        ))}
      </div>

      {/* Text comparison */}
      {view === 'compare' ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                Great Isaiah Scroll
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-500">c. 125 BC</span>
            </div>
            <p className="text-sm text-surface-800 dark:text-surface-200 leading-relaxed font-serif">
              {highlightDiff(verse.dss, verse.mt)}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                Masoretic Text
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-500">c. 1000 AD</span>
            </div>
            <p className="text-sm text-surface-800 dark:text-surface-200 leading-relaxed font-serif">
              {highlightDiff(verse.mt, verse.dss)}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-surface-700 dark:text-surface-300 uppercase tracking-wide">
              {view === 'dss' ? 'Great Isaiah Scroll (c. 125 BC)' : 'Masoretic Text (c. 1000 AD)'}
            </span>
          </div>
          <p className="text-sm text-surface-800 dark:text-surface-200 leading-relaxed font-serif">
            {view === 'dss' ? verse.dss : verse.mt}
          </p>
        </div>
      )}

      {/* English translation */}
      <div className="rounded-lg bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 p-4 mb-4">
        <p className="text-xs font-semibold text-surface-500 dark:text-surface-500 uppercase tracking-wide mb-2">
          English Translation (ESV base)
        </p>
        <p className="text-sm italic text-surface-700 dark:text-surface-300 leading-relaxed font-serif">
          {verse.translation}
        </p>
      </div>

      {/* Textual notes */}
      <div className={`rounded-lg border p-4 ${hasDiff ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900' : 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'}`}>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${hasDiff ? 'text-amber-700 dark:text-amber-400' : 'text-green-700 dark:text-green-400'}`}>
          {hasDiff ? 'Minor Variant Present' : 'Texts Agree Completely'}
        </p>
        <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">{verse.notes}</p>
      </div>

      {/* Timeline context */}
      <div className="mt-5 flex items-center gap-3 text-xs text-surface-500 dark:text-surface-500">
        <span className="font-medium">125 BC</span>
        <div className="flex-1 h-px bg-surface-300 dark:bg-surface-700 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
        </div>
        <span className="font-medium">1000 AD</span>
        <span className="ml-2 font-semibold text-surface-400 dark:text-parchment-600">~1,125 year gap</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <a
          href="https://www.deadseascrolls.org.il/explore-the-archive/scroll/X-1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 dark:text-amber-400 underline"
        >
          View Great Isaiah Scroll (Israel Museum) →
        </a>
      </div>

      <p className="mt-4 text-xs text-surface-400 dark:text-parchment-600">
        {/* VERIFY */} Verse comparisons based on Abegg, Flint &amp; Ulrich, <em>The Dead Sea Scrolls Bible</em> (1999).
        Presented in English rendering; Hebrew variants are discussed by Tov, <em>Textual Criticism of the Hebrew Bible</em>, 3rd ed.
        The ~17-letter variant count for Isaiah 53 is widely cited but should be verified against the critical Hebrew apparatus.
      </p>
    </div>
  );
}
