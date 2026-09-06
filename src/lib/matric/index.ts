export type {
  Board,
  Subject,
  ClassLevel,
  SubjectGroup,
  MarksBreakdown,
  GradingSystem,
  GradingGrade,
  ExamType,
  CandidateType,
  EducationLevel,
  ClassSubjectCombination,
  MatricInformation,
  BoardPageSection,
} from "./types";

export {
  boards,
  PAKISTAN_PROVINCES,
  DEFAULT_GRADING_SYSTEM,
  DEFAULT_TOTAL_MARKS,
  getBoardBySlug,
  getBoardsByProvince,
  getAllBoardSlugs,
  getProvincesWithBoards,
} from "./boards";

export {
  subjects,
  classCombinations,
  getSubjectBySlug,
  getSubjectsByClass,
  getSubjectsByGroup,
  getCompulsorySubjects,
  getCombination,
  getAllSubjectSlugs,
} from "./subjects";

export {
  classes,
  getClassInfo,
  getClassGroups,
  getClassTotalMarks,
  getMatricTotalMarks,
} from "./classes";

export {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateEducationalOccupationalProgramSchema,
  getCanonicalUrl,
  generateMetaTitle,
  generateMetaDescription,
} from "./seo";

export type { BreadcrumbItem, FAQItem } from "./seo";
