'use client';

import { useState } from 'react';
import type { ColonSegment, SpecimenType, PolypMorphology, Jar } from '@/lib/types';
import { COLON_SEGMENTS, SPECIMEN_TYPES, POLYP_MORPHOLOGIES, COMMON_SIZES } from '@/lib/constants';

interface Props {
  nextJarNumber: number;
  onAddJar: (jar: Jar) => void;
}

export default function JarBuilder({ nextJarNumber, onAddJar }: Props) {
  const [segment, setSegment] = useState<ColonSegment>('Sigmoideum');
  const [specimenType, setSpecimenType] = useState<SpecimenType>('Biopsi');
  const [hasPolyp, setHasPolyp] = useState(false);
  const [morphology, setMorphology] = useState<PolypMorphology>('Sessil');
  const [sizeMin, setSizeMin] = useState(5);
  const [sizeMax, setSizeMax] = useState<number | undefined>(undefined);
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    const jar: Jar = {
      id: crypto.randomUUID(),
      jarNumber: nextJarNumber,
      colonSegment: segment,
      specimenType,
      polyp: hasPolyp
        ? { morphology, sizeMin, sizeMax: sizeMax && sizeMax > sizeMin ? sizeMax : undefined, count }
        : undefined,
    };
    onAddJar(jar);
    // Reset polyp fields but keep segment/type for quick re-use
    setHasPolyp(false);
    setCount(1);
    setSizeMin(5);
    setSizeMax(undefined);
  };

  return (
    <section className="panel">
      <h2 className="panel-title">Lägg till burk</h2>

      {/* Colon segment */}
      <label className="field-label">Kolonavsnitt</label>
      <div className="chip-grid mb-4">
        {COLON_SEGMENTS.map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className={`chip ${segment === s ? 'chip--active' : ''}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Specimen type */}
      <label className="field-label">Provtyp</label>
      <div className="chip-grid mb-4">
        {SPECIMEN_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => {
              setSpecimenType(t);
              if (t === 'Biopsi') setHasPolyp(false);
              else setHasPolyp(true);
            }}
            className={`chip ${specimenType === t ? 'chip--active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Polyp toggle */}
      <label className="field-label flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={hasPolyp}
          onChange={(e) => setHasPolyp(e.target.checked)}
          className="accent-teal-600 w-4 h-4"
        />
        Polyp inkluderad i provet
      </label>

      {/* Polyp details */}
      {hasPolyp && (
        <div className="polyp-details">
          <label className="field-label mt-3">Morfologi</label>
          <div className="chip-grid mb-3">
            {POLYP_MORPHOLOGIES.map((m) => (
              <button
                key={m}
                onClick={() => setMorphology(m)}
                className={`chip ${morphology === m ? 'chip--active' : ''}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="size-row">
            <div>
              <label className="field-label">Storlek (mm)</label>
              <div className="chip-grid">
                {COMMON_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSizeMin(s)}
                    className={`chip chip--sm ${sizeMin === s ? 'chip--active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={1}
                max={120}
                value={sizeMin}
                onChange={(e) => setSizeMin(Number(e.target.value))}
                className="num-input mt-2"
                placeholder="Min mm"
              />
            </div>
            <div>
              <label className="field-label">Till (valfritt)</label>
              <input
                type="number"
                min={sizeMin + 1}
                max={120}
                value={sizeMax ?? ''}
                onChange={(e) => setSizeMax(e.target.value ? Number(e.target.value) : undefined)}
                className="num-input"
                placeholder="Max mm"
              />
            </div>
            <div>
              <label className="field-label">Antal</label>
              <div className="chip-grid">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`chip chip--sm ${count === n ? 'chip--active' : ''}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="num-input mt-2"
              />
            </div>
          </div>
        </div>
      )}

      <button onClick={handleAdd} className="add-btn mt-5">
        + Lägg till burk {nextJarNumber}
      </button>
    </section>
  );
}
