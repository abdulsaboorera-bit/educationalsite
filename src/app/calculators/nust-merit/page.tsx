"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";

export default function NUSTMeritCalculator() {
  const [net, setNet] = useState(0);
  const [fsc, setFsc] = useState(0);
  const [matric, setMatric] = useState(0);
  const [result, setResult] = useState<{aggregate: number; breakdown: {label: string; value: number}[]} | null>(null);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const calculate = () => {
    const netComponent = net * 0.75;
    const fscComponent = fsc * 0.15;
    const matricComponent = matric * 0.10;
    const aggregate = netComponent + fscComponent + matricComponent;
    setResult({
      aggregate: Math.round(aggregate * 100) / 100,
      breakdown: [
        { label: "NET Score (75%)", value: Math.round(netComponent * 100) / 100 },
        { label: "FSc Marks (15%)", value: Math.round(fscComponent * 100) / 100 },
        { label: "Matric Marks (10%)", value: Math.round(matricComponent * 100) / 100 },
      ],
    });
  };

  const faqs = [
    { q: "What is NUST NET?", a: "NUST NET (National Evaluation Test) is NUST's own admission test. It is the primary factor in NUST merit calculation, weighted at 75%." },
    { q: "How many times can I appear in NET?", a: "NUST conducts NET in multiple series throughout the year. Students can appear in multiple series, and the best score is considered." },
    { q: "What is a good NET score for CS at NUST?", a: "For BS Computer Science at NUST SEECS, a NET score above 140/200 is generally competitive. The closing merit varies each year." },
    { q: "Does NUST consider Matric marks?", a: "Yes, NUST considers Matric marks at 10% weightage in the final aggregate calculation." },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: "NUST Merit Calculator" }]} />
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">NUST Merit Calculator 2026</h1>
              <p className="text-sm text-slate-500">Calculate your NUST aggregate using the official NET weightage formula</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO Content */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">How NUST Merit is Calculated</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            NUST (National University of Sciences & Technology) uses its own admission test called NET (National Evaluation Test) as the primary merit criterion. The official NUST merit formula is:
          </p>
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-sm text-emerald-800 mb-4">
            Aggregate = (NET Score × 75%) + (FSc Marks × 15%) + (Matric Marks × 10%)
          </div>
          <p className="text-slate-600 leading-relaxed">
            NUST NET is conducted in multiple series per year. Your best NET score is used for merit calculation. The test covers Mathematics/Physics/Chemistry (for Engineering) or English/Mathematics/Analytical (for CS programs).
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Enter Your Marks</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input label="NET Score (out of 200)" type="number" min={0} max={200} value={net || ""} onChange={(e) => setNet(parseFloat(e.target.value) || 0)} placeholder="e.g. 150" />
                  <Input label="FSc Percentage (%)" type="number" min={0} max={100} value={fsc || ""} onChange={(e) => setFsc(parseFloat(e.target.value) || 0)} placeholder="e.g. 85" />
                  <Input label="Matric Percentage (%)" type="number" min={0} max={100} value={matric || ""} onChange={(e) => setMatric(parseFloat(e.target.value) || 0)} placeholder="e.g. 90" />
                  <Button onClick={calculate} className="w-full" size="lg">Calculate NUST Aggregate</Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="mt-6">
                <CardHeader><CardTitle>Your NUST Aggregate</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold text-emerald-600 mb-2">{result.aggregate}%</div>
                    <p className="text-sm text-slate-500">Your calculated NUST aggregate</p>
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
                    <p className="text-xs text-amber-800">
                      <strong>Note:</strong> This is an estimate. Actual merit depends on applicant pool and seat availability. Always verify from the official NUST website.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>NUST Merit Formula</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>NET Test</span><span className="font-bold">75%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>FSc Marks</span><span className="font-bold">15%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Matric Marks</span><span className="font-bold">10%</span></div>
                </div>
                <div className="mt-3 p-2 bg-emerald-50 rounded text-xs text-emerald-700">
                  Source: NUST Official Admission Policy
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

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    NUST merit formulas and weightages are subject to change. Always verify from the official NUST admissions page before making decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
