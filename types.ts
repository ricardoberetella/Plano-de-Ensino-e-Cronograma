
export type ViewType = 'dashboard' | 'plano-curso' | 'plano-ensino' | 'cronograma' | 'situacoes' | 'calendario' | 'editor' | 'plano-demonstracao';

export type CalendarColor = 'yellow' | 'green' | 'blue' | 'red' | 'cyan' | 'orange' | 'purple' | 'pink' | 'white' | 'none';

export interface CalendarMarking {
  date: string; // YYYY-MM-DD
  color: CalendarColor;
}

export interface UnitCalendar {
  startDate: string;
  endDate: string;
  markings: CalendarMarking[];
  colorLabels?: Partial<Record<CalendarColor, string>>;
}

export interface RubricRow {
  capacity: string;
  nsa: string;
  apo: string;
  par: string;
  aut: string;
}

export interface ScheduleEntry {
  id: string;
  hours: number;
  date: string;
  capacities: string;
  knowledge: string;
  strategy: string;
  resources: string;
  completed?: boolean;
}

export interface LearningSituation {
  id: string;
  title: string;
  context: string;
  challenge: string;
  expectedResults: string[];
}

export interface CurricularUnit {
  id: string;
  name: string;
  basicCapacities: string[];
  socioemocionalCapacities: string[];
  knowledge: { topic: string; subtopics: string[] }[];
  learningSituations: LearningSituation[];
  rubrics: RubricRow[];
  schedule: ScheduleEntry[];
  calendar?: UnitCalendar;
}

export interface TeachingPlan {
  id: string;
  profileId: string; // Identificador do professor (beretella ou gea)
  courseName: string;
  modality: string;
  totalHours: number;
  objective: string;
  methodology: string;
  evaluation: string;
  bibliography: string;
  units: CurricularUnit[];
  createdAt: string;
  updatedAt?: string;
}
