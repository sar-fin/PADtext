'use client';

import { INDICATIONS, MACROSCOPIC_FINDINGS } from '@/lib/constants';

interface Props {
  selectedIndications: string[];
  selectedFindings: string[];
  freeText: string;
  onToggleIndication: (item: string) => void;
  onToggleFinding: (item: string) => void;
  onFreeTextChange: (text: string) => void;
}

export default function IndicationPanel({
  selectedIndications,
  selectedFindings,
  freeText,
  onToggleIndication,
  onToggleFinding,
  onFreeTextChange,
}: Props) {
  return (
    <section className="panel">
      <h2 className="panel-title">Indikation</h2>
      <div className="chip-grid">
        {INDICATIONS.map((item) => (
          <button
            key={item}
            onClick={() => onToggleIndication(item)}
            className={`chip ${selectedIndications.includes(item) ? 'chip--active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <h2 className="panel-title mt-6">Makroskopiska fynd</h2>
      <div className="chip-grid">
        {MACROSCOPIC_FINDINGS.map((item) => (
          <button
            key={item}
            onClick={() => onToggleFinding(item)}
            className={`chip ${selectedFindings.includes(item) ? 'chip--active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <h2 className="panel-title mt-6">Fritext (valfritt)</h2>
      <textarea
        className="freetext-input"
        value={freeText}
        onChange={(e) => onFreeTextChange(e.target.value)}
        placeholder="Lägg till övriga kommentarer…"
        rows={2}
      />
    </section>
  );
}
