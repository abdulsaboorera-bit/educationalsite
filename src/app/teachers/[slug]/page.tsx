import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Building2, BookOpen, Award, ExternalLink, Mail, Globe } from "lucide-react";

interface TeacherPageProps {
  params: Promise<{ slug: string }>;
}

const TEACHERS_DB: Record<string, {
  name: string;
  designation: string;
  department: string;
  university: string;
  university_slug: string;
  campus: string;
  photo_url: string;
  email: string;
  profile_url: string;
  research: string[];
  courses: string[];
  publications: { title: string; journal: string; year: number }[];
  education: { degree: string; institution: string; year: string }[];
  experience: string;
  bio: string;
}> = {
  "dr-ahmed-khan": {
    name: "Dr. Ahmed Khan",
    designation: "Professor",
    department: "Computer Science",
    university: "COMSATS University Islamabad",
    university_slug: "comsats-university-islamabad",
    campus: "Islamabad Main Campus",
    photo_url: "",
    email: "ahmed.khan@comsats.edu.pk",
    profile_url: "https://comsats.edu.pk/faculty/ahmed-khan",
    research: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing", "Deep Learning"],
    courses: ["Data Structures & Algorithms", "Artificial Intelligence", "Machine Learning", "Computer Vision"],
    publications: [
      { title: "Deep Learning Approaches for Urdu Text Classification", journal: "IEEE Access", year: 2025 },
      { title: "NLP Techniques for Low-Resource Languages", journal: "ACM Computing Surveys", year: 2024 },
      { title: "Convolutional Neural Networks for Image Recognition", journal: "Pattern Recognition", year: 2023 },
      { title: "Transfer Learning in Computer Vision Applications", journal: "Neural Computing", year: 2022 },
    ],
    education: [
      { degree: "PhD Computer Science", institution: "NUST", year: "2012" },
      { degree: "MS Computer Science", institution: "COMSATS", year: "2008" },
      { degree: "BS Computer Science", institution: "Punjab University", year: "2005" },
    ],
    experience: "14+ years",
    bio: "Dr. Ahmed Khan is a Professor of Computer Science at COMSATS University Islamabad with over 14 years of teaching and research experience. His research focuses on artificial intelligence, machine learning, and their applications in solving real-world problems. He has published over 40 research papers in national and international journals.",
  },
  "dr-fatima-noor": {
    name: "Dr. Fatima Noor",
    designation: "Associate Professor",
    department: "Software Engineering",
    university: "COMSATS University Islamabad",
    university_slug: "comsats-university-islamabad",
    campus: "Islamabad Main Campus",
    photo_url: "",
    email: "fatima.noor@comsats.edu.pk",
    profile_url: "https://comsats.edu.pk/faculty/fatima-noor",
    research: ["Software Architecture", "DevOps", "Cloud Computing", "Agile Methodologies"],
    courses: ["Software Design & Architecture", "Software Project Management", "DevOps Engineering", "Cloud Computing"],
    publications: [
      { title: "Microservices Architecture Patterns for Enterprise Applications", journal: "Journal of Systems and Software", year: 2025 },
      { title: "Agile Practices in Distributed Teams", journal: "IEEE Software", year: 2024 },
    ],
    education: [
      { degree: "PhD Software Engineering", institution: "UET Lahore", year: "2015" },
      { degree: "MS Software Engineering", institution: "COMSATS", year: "2011" },
    ],
    experience: "12+ years",
    bio: "Dr. Fatima Noor is an Associate Professor specializing in software engineering practices and cloud-native application development.",
  },
};

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const { slug } = await params;
  const teacher = TEACHERS_DB[slug];
  if (!teacher) return { title: "Teacher Not Found" };
  return {
    title: `${teacher.name} - ${teacher.department} - ${teacher.university}`,
    description: `${teacher.name}, ${teacher.designation} at ${teacher.university}. Research: ${teacher.research.join(", ")}`,
  };
}

export default async function TeacherProfilePage({ params }: TeacherPageProps) {
  const { slug } = await params;
  const teacher = TEACHERS_DB[slug];
  if (!teacher) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Teachers", href: "/teachers" },
              { label: teacher.name },
            ]}
          />
          <div className="flex items-start gap-6 mt-6">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-3xl font-bold text-emerald-600 shrink-0">
              {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{teacher.name}</h1>
              <p className="text-emerald-600 font-medium">{teacher.designation}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 flex-wrap">
                <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{teacher.department}</span>
                <Link href={`/universities/${teacher.university_slug}`} className="flex items-center gap-1 hover:text-emerald-600">
                  <Globe className="h-3.5 w-3.5" />{teacher.university}
                </Link>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{teacher.campus}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="info">{teacher.experience} Experience</Badge>
                <a href={teacher.profile_url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                  Official Profile <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>About</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-slate-600 leading-relaxed">{teacher.bio}</p></CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-emerald-600" />Courses Taught</CardTitle></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-2">
                  {teacher.courses.map((c) => (
                    <div key={c} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-700">{c}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-4 w-4 text-emerald-600" />Selected Publications</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teacher.publications.map((pub, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{pub.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{pub.journal} &middot; {pub.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><Mail className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-sm font-medium text-slate-900">{teacher.email}</div>
                  </div>
                </div>
                <a href={teacher.profile_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><Globe className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs text-slate-500">Official Profile</div>
                    <div className="text-sm font-medium text-emerald-600">View Profile</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teacher.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">{edu.degree}</div>
                        <div className="text-xs text-slate-500">{edu.institution} &middot; {edu.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Research Interests</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacher.research.map((r) => (
                    <Badge key={r} variant="default">{r}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
