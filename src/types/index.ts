export type UniversityType = "public" | "private" | "semi-government";
export type UniversityCategory = "general" | "engineering" | "medical" | "business" | "cs_it" | "agriculture" | "arts" | "law" | "military";
export type DegreeLevel = "certificate" | "diploma" | "associate" | "bachelors" | "masters" | "mphil" | "phd";
export type AdmissionStatus = "open" | "closed" | "upcoming" | "pending";
export type SourceType = "OFFICIAL_API" | "OFFICIAL_WEBSITE" | "OFFICIAL_DOCUMENT" | "UNIVERSITY_ADMIN" | "AUTHORIZED_USER" | "COMMUNITY_REPORT";
export type ReportStatus = "pending" | "approved" | "rejected" | "needs_evidence";
export type VerificationStatus = "verified" | "community_reported" | "last_known" | "unverified";
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "UNIVERSITY_ADMIN" | "DATA_EDITOR" | "MODERATOR" | "STUDENT";

export interface ISource {
  source_url?: string;
  source_type: SourceType;
  verified: boolean;
  verified_by?: string;
  verified_at?: Date;
  last_updated: Date;
  academic_year?: string;
  confidence: "high" | "medium" | "low";
}

export interface IProvince {
  name: string;
  slug: string;
}

export const PAKISTAN_PROVINCES: IProvince[] = [
  { name: "Punjab", slug: "punjab" },
  { name: "Sindh", slug: "sindh" },
  { name: "Khyber Pakhtunkhwa", slug: "khyber-pakhtunkhwa" },
  { name: "Balochistan", slug: "balochistan" },
  { name: "Islamabad Capital Territory", slug: "islamabad" },
  { name: "Azad Jammu & Kashmir", slug: "azad-jammu-kashmir" },
  { name: "Gilgit-Baltistan", slug: "gilgit-baltistan" },
];

export const MAJOR_PAKISTAN_CITIES = [
  "Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta",
  "Faisalabad", "Rawalpindi", "Multan", "Sialkot", "Gujranwala",
  "Abbottabad", "Mardan", "Swat", "Hyderabad", "Sukkur",
  "Larkana", "Bahawalpur", "Sargodha", "DG Khan", "Muzaffarabad",
];
