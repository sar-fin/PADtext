'use client';

import { useState } from 'react';

interface Props {
  broadtext: string;
  jartext: string;
}

type CopyTarget = 'broad' | 'jars' | null;

export default function PreviewPanel({ broadtext, jartext }: Props) {
  const [copied, setCopied] = useState<CopyTarget>(null);

  const handleCopy = async (target: 'broad' | 'jars') => {
    const text = target === 'broad' ? broadtext : jartext;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(target);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="preview-panel">
      <h2 className="panel-title preview-panel-title">Remisstext</h2>

      <div className="preview-block">
        <div className="preview-block-header">
          <span className="preview-block-label">Brödtext</span>
          <button
            onClick={() => handleCopy('broad')}
            disabled={!broadtext}
            className={`copy-btn ${copied === 'broad' ? 'copy-btn--success' : ''}`}
          >
            {copied === 'broad' ? '✓ Kopierad' : 'Kopiera'}
          </button>
        </div>
        <pre className="preview-text">
          {broadtext || <span className="preview-placeholder">Välj indikation och fynd för att generera text…</span>}
        </pre>
      </div>

      <div className="preview-block preview-block--jars">
        <div className="preview-block-header">
          <span className="preview-block-label">Burkförteckning</span>
          <button
            onClick={() => handleCopy('jars')}
            disabled={!jartext}
            className={`copy-btn ${copied === 'jars' ? 'copy-btn--success' : ''}`}
          >
            {copied === 'jars' ? '✓ Kopierad' : 'Kopiera'}
          </button>
        </div>
        <pre className="preview-text">
          {jartext || <span className="preview-placeholder">Lägg till burkar för att generera förteckning…</span>}
        </pre>
      </div>
    </section>
  );
}
