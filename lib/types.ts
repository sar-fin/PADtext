export type ColonSegment =
  | 'Rektum'
  | 'Rektosigmoid'
  | 'Sigmoideum'
  | 'Colon descendens'
  | 'Vänster flexur'
  | 'Colon transversum'
  | 'Höger flexur'
  | 'Colon ascendens'
  | 'Cekum'
  | 'Ileocekalklaff'
  | 'Terminalt ileum';

export type SpecimenType =
  | 'Biopsi'
  | 'Polypektomi'
  | 'EMR'
  | 'Piecemeal polypektomi';

export type PolypMorphology =
  | 'Sessil'
  | 'Pedunkulerad'
  | 'Flat/plan'
  | 'Serrated';

export interface PolypDescription {
  morphology: PolypMorphology;
  sizeMin: number;
  sizeMax?: number;
  count: number;
}

export interface Jar {
  id: string;
  jarNumber: number;
  colonSegment: ColonSegment;
  specimenType: SpecimenType;
  polyp?: PolypDescription;
}

export interface RemissState {
  indications: string[];
  findings: string[];
  freeText: string;
  jars: Jar[];
}
