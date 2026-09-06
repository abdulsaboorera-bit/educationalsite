import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pakistan-edu-platform";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  const collections = await mongoose.connection.db!.listCollections();
  for (const collection of collections) {
    await mongoose.connection.db!.dropCollection(collection.name);
  }
  console.log("Cleared existing data");

  // Import models
  const University = (await import("@/models/University")).default;
  const Campus = (await import("@/models/Campus")).default;
  const Program = (await import("@/models/Program")).default;
  const Teacher = (await import("@/models/Teacher")).default;
  const MeritRecord = (await import("@/models/MeritRecord")).default;

  // Seed Universities
  const universities = await University.insertMany([
    {
      name: "COMSATS University Islamabad",
      short_name: "CUI",
      slug: "comsats-university-islamabad",
      description: "COMSATS University Islamabad is a public research university, one of the top-ranked universities in Pakistan, recognized by HEC.",
      type: "public",
      category: ["cs_it", "engineering"],
      province: "Islamabad Capital Territory",
      city: "Islamabad",
      website: "https://www.comsats.edu.pk",
      established_year: 1998,
      hec_recognized: true,
      is_featured: true,
      programs_count: 45,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "Fast National University of Computer & Emerging Sciences",
      short_name: "FAST",
      slug: "fast-nuces",
      description: "FAST-NUCES is a private university known for strong focus on computer science, IT, and engineering education.",
      type: "private",
      category: ["cs_it", "engineering", "business"],
      province: "Islamabad Capital Territory",
      city: "Islamabad",
      website: "https://www.nu.edu.pk",
      established_year: 2000,
      hec_recognized: true,
      is_featured: true,
      programs_count: 30,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "University of Engineering & Technology Lahore",
      short_name: "UET",
      slug: "uet-lahore",
      description: "UET Lahore is the oldest and largest engineering university in Pakistan, established in 1921.",
      type: "public",
      category: ["engineering"],
      province: "Punjab",
      city: "Lahore",
      website: "https://uet.edu.pk",
      established_year: 1921,
      hec_recognized: true,
      is_featured: true,
      programs_count: 35,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "Lahore University of Management Sciences",
      short_name: "LUMS",
      slug: "lums",
      description: "LUMS is a private research university known for its business school, computer science, and engineering programs.",
      type: "private",
      category: ["business", "cs_it", "arts"],
      province: "Punjab",
      city: "Lahore",
      website: "https://lums.edu.pk",
      established_year: 1984,
      hec_recognized: true,
      is_featured: true,
      programs_count: 25,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "National University of Sciences & Technology",
      short_name: "NUST",
      slug: "nust",
      description: "NUST is a public research university focused on science and technology education and research.",
      type: "public",
      category: ["engineering", "cs_it"],
      province: "Islamabad Capital Territory",
      city: "Islamabad",
      website: "https://nust.edu.pk",
      established_year: 1991,
      hec_recognized: true,
      is_featured: true,
      programs_count: 50,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "University of the Punjab",
      short_name: "PU",
      slug: "punjab-university",
      description: "University of the Punjab is the oldest university in Pakistan, established in 1882.",
      type: "public",
      category: ["general", "arts", "law"],
      province: "Punjab",
      city: "Lahore",
      website: "https://pu.edu.pk",
      established_year: 1882,
      hec_recognized: true,
      programs_count: 120,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "Aga Khan University",
      short_name: "AKU",
      slug: "aga-khan-university",
      description: "Aga Khan University is a private research university known for its medical college and hospital.",
      type: "private",
      category: ["medical"],
      province: "Sindh",
      city: "Karachi",
      website: "https://aku.edu",
      established_year: 1983,
      hec_recognized: true,
      is_featured: true,
      programs_count: 15,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
    {
      name: "NED University of Engineering & Technology",
      short_name: "NED",
      slug: "ned-university",
      description: "NED University is a public research university focused on engineering and technology.",
      type: "public",
      category: ["engineering"],
      province: "Sindh",
      city: "Karachi",
      website: "https://neduet.edu.pk",
      established_year: 1922,
      hec_recognized: true,
      programs_count: 40,
      source: {
        source_type: "OFFICIAL_WEBSITE",
        verified: true,
        last_updated: new Date("2026-08-01"),
        academic_year: "2026",
        confidence: "high",
      },
    },
  ]);

  console.log(`Seeded ${universities.length} universities`);

  // Seed Campuses
  const campusData = [
    { university: universities[0]._id, name: "Islamabad Main Campus", slug: "islamabad-main", city: "Islamabad", province: "Islamabad Capital Territory", is_main: true, hostel_available: true, facilities: ["Library", "Hostel", "Sports Complex", "Labs"] },
    { university: universities[0]._id, name: "Lahore Campus", slug: "lahore", city: "Lahore", province: "Punjab", is_main: false, hostel_available: false, facilities: ["Library", "Labs"] },
    { university: universities[1]._id, name: "Islamabad Campus", slug: "islamabad", city: "Islamabad", province: "Islamabad Capital Territory", is_main: true, hostel_available: true, facilities: ["Library", "Labs", "Sports"] },
    { university: universities[2]._id, name: "Main Campus", slug: "main", city: "Lahore", province: "Punjab", is_main: true, hostel_available: true, facilities: ["Library", "Hostel", "Sports Complex", "Labs", "Workshops"] },
    { university: universities[3]._id, name: "Main Campus", slug: "main", city: "Lahore", province: "Punjab", is_main: true, hostel_available: true, facilities: ["Library", "Hostel", "Sports", "Labs"] },
    { university: universities[4]._id, name: "H-12 Campus", slug: "h12", city: "Islamabad", province: "Islamabad Capital Territory", is_main: true, hostel_available: true, facilities: ["Library", "Hostel", "Sports", "Labs"] },
  ];

  const campuses = await Campus.insertMany(campusData);
  console.log(`Seeded ${campuses.length} campuses`);

  // Seed Programs
  const programData = [
    { university: universities[0]._id, campus: campuses[0]._id, name: "BS Computer Science", slug: "bs-cs", degree_level: "bachelors", field: "Computer Science", department: "CS&IT", duration_years: 4, fee_per_year: 150000, admission_status: "open" },
    { university: universities[0]._id, campus: campuses[0]._id, name: "BS Software Engineering", slug: "bs-se", degree_level: "bachelors", field: "Software Engineering", department: "CS&IT", duration_years: 4, fee_per_year: 150000, admission_status: "open" },
    { university: universities[0]._id, campus: campuses[0]._id, name: "BS Electrical Engineering", slug: "bs-ee", degree_level: "bachelors", field: "Engineering", department: "EE", duration_years: 4, fee_per_year: 180000, admission_status: "open" },
    { university: universities[1]._id, campus: campuses[2]._id, name: "BS Computer Science", slug: "bs-cs", degree_level: "bachelors", field: "Computer Science", department: "CS", duration_years: 4, fee_per_year: 250000, admission_status: "open" },
    { university: universities[1]._id, campus: campuses[2]._id, name: "BS Artificial Intelligence", slug: "bs-ai", degree_level: "bachelors", field: "Computer Science", department: "CS", duration_years: 4, fee_per_year: 250000, admission_status: "open" },
    { university: universities[2]._id, campus: campuses[3]._id, name: "BS Computer Engineering", slug: "bs-ce", degree_level: "bachelors", field: "Engineering", department: "C&E", duration_years: 4, fee_per_year: 120000, admission_status: "open" },
    { university: universities[2]._id, campus: campuses[3]._id, name: "BS Electrical Engineering", slug: "bs-ee", degree_level: "bachelors", field: "Engineering", department: "EE", duration_years: 4, fee_per_year: 120000, admission_status: "open" },
    { university: universities[3]._id, campus: campuses[4]._id, name: "BS Computer Science", slug: "bs-cs", degree_level: "bachelors", field: "Computer Science", department: "CS", duration_years: 4, fee_per_year: 500000, admission_status: "open" },
    { university: universities[4]._id, campus: campuses[5]._id, name: "BS Computer Science", slug: "bs-cs", degree_level: "bachelors", field: "Computer Science", department: "SEECS", duration_years: 4, fee_per_year: 180000, admission_status: "open" },
    { university: universities[4]._id, campus: campuses[5]._id, name: "BS Cyber Security", slug: "bs-cyber", degree_level: "bachelors", field: "Computer Science", department: "SEECS", duration_years: 4, fee_per_year: 180000, admission_status: "open" },
  ];

  const programs = await Program.insertMany(programData);
  console.log(`Seeded ${programs.length} programs`);

  // Seed Teachers
  const teacherData = [
    { university: universities[0]._id, campus: campuses[0]._id, name: "Dr. Ahmed Khan", slug: "dr-ahmed-khan", designation: "Professor", department: "Computer Science", courses: ["Data Structures", "Algorithms"], research_interests: ["AI", "Machine Learning"] },
    { university: universities[0]._id, campus: campuses[0]._id, name: "Dr. Fatima Noor", slug: "dr-fatima-noor", designation: "Associate Professor", department: "Software Engineering", courses: ["Software Design", "SE Management"], research_interests: ["Software Architecture"] },
    { university: universities[1]._id, campus: campuses[2]._id, name: "Dr. Hassan Raza", slug: "dr-hassan-raza", designation: "Assistant Professor", department: "Computer Science", courses: ["Operating Systems", " Networks"], research_interests: ["Cybersecurity"] },
    { university: universities[2]._id, campus: campuses[3]._id, name: "Dr. Muhammad Ali", slug: "dr-muhammad-ali", designation: "Professor", department: "Computer Engineering", courses: ["Digital Logic", "Computer Architecture"], research_interests: ["VLSI", "Embedded Systems"] },
  ];

  const teachers = await Teacher.insertMany(teacherData);
  console.log(`Seeded ${teachers.length} teachers`);

  // Seed Merit Records
  const meritData = [
    { university: universities[0]._id, campus: campuses[0]._id, program: programs[0]._id, admission_year: "2025", closing_merit: 78.5, opening_merit: 85.2, category: "open_merit" },
    { university: universities[1]._id, campus: campuses[2]._id, program: programs[3]._id, admission_year: "2025", closing_merit: 82.0, opening_merit: 90.0, category: "open_merit" },
    { university: universities[2]._id, campus: campuses[3]._id, program: programs[5]._id, admission_year: "2025", closing_merit: 75.3, opening_merit: 82.0, category: "open_merit" },
    { university: universities[3]._id, campus: campuses[4]._id, program: programs[7]._id, admission_year: "2025", closing_merit: 85.0, opening_merit: 92.0, category: "open_merit" },
    { university: universities[4]._id, campus: campuses[5]._id, program: programs[8]._id, admission_year: "2025", closing_merit: 80.0, opening_merit: 88.0, category: "open_merit" },
  ];

  const meritRecords = await MeritRecord.insertMany(meritData);
  console.log(`Seeded ${meritRecords.length} merit records`);

  console.log("\nSeed completed successfully!");
  console.log("Summary:");
  console.log(`  Universities: ${universities.length}`);
  console.log(`  Campuses: ${campuses.length}`);
  console.log(`  Programs: ${programs.length}`);
  console.log(`  Teachers: ${teachers.length}`);
  console.log(`  Merit Records: ${meritRecords.length}`);

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
