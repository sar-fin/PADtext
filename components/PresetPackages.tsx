'use client';

import type { ProcedureType } from '@/lib/types';
import { PRESET_PACKAGES } from '@/lib/constants';

interface Props {
  activeProcedures: ProcedureType[];
  nextJarNumber: number;
  onAddPreset: (packageId: string) => void;
}

export default function PresetPackages({ activeProcedures, nextJarNumber, onAddPreset }: Props) {
  const visible = PRESET_PACKAGES.filter((p) => activeProcedures.includes(p.procedure));
  if (visible.length === 0) return null;

  return (
    <section className="panel">
      <h2 className="panel-title">Paketbiopsier</h2>
      <p className="preset-hint">
        Lägger till färdiga burkkombinationer från burk {nextJarNumber}.
      </p>
      <div className="preset-grid">
        {visible.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => onAddPreset(pkg.id)}
            className={`preset-btn preset-btn--${pkg.procedure}`}
          >
            <span className="preset-btn-label">{pkg.label}</span>
            <span className="preset-btn-desc">
              {pkg.jars.map((j) => j.anatomicalSegment).join(' · ')}
            </span>
            <span className="preset-btn-count">
              {pkg.jars.length} burkar
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
