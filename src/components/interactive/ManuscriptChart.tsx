import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from 'recharts';

type Metric = 'manuscripts' | 'gap';

const works = [
  {
    name: 'NT (Greek)',
    manuscripts: 5800,
    gap: 30,
    color: '#b88f10',
    details: {
      fullName: 'New Testament (Greek manuscripts)',
      earliest: 'Papyrus 52, c. 125 AD (Gospel of John fragment)',
      location: 'John Rylands Library, Manchester',
      link: 'https://www.library.manchester.ac.uk/rylands/',
      note: 'The INTF (Münster) official registry lists ~5,800 Greek NT manuscripts. Earliest surviving fragment is P52.',
    },
  },
  {
    name: 'NT (all lang.)',
    manuscripts: 24000,
    gap: 30,
    color: '#d4a820',
    details: {
      fullName: 'New Testament (all languages combined)',
      earliest: 'Various papyri, c. 125–200 AD',
      location: 'Multiple institutions worldwide',
      link: 'https://ntvmr.uni-muenster.de/',
      note: 'Includes Latin (~10,000), Syriac, Coptic, Armenian, Ethiopic, Georgian, and others.',
    },
  },
  {
    name: "Homer's Iliad",
    manuscripts: 1800,
    gap: 400,
    color: '#6b7280',
    details: {
      fullName: "Homer, Iliad (~750 BC)",
      earliest: 'c. 200–300 BC papyrus fragments; earliest complete c. 10th c. AD',
      location: 'Various libraries',
      link: 'https://www.homermultitext.org/',
      note: 'VERIFY: ~1,800 is widely cited; see the Homer Multitext Project catalog for precise counts by manuscript type.',
    },
  },
  {
    name: 'Caesar',
    manuscripts: 251,
    gap: 900,
    color: '#6b7280',
    details: {
      fullName: 'Caesar, Gallic Wars (~51 BC)',
      earliest: 'Earliest manuscripts 9th century AD',
      location: 'Various European libraries',
      link: 'https://www.bl.uk/',
      note: 'VERIFY: ~251 is the commonly cited figure. Some sources distinguish primary from secondary MSS differently.',
    },
  },
  {
    name: 'Tacitus',
    manuscripts: 33,
    gap: 800,
    color: '#6b7280',
    details: {
      fullName: 'Tacitus, Annals (~117 AD)',
      earliest: 'Codex Mediceus I & II, 9th century AD',
      location: 'Biblioteca Medicea Laurenziana, Florence',
      link: 'https://bml.firenze.sbn.it/',
      note: 'Annals books 1–6 survive in a single 9th-century manuscript. Books 7–10 are lost entirely.',
    },
  },
  {
    name: 'Herodotus',
    manuscripts: 109,
    gap: 1400,
    color: '#6b7280',
    details: {
      fullName: 'Herodotus, Histories (~440 BC)',
      earliest: 'c. 900 AD',
      location: 'Various',
      link: 'https://www.bl.uk/',
      note: 'VERIFY: ~109 is cited in Reynolds & Wilson; precise count depends on what is included.',
    },
  },
  {
    name: 'Plato',
    manuscripts: 210,
    gap: 1200,
    color: '#6b7280',
    details: {
      fullName: 'Plato (~380 BC)',
      earliest: 'Codex Clarkianus, 895 AD',
      location: 'Bodleian Library, Oxford',
      link: 'https://www.bodleian.ox.ac.uk/',
      note: 'Codex Clarkianus (Clarke 39) is the oldest and most important Plato manuscript.',
    },
  },
];

const formatManuscripts = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : v.toString();

interface TooltipPayload {
  payload: typeof works[0];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-parchment-50 dark:bg-ink-900 border border-parchment-200 dark:border-ink-700 rounded-lg p-4 shadow-xl max-w-xs text-sm font-sans">
      <p className="font-semibold text-ink-900 dark:text-parchment-100 mb-1">{d.details.fullName}</p>
      <p className="text-ink-600 dark:text-parchment-400 text-xs mb-2">Earliest copy: {d.details.earliest}</p>
      <p className="text-ink-600 dark:text-parchment-400 text-xs mb-2">Location: {d.details.location}</p>
      {d.details.note && !d.details.note.startsWith('VERIFY:') && (
        <p className="text-ink-500 dark:text-parchment-500 text-xs italic">{d.details.note}</p>
      )}
      {d.details.link && (
        <a
          href={d.details.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-gold-600 dark:text-gold-400 text-xs underline"
        >
          View institution →
        </a>
      )}
    </div>
  );
}

