import { IntermediateGroup } from "./types";

export const intermediateGroups: IntermediateGroup[] = [
  {
    name: "FSc Pre-Medical",
    slug: "fsc-pre-medical",
    shortName: "FSc Pre-Medical",
    description: "For students aspiring to medical, dental, pharmacy, and allied health sciences careers.",
    fullDescription: "FSc Pre-Medical is a two-year intermediate program designed for students who want to pursue careers in medicine, dentistry, pharmacy, veterinary sciences, and allied health fields. The program focuses on Biology, Chemistry, and Physics as core elective subjects alongside compulsory subjects.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu", "islamiat", "pakistan-studies"],
    electiveSubjects: ["biology", "chemistry", "physics"],
    careerPaths: ["Medicine (MBBS)", "Dentistry (BDS)", "Pharmacy (Pharm-D)", "Veterinary (DVM)", "Nursing", "Physiotherapy", "Medical Technology", "Biotechnology", "Public Health", "Nutrition & Dietetics"],
    eligibleDegrees: ["MBBS", "BDS", "Pharm-D", "DVM", "BS Nursing", "BS Physiotherapy", "BS Medical Technology", "BS Biotechnology", "BS Microbiology", "BS Genetics"],
    icon: "🧬",
    color: "emerald",
    metaTitle: "FSc Pre-Medical - Subjects, Syllabus, Careers | PakEdu",
    metaDescription: "Complete guide to FSc Pre-Medical in Pakistan. Subjects, syllabus, past papers, results, career options, and university admission requirements.",
  },
  {
    name: "FSc Pre-Engineering",
    slug: "fsc-pre-engineering",
    shortName: "FSc Pre-Engineering",
    description: "For students aspiring to engineering, architecture, and technology careers.",
    fullDescription: "FSc Pre-Engineering is a two-year intermediate program for students aiming for careers in engineering, architecture, computing, and technology. Mathematics, Physics, and Chemistry form the core elective subjects with compulsory subjects.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu", "islamiat", "pakistan-studies"],
    electiveSubjects: ["mathematics", "physics", "chemistry"],
    careerPaths: ["Engineering", "Architecture", "Software Engineering", "Data Science", "人工智能", "Robotics", "Telecommunications", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
    eligibleDegrees: ["BE/BSc Engineering", "BArch", "BS Computer Science", "BS Software Engineering", "BS Data Science", "BS Artificial Intelligence", "BS Information Technology", "BS Mathematics", "BS Physics", "BS Chemistry"],
    icon: "⚙️",
    color: "blue",
    metaTitle: "FSc Pre-Engineering - Subjects, Syllabus, Careers | PakEdu",
    metaDescription: "Complete guide to FSc Pre-Engineering in Pakistan. Subjects, syllabus, past papers, results, career options, and university admission requirements.",
  },
  {
    name: "ICS (Computer Science)",
    slug: "ics",
    shortName: "ICS",
    description: "For students interested in computer science, IT, and digital technologies.",
    fullDescription: "ICS (Intermediate in Computer Science) is a two-year program focused on computer science, programming, and digital technologies. Students learn programming, data structures, databases, and computing fundamentals alongside mathematics and physics.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu", "islamiat", "pakistan-studies"],
    electiveSubjects: ["computer-science", "mathematics", "physics"],
    careerPaths: ["Software Development", "Web Development", "Data Science", "Cybersecurity", "AI/ML", "Cloud Computing", "DevOps", "Mobile Development", "Game Development", "IT Consulting"],
    eligibleDegrees: ["BS Computer Science", "BS Software Engineering", "BS Information Technology", "BS Data Science", "BS Artificial Intelligence", "BCA", "BS Cybersecurity", "BS Cloud Computing"],
    icon: "💻",
    color: "purple",
    metaTitle: "ICS - Computer Science Subjects, Syllabus, Careers | PakEdu",
    metaDescription: "Complete guide to ICS (Intermediate in Computer Science) in Pakistan. Subjects, syllabus, past papers, results, and career options.",
  },
  {
    name: "FA (Arts & Humanities)",
    slug: "fa",
    shortName: "FA",
    description: "For students interested in social sciences, languages, literature, and humanities.",
    fullDescription: "FA (Faculty of Arts) is a versatile two-year intermediate program covering social sciences, languages, literature, and humanities. Students can choose from a wide range of elective subjects based on their interests and career goals.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu", "islamiat", "pakistan-studies"],
    electiveSubjects: ["economics", "psychology", "sociology", "political-science", "history", "geography", "education", "civics", "philosophy", "fine-arts"],
    careerPaths: ["Civil Services", "Journalism", "Teaching", "Law", "Social Work", "Psychology", "Public Administration", "Diplomacy", "Media", "Creative Arts"],
    eligibleDegrees: ["BA", "BEd", "LLB", "BS Psychology", "BS Sociology", "BS Political Science", "BS Economics", "BS International Relations", "BS Public Administration", "Mass Communication"],
    icon: "📚",
    color: "rose",
    metaTitle: "FA (Arts) - Subjects, Syllabus, Careers | PakEdu",
    metaDescription: "Complete guide to FA (Faculty of Arts) in Pakistan. Subjects, syllabus, past papers, results, career options, and university admission requirements.",
  },
  {
    name: "I.Com (Commerce)",
    slug: "icom",
    shortName: "I.Com",
    description: "For students interested in business, accounting, finance, and commerce.",
    fullDescription: "I.Com (Intermediate in Commerce) is a two-year program focused on business, accounting, economics, and commerce. Students learn financial accounting, business mathematics, economics, and commerce fundamentals.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu"],
    electiveSubjects: ["principles-of-accounting", "principles-of-economics", "business-mathematics", "commerce", "business-studies"],
    careerPaths: ["Accounting", "Banking", "Finance", "Business Administration", "Entrepreneurship", "Auditing", "Taxation", "Marketing", "Human Resources", "Supply Chain Management"],
    eligibleDegrees: ["BCom", "BBA", "BS Accounting & Finance", "BS Economics", "BS Commerce", "ACCA", "CA", "CMA", "CS (Company Secretary)", "BS Business Administration"],
    icon: "📊",
    color: "amber",
    metaTitle: "I.Com (Commerce) - Subjects, Syllabus, Careers | PakEdu",
    metaDescription: "Complete guide to I.Com (Intermediate in Commerce) in Pakistan. Subjects, syllabus, past papers, results, career options, and university admission.",
  },
  {
    name: "General Science",
    slug: "general-science",
    shortName: "General Science",
    description: "A mixed science program combining elements from different science fields.",
    fullDescription: "General Science is an intermediate program that allows students to study a combination of science subjects. It provides flexibility for students who want a broader science education without committing to a specific FSc track.",
    classLevel: ["11", "12"],
    compulsorySubjects: ["english", "urdu", "islamiat", "pakistan-studies"],
    electiveSubjects: ["mathematics", "physics", "chemistry", "computer-science", "statistics"],
    careerPaths: ["Various science-based careers", "Teaching", "Technical fields", "Government jobs"],
    eligibleDegrees: ["BS programs in various sciences", "BEd", "BCA", "Various BS degrees"],
    icon: "🔬",
    color: "cyan",
    metaTitle: "General Science Intermediate - Subjects, Careers | PakEdu",
    metaDescription: "Guide to General Science intermediate program in Pakistan. Subjects, syllabus, and career options.",
  },
];

export function getGroupBySlug(slug: string): IntermediateGroup | undefined {
  return intermediateGroups.find((g) => g.slug === slug);
}

export function getAllGroupSlugs(): string[] {
  return intermediateGroups.map((g) => g.slug);
}

export function getGroupsByClassLevel(classLevel: "11" | "12"): IntermediateGroup[] {
  return intermediateGroups.filter((g) => g.classLevel.includes(classLevel));
}
