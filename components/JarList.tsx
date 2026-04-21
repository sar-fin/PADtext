'use client';

import type { Jar } from '@/lib/types';
import { generateJarText, } from '@/lib/textGenerator';
import { PROCEDURE_LABELS } from '@/lib/constants';

interface Props {
  jars: Jar[];
  showProcedureBadge: boolean;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function JarList({ jars, showProcedureBadge, onRemove, onMoveUp, onMoveDown }: Props) {
  if (jars.length === 0) return null;

  return (
    <section className="panel">
      <h2 className="panel-title">Burkar ({jars.length})</h2>
      <ol className="jar-list">
        {jars.map((jar, idx) => (
          <li key={jar.id} className="jar-item">
            <span className="jar-number">{jar.jarNumber}</span>
            <span className="jar-text">
              {showProcedureBadge && (
                <span className={`jar-proc-badge jar-proc-badge--${jar.procedure}`}>
                  {PROCEDURE_LABELS[jar.procedure].slice(0, 6)}
                </span>
              )}
              {generateJarText(jar)}
            </span>
            <span className="jar-actions">
              <button
                onClick={() => onMoveUp(jar.id)}
                disabled={idx === 0}
                className="icon-btn"
                title="Flytta upp"
              >
                ↑
              </button>
              <button
                onClick={() => onMoveDown(jar.id)}
                disabled={idx === jars.length - 1}
                className="icon-btn"
                title="Flytta ner"
              >
                ↓
              </button>
              <button
                onClick={() => onRemove(jar.id)}
                className="icon-btn icon-btn--danger"
                title="Ta bort"
              >
                ×
              </button>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

