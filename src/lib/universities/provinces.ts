import { Province } from "./types";

export const provinces: Province[] = [
  {
    name: "Islamabad Capital Territory",
    slug: "islamabad",
    region: "Federal",
    universities: 26,
    majorCities: ["Islamabad"],
  },
  {
    name: "Punjab",
    slug: "punjab",
    region: "Punjab",
    universities: 97,
    majorCities: ["Lahore", "Faisalabad", "Multan", "Rawalpindi", "Sialkot", "Gujranwala", "Bahawalpur", "Sargodha", "DG Khan"],
  },
  {
    name: "Sindh",
    slug: "sindh",
    region: "Sindh",
    universities: 79,
    majorCities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Jamshoro"],
  },
  {
    name: "Khyber Pakhtunkhwa",
    slug: "khyber-pakhtunkhwa",
    region: "KPK",
    universities: 46,
    majorCities: ["Peshawar", "Abbottabad", "Mardan", "Swat", "D.I. Khan", "Kohat", "Nowshera"],
  },
  {
    name: "Balochistan",
    slug: "balochistan",
    region: "Balochistan",
    universities: 12,
    majorCities: ["Quetta", "Khuzdar", "Uthal", "Turbat", "Gwadar", "Loralai"],
  },
  {
    name: "Azad Jammu & Kashmir",
    slug: "azad-jammu-kashmir",
    region: "AJK",
    universities: 8,
    majorCities: ["Mirpur", "Muzaffarabad", "Rawalakot", "Kotli", "Bhimber", "Bagh"],
  },
  {
    name: "Gilgit-Baltistan",
    slug: "gilgit-baltistan",
    region: "GB",
    universities: 2,
    majorCities: ["Gilgit", "Skardu"],
  },
];

export function getProvinceBySlug(slug: string): Province | undefined {
  return provinces.find((p) => p.slug === slug);
}

export function getAllProvinceSlugs(): string[] {
  return provinces.map((p) => p.slug);
}
