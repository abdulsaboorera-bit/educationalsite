import { Scholarship, IntermediateGroupSlug } from "./types";

export const scholarships: Scholarship[] = [
  {
    name: "Punjab Educational Endowment Fund (PEEF)",
    slug: "peef",
    provider: "Government of Punjab",
    eligibility: "Punjab domicile, 60%+ marks in Intermediate",
    marksRequirement: "Minimum 60% in Intermediate annual examination",
    amount: "PKR 30,000 - 300,000 per year",
    deadline: "February - March (annual)",
    documents: ["CNIC/B-Form", "Domicile", "Marks certificates", "Income certificate"],
    applicationMethod: "Online application through PEEF portal",
    officialUrl: "https://www.peef.edu.pk",
    status: "upcoming",
    academicYear: "2025-2026",
    forGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
  {
    name: "HEC Need-Based Scholarship",
    slug: "hec-need-based",
    provider: "Higher Education Commission",
    eligibility: "Financially deserving students with good academic record",
    marksRequirement: "Minimum 60% in previous examination",
    amount: "Full tuition + stipend (varies)",
    deadline: "Varies by university",
    documents: ["CNIC", "Income certificate", "Marks certificates"],
    applicationMethod: "Through respective university financial aid office",
    officialUrl: "https://www.hec.gov.pk",
    status: "open",
    academicYear: "2025-2026",
    forGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
  {
    name: "Ehsaas Undergraduate Scholarship",
    slug: "ehsaas",
    provider: "Government of Pakistan",
    eligibility: "Financially deserving students from low-income families",
    marksRequirement: "Based on financial need and academic performance",
    amount: "PKR 50,000 per year",
    deadline: "October - November (annual)",
    documents: ["CNIC/B-Form", "Family income certificate", "Marks certificates"],
    applicationMethod: "Online through HEC portal",
    officialUrl: "https://www.hec.gov.pk",
    status: "closed",
    academicYear: "2025-2026",
    forGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
  {
    name: "Punjab Merit Scholarship",
    slug: "punjab-merit",
    provider: "Government of Punjab",
    eligibility: "Top position holders from Punjab boards",
    marksRequirement: "First position in board examination",
    amount: "PKR 100,000 per year",
    deadline: "After result announcement",
    documents: ["Board position certificate", "CNIC", "Admission letter"],
    applicationMethod: "Automatic for position holders",
    officialUrl: "https://www.punjab.gov.pk",
    status: "closed",
    academicYear: "2025-2026",
    forGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
  {
    name: "Ignite National Technology Fund Scholarship",
    slug: "ignite",
    provider: "Ignite (Ministry of IT)",
    eligibility: "Students pursuing IT/CS/Engineering degrees",
    marksRequirement: "Minimum 70% in Intermediate",
    amount: "PKR 250,000 per year (covering tuition + living)",
    deadline: "January - February (annual)",
    documents: ["CNIC", "Marks certificates", "University admission proof"],
    applicationMethod: "Online application through Ignite portal",
    officialUrl: "https://www.ignite.org.pk",
    status: "upcoming",
    academicYear: "2025-2026",
    forGroups: ["ics", "fsc-pre-engineering"],
  },
  {
    name: "Satellite Scholarship Program",
    slug: "satellite-scholarship",
    provider: "USAID / Higher Education Commission",
    eligibility: "Students from flood-affected or underserved areas",
    marksRequirement: "Minimum 65% in Intermediate",
    amount: "Full tuition + monthly stipend",
    deadline: "Varies annually",
    documents: ["CNIC/B-Form", "Domicile", "Income certificate", "Marks certificates"],
    applicationMethod: "Through HEC portal",
    officialUrl: "https://www.hec.gov.pk",
    status: "upcoming",
    academicYear: "2025-2026",
    forGroups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
  },
];

export function getScholarshipBySlug(slug: string): Scholarship | undefined {
  return scholarships.find((s) => s.slug === slug);
}

export function getActiveScholarships(): Scholarship[] {
  return scholarships.filter((s) => s.status === "open" || s.status === "closing_soon");
}

export function getScholarshipsByGroup(groupSlug: string): Scholarship[] {
  return scholarships.filter((s) => s.forGroups.includes(groupSlug as IntermediateGroupSlug));
}
