export const SITE_CONFIG = {
  name: "PakEdu",
  title: "PakEdu - Pakistan's Complete Education Platform",
  description: "Pakistan's comprehensive education platform. Matric & Intermediate resources, university discovery, merit calculators, results, past papers, and career guidance.",
  url: "https://pakedu.pk",
  ogImage: "/images/og-default.png",
  twitter: "@pakedu_pk",
  email: "hello@pakedu.pk",
};

export const NAV_ITEMS = [
  { label: "Matric", href: "/matric", children: [
    { label: "Matric Overview", href: "/matric" },
    { label: "All Boards", href: "/matric/boards" },
    { label: "Class 9", href: "/matric/class-9" },
    { label: "Class 10", href: "/matric/class-10" },
    { label: "Past Papers", href: "/matric/past-papers" },
    { label: "Results", href: "/matric/results" },
    { label: "Date Sheets", href: "/matric/date-sheets" },
    { label: "All Subjects", href: "/matric/subjects" },
    { label: "Matric Calculators", href: "/calculators?category=matric" },
    { label: "After Matric", href: "/matric/after-matric" },
    { label: "About Matric", href: "/matric/about" },
  ]},
  { label: "Universities", href: "/universities", children: [
    { label: "All Universities", href: "/universities" },
    { label: "Medical", href: "/universities/category/medical" },
    { label: "Engineering", href: "/universities/category/engineering" },
    { label: "CS & IT", href: "/universities/category/cs-it" },
    { label: "Business", href: "/universities/category/business" },
    { label: "General", href: "/universities/category/general" },
  ]},
  { label: "Calculators", href: "/calculators" },
  { label: "Merit", href: "/merit" },
  { label: "Compare", href: "/compare" },
  { label: "Faculty", href: "/teachers" },
  { label: "Admin", href: "/admin/sources" },
];

export const FOOTER_LINKS = {
  platform: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  matric: [
    { label: "Matric Overview", href: "/matric" },
    { label: "All Boards", href: "/matric/boards" },
    { label: "Past Papers", href: "/matric/past-papers" },
    { label: "Results", href: "/matric/results" },
    { label: "Date Sheets", href: "/matric/date-sheets" },
    { label: "All Subjects", href: "/matric/subjects" },
    { label: "After Matric", href: "/matric/after-matric" },
  ],
  calculators: [
    { label: "CGPA Calculator", href: "/calculators/cgpa" },
    { label: "GPA Calculator", href: "/calculators/gpa" },
    { label: "Percentage Calculator", href: "/calculators/percentage" },
    { label: "MDCAT Aggregate", href: "/calculators/mdcat-aggregate" },
    { label: "ECAT Aggregate", href: "/calculators/ecat-aggregate" },
    { label: "All Calculators", href: "/calculators" },
  ],
  universities: [
    { label: "Medical Universities", href: "/universities/category/medical" },
    { label: "Engineering Universities", href: "/universities/category/engineering" },
    { label: "CS & IT Universities", href: "/universities/category/cs-it" },
    { label: "Business Schools", href: "/universities/category/business" },
    { label: "Compare Universities", href: "/compare" },
    { label: "University Directory", href: "/universities" },
  ],
  tools: [
    { label: "Merit Database", href: "/merit" },
    { label: "Faculty Directory", href: "/teachers" },
    { label: "Programs Directory", href: "/programs" },
  ],
};
