export const metadata = {
  title: "Contact Us - PakEdu",
  description: "Get in touch with the PakEdu team for inquiries, corrections, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a question, suggestion, or found incorrect data? We would love to hear from you.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-2">General Inquiries</h3>
            <p className="text-sm text-slate-500 mb-3">For general questions about the platform</p>
            <a href="mailto:hello@pakedu.pk" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              hello@pakedu.pk
            </a>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Data Corrections</h3>
            <p className="text-sm text-slate-500 mb-3">Report incorrect or outdated information</p>
            <a href="mailto:data@pakedu.pk" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              data@pakedu.pk
            </a>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Partnerships</h3>
            <p className="text-sm text-slate-500 mb-3">University and business partnerships</p>
            <a href="mailto:partners@pakedu.pk" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              partners@pakedu.pk
            </a>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Bug Reports</h3>
            <p className="text-sm text-slate-500 mb-3">Report technical issues</p>
            <a href="mailto:bugs@pakedu.pk" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              bugs@pakedu.pk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
