import { ClassLevel, SubjectGroup } from "./types";
import { getCombination } from "./subjects";

export interface ClassInfo {
  level: ClassLevel;
  name: string;
  description: string;
  total_compulsory_marks: number;
  exam_structure: string;
  passing_criteria: string;
  groups: SubjectGroup[];
  meta_title: string;
  meta_description: string;
}

export const classes: ClassInfo[] = [
  {
    level: "9",
    name: "Class 9 (Ninth Grade)",
    description: "Class 9 is the first year of matriculation education in Pakistan. Students choose between Science, Computer Science, or Arts groups.",
    total_compulsory_marks: 350,
    exam_structure: "Annual examination conducted by respective board. Theory papers for all subjects. Science group students have practical exams for Physics, Chemistry, and Biology.",
    passing_criteria: "Minimum 40% marks in each subject and overall to pass.",
    groups: ["science", "computer_science", "arts"],
    meta_title: "Class 9 - Syllabus, Subjects, Results, Past Papers | PakEdu",
    meta_description: "Complete guide for Class 9 students in Pakistan. Subjects, syllabus, marks scheme, results, date sheets, past papers, and preparation tips.",
  },
  {
    level: "10",
    name: "Class 10 (Tenth Grade)",
    description: "Class 10 is the final year of matriculation. Students continue in their chosen group and appear in board examinations for matriculation certificate.",
    total_compulsory_marks: 400,
    exam_structure: "Annual examination conducted by respective board. Theory and practical papers. Final matriculation certificate issued based on combined Class 9 and Class 10 results.",
    passing_criteria: "Minimum 40% marks in each subject and overall to pass. Must pass in both Class 9 and Class 10 examinations.",
    groups: ["science", "computer_science", "arts"],
    meta_title: "Class 10 - Syllabus, Subjects, Results, Past Papers | PakEdu",
    meta_description: "Complete guide for Class 10 students in Pakistan. Subjects, syllabus, marks scheme, results, date sheets, past papers, and preparation tips.",
  },
];

export function getClassInfo(level: ClassLevel): ClassInfo | undefined {
  return classes.find((c) => c.level === level);
}

export function getClassGroups(level: ClassLevel): SubjectGroup[] {
  const info = getClassInfo(level);
  return info ? info.groups : [];
}

export function getClassTotalMarks(level: ClassLevel, group: SubjectGroup): number {
  const combination = getCombination(level, group);
  return combination ? combination.total_marks : 0;
}

export function getMatricTotalMarks(group: SubjectGroup): number {
  const class9 = getCombination("9", group);
  const class10 = getCombination("10", group);
  return (class9?.total_marks || 0) + (class10?.total_marks || 0);
}
