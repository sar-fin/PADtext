import type { RemissState, ProcedureState, ProcedureType, Jar } from './types';
import { PROCEDURE_LABELS, LOCALIZABLE_FINDINGS } from './constants';

function formatLocations(segments: string[]): string {
  if (segments.length === 0) return '';
  if (segments.length === 1) return ` i ${segments[0].toLowerCase()}`;
  const last = segments[segments.length - 1];
  const rest = segments.slice(0, -1);
  return ` i ${rest.map((s) => s.toLowerCase()).join(', ')} och ${last.toLowerCase()}`;
}

export function generateProcedureText(
  type: ProcedureType,
  state: ProcedureState,
): string {
  const parts: string[] = [];
  const label = PROCEDURE_LABELS[type];

  if (state.indications.length > 0) {
    const indStr = state.indications.join(', ').toLowerCase();
    parts.push(`${label} pga ${indStr}.`);
  }

  if (state.findings.length > 0) {
    const findStr = state.findings.map((f) => {
      const locs = state.findingLocations[f] ?? [];
      const locSuffix = LOCALIZABLE_FINDINGS.has(f) && locs.length > 0
        ? formatLocations(locs)
        : '';
      return `${f}${locSuffix}`;
    }).join(', ');
    parts.push(`${findStr}.`);
  } else if (state.indications.length > 0) {
    parts.push('I övrigt normal slemhinna.');
  }

  if (state.uceis) {
    const { vascular, bleeding, erosions } = state.uceis;
    const total = vascular + bleeding + erosions;
    parts.push(
      `UCEIS ${total}: kärl ${vascular}, blödning ${bleeding}, sår ${erosions}.`
    );
  }

  if (state.freeText.trim()) {
    parts.push(state.freeText.trim());
  }

  return parts.join(' ');
}

export function generateBroadtext(state: RemissState): string {
  return state.activeProcedures
    .map((p) => generateProcedureText(p, state.procedures[p]))
    .filter(Boolean)
    .join('\n\n');
}

export function generateJarText(jar: Jar): string {
  const parts: string[] = [
    `Burk ${jar.jarNumber}: ${jar.anatomicalSegment}, ${jar.specimenType.toLowerCase()}.`,
  ];

  if (jar.polyp) {
    const { morphology, paris, sizeMin, sizeMax, count } = jar.polyp;
    const sizeStr = sizeMax ? `${sizeMin}–${sizeMax} mm` : `${sizeMin} mm`;
    const countStr = count > 1 ? ` (${count} st)` : '';
    const parisStr = paris ? ` Paris ${paris}.` : '';
    parts.push(` ${morphology} polyp${countStr}, ${sizeStr}.${parisStr}`);
  }

  return parts.join('');
}

