import type { ColonSegment, SpecimenType, PolypMorphology } from './types';

export const INDICATIONS: string[] = [
  'Positiv F-Hb',
  'Blod i avföringen',
  'Järnbristanemi',
  'Förändrade avföringsvanor',
  'Buksmärtor',
  'Uppföljning IBD',
  'Kontroll efter polypektomi',
  'Familjär kolorektalcancer',
  'Screening',
];

export const MACROSCOPIC_FINDINGS: string[] = [
  'Normal slemhinna',
  'Divertiklar',
  'Hemorrojder',
  'Erytematös slemhinna',
  'Erosioner',
  'Ulcerationer',
  'Angiodysplasier',
  'Melanosis coli',
];

export const COLON_SEGMENTS: ColonSegment[] = [
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
];

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
