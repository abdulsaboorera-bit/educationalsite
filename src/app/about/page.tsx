export const metadata = {
  title: "About PakEdu - Student Education Platform",
  description: "PakEdu is a comprehensive education platform for students, helping them discover universities, calculate merit, and plan their academic future.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">About PakEdu</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            PakEdu is a comprehensive education platform built for students. Our mission is to help students make informed decisions about their academic future by providing accurate, sourced, and up-to-date information about universities, programs, merit, and admissions.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            We believe every student deserves access to reliable information about educational opportunities. Whether you are calculating your MDCAT aggregate, comparing universities, or looking for admission deadlines, PakEdu aims to be your trusted companion.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Data Accuracy</h2>
          <p className="text-slate-600 leading-relaxed">
            Every important data point on PakEdu is sourced from official university websites, HEC databases, or verified community reports. We clearly mark the source and verification status of all information.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
          <p className="text-slate-600">
            For inquiries, corrections, or partnership opportunities, please reach out to us at{" "}
            <a href="mailto:hello@pakedu.pk" className="text-emerald-600 hover:text-emerald-700">
              hello@pakedu.pk
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
