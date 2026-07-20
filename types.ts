export type ViewType =
  | 'dashboard'
  | 'plan-form'
  | 'units'
  | 'calendar';

export type SemesterNumber = number;

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
  semester: number;
  markings: CalendarMarking[];
}

export interface KnowledgeTopic {
  id?: string;
  topic: string;
  subtopics: string[];
  notes?: string;
}

export interface LearningSituation {
  id: string;
  title: string;
  contextualization: string;
  challenge: string;
  expectedResults: string[];
  teacherNotes?: string;
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
  description?: string;
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
  lesson?: string;
  completed?: boolean;
}

export interface CurricularUnit {
  id: string;
  code: string;
  name: string;
  description?: string;

  semester: SemesterNumber;
  order: number;
  active: boolean;

  basicCapacities: string[];
  optionalCapacities?: string[];
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
  schoolYear?: number;
  objective: string;
  methodology: string;
  evaluation: string;
  bibliography: string;
  createdAt: string;
  updatedAt?: string;
  version: string;
  units: CurricularUnit[];
}

export const createEmptyLearningSituation = (): LearningSituation => ({
  id: crypto.randomUUID(),
  title: 'Nova Situação-Problema',
  contextualization: '',
  challenge: '',
  expectedResults: [],
  teacherNotes: ''
});

export const createEmptyRubric = (): Rubric => ({
  id: crypto.randomUUID(),
  capacity: 'Nova capacidade',
  description: '',
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
  resources: '',
  lesson: '',
  completed: false
});

export const createEmptyKnowledgeTopic = (): KnowledgeTopic => ({
  id: crypto.randomUUID(),
  topic: 'Novo conhecimento',
  subtopics: [],
  notes: ''
});
