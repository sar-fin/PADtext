'use client';

import { useState, useCallback } from 'react';
import type { Jar, ProcedureType, RemissState } from '@/lib/types';
import { generateBroadtext, generateJarText } from '@/lib/textGenerator';
import { PRESET_PACKAGES } from '@/lib/constants';
import ProcedureSelector from '@/components/ProcedureSelector';
import IndicationPanel from '@/components/IndicationPanel';
import JarBuilder from '@/components/JarBuilder';
import JarList from '@/components/JarList';
import PreviewPanel from '@/components/PreviewPanel';
import PresetPackages from '@/components/PresetPackages';

const emptyProcedure = { indications: [], findings: [], findingLocations: {}, freeText: '' };

const initialState: RemissState = {
  activeProcedures: ['koloskopi'],
  procedures: {
    gastroskopi: { ...emptyProcedure },
    koloskopi:   { ...emptyProcedure },
  },
  jars: [],
};

export default function Home() {
  const [state, setState] = useState<RemissState>(initialState);

  const handleProcedureChange = useCallback((active: ProcedureType[]) => {
    setState((prev) => ({
      ...prev,
      activeProcedures: active,
      jars: prev.jars
        .filter((j) => active.includes(j.procedure))
        .map((j, i) => ({ ...j, jarNumber: i + 1 })),
    }));
  }, []);

  const toggleProcedureItem = useCallback(
    (procedure: ProcedureType, key: 'indications' | 'findings', item: string) => {
      setState((prev) => {
        const arr = prev.procedures[procedure][key];
        const isRemoving = arr.includes(item);
        const next = isRemoving ? arr.filter((x) => x !== item) : [...arr, item];
        // Clear location when finding is deselected
        const findingLocations = { ...prev.procedures[procedure].findingLocations };
        if (key === 'findings' && isRemoving) delete findingLocations[item];
        return {
          ...prev,
          procedures: {
            ...prev.procedures,
            [procedure]: {
              ...prev.procedures[procedure],
              [key]: next,
              findingLocations,
            },
          },
        };
      });
    },
    [],
  );

  const toggleFindingLocation = useCallback(
    (procedure: ProcedureType, finding: string, segment: string) => {
      setState((prev) => {
        const current = prev.procedures[procedure].findingLocations[finding] ?? [];
        const next = current.includes(segment)
          ? current.filter((s) => s !== segment)
          : [...current, segment];
        return {
          ...prev,
          procedures: {
            ...prev.procedures,
            [procedure]: {
              ...prev.procedures[procedure],
              findingLocations: {
                ...prev.procedures[procedure].findingLocations,
                [finding]: next,
              },
            },
          },
        };
      });
    },
    [],
  );

  const setProcedureFreeText = useCallback((procedure: ProcedureType, text: string) => {
    setState((prev) => ({
      ...prev,
      procedures: {
        ...prev.procedures,
        [procedure]: { ...prev.procedures[procedure], freeText: text },
      },
    }));
  }, []);

  const addJar = useCallback((jar: Jar) => {
    setState((prev) => ({ ...prev, jars: [...prev.jars, jar] }));
  }, []);

  const addPreset = useCallback((packageId: string) => {
    const pkg = PRESET_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) return;
    setState((prev) => {
      const startNumber = prev.jars.length + 1;
      const newJars: Jar[] = pkg.jars.map((pj, i) => ({
        id: crypto.randomUUID(),
        jarNumber: startNumber + i,
        procedure: pkg.procedure,
        anatomicalSegment: pj.anatomicalSegment,
        specimenType: pj.specimenType,
        polyps: [],
        multipleSmall: false,
      }));
      return { ...prev, jars: [...prev.jars, ...newJars] };
    });
  }, []);

  const removeJar = useCallback((id: string) => {
    setState((prev) => {
      const jars = prev.jars
        .filter((j) => j.id !== id)
        .map((j, i) => ({ ...j, jarNumber: i + 1 }));
      return { ...prev, jars };
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
      return { ...prev, jars: jars.map((j, i) => ({ ...j, jarNumber: i + 1 })) };
    });
  }, []);

  const setUceis = useCallback((procedure: ProcedureType, uceis: import('@/lib/types').UceisScore | undefined) => {
    setState((prev) => ({
      ...prev,
      procedures: {
        ...prev.procedures,
        [procedure]: { ...prev.procedures[procedure], uceis },
      },
    }));
  }, []);

  const handleReset = () => setState(initialState);

  const broadtext = generateBroadtext(state);
  const jartext   = state.jars.map(generateJarText).join('\n');
  const showBadge = state.activeProcedures.length > 1;

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title-group">
            <span className="header-badge">PAD</span>
            <h1 className="header-title">Remissgenerator</h1>
          </div>
          <div className="header-right">
            <ProcedureSelector
              active={state.activeProcedures}
              onChange={handleProcedureChange}
            />
            <button onClick={handleReset} className="reset-btn">
              Nollställ
            </button>
          </div>
        </div>
      </header>

      <main className="main-grid">
        <div className="left-col">
          {state.activeProcedures.map((p) => (
            <IndicationPanel
              key={p}
              procedure={p}
              selectedIndications={state.procedures[p].indications}
              selectedFindings={state.procedures[p].findings}
              findingLocations={state.procedures[p].findingLocations}
              freeText={state.procedures[p].freeText}
              uceis={state.procedures[p].uceis}
              onToggleIndication={(item) => toggleProcedureItem(p, 'indications', item)}
              onToggleFinding={(item) => toggleProcedureItem(p, 'findings', item)}
              onToggleFindingLocation={(finding, segment) => toggleFindingLocation(p, finding, segment)}
              onFreeTextChange={(text) => setProcedureFreeText(p, text)}
              onUceisChange={(score) => setUceis(p, score)}
            />
          ))}

          <PresetPackages
            activeProcedures={state.activeProcedures}
            nextJarNumber={state.jars.length + 1}
            onAddPreset={addPreset}
          />

          <JarBuilder
            activeProcedures={state.activeProcedures}
            nextJarNumber={state.jars.length + 1}
            onAddJar={addJar}
          />

          <JarList
            jars={state.jars}
            showProcedureBadge={showBadge}
            onRemove={removeJar}
            onMoveUp={(id) => moveJar(id, 'up')}
            onMoveDown={(id) => moveJar(id, 'down')}
          />
        </div>

        <div className="right-col">
          <PreviewPanel broadtext={broadtext} jartext={jartext} />
        </div>
      </main>
    </div>
  );
}
