import type { ProcedureType, SpecimenType, PolypMorphology } from './types';

/* ── Indikationer ─────────────────────────── */
export const INDICATIONS: Record<ProcedureType, string[]> = {
  gastroskopi: [
    'Dyspepsi',
    'Reflux/halsbränna',
    'Dysfagi',
    'Järnbristanemi',
    'Melena',
    'Uppföljning esofagit',
    'Barrett-kontroll',
    'Celiakiutredning',
    'H. pylori-kontroll',
    'Misstänkt malignitet',
  ],
  koloskopi: [
    'Positiv F-Hb',
    'Blod i avföringen',
    'Järnbristanemi',
    'Förändrade avföringsvanor',
    'Buksmärtor',
    'Uppföljning IBD',
    'Kontroll efter polypektomi',
    'Familjär kolorektalcancer',
    'Screening',
  ],
};

/* ── Makroskopiska fynd ───────────────────── */
export const MACROSCOPIC_FINDINGS: Record<ProcedureType, string[]> = {
  gastroskopi: [
    'Normal slemhinna',
    'Esofagit grad A',
    'Esofagit grad B',
    'Esofagit grad C',
    'Esofagit grad D',
    'Hiatus hernia',
    'Barrett-esofagus',
    'Gastrit',
    'Gastrisk ulcus',
    'Duodenal ulcus',
    'Erosioner',
    'Polyp',
    'Varices',
    'Angiodysplasier',
  ],
  koloskopi: [
    'Normal slemhinna',
    'Divertiklar',
    'Hemorrojder',
    'Erytematös slemhinna',
    'Erosioner',
    'Ulcerationer',
    'Angiodysplasier',
    'Melanosis coli',
  ],
};

/* ── Anatomiska segment ───────────────────── */
export const ANATOMICAL_SEGMENTS: Record<ProcedureType, string[]> = {
  gastroskopi: [
    'Esofagus proximalt',
    'Esofagus distalt',
    'GEJ',
    'Cardia',
    'Fundus',
    'Corpus',
    'Antrum',
    'Pylorus',
    'Bulbus duodeni',
    'Pars descendens duodeni',
  ],
  koloskopi: [
    'Rektum',
    'Rektosigmoid',
    'Sigmoideum',
    'Colon descendens',
    'Vänster flexur',
    'Colon transversum',
    'Höger flexur',
    'Colon ascendens',
    'Cekum',
    'Ileocekalklaff',
    'Terminalt ileum',
  ],
};

/* ── Procedurnamn (visningstext) ─────────── */
export const PROCEDURE_LABELS: Record<ProcedureType, string> = {
  gastroskopi: 'Gastroskopi',
  koloskopi: 'Koloskopi',
};

/* ── Gemensamma val ───────────────────────── */
export const SPECIMEN_TYPES: SpecimenType[] = [
  'Biopsi',
  'Polypektomi',
  'EMR',
  'Piecemeal polypektomi',
];

export const POLYP_MORPHOLOGIES: PolypMorphology[] = [
  'Sessil',
  'Pedunkulerad',
  'Flat/plan',
  'Serrated',
];

export const COMMON_SIZES: number[] = [2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30];

