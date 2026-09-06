export type CampusType = "main" | "constituent" | "sub-campus" | "regional" | "study-center";

export interface UniversityCampus {
  name: string;
  city: string;
  type: CampusType;
}

export type UniversityType = "public" | "private" | "semi-government";

export type UniversityCategory =
  | "general"
  | "engineering"
  | "medical"
  | "business"
  | "cs_it"
  | "agriculture"
  | "arts"
  | "law"
  | "military"
  | "women"
  | "technology"
  | "science"
  | "management"
  | "health-sciences"
  | "veterinary"
  | "design"
  | "marine-sciences"
  | "pharmacy"
  | "nursing"
  | "education"
  | "architecture";

export interface University {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  type: UniversityType;
  categories: UniversityCategory[];
  province: string;
  provinceSlug: string;
  city: string;
  establishedYear: number;
  hecRecognized: boolean;
  website: string;
  campuses: UniversityCampus[];
  description: string;
  highlights: string[];
  isFeatured: boolean;
  ranking?: number;
}

export interface Province {
  name: string;
  slug: string;
  region: string;
  universities: number;
  majorCities: string[];
}

export type FacultyArea =
  | "engineering"
  | "technology"
  | "computer-science"
  | "information-technology"
  | "business"
  | "management"
  | "commerce"
  | "law"
  | "medicine"
  | "dentistry"
  | "pharmacy"
  | "nursing"
  | "allied-health"
  | "sciences"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "agriculture"
  | "veterinary"
  | "arts"
  | "humanities"
  | "social-sciences"
  | "education"
  | "architecture"
  | "design"
  | "media"
  | "linguistics"
  | "islamic-studies"
  | "general-studies";

export type DegreeLevel = "bachelors" | "masters" | "mphil" | "phd" | "diploma" | "certificate";

export interface Program {
  id: string;
  name: string;
  slug: string;
  university: string;
  universitySlug: string;
  faculty: FacultyArea;
  degreeLevel: DegreeLevel;
  durationYears: number;
  feePerYear?: number;
  totalFee?: number;
  eligibility: string[];
  description: string;
  isFeatured: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  slug: string;
  programs: Program[];
}
