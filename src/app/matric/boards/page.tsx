import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { boards, getProvincesWithBoards } from "@/lib/matric/boards";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { MapPin, ExternalLink, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Educational Boards in Pakistan - Matric & Intermediate",
  description: "Complete list of all educational boards in Pakistan. Find your board for matric and intermediate examinations. Punjab, KPK, Sindh, Balochistan, Federal, and AJK boards.",
  keywords: [
    "educational boards pakistan", "board list", "BISE", "matric board", "intermediate board",
    "lahore board", "karachi board", "peshawar board", "fbise",
  ],
  openGraph: {
    title: "All Educational Boards in Pakistan - Matric & Intermediate",
    description: "Complete directory of all educational boards in Pakistan for matric and intermediate examinations.",
    url: `${SITE_CONFIG.url}/matric/boards`,
  },
};

const FAQS = [
  {
    question: "How many educational boards are there in Pakistan?",
    answer: "There are over 26 educational boards in Pakistan across different provinces and regions, including Punjab (9 boards), KPK (8 boards), Sindh (5 boards), Balochistan (1 board), Federal (1 board), and AJK (1 board).",
  },
  {
    question: "Which is the largest board in Pakistan?",
    answer: "BISE Lahore is one of the oldest and largest boards in Pakistan, covering Lahore, Kasur, Sheikhupura, and Nankana Sahib districts.",
  },
  {
 question: "How do I find which board I belong to?",
    answer: "Your board is determined by your school's location. Each board has specific jurisdiction areas. Check the board list below to find which board covers your district.",
  },
];

export default function BoardsPage() {
  const provinces = getProvincesWithBoards();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "Boards", href: "/matric/boards" },
  ]);
  const faqSchema = generateFAQSchema(FAQS);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Matric", href: "/matric" }, { label: "Boards" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">
            Educational Boards in Pakistan
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Find your educational board for matric and intermediate examinations. Each board has
            its own jurisdiction, examination schedule, and results.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span>{boards.length} boards across Pakistan</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {provinces.map((province) => (
          <section key={province.slug}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                {province.abbreviation}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{province.name}</h2>
                <p className="text-sm text-slate-500">{province.boards.length} board{province.boards.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {province.boards.map((board) => (
                <Link
                  key={board.slug}
                  href={`/matric/boards/${board.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{board.short_name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{board.city}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Est. {board.established}</span>
                    <a
                      href={board.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700"
                    >
                      Official Site <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
