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
    'Ulcuskontroll',
    'IBD-utredning',
    'Misstänkt malignitet',
  ],
  koloskopi: [
    'Positiv F-Hb',
    'Blod i avföringen',
    'Järnbristanemi',
    'Förändrade avföringsvanor',
    'Buksmärtor',
    'Uppföljning IBD',
    'IBD-utredning',
    'Kontroll efter polypektomi',
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
    'Hiatushernia',
    'Barrett-esofagus',
    'Gastrit',
    'Ventrikelulcus',
    'Duodenalulcus',
    'Erosioner',
    'Polyp',
    'Tumör',
    'Esofagusvaricer',
    'Fundusvaricer',
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
    'Tumör',
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
    'Angulusveck',
    'Antrum + angulusveck',
    'Pylorus',
    'Bulbus duodeni',
    'Pars descendens duodeni',
  ],
  koloskopi: [
    'Rektum',
    'Rektosigmoid',
    'Sigmoideum',
    'Sigmoideum/rektum',
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

/* ── Paketbiopsier ────────────────────────── */
export interface PresetJar {
  anatomicalSegment: string;
  specimenType: SpecimenType;
  label?: string; // optional extra description for the jar
}

export interface PresetPackage {
  id: string;
  label: string;
  description: string;
  procedure: ProcedureType;
  jars: PresetJar[];
}

export const PRESET_PACKAGES: PresetPackage[] = [
  {
    id: 'celiaki',
    label: 'Celiaki',
    description: 'Pars desc. + Bulbus',
    procedure: 'gastroskopi',
    jars: [
      { anatomicalSegment: 'Pars descendens duodeni', specimenType: 'Biopsi' },
      { anatomicalSegment: 'Bulbus duodeni',          specimenType: 'Biopsi' },
    ],
  },
  {
    id: 'atrofisk-gastrit',
    label: 'Atrofisk gastrit',
    description: 'Antrum/angulus + Corpus',
    procedure: 'gastroskopi',
    jars: [
      { anatomicalSegment: 'Antrum + angulusveck', specimenType: 'Biopsi' },
      { anatomicalSegment: 'Corpus',               specimenType: 'Biopsi' },
    ],
  },
  {
    id: 'ibd-1',
    label: 'IBD 1',
    description: 'Ileum + 4 kolonavsnitt',
    procedure: 'koloskopi',
    jars: [
      { anatomicalSegment: 'Terminalt ileum',   specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon ascendens',   specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon transversum', specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon descendens',  specimenType: 'Biopsi' },
      { anatomicalSegment: 'Sigmoideum/rektum', specimenType: 'Biopsi' },
    ],
  },
  {
    id: 'ibd-2',
    label: 'IBD 2',
    description: '4 kolonavsnitt (utan ileum)',
    procedure: 'koloskopi',
    jars: [
      { anatomicalSegment: 'Colon ascendens',   specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon transversum', specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon descendens',  specimenType: 'Biopsi' },
      { anatomicalSegment: 'Sigmoideum/rektum', specimenType: 'Biopsi' },
    ],
  },
  {
    id: 'mikroskopisk-kolit',
    label: 'Mikroskopisk kolit',
    description: 'Ascendens + Descendens',
    procedure: 'koloskopi',
    jars: [
      { anatomicalSegment: 'Colon ascendens',  specimenType: 'Biopsi' },
      { anatomicalSegment: 'Colon descendens', specimenType: 'Biopsi' },
    ],
  },
];

/* ── Procedurnamn (visningstext) ─────────── */
export const PROCEDURE_LABELS: Record<ProcedureType, string> = {
  gastroskopi: 'Gastroskopi',
  koloskopi: 'Koloskopi',
};

/* ── Gemensamma val ───────────────────────── */
export const SPECIMEN_TYPES: SpecimenType[] = [
  'Biopsi',
  'Polypektomi',
];

export const POLYP_MORPHOLOGIES: PolypMorphology[] = [
  'SSL',
  'Adenom',
];

export const COMMON_SIZES: number[] = [2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30];

