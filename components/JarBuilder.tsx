'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type {
  ProcedureType,
  SpecimenType,
  PolypMorphology,
  ParisClassification,
  PolypDescription,
  Jar,
} from '@/lib/types';
import {
  ANATOMICAL_SEGMENTS,
  SPECIMEN_TYPES,
  POLYP_MORPHOLOGIES,
  PARIS_OPTIONS,
  COMMON_SIZES,
  PROCEDURE_LABELS,
} from '@/lib/constants';

interface Props {
  activeProcedures: ProcedureType[];
  nextJarNumber: number;
  onAddJar: (jar: Jar) => void;
}

function emptyPolyp(): PolypDescription {
  return { morphology: 'SSL', paris: undefined, sizeMin: 5, sizeMax: undefined, count: 1 };
}

interface PolypFormProps {
  polyp: PolypDescription;
  procedure: ProcedureType;
  index: number;
  total: number;
  onChange: (updated: PolypDescription) => void;
  onRemove: () => void;
}

function PolypForm({ polyp, procedure, index, total, onChange, onRemove }: PolypFormProps) {
  return (
    <div className="polyp-form">
      <div className="polyp-form-header">
        <span className="polyp-form-title">Polyp {index + 1}</span>
        {total > 1 && (
          <button className="polyp-remove-btn" onClick={onRemove} aria-label="Ta bort polyp">
            ×
          </button>
        )}
      </div>

      {/* Morfologi */}
      <label className="field-label">Morfologi</label>
      <div className="chip-grid mb-3">
        {POLYP_MORPHOLOGIES.map((m) => (
          <button
            key={m}
            onClick={() => onChange({ ...polyp, morphology: m })}
            className={`chip ${polyp.morphology === m ? `chip--active chip--active-${procedure}` : ''}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Paris */}
      <label className="field-label">
        Paris-klassifikation
        <span className="field-label-optional"> — valfri</span>
      </label>
      <div className="paris-grid">
        {PARIS_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange({ ...polyp, paris: polyp.paris === opt.id ? undefined : opt.id })}
            className={`paris-tile ${polyp.paris === opt.id ? `paris-tile--active paris-tile--active-${procedure}` : ''}`}
            title={opt.description}
          >
            <Image
              src={opt.file}
              alt={opt.description}
              width={120}
              height={65}
              className="paris-tile-img"
            />
            <span className="paris-tile-label">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Storlek + antal */}
      <div className="size-row">
        <div>
          <label className="field-label">Storlek (mm)</label>
          <div className="chip-grid">
            {COMMON_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => onChange({ ...polyp, sizeMin: s })}
                className={`chip chip--sm ${polyp.sizeMin === s ? `chip--active chip--active-${procedure}` : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1}
            max={120}
            value={polyp.sizeMin}
            onChange={(e) => onChange({ ...polyp, sizeMin: Number(e.target.value) })}
            className="num-input mt-2"
          />
        </div>
        <div>
          <label className="field-label">Max (valfritt)</label>
          <input
            type="number"
            min={polyp.sizeMin + 1}
            max={120}
            value={polyp.sizeMax ?? ''}
            onChange={(e) =>
              onChange({ ...polyp, sizeMax: e.target.value ? Number(e.target.value) : undefined })
            }
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
                onClick={() => onChange({ ...polyp, count: n })}
                className={`chip chip--sm ${polyp.count === n ? `chip--active chip--active-${procedure}` : ''}`}
              >
                {n}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1}
            value={polyp.count}
            onChange={(e) => onChange({ ...polyp, count: Number(e.target.value) })}
            className="num-input mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default function JarBuilder({ activeProcedures, nextJarNumber, onAddJar }: Props) {
  const [procedure, setProcedure] = useState<ProcedureType>(activeProcedures[0]);
  const [segment, setSegment] = useState<string>(ANATOMICAL_SEGMENTS[activeProcedures[0]][0]);
  const [specimenType, setSpecimenType] = useState<SpecimenType>('Biopsi');
  const [polyps, setPolyps] = useState<PolypDescription[]>([]);
  const [multipleSmall, setMultipleSmall] = useState(false);

  useEffect(() => {
    if (!activeProcedures.includes(procedure)) {
      setProcedure(activeProcedures[0]);
      setSegment(ANATOMICAL_SEGMENTS[activeProcedures[0]][0]);
    }
  }, [activeProcedures, procedure]);

  const handleProcedureSwitch = (p: ProcedureType) => {
    setProcedure(p);
    setSegment(ANATOMICAL_SEGMENTS[p][0]);
  };

  const handleSpecimenType = (t: SpecimenType) => {
    setSpecimenType(t);
    // Auto-add first polyp when switching to Polypektomi
    if (t === 'Polypektomi' && polyps.length === 0) {
      setPolyps([emptyPolyp()]);
    }
    if (t === 'Biopsi') {
      setPolyps([]);
      setMultipleSmall(false);
    }
  };

  const updatePolyp = (index: number, updated: PolypDescription) => {
    setPolyps((prev) => prev.map((p, i) => (i === index ? updated : p)));
  };

  const removePolyp = (index: number) => {
    setPolyps((prev) => prev.filter((_, i) => i !== index));
  };

  const addPolyp = () => {
    setPolyps((prev) => [...prev, emptyPolyp()]);
  };

  const handleAdd = () => {
    const jar: Jar = {
      id: crypto.randomUUID(),
      jarNumber: nextJarNumber,
      procedure,
      anatomicalSegment: segment,
      specimenType,
      polyps,
      multipleSmall,
    };
    onAddJar(jar);
    // Reset polyp state but keep segment/procedure
    setPolyps([]);
    setMultipleSmall(false);
    setSpecimenType('Biopsi');
  };

  const segments = ANATOMICAL_SEGMENTS[procedure];
  const hasPolypContent = polyps.length > 0 || multipleSmall;

  return (
    <section className="panel">
      <h2 className="panel-title">Lägg till burk</h2>

      {activeProcedures.length > 1 && (
        <div className="jar-proc-toggle">
          {activeProcedures.map((p) => (
            <button
              key={p}
              onClick={() => handleProcedureSwitch(p)}
              className={`jar-proc-btn ${procedure === p ? `jar-proc-btn--active jar-proc-btn--${p}` : ''}`}
            >
              {PROCEDURE_LABELS[p]}
            </button>
          ))}
        </div>
      )}

      {/* Segment */}
      <label className="field-label">
        {procedure === 'gastroskopi' ? 'Lokalisation' : 'Kolonavsnitt'}
      </label>
      <div className="chip-grid mb-4">
        {segments.map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className={`chip ${segment === s ? `chip--active chip--active-${procedure}` : ''}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Provtyp */}
      <label className="field-label">Provtyp</label>
      <div className="chip-grid mb-4">
        {SPECIMEN_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => handleSpecimenType(t)}
            className={`chip ${specimenType === t ? `chip--active chip--active-${procedure}` : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Polypsektion — bara vid Polypektomi */}
      {specimenType === 'Polypektomi' && (
        <div className="polyp-section">
          {/* Specificerade polyper */}
          {polyps.map((polyp, i) => (
            <PolypForm
              key={i}
              polyp={polyp}
              procedure={procedure}
              index={i}
              total={polyps.length}
              onChange={(updated) => updatePolyp(i, updated)}
              onRemove={() => removePolyp(i)}
            />
          ))}

          {/* Knappar */}
          <div className="polyp-actions">
            <button
              className={`polyp-add-btn polyp-add-btn--${procedure}`}
              onClick={addPolyp}
            >
              + Lägg till {polyps.length === 0 ? 'polyp' : 'ytterligare polyp'}
            </button>
            <button
              onClick={() => setMultipleSmall((v) => !v)}
              className={`chip ${multipleSmall ? `chip--active chip--active-${procedure}` : ''}`}
            >
              Flera mindre polyper
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={specimenType === 'Polypektomi' && !hasPolypContent}
        className={`add-btn add-btn--${procedure} mt-5`}
      >
        + Lägg till burk {nextJarNumber}
      </button>
    </section>
  );
}
