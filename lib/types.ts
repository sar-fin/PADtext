export type ProcedureType = 'gastroskopi' | 'koloskopi';

export type SpecimenType =
  | 'Biopsi'
  | 'Polypektomi';

export type PolypMorphology =
  | 'SSL'
  | 'Adenom'
  | 'HP';

export type ParisClassification =
  | 'Ip'
  | 'Isp'
  | 'Is'
  | '0-IIa'
  | '0-IIa+c'
  | '0-IIa+Is'
  | '0-IIb'
  | '0-IIc'
  | '0-III';

export interface UceisScore {
  vascular: 0 | 1 | 2;
  bleeding: 0 | 1 | 2 | 3;
  erosions: 0 | 1 | 2 | 3;
}

export interface PolypDescription {
  morphology: PolypMorphology;
  paris?: ParisClassification;
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
  uceis?: UceisScore;
}

export interface RemissState {
  activeProcedures: ProcedureType[];
  procedures: Record<ProcedureType, ProcedureState>;
  jars: Jar[];
}
