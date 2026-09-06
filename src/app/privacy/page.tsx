export const metadata = { title: "Privacy Policy", description: "PakEdu Privacy Policy - How we handle your data." };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: August 2026</p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Information We Collect</h2>
          <p>PakEdu is designed to be used without requiring personal information. We do not require registration for using calculators, browsing universities, or accessing merit data. We may collect anonymized analytics data (page views, search queries) to improve our platform.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">How We Use Information</h2>
          <p>We use anonymized data to improve user experience, optimize content, and understand which tools are most useful. We never sell personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Cookies</h2>
          <p>We use essential cookies for platform functionality. We may use analytics cookies to understand usage patterns. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Third-Party Services</h2>
          <p>We may use third-party analytics services. These services may collect anonymized usage data as described in their respective privacy policies.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Data Accuracy</h2>
          <p>University data displayed on PakEdu is sourced from official university websites and public sources. We make efforts to ensure accuracy but cannot guarantee completeness. Always verify information from official university sources.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
          <p>For privacy-related inquiries, contact us at <a href="mailto:privacy@pakedu.pk" className="text-emerald-600 hover:underline">privacy@pakedu.pk</a>.</p>
        </section>
      </div>
    </div>
  );
}
