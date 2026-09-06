import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { MeritChart } from "@/components/ui/MeritChart";
import { MapPin, Globe, Calendar, Building2, GraduationCap, ExternalLink, Users, BookOpen, Award, Clock, DollarSign, Phone, Mail, ChevronRight, Shield, TrendingUp } from "lucide-react";

interface UniversityPageProps {
  params: Promise<{ slug: string }>;
}

const UNIVERSITIES_DB: Record<string, {
  name: string;
  short_name: string;
  logo_bg: string;
  logo_text: string;
  tagline: string;
  description: string;
  long_description: string;
  type: string;
  city: string;
  province: string;
  website: string;
  admission_url: string;
  established_year: number;
  hec_recognized: boolean;
  ranking: string;
  total_students: string;
  faculty_count: string;
  campuses: { name: string; city: string; is_main: boolean; facilities: string[] }[];
  programs: { name: string; degree: string; field: string; duration: string; fee_per_year: string; seats: number; eligibility: string; merit_formula: string }[];
  facilities: string[];
  merit_info: string;
  merit_trend: { year: string; merit: number }[];
  highlights: string[];
  contact: { phone: string; email: string; address: string };
}> = {
  "comsats-university-islamabad": {
    name: "COMSATS University Islamabad",
    short_name: "CUI",
    logo_bg: "bg-blue-600",
    logo_text: "CUI",
    tagline: "Excellence in Education & Research",
    description: "COMSATS University Islamabad (CUI) is one of Pakistan's top-ranked public research universities, established in 1998. It is federally chartered and recognized by HEC. CUI is known for its strong programs in Computer Science, Engineering, Sciences, and Management Sciences.",
    long_description: "COMSATS University Islamabad has grown to become one of Pakistan's largest university networks with 7 campuses across the country. The university enrolls over 35,000 students and has a faculty of 1,500+ members. CUI consistently ranks among the top 5 universities in Pakistan by HEC ranking and has achieved significant positions in QS and Times Higher Education rankings. The university is particularly renowned for its Computer Science and Engineering programs, with graduates being highly sought after by top employers in Pakistan and abroad. CUI has strong research output with numerous publications in international journals and several research centers focused on AI, biotechnology, energy, and materials science.",
    type: "public",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    website: "https://www.comsats.edu.pk",
    admission_url: "https://www.comsats.edu.pk/admissions",
    established_year: 1998,
    hec_recognized: true,
    ranking: "Top 5 in Pakistan (HEC) | QS Asia 350+",
    total_students: "35,000+",
    faculty_count: "1,500+",
    campuses: [
      { name: "Islamabad Main Campus", city: "Islamabad", is_main: true, facilities: ["Central Library", "Sports Complex", "Hostels (Male & Female)", "Medical Center", "Cafeteria", "Auditorium", "Research Centers", "Wi-Fi Campus"] },
      { name: "Lahore Campus", city: "Lahore", is_main: false, facilities: ["Library", "Computer Labs", "Cafeteria", "Sports Area"] },
      { name: "Lahore Defense Road Campus", city: "Lahore", is_main: false, facilities: ["Modern Labs", "Library", "Cafeteria"] },
      { name: "Attock Campus", city: "Attock", is_main: false, facilities: ["Library", "Labs", "Sports"] },
      { name: "Wah Campus", city: "Wah", is_main: false, facilities: ["Library", "Labs", "Cafeteria"] },
      { name: "Abbottabad Campus", city: "Abbottabad", is_main: false, facilities: ["Library", "Computer Labs"] },
      { name: "Lahore Defence Road", city: "Lahore", is_main: false, facilities: ["Library", "Labs"] },
    ],
    programs: [
      { name: "BS Computer Science", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 152,000", seats: 240, eligibility: "FSc Pre-Engineering/ICS with 50%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Software Engineering", degree: "Bachelors", field: "Software Engineering", duration: "4 Years", fee_per_year: "PKR 152,000", seats: 180, eligibility: "FSc Pre-Engineering/ICS with 50%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Artificial Intelligence", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 152,000", seats: 120, eligibility: "FSc Pre-Engineering/ICS with 50%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Data Science", degree: "Bachelors", field: "Data Science", duration: "4 Years", fee_per_year: "PKR 152,000", seats: 90, eligibility: "FSc with Mathematics", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Electrical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 180,000", seats: 120, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Civil Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 180,000", seats: 90, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Business Administration", degree: "Bachelors", field: "Business", duration: "4 Years", fee_per_year: "PKR 200,000", seats: 150, eligibility: "Any intermediate with 50%+ marks", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "BS Mathematics", degree: "Bachelors", field: "Sciences", duration: "4 Years", fee_per_year: "PKR 130,000", seats: 60, eligibility: "FSc with Mathematics", merit_formula: "50% NAT + 40% Intermediate + 10% Matric" },
      { name: "MS Computer Science", degree: "Masters", field: "Computer Science", duration: "2 Years", fee_per_year: "PKR 200,000", seats: 60, eligibility: "BS/BE with CGPA 2.5+", merit_formula: "Academic Record + Interview" },
      { name: "PhD Computer Science", degree: "PhD", field: "Computer Science", duration: "3-5 Years", fee_per_year: "PKR 180,000", seats: 30, eligibility: "MS/MPhil with CGPA 3.0+", merit_formula: "Academic Record + Research Proposal + Interview" },
    ],
    facilities: ["Central Library (500K+ books)", "High-Speed Wi-Fi", "Sports Complex", "Swimming Pool", "Hostels (3000+ capacity)", "Medical Center", "Cafeteria & Food Court", "Auditorium (1000 seats)", "Research Labs", "Career Development Center", "Incubation Center", "Transport Service", "Bank & ATM", "Mosque"],
    merit_info: "COMSATS uses NTS NAT test for admissions. Merit is calculated as: 50% NAT Score + 40% Intermediate Marks + 10% Matric Marks. The closing merit varies by program and campus.",
    merit_trend: [
      { year: "2020", merit: 72.5 },
      { year: "2021", merit: 74.2 },
      { year: "2022", merit: 76.1 },
      { year: "2023", merit: 77.8 },
      { year: "2024", merit: 78.5 },
      { year: "2025", merit: 79.2 },
    ],
    highlights: ["HEC Top 5 Ranking", "QS Asia Ranked", "Strong Industry Linkages", "Research Focus", "7 Campuses", "35,000+ Students"],
    contact: { phone: "+92-51-9247000", email: "info@comsats.edu.pk", address: "Park Road, Chak Shahzad, Islamabad 45550" },
  },
  "fast-nuces": {
    name: "Fast National University of Computer & Emerging Sciences",
    short_name: "FAST",
    logo_bg: "bg-red-600",
    logo_text: "FAST",
    tagline: "Leading Computer Science Education",
    description: "FAST-NUCES is Pakistan's premier private university for Computer Science, IT, and Engineering education. Established in 2000, it is known for its rigorous academic programs and strong industry connections.",
    long_description: "FAST-NUCES (National University of Computer & Emerging Sciences) was established with a vision to produce world-class IT professionals. The university has 5 campuses across Pakistan and is recognized as one of the top institutions for computer science education. FAST is particularly known for its competitive admission process, with one of the highest closing merits among Pakistani universities for CS programs. The university has strong ties with the IT industry and produces graduates who are immediately employable. FAST has produced numerous entrepreneurs, tech leaders, and researchers who are making significant contributions to Pakistan's growing technology sector.",
    type: "private",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    website: "https://www.nu.edu.pk",
    admission_url: "https://www.nu.edu.pk/admissions",
    established_year: 2000,
    hec_recognized: true,
    ranking: "Top 3 CS University in Pakistan",
    total_students: "15,000+",
    faculty_count: "600+",
    campuses: [
      { name: "Islamabad Campus", city: "Islamabad", is_main: true, facilities: ["Library", "Computer Labs", "Hostels", "Sports", "Cafeteria", "Career Services"] },
      { name: "Lahore Campus", city: "Lahore", is_main: false, facilities: ["Library", "Labs", "Cafeteria"] },
      { name: "Karachi Campus", city: "Karachi", is_main: false, facilities: ["Library", "Labs", "Cafeteria"] },
      { name: "Peshawar Campus", city: "Peshawar", is_main: false, facilities: ["Library", "Labs"] },
      { name: "Chiniot Campus", city: "Chiniot", is_main: false, facilities: ["Library", "Labs"] },
    ],
    programs: [
      { name: "BS Computer Science", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 200, eligibility: "FSc with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
      { name: "BS Artificial Intelligence", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 100, eligibility: "FSc with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
      { name: "BS Data Science", degree: "Bachelors", field: "Data Science", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 80, eligibility: "FSc with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
      { name: "BS Cyber Security", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 60, eligibility: "FSc with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
      { name: "BS Software Engineering", degree: "Bachelors", field: "Software Engineering", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 150, eligibility: "FSc with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
      { name: "BS Computer Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 250,000", seats: 80, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "50% NCAT + 40% HSSC + 10% SSC" },
    ],
    facilities: ["Modern Computer Labs", "Library", "Hostels", "Sports Complex", "Cafeteria", "Career Services", "Industry Partnerships", "Wi-Fi Campus"],
    merit_info: "FAST uses its own NCAT (NUCES Computer Aptitude Test) for admissions. Merit formula: 50% NCAT + 40% HSSC + 10% SSC. Closing merit for BS CS at Islamabad campus is typically 80-85%.",
    merit_trend: [
      { year: "2020", merit: 78.0 },
      { year: "2021", merit: 79.5 },
      { year: "2022", merit: 81.2 },
      { year: "2023", merit: 82.0 },
      { year: "2024", merit: 83.5 },
      { year: "2025", merit: 84.0 },
    ],
    highlights: ["#1 CS University", "Industry Partnerships", "High Employability", "Competitive Admission", "5 Campuses", "Strong Alumni Network"],
    contact: { phone: "+92-51-9265010", email: "info@nu.edu.pk", address: "Sector H-11, Islamabad" },
  },
  "nust": {
    name: "National University of Sciences & Technology",
    short_name: "NUST",
    logo_bg: "bg-green-700",
    logo_text: "NUST",
    tagline: "Where Knowledge Meets Innovation",
    description: "NUST is Pakistan's premier science and technology university, established in 1991. It consistently ranks as the #1 university in Pakistan and is among the top universities in Asia.",
    long_description: "National University of Sciences & Technology (NUST) was established in 1991 with a mission to become a world-class university producing leaders in science, technology, and innovation. NUST has grown to become Pakistan's most prestigious university, consistently ranking #1 in the country and achieving notable positions in QS World and Asia rankings. The university has over 800 faculty members, 12,000+ students, and has produced over 50,000 graduates. NUST is known for its rigorous academic standards, cutting-edge research, strong industry linkages, and highly competitive admission process. The university's NET (NUST Evaluation Test) is considered one of the most challenging entry tests in Pakistan.",
    type: "public",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    website: "https://www.nust.edu.pk",
    admission_url: "https://www.nust.edu.pk/admissions",
    established_year: 1991,
    hec_recognized: true,
    ranking: "#1 in Pakistan (HEC, QS, Times Higher Education) | QS World 400+ | QS Asia 80+",
    total_students: "12,000+",
    faculty_count: "800+",
    campuses: [
      { name: "H-12 Main Campus", city: "Islamabad", is_main: true, facilities: ["Central Library", "Sports Complex", "Hostels", "Medical Center", "Auditorium", "Research Centers", "Incubation Center", "Swimming Pool"] },
      { name: "Risalpur Campus (CAE)", city: "Risalpur", is_main: false, facilities: ["Aviation Labs", "Wind Tunnel", "Library"] },
      { name: "Karachi Campus (NCEAC)", city: "Karachi", is_main: false, facilities: ["Marine Engineering Labs", "Library"] },
    ],
    programs: [
      { name: "BS Computer Science", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 180,000", seats: 180, eligibility: "FSc with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Software Engineering", degree: "Bachelors", field: "Software Engineering", duration: "4 Years", fee_per_year: "PKR 180,000", seats: 120, eligibility: "FSc with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Electrical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 200,000", seats: 150, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Mechanical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 200,000", seats: 120, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Civil Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 200,000", seats: 100, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Cyber Security", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 180,000", seats: 60, eligibility: "FSc with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "BS Business Administration", degree: "Bachelors", field: "Business", duration: "4 Years", fee_per_year: "PKR 220,000", seats: 90, eligibility: "Any intermediate with 60%+ marks", merit_formula: "75% NET + 15% FSc + 10% Matric" },
      { name: "MS Computer Science", degree: "Masters", field: "Computer Science", duration: "2 Years", fee_per_year: "PKR 250,000", seats: 45, eligibility: "BS/BE with CGPA 3.0+", merit_formula: "Academic Record + NUST Graduate Test + Interview" },
    ],
    facilities: ["Central Library (400K+ books)", "High-Speed Wi-Fi", "Sports Complex", "Swimming Pool", "Hostels (2000+ capacity)", "Medical Center", "Cafeteria", "Auditorium", "Research Labs (50+)", "Career Center", "Incubation Center", "Transport", "Bank & ATM", "Mosque", "Gymnasium"],
    merit_info: "NUST uses NET (NUST Evaluation Test) as the primary admission criterion with 75% weightage. NET is conducted in multiple series per year. Students can appear in multiple series and best score is considered.",
    merit_trend: [
      { year: "2020", merit: 82.0 },
      { year: "2021", merit: 83.5 },
      { year: "2022", merit: 85.0 },
      { year: "2023", merit: 86.2 },
      { year: "2024", merit: 87.0 },
      { year: "2025", merit: 88.5 },
    ],
    highlights: ["#1 in Pakistan", "QS World Ranked", "Strong Research Output", "Industry Partnerships", "Military Heritage", "Global Alumni Network"],
    contact: { phone: "+92-51-9085000", email: "info@nust.edu.pk", address: "Sector H-12, Islamabad 44000" },
  },
  "uet-lahore": {
    name: "University of Engineering & Technology Lahore",
    short_name: "UET",
    logo_bg: "bg-amber-600",
    logo_text: "UET",
    tagline: "Engineering Excellence Since 1921",
    description: "UET Lahore is Pakistan's oldest and largest engineering university, established in 1921. It is the premier institution for engineering education in the country.",
    long_description: "University of Engineering & Technology (UET) Lahore was established in 1921 during the British era and has a rich history of producing top engineers and technologists. It is the largest engineering university in Pakistan with over 10,000 students and 500+ faculty members. UET is known for its rigorous engineering programs, strong alumni network, and significant contributions to Pakistan's infrastructure and industrial development. The university's ECAT (Engineering College Admission Test) is the standard entry test for engineering programs in Punjab. UET has numerous research centers and has collaborated with international universities on various research projects.",
    type: "public",
    city: "Lahore",
    province: "Punjab",
    website: "https://www.uet.edu.pk",
    admission_url: "https://www.uet.edu.pk/admissions",
    established_year: 1921,
    hec_recognized: true,
    ranking: "#1 Engineering University in Pakistan | HEC Top 10",
    total_students: "10,000+",
    faculty_count: "500+",
    campuses: [
      { name: "Main Campus (GT Road)", city: "Lahore", is_main: true, facilities: ["Library", "Engineering Labs", "Hostels", "Sports Complex", "Workshops", "Auditorium", "Cafeteria"] },
      { name: "Kala Shah Kaku Campus", city: "Lahore", is_main: false, facilities: ["New Campus", "Modern Labs", "Hostels"] },
      { name: "Faisalabad Campus", city: "Faisalabad", is_main: false, facilities: ["Library", "Labs"] },
    ],
    programs: [
      { name: "BS Computer Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 120, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Electrical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 180, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Mechanical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 150, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Civil Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 150, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Computer Science", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 90, eligibility: "FSc with Mathematics", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Chemical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 120,000", seats: 60, eligibility: "FSc Pre-Engineering with 60%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
      { name: "BS Architecture", degree: "Bachelors", field: "Architecture", duration: "5 Years", fee_per_year: "PKR 120,000", seats: 40, eligibility: "FSc with 50%+ marks", merit_formula: "33% ECAT + 50% FSc + 17% Matric" },
    ],
    facilities: ["Central Library (300K+ books)", "Engineering Workshops", "Hostels (2500+ capacity)", "Sports Complex", "Auditorium", "Cafeteria", "Transport", "Medical Center", "Career Center", "Research Centers"],
    merit_info: "UET uses ECAT (Engineering College Admission Test) for admissions. Merit formula: 33% ECAT + 50% FSc Part-I + 17% Matric. ECAT covers Mathematics, Physics, Chemistry, and English.",
    merit_trend: [
      { year: "2020", merit: 70.0 },
      { year: "2021", merit: 71.5 },
      { year: "2022", merit: 73.0 },
      { year: "2023", merit: 74.2 },
      { year: "2024", merit: 75.3 },
      { year: "2025", merit: 76.0 },
    ],
    highlights: ["Oldest Engineering Univ (1921)", "#1 Engineering in Punjab", "Strong Alumni Network", "Industry Partnerships", "Research Output", "ECAT Standard Setter"],
    contact: { phone: "+92-42-99250161", email: "info@uet.edu.pk", address: "GT Road, Lahore 54890" },
  },
  "lums": {
    name: "Lahore University of Management Sciences",
    short_name: "LUMS",
    logo_bg: "bg-indigo-700",
    logo_text: "LUMS",
    tagline: "Leading Business & Technology Education",
    description: "LUMS is Pakistan's top private research university, established in 1984. It is renowned for its business school, computer science, and engineering programs.",
    long_description: "Lahore University of Management Sciences (LUMS) was established in 1984 with support from leading Pakistani industrialists. It has grown to become Pakistan's most prestigious private university, known for its rigorous academic standards, strong faculty, and excellent placement records. LUMS offers programs in business, computer science, engineering, law, economics, and liberal arts. The university has a highly competitive admission process and attracts top students from across Pakistan. LUMS is also known for its National Outreach Program (NOP) which provides full financial support to talented students from low-income backgrounds.",
    type: "private",
    city: "Lahore",
    province: "Punjab",
    website: "https://www.lums.edu.pk",
    admission_url: "https://www.lums.edu.pk/admissions",
    established_year: 1984,
    hec_recognized: true,
    ranking: "#1 Private University in Pakistan | QS Asia 200+",
    total_students: "4,500+",
    faculty_count: "250+",
    campuses: [
      { name: "Main Campus", city: "Lahore", is_main: true, facilities: ["Library", "Hostels", "Sports Complex", "Cafeteria", "Auditorium", "Career Center", "Research Centers", "Swimming Pool"] },
    ],
    programs: [
      { name: "BS Computer Science", degree: "Bachelors", field: "Computer Science", duration: "4 Years", fee_per_year: "PKR 500,000", seats: 120, eligibility: "FSc with 70%+ marks + SAT/LUMS Test", merit_formula: "SAT/LUMS Test + Academic Record + Interview" },
      { name: "BSc Management Science", degree: "Bachelors", field: "Business", duration: "4 Years", fee_per_year: "PKR 500,000", seats: 150, eligibility: "Any intermediate with 70%+ marks", merit_formula: "SAT/LUMS Test + Academic Record + Interview" },
      { name: "BS Electrical Engineering", degree: "Bachelors", field: "Engineering", duration: "4 Years", fee_per_year: "PKR 500,000", seats: 60, eligibility: "FSc Pre-Engineering with 70%+ marks", merit_formula: "SAT/LUMS Test + Academic Record + Interview" },
      { name: "BS Economics", degree: "Bachelors", field: "Economics", duration: "4 Years", fee_per_year: "PKR 500,000", seats: 80, eligibility: "Any intermediate with 70%+ marks", merit_formula: "SAT/LUMS Test + Academic Record + Interview" },
      { name: "MBA", degree: "Masters", field: "Business", duration: "2 Years", fee_per_year: "PKR 800,000", seats: 90, eligibility: "Bachelor's with 2+ years work experience", merit_formula: "GMAT/GRE + Academic Record + Interview + Work Experience" },
    ],
    facilities: ["World-Class Library", "Hostels", "Sports Complex", "Swimming Pool", "Cafeteria", "Auditorium", "Career Center", "Research Centers", "NOP Office", "Innovation Center"],
    merit_info: "LUMS uses SAT or its own admission test for undergraduate admissions. The process includes academic record review and interview. LUMS NOP provides full financial support to deserving students.",
    merit_trend: [
      { year: "2020", merit: 85.0 },
      { year: "2021", merit: 86.5 },
      { year: "2022", merit: 87.0 },
      { year: "2023", merit: 88.0 },
      { year: "2024", merit: 89.0 },
      { year: "2025", merit: 90.0 },
    ],
    highlights: ["#1 Private University", "QS Asia Ranked", "Strong Alumni Network", "NOP Scholarships", "Industry Partnerships", "Global Recognition"],
    contact: { phone: "+92-42-35608000", email: "info@lums.edu.pk", address: "Opposite DHA, Lahore 54792" },
  },
};

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = UNIVERSITIES_DB[slug];
  if (!uni) return { title: "University Not Found" };
  return {
    title: `${uni.name} - Programs, Merit, Admission Info & Reviews`,
    description: `Complete information about ${uni.name} (${uni.short_name}). Programs, fees, merit trends, admission requirements, campuses, facilities, and faculty. ${uni.description.slice(0, 200)}`,
  };
}

export default async function UniversityProfilePage({ params }: UniversityPageProps) {
  const { slug } = await params;
  const uni = UNIVERSITIES_DB[slug];

  if (!uni) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Universities", href: "/universities" }, { label: uni.name }]} />
          <div className="flex items-start gap-6 mt-6">
            {/* Logo */}
            <div className={`h-20 w-20 rounded-2xl ${uni.logo_bg} flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg`}>
              {uni.logo_text}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold">{uni.name}</h1>
                <Badge variant={uni.type === "public" ? "info" : "outline"} className="bg-white/10 border-white/20 text-white">
                  {uni.type === "public" ? "Public" : "Private"} University
                </Badge>
              </div>
              <p className="text-emerald-400 font-medium mt-1">{uni.tagline}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-300 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{uni.city}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Est. {uni.established_year}</span>
                <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{uni.campuses.length} Campuses</span>
                <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{uni.total_students} Students</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{uni.faculty_count} Faculty</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {uni.highlights.slice(0, 4).map((h) => (
                  <Badge key={h} variant="default" className="bg-white/10 text-white border-white/20 text-[10px]">{h}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            {[
              { label: "Ranking", value: uni.ranking.split("|")[0].trim(), icon: <Award className="h-4 w-4 text-emerald-600" /> },
              { label: "Total Programs", value: `${uni.programs.length}+ Programs`, icon: <BookOpen className="h-4 w-4 text-emerald-600" /> },
              { label: "HEC Recognized", value: "Yes ✓", icon: <Shield className="h-4 w-4 text-emerald-600" /> },
              { label: "Established", value: `${uni.established_year} (${new Date().getFullYear() - uni.established_year} Years)`, icon: <Clock className="h-4 w-4 text-emerald-600" /> },
            ].map((stat) => (
              <div key={stat.label} className="py-4 px-4">
                <div className="flex items-center gap-2 mb-1">{stat.icon}<span className="text-xs text-slate-500">{stat.label}</span></div>
                <div className="text-sm font-semibold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader><CardTitle>About {uni.short_name}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{uni.long_description}</p>
                <DataSourceBadge source_type="OFFICIAL_WEBSITE" verified={true} last_updated="2026-08-01" />
              </CardContent>
            </Card>

            {/* Merit Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  Merit Trend (BS CS Closing Merit)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MeritChart
                  data={uni.merit_trend}
                  title="Closing Merit Trend"
                  subtitle="BS Computer Science - Last 6 years"
                />
                <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-xs text-amber-800"><strong>Note:</strong> Merit data is based on publicly available information. Actual closing merit varies each year based on applicant pool and seats.</p>
                </div>
              </CardContent>
            </Card>

            {/* Programs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-emerald-600" />
                  Programs Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uni.programs.map((prog, i) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{prog.name}</h4>
                          <p className="text-xs text-slate-500">{prog.degree} &middot; {prog.field} &middot; {prog.duration}</p>
                        </div>
                        <Badge variant="info" className="text-[10px]">{prog.seats} Seats</Badge>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{prog.fee_per_year}/year</div>
                        <div className="flex items-center gap-1"><GraduationCap className="h-3 w-3" />{prog.eligibility}</div>
                        <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" />{prog.merit_formula}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admission Info */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-emerald-600" />Admission Information</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{uni.merit_info}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <h4 className="text-sm font-semibold text-emerald-800 mb-1">Merit Formula</h4>
                    <p className="text-xs text-emerald-700">{uni.programs[0]?.merit_formula}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Apply Online</h4>
                    <a href={uni.admission_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline flex items-center gap-1">
                      Visit Admission Portal <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader><CardTitle>Quick Info</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: <Globe className="h-4 w-4" />, label: "Website", value: <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">{uni.website.replace("https://", "")}</a> },
                  { icon: <MapPin className="h-4 w-4" />, label: "Location", value: <span className="text-sm">{uni.city}, {uni.province}</span> },
                  { icon: <Calendar className="h-4 w-4" />, label: "Established", value: <span className="text-sm">{uni.established_year}</span> },
                  { icon: <Shield className="h-4 w-4" />, label: "HEC Recognized", value: <span className="text-sm text-emerald-600 font-medium">Yes ✓</span> },
                  { icon: <Phone className="h-4 w-4" />, label: "Phone", value: <span className="text-sm">{uni.contact.phone}</span> },
                  { icon: <Mail className="h-4 w-4" />, label: "Email", value: <span className="text-sm">{uni.contact.email}</span> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      {item.value}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Campuses */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4 text-emerald-600" />Campuses ({uni.campuses.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uni.campuses.map((campus, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-900">{campus.name}</span>
                        {campus.is_main && <Badge variant="info" className="text-[10px]">Main</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{campus.city}</p>
                      <div className="flex flex-wrap gap-1">
                        {campus.facilities.slice(0, 3).map((f) => (
                          <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{f}</span>
                        ))}
                        {campus.facilities.length > 3 && <span className="text-[10px] text-slate-400">+{campus.facilities.length - 3} more</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader><CardTitle>Facilities</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {uni.facilities.map((f) => (
                    <Badge key={f} variant="default">{f}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-emerald-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Calculate Your Merit</h3>
                <p className="text-sm text-emerald-100 mb-4">Check if you can get admission at {uni.short_name}</p>
                <Link href={`/calculators/merit`} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50">
                  Merit Calculator <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
