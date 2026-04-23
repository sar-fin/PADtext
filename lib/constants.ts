import type { ProcedureType, SpecimenType, PolypMorphology, ParisClassification } from './types';

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
    'Erosioner',
    'Ulcerationer',
    'Angiodysplasier',
    'Tumör',
  ],
};

/* ── Anatomiska segment ───────────────────── */
export const ANATOMICAL_SEGMENTS: Record<ProcedureType, string[]> = {
  gastroskopi: [
    'Esofagus proximalt',
    'Esofagus mellersta',
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
    'Ileocekalvalv',
    'Terminala ileum',
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
    id: 'eosinofil-esofagit',
    label: 'Eosinofil esofagit',
    description: 'Distala + mellersta + proximala esofagus',
    procedure: 'gastroskopi',
    jars: [
      { anatomicalSegment: 'Esofagus distalt',   specimenType: 'Biopsi' },
      { anatomicalSegment: 'Esofagus mellersta',  specimenType: 'Biopsi' },
      { anatomicalSegment: 'Esofagus proximalt',  specimenType: 'Biopsi' },
    ],
  },
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
      { anatomicalSegment: 'Terminala ileum',   specimenType: 'Biopsi' },
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
  'Hyperplastisk',
];

export interface ParisOption {
  id: ParisClassification;
  label: string;
  file: string;
  description: string;
}

export const PARIS_OPTIONS: ParisOption[] = [
  { id: 'Ip',       label: 'Ip',       file: '/paris/Ip.png',         description: 'Pedunkulerad' },
  { id: 'Isp',      label: 'Isp',      file: '/paris/Isp.png',        description: 'Subpedunkulerad' },
  { id: 'Is',       label: 'Is',       file: '/paris/Is.png',         description: 'Sessionär' },
  { id: '0-IIa',    label: '0-IIa',    file: '/paris/0IIa.png',       description: 'Lätt upphöjd' },
  { id: '0-IIa+c',  label: '0-IIa+c',  file: '/paris/0IIaplusc.png',  description: 'Upphöjd med central depression' },
  { id: '0-IIa+Is', label: '0-IIa+Is', file: '/paris/0IIaplusIs.png', description: 'Upphöjd med bred nodul' },
  { id: '0-IIb',    label: '0-IIb',    file: '/paris/0IIb.png',       description: 'Plan' },
  { id: '0-IIc',    label: '0-IIc',    file: '/paris/0IIc.png',       description: 'Depression' },
  { id: '0-III',    label: '0-III',    file: '/paris/0III.png',       description: 'Excaverad' },
];

export const COMMON_SIZES: number[] = [2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30];

