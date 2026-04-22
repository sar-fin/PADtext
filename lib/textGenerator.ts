import type { RemissState, ProcedureState, ProcedureType, Jar } from './types';
import { PROCEDURE_LABELS } from './constants';

export function generateProcedureText(
  type: ProcedureType,
  state: ProcedureState,
): string {
  const parts: string[] = [];
  const label = PROCEDURE_LABELS[type];

  if (state.indications.length > 0) {
    const indStr = state.indications.join(', ').toLowerCase();
    parts.push(`${label} utförd på indikation ${indStr}.`);
  }

  if (state.findings.length > 0) {
    const findStr = state.findings.join(', ').toLowerCase();
    parts.push(`Makroskopiska fynd: ${findStr}.`);
  } else if (state.indications.length > 0) {
    parts.push('Makroskopiska fynd: i övrigt normal slemhinna.');
  }

  if (state.uceis) {
    const { vascular, bleeding, erosions } = state.uceis;
    const total = vascular + bleeding + erosions;
    parts.push(
      `UCEIS: vascular pattern ${vascular}, bleeding ${bleeding}, erosions and ulcers ${erosions} (total ${total}/8).`
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
    const { morphology, sizeMin, sizeMax, count } = jar.polyp;
    const sizeStr = sizeMax ? `${sizeMin}–${sizeMax} mm` : `${sizeMin} mm`;
    const countStr = count > 1 ? ` (${count} st)` : '';
    parts.push(` ${morphology} polyp${countStr}, ${sizeStr}.`);
  }

  return parts.join('');
}

