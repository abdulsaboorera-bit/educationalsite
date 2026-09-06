import { MetadataRoute } from "next";
import { getAllBoardSlugs } from "@/lib/matric/boards";
import { getAllSubjectSlugs } from "@/lib/matric/subjects";

const BASE_URL = "https://pakedu.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/universities`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/programs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/calculators`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/merit`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/teachers`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/room-finder`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const calculatorPages = [
    "cgpa", "gpa", "percentage", "marks", "attendance",
    "mdcat-aggregate", "ecat-aggregate", "nums-aggregate",
    "merit", "entry-test-aggregate",
  ].map((slug) => ({
    url: `${BASE_URL}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const universityPages = [
    "comsats-university-islamabad", "fast-nuces", "uet-lahore", "lums",
    "nust", "punjab-university", "aga-khan-university", "ned-university",
  ].map((slug) => ({
    url: `${BASE_URL}/universities/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryPages = [
    "medical", "engineering", "cs-it", "business", "general",
  ].map((slug) => ({
    url: `${BASE_URL}/universities/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const teacherPages = [
    "dr-ahmed-khan", "dr-fatima-noor",
  ].map((slug) => ({
    url: `${BASE_URL}/teachers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ===== MATRIC PAGES =====
  const matricStaticPages = [
    { url: `${BASE_URL}/matric`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/matric/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/matric/boards`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/matric/class-9`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/matric/class-10`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/matric/subjects`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const boardPages = getAllBoardSlugs().map((slug) => ({
    url: `${BASE_URL}/matric/boards/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const subjectPages = getAllSubjectSlugs().map((slug) => ({
    url: `${BASE_URL}/matric/subjects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...calculatorPages,
    ...universityPages,
    ...categoryPages,
    ...teacherPages,
    ...matricStaticPages,
    ...boardPages,
    ...subjectPages,
  ];
}
