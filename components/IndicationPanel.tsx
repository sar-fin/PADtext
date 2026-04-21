'use client';

import type { ProcedureType } from '@/lib/types';
import { INDICATIONS, MACROSCOPIC_FINDINGS, PROCEDURE_LABELS } from '@/lib/constants';

interface Props {
  procedure: ProcedureType;
  selectedIndications: string[];
  selectedFindings: string[];
  freeText: string;
  onToggleIndication: (item: string) => void;
  onToggleFinding: (item: string) => void;
  onFreeTextChange: (text: string) => void;
}

export default function IndicationPanel({
  procedure,
  selectedIndications,
  selectedFindings,
  freeText,
  onToggleIndication,
  onToggleFinding,
  onFreeTextChange,
}: Props) {
  const label = PROCEDURE_LABELS[procedure];

  return (
    <section className={`panel panel--${procedure}`}>
      <div className="panel-proc-header">
        <span className={`proc-badge proc-badge--${procedure}`}>{label}</span>
      </div>

      <h2 className="panel-title">Indikation</h2>
      <div className="chip-grid">
        {INDICATIONS[procedure].map((item) => (
          <button
            key={item}
            onClick={() => onToggleIndication(item)}
            className={`chip ${selectedIndications.includes(item) ? `chip--active chip--active-${procedure}` : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <h2 className="panel-title mt-6">Makroskopiska fynd</h2>
      <div className="chip-grid">
        {MACROSCOPIC_FINDINGS[procedure].map((item) => (
          <button
            key={item}
            onClick={() => onToggleFinding(item)}
            className={`chip ${selectedFindings.includes(item) ? `chip--active chip--active-${procedure}` : ''}`}
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
        placeholder={`Övriga kommentarer för ${label.toLowerCase()}…`}
        rows={2}
      />
    </section>
  );
}

