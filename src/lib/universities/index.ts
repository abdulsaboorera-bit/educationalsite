export * from "./types";
export { provinces, getProvinceBySlug, getAllProvinceSlugs } from "./provinces";
export { getFederalUniversities } from "./universities-federal";
export { getPunjabUniversities } from "./universities-punjab";
export { getSindhUniversities } from "./universities-sindh";
export { getKPKUniversities } from "./universities-kpk";
export { getBalochistanUniversities, getAJKUniversities, getGBUniversities } from "./universities-other";

import { University } from "./types";
import { getFederalUniversities } from "./universities-federal";
import { getPunjabUniversities } from "./universities-punjab";
import { getSindhUniversities } from "./universities-sindh";
import { getKPKUniversities } from "./universities-kpk";
import { getBalochistanUniversities, getAJKUniversities, getGBUniversities } from "./universities-other";

export function getAllUniversities(): University[] {
  return [
    ...getFederalUniversities(),
    ...getPunjabUniversities(),
    ...getSindhUniversities(),
    ...getKPKUniversities(),
    ...getBalochistanUniversities(),
    ...getAJKUniversities(),
    ...getGBUniversities(),
  ];
}

export function getUniversityBySlug(slug: string): University | undefined {
  return getAllUniversities().find((u) => u.slug === slug);
}

export function getUniversitiesByProvince(provinceSlug: string): University[] {
  return getAllUniversities().filter((u) => u.provinceSlug === provinceSlug);
}

export function getUniversitiesByType(type: string): University[] {
  return getAllUniversities().filter((u) => u.type === type);
}

export function getFeaturedUniversities(): University[] {
  return getAllUniversities().filter((u) => u.isFeatured);
}

export function searchUniversities(query: string): University[] {
  const q = query.toLowerCase();
  return getAllUniversities().filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q)
  );
}

export function getAllUniversitySlugs(): string[] {
  return getAllUniversities().map((u) => u.slug);
}

export function getUniversityCountByProvince(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const u of getAllUniversities()) {
    counts[u.provinceSlug] = (counts[u.provinceSlug] || 0) + 1;
  }
  return counts;
}
