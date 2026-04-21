import type { RemissState, Jar } from './types';

export function generateBroadtext(state: RemissState): string {
  const parts: string[] = [];

  if (state.indications.length > 0) {
    const indStr = state.indications.join(', ').toLowerCase();
    parts.push(`Koloskopi utförd på indikation ${indStr}.`);
  }

  if (state.findings.length > 0) {
    const findStr = state.findings.join(', ').toLowerCase();
    parts.push(`Makroskopiska fynd: ${findStr}.`);
  } else if (state.indications.length > 0) {
    parts.push('Makroskopiska fynd: i övrigt normal slemhinna.');
  }

  if (state.freeText.trim()) {
    parts.push(state.freeText.trim());
  }

  return parts.join(' ');
}

export function generateJarText(jar: Jar): string {
  const parts: string[] = [`Burk ${jar.jarNumber}: ${jar.colonSegment}, ${jar.specimenType.toLowerCase()}.`];

  if (jar.polyp) {
    const { morphology, sizeMin, sizeMax, count } = jar.polyp;
    const sizeStr = sizeMax ? `${sizeMin}–${sizeMax} mm` : `${sizeMin} mm`;
    const countStr = count > 1 ? ` (${count} st)` : '';
    parts.push(` ${morphology} polyp${countStr}, ${sizeStr}.`);
  }

  return parts.join('');
}

export function generateFullRemiss(state: RemissState): string {
  const broadtext = generateBroadtext(state);
  const jarLines = state.jars.map(generateJarText);

  if (broadtext && jarLines.length > 0) {
    return broadtext + '\n\n' + jarLines.join('\n');
  }
  if (broadtext) return broadtext;
  if (jarLines.length > 0) return jarLines.join('\n');
  return '';
}
