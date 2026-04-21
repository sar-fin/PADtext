'use client';

import { useState, useCallback } from 'react';
import type { Jar, RemissState } from '@/lib/types';
import { generateFullRemiss } from '@/lib/textGenerator';
import IndicationPanel from '@/components/IndicationPanel';
import JarBuilder from '@/components/JarBuilder';
import JarList from '@/components/JarList';
import PreviewPanel from '@/components/PreviewPanel';

const initialState: RemissState = {
  indications: [],
  findings: [],
  freeText: '',
  jars: [],
};

export default function Home() {
  const [state, setState] = useState<RemissState>(initialState);

  const toggleItem = useCallback((key: 'indications' | 'findings', item: string) => {
    setState((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item],
      };
    });
  }, []);

  const addJar = useCallback((jar: Jar) => {
    setState((prev) => ({ ...prev, jars: [...prev.jars, jar] }));
  }, []);

  const removeJar = useCallback((id: string) => {
    setState((prev) => {
      const jars = prev.jars.filter((j) => j.id !== id);
      return { ...prev, jars: jars.map((j, i) => ({ ...j, jarNumber: i + 1 })) };
    });
  }, []);

  const moveJar = useCallback((id: string, direction: 'up' | 'down') => {
    setState((prev) => {
      const jars = [...prev.jars];
      const idx = jars.findIndex((j) => j.id === id);
      if (idx < 0) return prev;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= jars.length) return prev;
      [jars[idx], jars[swapIdx]] = [jars[swapIdx], jars[idx]];
      const renumbered = jars.map((j, i) => ({ ...j, jarNumber: i + 1 }));
      return { ...prev, jars: renumbered };
    });
  }, []);

  const handleReset = () => setState(initialState);

  const remissText = generateFullRemiss(state);

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title-group">
            <span className="header-badge">PAD</span>
            <h1 className="header-title">Remissgenerator</h1>
            <span className="header-sub">Koloskopi</span>
          </div>
          <button onClick={handleReset} className="reset-btn">
            Nollställ
          </button>
        </div>
      </header>

      <main className="main-grid">
        <div className="left-col">
          <IndicationPanel
            selectedIndications={state.indications}
            selectedFindings={state.findings}
            freeText={state.freeText}
            onToggleIndication={(item) => toggleItem('indications', item)}
            onToggleFinding={(item) => toggleItem('findings', item)}
            onFreeTextChange={(text) => setState((p) => ({ ...p, freeText: text }))}
          />

          <JarBuilder
            nextJarNumber={state.jars.length + 1}
            onAddJar={addJar}
          />

          <JarList
            jars={state.jars}
            onRemove={removeJar}
            onMoveUp={(id) => moveJar(id, 'up')}
            onMoveDown={(id) => moveJar(id, 'down')}
          />
        </div>

        <div className="right-col">
          <PreviewPanel text={remissText} />
        </div>
      </main>
    </div>
  );
}
