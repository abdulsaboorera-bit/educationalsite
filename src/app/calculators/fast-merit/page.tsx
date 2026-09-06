"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calculator, ChevronDown, ChevronUp } from "lucide-react";

export default function FASTMeritCalculator() {
  const [test, setTest] = useState(0);
  const [hssc, setHssc] = useState(0);
  const [ssc, setSsc] = useState(0);
  const [result, setResult] = useState<{aggregate: number; breakdown: {label: string; value: number}[]} | null>(null);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const calculate = () => {
    const testComp = test * 0.50;
    const hsscComp = hssc * 0.40;
    const sscComp = ssc * 0.10;
    const aggregate = testComp + hsscComp + sscComp;
    setResult({
      aggregate: Math.round(aggregate * 100) / 100,
      breakdown: [
        { label: "FAST Admission Test (50%)", value: Math.round(testComp * 100) / 100 },
        { label: "HSSC / Intermediate (40%)", value: Math.round(hsscComp * 100) / 100 },
        { label: "SSC / Matric (10%)", value: Math.round(sscComp * 100) / 100 },
      ],
    });
  };

  const faqs = [
    { q: "What is the FAST admission test?", a: "FAST conducts its own admission test (NCAT) covering Mathematics, English, and Analytical reasoning. It is the primary merit factor at 50% weightage." },
    { q: "Does FAST accept NTS NAT?", a: "FAST primarily uses its own NCAT test. However, for some programs, NTS NAT scores may be considered. Check the latest admissions policy." },
    { q: "What is a good score for FAST CS?", a: "For BS Computer Science at FAST, a test score above 75/100 is generally competitive. Closing merit varies by campus and year." },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: "FAST Merit Calculator" }]} />
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Calculator className="h-6 w-6" /></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">FAST Merit Calculator 2026</h1>
              <p className="text-sm text-slate-500">Calculate your FAST-NUCES aggregate using official NCAT weightage</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">How FAST Merit is Calculated</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            FAST-NUCES (National University of Computer & Emerging Sciences) uses its own admission test (NCAT) as the primary merit criterion. The official FAST merit formula is:
          </p>
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-sm text-emerald-800 mb-4">
            Aggregate = (NCAT Test × 50%) + (HSSC Marks × 40%) + (SSC Marks × 10%)
          </div>
          <p className="text-slate-600 leading-relaxed">
            FAST campuses include Islamabad, Lahore, Karachi, Peshawar, and Chiniot. Each campus may have different closing merits. The test pattern includes Mathematics, English, and Analytical sections.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Enter Your Marks</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input label="FAST NCAT Test Score (%)" type="number" min={0} max={100} value={test || ""} onChange={(e) => setTest(parseFloat(e.target.value) || 0)} placeholder="e.g. 75" />
                  <Input label="HSSC / Intermediate Percentage (%)" type="number" min={0} max={100} value={hssc || ""} onChange={(e) => setHssc(parseFloat(e.target.value) || 0)} placeholder="e.g. 82" />
                  <Input label="SSC / Matric Percentage (%)" type="number" min={0} max={100} value={ssc || ""} onChange={(e) => setSsc(parseFloat(e.target.value) || 0)} placeholder="e.g. 88" />
                  <Button onClick={calculate} className="w-full" size="lg">Calculate FAST Aggregate</Button>
                </div>
              </CardContent>
            </Card>
            {result && (
              <Card className="mt-6">
                <CardHeader><CardTitle>Your FAST Aggregate</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold text-emerald-600 mb-2">{result.aggregate}%</div>
                  </div>
                  <div className="space-y-2">
                    {result.breakdown.map((item) => (
                      <div key={item.label} className="flex justify-between p-3 rounded-lg bg-slate-50">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className="text-sm font-medium text-slate-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs text-amber-800"><strong>Note:</strong> This is an estimate. FAST merit varies by campus and program. Always verify from the official FAST website.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>FAST Merit Formula</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>NCAT Test</span><span className="font-bold">50%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>HSSC Marks</span><span className="font-bold">40%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>SSC Marks</span><span className="font-bold">10%</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>FAQ</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button onClick={() => setShowFaq(showFaq === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-50">
                        {faq.q}
                        {showFaq === i ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                      </button>
                      {showFaq === i && <div className="px-3 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-2">{faq.a}</div>}
                    </div>
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
