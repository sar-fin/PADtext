'use client';

import { useState } from 'react';

interface Props {
  broadtext: string;
  jartext: string;
}

export default function PreviewPanel({ broadtext, jartext }: Props) {
  const [copied, setCopied] = useState(false);

  const fullText = [broadtext, jartext].filter(Boolean).join('\n\n');

  const handleCopy = async () => {
    if (!fullText) return;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="preview-panel">
      <div className="preview-block-header">
        <h2 className="panel-title preview-panel-title">Remisstext</h2>
        <button
          onClick={handleCopy}
          disabled={!fullText}
          className={`copy-btn ${copied ? 'copy-btn--success' : ''}`}
        >
          {copied ? '✓ Kopierad' : 'Kopiera'}
        </button>
      </div>

      <pre className="preview-text">
        {fullText || <span className="preview-placeholder">Välj indikation och fynd för att generera text…</span>}
      </pre>
    </section>
  );
}
