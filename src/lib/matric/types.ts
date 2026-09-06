export type ClassLevel = "9" | "10";
export type EducationLevel = "matric" | "intermediate" | "university";
export type SubjectGroup = "science" | "arts" | "computer_science" | "compulsory";
export type ExamType = "annual" | "supplementary" | "improvement";
export type CandidateType = "regular" | "private";

export interface Province {
  name: string;
  slug: string;
  abbreviation: string;
}

export interface MarksBreakdown {
  total: number;
  theory: number;
  practical: number;
  passing: number;
  passing_percentage: number;
}

export interface GradingGrade {
  grade: string;
  label: string;
  min_percentage: number;
  max_percentage: number;
  min_marks: number;
  max_marks: number;
}

export interface GradingSystem {
  name: string;
  grades: GradingGrade[];
}

export interface Board {
  name: string;
  slug: string;
  short_name: string;
  province: Province;
  city: string;
  jurisdiction: string[];
  official_website: string;
  established: number;
  grading_system: GradingSystem;
  total_marks: MarksBreakdown;
  has_practical: boolean;
  description: string;
  meta_title: string;
  meta_description: string;
}

export interface Subject {
  name: string;
  slug: string;
  code: string;
  class_level: ClassLevel;
  group: SubjectGroup;
  is_compulsory: boolean;
  marks: MarksBreakdown;
  chapters: number;
  has_practical: boolean;
  board_specific: boolean;
  applicable_boards: string[] | "all";
  description: string;
  meta_title: string;
  meta_description: string;
}

export interface ClassSubjectCombination {
  class_level: ClassLevel;
  group: SubjectGroup;
  subjects: string[]; // subject slugs
  total_marks: number;
  description: string;
}

export interface MatricInformation {
  title: string;
  slug: string;
  content: string;
  last_updated: string;
}

export interface BoardPageSection {
  title: string;
  slug: string;
  description: string;
}
