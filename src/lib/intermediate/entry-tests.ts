import { EntryTest, IntermediateGroupSlug } from "./types";

export const entryTests: EntryTest[] = [
  {
    name: "MDCAT",
    slug: "mdcat",
    fullName: "Medical and Dental College Admission Test",
    conductingBody: "PMC (Pakistan Medical Commission)",
    eligibility: "FSc Pre-Medical with minimum 60% marks",
    syllabus: "Biology (40%), Chemistry (30%), Physics (15%), English (10%), Logical Reasoning (5%)",
    testPattern: "Multiple Choice Questions (MCQs)",
    totalMarks: 200,
    subjects: ["Biology", "Chemistry", "Physics", "English", "Logical Reasoning"],
    duration: "3.5 hours",
    frequency: "Annual (once a year)",
    officialUrl: "https://www.pmc.gov.pk",
    preparationTips: [
      "Focus on FSc Pre-Medical syllabus, especially Biology",
      "Practice MCQs from past papers",
      "Take timed mock tests regularly",
      "Review key concepts from Physics and Chemistry",
    ],
    relatedGroups: ["fsc-pre-medical"],
  },
  {
    name: "ECAT",
    slug: "ecat",
    fullName: "Engineering College Admission Test",
    conductingBody: "UET (University of Engineering and Technology)",
    eligibility: "FSc Pre-Engineering or equivalent with Mathematics",
    syllabus: "Mathematics (40%), Physics (30%), Chemistry (20%), English (10%)",
    testPattern: "Multiple Choice Questions (MCQs)",
    totalMarks: 400,
    subjects: ["Mathematics", "Physics", "Chemistry", "English"],
    duration: "3 hours",
    frequency: "Annual",
    officialUrl: "https://www.uet.edu.pk",
    preparationTips: [
      "Master FSc Mathematics syllabus thoroughly",
      "Practice numerical problems from Physics",
      "Focus on conceptual clarity in Chemistry",
      "Solve past ECAT papers under timed conditions",
    ],
    relatedGroups: ["fsc-pre-engineering"],
  },
  {
    name: "NET",
    slug: "net",
    fullName: "NUST Entry Test",
    conductingBody: "NUST (National University of Sciences and Technology)",
    eligibility: "FSc or equivalent with relevant subjects",
    syllabus: "Subject-specific (Math/Physics/Chemistry for Engineering, Biology for Medical)",
    testPattern: "Multiple Choice Questions (MCQs)",
    totalMarks: 200,
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "Intelligence"],
    duration: "3 hours",
    frequency: "Multiple rounds per year",
    officialUrl: "https://www.nust.edu.pk",
    preparationTips: [
      "NUST tests are conceptually challenging",
      "Practice analytical and reasoning questions",
      "Cover entire FSc syllabus thoroughly",
      "Take online practice tests on NUST portal",
    ],
    relatedGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics"],
  },
  {
    name: "NTS NAT",
    slug: "nts-nat",
    fullName: "National Testing Service - National Aptitude Test",
    conductingBody: "NTS (National Testing Service)",
    eligibility: "Intermediate or equivalent",
    syllabus: "Verbal reasoning, Quantitative reasoning, Analytical reasoning, Subject-specific",
    testPattern: "Multiple Choice Questions (MCQs)",
    totalMarks: 100,
    subjects: ["Verbal", "Quantitative", "Analytical", "Subject"],
    duration: "2 hours",
    frequency: "Multiple times per year",
    officialUrl: "https://www.nts.org.pk",
    preparationTips: [
      "Practice verbal and quantitative reasoning",
      "Work through NTS sample papers",
      "Improve time management skills",
      "Review fundamental concepts across subjects",
    ],
    relatedGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
  {
    name: "FAST-NU Entry Test",
    slug: "fast-nu",
    fullName: "FAST National University Admission Test",
    conductingBody: "FAST-NUCES",
    eligibility: "Intermediate with Mathematics (for CS/SE programs)",
    syllabus: "Mathematics (40%), English (10%), IQ/Analytical (10%), Computer Science concepts (40%)",
    testPattern: "Multiple Choice Questions (MCQs)",
    totalMarks: 100,
    subjects: ["Mathematics", "English", "Analytical", "Computer Science"],
    duration: "2.5 hours",
    frequency: "Annual",
    officialUrl: "https://www.nu.edu.pk",
    preparationTips: [
      "Strong focus on Mathematics (12th class level)",
      "Practice programming logic and CS fundamentals",
      "Work on analytical and IQ-type questions",
      "Review English grammar and comprehension",
    ],
    relatedGroups: ["ics", "fsc-pre-engineering"],
  },
];

export function getEntryTestBySlug(slug: string): EntryTest | undefined {
  return entryTests.find((t) => t.slug === slug);
}

export function getAllEntryTestSlugs(): string[] {
  return entryTests.map((t) => t.slug);
}

export function getEntryTestsByGroup(groupSlug: string): EntryTest[] {
  return entryTests.filter((t) => t.relatedGroups.includes(groupSlug as IntermediateGroupSlug));
}
