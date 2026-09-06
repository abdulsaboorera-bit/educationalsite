export const metadata = { title: "Terms of Service", description: "PakEdu Terms of Service." };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-500">Last updated: August 2026</p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Acceptance of Terms</h2>
          <p>By using PakEdu, you agree to these terms. If you do not agree, please do not use the platform.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Platform Purpose</h2>
          <p>PakEdu provides educational tools, university information, and merit calculation services. Our calculators provide estimates based on published formulas. These are not official university calculations.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Data Disclaimer</h2>
          <p>University data (programs, fees, merit, faculty) is sourced from official websites and public sources. We display the source and last-updated date for transparency. Information may become outdated. Always verify from official university sources before making admission decisions.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Calculator Disclaimer</h2>
          <p>Our calculators use published university formulas. Results are estimates. Actual merit calculations are performed by universities using their own processes. We are not responsible for admission decisions based on our calculator results.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Intellectual Property</h2>
          <p>PakEdu content, design, and code are proprietary. University names, logos, and data belong to their respective institutions.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Limitation of Liability</h2>
          <p>PakEdu is provided as-is. We are not liable for any decisions made based on information displayed on this platform.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
          <p>For terms-related inquiries, contact us at <a href="mailto:legal@pakedu.pk" className="text-emerald-600 hover:underline">legal@pakedu.pk</a>.</p>
        </section>
      </div>
    </div>
  );
}
