export interface UniversityDataProvider {
  getUniversity(slug: string): Promise<unknown>;
  getUniversities(filters?: Record<string, string>): Promise<unknown[]>;
  getPrograms(universitySlug: string): Promise<unknown[]>;
  getMeritData(universitySlug: string, year?: string): Promise<unknown[]>;
  getTeachers(universitySlug: string): Promise<unknown[]>;
  getTimetable(universitySlug: string, filters?: Record<string, string>): Promise<unknown[]>;
  getRooms(universitySlug: string, building?: string): Promise<unknown[]>;
}

export class MockDataProvider implements UniversityDataProvider {
  async getUniversity(slug: string) {
    return { slug, name: "Mock University" };
  }
  async getUniversities() {
    return [];
  }
  async getPrograms() {
    return [];
  }
  async getMeritData() {
    return [];
  }
  async getTeachers() {
    return [];
  }
  async getTimetable() {
    return [];
  }
  async getRooms() {
    return [];
  }
}

export class ApiDataProvider implements UniversityDataProvider {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async getUniversity(slug: string) {
    const res = await fetch(`${this.baseUrl}/universities/${slug}`);
    const data = await res.json();
    return data.data;
  }

  async getUniversities(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${this.baseUrl}/universities?${params}`);
    const data = await res.json();
    return data.data;
  }

  async getPrograms(universitySlug: string) {
    const res = await fetch(`${this.baseUrl}/universities/${universitySlug}/programs`);
    const data = await res.json();
    return data.data;
  }

  async getMeritData(universitySlug: string, year?: string) {
    const params = new URLSearchParams({ university: universitySlug });
    if (year) params.set("year", year);
    const res = await fetch(`${this.baseUrl}/merit?${params}`);
    const data = await res.json();
    return data.data;
  }

  async getTeachers(universitySlug: string) {
    const res = await fetch(`${this.baseUrl}/universities/${universitySlug}/teachers`);
    const data = await res.json();
    return data.data;
  }

  async getTimetable() {
    return [];
  }

  async getRooms() {
    return [];
  }
}

export function getDataProvider(): UniversityDataProvider {
  return new ApiDataProvider();
}
