export type IntermediateClass = "11" | "12";

export type IntermediateGroupSlug =
  | "fsc-pre-medical"
  | "fsc-pre-engineering"
  | "ics"
  | "fa"
  | "icom"
  | "general-science"
  | "home-economics"
  | "other";

export interface IntermediateGroup {
  name: string;
  slug: IntermediateGroupSlug;
  shortName: string;
  description: string;
  fullDescription: string;
  classLevel: IntermediateClass[];
  compulsorySubjects: string[];
  electiveSubjects: string[];
  careerPaths: string[];
  eligibleDegrees: string[];
  icon: string;
  color: string;
  metaTitle: string;
  metaDescription: string;
}

export interface IntermediateSubject {
  name: string;
  slug: string;
  code: string;
  classLevel: IntermediateClass;
  group: IntermediateGroupSlug[];
  marks: { total: number; theory: number; practical: number; passing: number; passingPercentage: number };
  chapters: number;
  chapterList: ChapterInfo[];
  hasPractical: boolean;
  isCompulsory: boolean;
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ChapterInfo {
  number: number;
  name: string;
  slug: string;
  topics: string[];
  keyConcepts: string[];
  estimatedHours: number;
}

export interface IntermediateBoard {
  name: string;
  slug: string;
  shortName: string;
  province: string;
  website: string;
  groups: IntermediateGroupSlug[];
  examSystem: "annual" | "semester";
  gradingSystem: { grade: string; label: string; minPercentage: number; maxPercentage: number }[];
  passingCriteria: string;
  totalMarks: Record<string, { theory: number; practical: number; total: number }>;
  officialResources: { label: string; url: string }[];
}

export interface PastPaperEntry {
  board: string;
  classLevel: IntermediateClass;
  group: IntermediateGroupSlug;
  subject: string;
  year: string;
  examType: "annual" | "supplementary" | "model";
  paperType: "objective" | "subjective" | "combined" | "practical";
  title: string;
  url: string;
  sourceVerified: boolean;
}

export interface EntryTest {
  name: string;
  slug: string;
  fullName: string;
  conductingBody: string;
  eligibility: string;
  syllabus: string;
  testPattern: string;
  totalMarks: number;
  subjects: string[];
  duration: string;
  frequency: string;
  officialUrl: string;
  preparationTips: string[];
  relatedGroups: IntermediateGroupSlug[];
}

export interface Scholarship {
  name: string;
  slug: string;
  provider: string;
  eligibility: string;
  marksRequirement: string;
  amount: string;
  deadline: string;
  documents: string[];
  applicationMethod: string;
  officialUrl: string;
  status: "open" | "closing_soon" | "closed" | "upcoming";
  academicYear: string;
  forGroups: IntermediateGroupSlug[];
}

export interface CareerPath {
  title: string;
  slug: string;
  description: string;
  requiredGroup: IntermediateGroupSlug[];
  requiredSubjects: string[];
  degreePrograms: string[];
  entryTests: string[];
  averageSalary: string;
  jobOutlook: string;
}
