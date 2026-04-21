'use client';

import type { ProcedureType } from '@/lib/types';

interface Props {
  active: ProcedureType[];
  onChange: (active: ProcedureType[]) => void;
}

const PROCEDURES: { value: ProcedureType; label: string; icon: string }[] = [
  { value: 'gastroskopi', label: 'Gastroskopi', icon: '◉' },
  { value: 'koloskopi',   label: 'Koloskopi',   icon: '◎' },
];

export default function ProcedureSelector({ active, onChange }: Props) {
  const toggle = (p: ProcedureType) => {
    if (active.includes(p)) {
      // Don't allow deselecting the last one
      if (active.length === 1) return;
      onChange(active.filter((x) => x !== p));
    } else {
      // Preserve order: gastro before koloskopi
      const order: ProcedureType[] = ['gastroskopi', 'koloskopi'];
      onChange(order.filter((x) => x === p || active.includes(x)));
    }
  };

  return (
    <div className="proc-selector">
      <span className="proc-selector-label">Undersökning</span>
      <div className="proc-toggle-group">
        {PROCEDURES.map(({ value, label, icon }) => {
          const isActive = active.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              className={`proc-btn ${isActive ? `proc-btn--active proc-btn--${value}` : ''}`}
              aria-pressed={isActive}
            >
              <span className="proc-btn-icon">{icon}</span>
              {label}
              {isActive && active.length > 1 && (
                <span className="proc-btn-check">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
