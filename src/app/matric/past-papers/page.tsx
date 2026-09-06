import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getProvincesWithBoards } from "@/lib/matric/boards";
import { classes } from "@/lib/matric/classes";

export const metadata: Metadata = {
  title: "Matric Past Papers - All Boards | PakEdu",
  description:
    "Access past papers for all Matric subjects across Pakistani boards. Download free past papers for Class 9 and Class 10, Science and Arts groups.",
  alternates: { canonical: "https://pakedu.pk/matric/past-papers" },
  openGraph: {
    title: "Matric Past Papers - All Boards | PakEdu",
    description: "Access past papers for all Matric subjects across Pakistani boards.",
    url: "https://pakedu.pk/matric/past-papers",
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function PastPapersPage() {
  const provinces = getProvincesWithBoards();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Past Papers" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Matric Past Papers
          </h1>
          <p className="text-blue-100 mt-2 max-w-2xl text-lg">
            Access past papers for all subjects. Prepare better with real exam
            papers from previous years.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            How to Use Past Papers
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Select Board</p>
                <p>Choose your education board from the list below.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Choose Class & Subject</p>
                <p>Pick Class 9 or 10 and the subject you need papers for.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Download Papers</p>
                <p>View and download past papers with marking schemes.</p>
              </div>
            </div>
          </div>
        </div>

        {provinces.map((province) => (
          <div key={province.slug} className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {province.name} Boards
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {province.boards.map((board) => (
                <Link
                  key={board.slug}
                  href={`/matric/past-papers/${board.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-slate-900">{board.short_name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{board.name}</p>
                  <div className="flex gap-2 mt-3">
                    {classes.map((cls) => (
                      <span
                        key={cls.level}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        Class {cls.level}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
