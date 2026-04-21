'use client';

import { useState } from 'react';

interface Props {
  text: string;
}

export default function PreviewPanel({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="preview-panel">
      <div className="preview-header">
        <h2 className="panel-title">Remisstext</h2>
        <button
          onClick={handleCopy}
          disabled={!text}
          className={`copy-btn ${copied ? 'copy-btn--success' : ''}`}
        >
          {copied ? '✓ Kopierad' : 'Kopiera text'}
        </button>
      </div>
      <pre className="preview-text">
        {text || <span className="preview-placeholder">Välj indikation och fynd ovan för att generera text…</span>}
      </pre>
    </section>
  );
}
