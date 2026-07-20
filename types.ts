export type ViewType =
  | 'dashboard'
  | 'plan-form'
  | 'units'
  | 'calendar';

export type SemesterNumber = 1 | 2;

export type CalendarColor =
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'gray';

export interface CalendarMarking {
  id: string;
  date: string;
  label?: string;
  color?: CalendarColor;
  notes?: string;
}

export interface UnitCalendar {
  startDate: string;
  endDate: string;
  markings: CalendarMarking[];
}

export interface KnowledgeTopic {
  id?: string;
  topic: string;
  subtopics: string[];
}

export interface LearningSituation {
  id: string;
  title: string;
  contextualization: string;
  challenge: string;
  expectedResults: string[];
}

export interface RubricLevel {
  nsa: string;
  apo: string;
  par: string;
  aut: string;
}

export interface Rubric {
  id: string;
  capacity: string;
  levels: RubricLevel;
}

export interface ScheduleEntry {
  id: string;
  date: string;
  hours: number;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
}

export interface CurricularUnit {
  id: string;
  code: string;
  name: string;
  semester: SemesterNumber;
  order: number;
  active?: boolean;

  basicCapacities: string[];
  socioemocionalCapacities: string[];
  knowledge: KnowledgeTopic[];

  learningSituations: LearningSituation[];
  rubrics: Rubric[];
  schedule: ScheduleEntry[];
  calendar: UnitCalendar;
}

export interface TeachingPlan {
  id: string;
  profileId: string;
  courseName: string;
  modality: string;
  totalHours: number;
  objective: string;
  methodology: string;
  evaluation: string;
  bibliography: string;
  createdAt: string;
  updatedAt?: string;
  version?: string;
  units: CurricularUnit[];
}

export const createEmptyLearningSituation = (): LearningSituation => ({
  id: crypto.randomUUID(),
  title: 'Nova Situação-Problema',
  contextualization: '',
  challenge: '',
  expectedResults: []
});

export const createEmptyRubric = (): Rubric => ({
  id: crypto.randomUUID(),
  capacity: 'Nova capacidade',
  levels: {
    nsa: '',
    apo: '',
    par: '',
    aut: ''
  }
});

export const createEmptyScheduleEntry = (): ScheduleEntry => ({
  id: crypto.randomUUID(),
  date: '',
  hours: 2,
  capacities: '',
  knowledge: '',
  strategy: '',
  resources: ''
});

export const createEmptyKnowledgeTopic = (): KnowledgeTopic => ({
  id: crypto.randomUUID(),
  topic: 'Novo conhecimento',
  subtopics: []
});