export default function ManuscriptChart() {
  const [metric, setMetric] = useState<Metric>('manuscripts');

  const data = [...works].sort((a, b) =>
    metric === 'manuscripts' ? b.manuscripts - a.manuscripts : b.gap - a.gap
  );

  return (
    <div className="my-10 rounded-xl border border-parchment-200 dark:border-ink-700 bg-parchment-50 dark:bg-ink-950 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-sans font-semibold text-ink-900 dark:text-parchment-100 text-base">
            Manuscript Evidence Comparison
          </h3>
          <p className="text-xs text-ink-500 dark:text-parchment-500 mt-1 font-sans">
            Hover/tap bars for details and source links
          </p>
        </div>
        <div className="flex gap-2 font-sans">
          <button
            onClick={() => setMetric('manuscripts')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              metric === 'manuscripts'
                ? 'bg-gold-500 text-white dark:bg-gold-600'
                : 'bg-parchment-200 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-300 dark:hover:bg-ink-700'
            }`}
          >
            Manuscript Count
          </button>
          <button
            onClick={() => setMetric('gap')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              metric === 'gap'
                ? 'bg-gold-500 text-white dark:bg-gold-600'
                : 'bg-parchment-200 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-300 dark:hover:bg-ink-700'
            }`}
          >
            Time Gap (years)
          </button>
        </div>
      </div>

      <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e5e0d5"
              className="dark:[stroke:#2a2926]"
            />
            <XAxis
              type="number"
              tickFormatter={metric === 'manuscripts' ? formatManuscripts : (v) => `${v}y`}
              tick={{ fontSize: 11, fontFamily: 'DM Sans, sans-serif', fill: '#747168' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={95}
              tick={{ fontSize: 12, fontFamily: 'DM Sans, sans-serif', fill: '#4d4b44' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212, 168, 32, 0.08)' }} />
            <Bar dataKey={metric} radius={[0, 4, 4, 0]} maxBarSize={32}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
              <LabelList
                dataKey={metric}
                position="right"
                formatter={metric === 'manuscripts' ? formatManuscripts : (v: number) => `${v}y`}
                style={{ fontSize: 11, fontFamily: 'DM Sans, sans-serif', fill: '#747168' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <noscript>
        <table className="w-full text-sm font-sans mt-4">
          <thead>
            <tr className="border-b border-parchment-200 dark:border-ink-700">
              <th className="text-left py-2 text-ink-700 dark:text-parchment-300">Work</th>
              <th className="text-right py-2 text-ink-700 dark:text-parchment-300">Manuscripts</th>
              <th className="text-right py-2 text-ink-700 dark:text-parchment-300">Gap (years)</th>
            </tr>
          </thead>
          <tbody>
            {works.map((w) => (
              <tr key={w.name} className="border-b border-parchment-100 dark:border-ink-800">
                <td className="py-2 text-ink-800 dark:text-parchment-200">{w.details.fullName}</td>
                <td className="py-2 text-right text-ink-600 dark:text-parchment-400">
                  {w.manuscripts.toLocaleString()}
                </td>
                <td className="py-2 text-right text-ink-600 dark:text-parchment-400">~{w.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </noscript>

      <p className="mt-4 text-xs text-ink-400 dark:text-parchment-600 font-sans">
        Sources: INTF Münster (NT counts); Reynolds & Wilson, <em>Scribes and Scholars</em> (classical works);
        Metzger & Ehrman, <em>The Text of the New Testament</em>, 4th ed. (2005).{' '}
        Some classical manuscript counts are approximate (VERIFY against Reynolds &amp; Wilson); see methodology page.
      </p>
    </div>
  );
}
