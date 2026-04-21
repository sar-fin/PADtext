export type ProcedureType = 'gastroskopi' | 'koloskopi';

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
  procedure: ProcedureType;
  anatomicalSegment: string;
  specimenType: SpecimenType;
  polyp?: PolypDescription;
}

export interface ProcedureState {
  indications: string[];
  findings: string[];
  freeText: string;
}

export interface RemissState {
  activeProcedures: ProcedureType[];
  procedures: Record<ProcedureType, ProcedureState>;
  jars: Jar[];
}
