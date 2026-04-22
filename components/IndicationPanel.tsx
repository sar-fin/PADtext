'use client';

import { useState } from 'react';
import type { ProcedureType, UceisScore } from '@/lib/types';
import { INDICATIONS, MACROSCOPIC_FINDINGS, PROCEDURE_LABELS } from '@/lib/constants';

interface Props {
  procedure: ProcedureType;
  selectedIndications: string[];
  selectedFindings: string[];
  freeText: string;
  uceis?: UceisScore;
  onToggleIndication: (item: string) => void;
  onToggleFinding: (item: string) => void;
  onFreeTextChange: (text: string) => void;
  onUceisChange: (score: UceisScore | undefined) => void;
}

const UCEIS_VASCULAR: { label: string; value: 0 | 1 | 2 }[] = [
  { label: '0 – Normal', value: 0 },
  { label: '1 – Patchy obliteration', value: 1 },
  { label: '2 – Obliterated', value: 2 },
];

const UCEIS_BLEEDING: { label: string; value: 0 | 1 | 2 | 3 }[] = [
  { label: '0 – None', value: 0 },
  { label: '1 – Mucosal', value: 1 },
  { label: '2 – Luminal mild', value: 2 },
  { label: '3 – Luminal moderate or severe', value: 3 },
];

const UCEIS_EROSIONS: { label: string; value: 0 | 1 | 2 | 3 }[] = [
  { label: '0 – None', value: 0 },
  { label: '1 – Erosion', value: 1 },
  { label: '2 – Superficial ulcer', value: 2 },
  { label: '3 – Deep ulcer', value: 3 },
];

export default function IndicationPanel({
  procedure,
  selectedIndications,
  selectedFindings,
  freeText,
  uceis,
  onToggleIndication,
  onToggleFinding,
  onFreeTextChange,
  onUceisChange,
}: Props) {
  const label = PROCEDURE_LABELS[procedure];
  const [uceisOpen, setUceisOpen] = useState(false);

  const handleUceisToggle = () => {
    if (uceisOpen) {
      setUceisOpen(false);
      onUceisChange(undefined);
    } else {
      setUceisOpen(true);
      onUceisChange({ vascular: 0, bleeding: 0, erosions: 0 });
    }
  };

  const updateUceis = (field: keyof UceisScore, value: number) => {
    if (!uceis) return;
    onUceisChange({ ...uceis, [field]: value });
  };

  const uceisTotal = uceis ? uceis.vascular + uceis.bleeding + uceis.erosions : 0;

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

        {procedure === 'koloskopi' && (
          <button
            onClick={handleUceisToggle}
            className={`chip ${uceisOpen ? `chip--active chip--active-${procedure}` : ''}`}
          >
            UCEIS{uceisOpen ? ` (${uceisTotal}/8)` : ''}
          </button>
        )}
      </div>

      {uceisOpen && uceis && (
        <div className="uceis-panel">
          <div className="uceis-section">
            <span className="uceis-label">Vascular pattern</span>
            <div className="chip-grid">
              {UCEIS_VASCULAR.map(({ label: l, value }) => (
                <button
                  key={value}
                  onClick={() => updateUceis('vascular', value)}
                  className={`chip chip--sm ${uceis.vascular === value ? `chip--active chip--active-${procedure}` : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="uceis-section">
            <span className="uceis-label">Bleeding</span>
            <div className="chip-grid">
              {UCEIS_BLEEDING.map(({ label: l, value }) => (
                <button
                  key={value}
                  onClick={() => updateUceis('bleeding', value)}
                  className={`chip chip--sm ${uceis.bleeding === value ? `chip--active chip--active-${procedure}` : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="uceis-section">
            <span className="uceis-label">Erosions and ulcers</span>
            <div className="chip-grid">
              {UCEIS_EROSIONS.map(({ label: l, value }) => (
                <button
                  key={value}
                  onClick={() => updateUceis('erosions', value)}
                  className={`chip chip--sm ${uceis.erosions === value ? `chip--active chip--active-${procedure}` : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="uceis-total">
            Totalt: <strong>{uceisTotal}/8</strong>
            {uceisTotal <= 2 && <span className="uceis-severity uceis-severity--mild"> — Mild</span>}
            {uceisTotal >= 3 && uceisTotal <= 4 && <span className="uceis-severity uceis-severity--moderate"> — Moderate</span>}
            {uceisTotal >= 5 && <span className="uceis-severity uceis-severity--severe"> — Severe</span>}
          </div>
        </div>
      )}

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
