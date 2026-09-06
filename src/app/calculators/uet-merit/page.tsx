"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calculator, ChevronDown, ChevronUp } from "lucide-react";

export default function UETMeritCalculator() {
  const [ecat, setEcat] = useState(0);
  const [fsc, setFsc] = useState(0);
  const [matric, setMatric] = useState(0);
  const [result, setResult] = useState<{aggregate: number; breakdown: {label: string; value: number}[]} | null>(null);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const calculate = () => {
    const ecatComp = ecat * 0.33;
    const fscComp = fsc * 0.50;
    const matricComp = matric * 0.17;
    const aggregate = ecatComp + fscComp + matricComp;
    setResult({
      aggregate: Math.round(aggregate * 100) / 100,
      breakdown: [
        { label: "ECAT Score (33%)", value: Math.round(ecatComp * 100) / 100 },
        { label: "FSc Part-I (50%)", value: Math.round(fscComp * 100) / 100 },
        { label: "Matric (17%)", value: Math.round(matricComp * 100) / 100 },
      ],
    });
  };

  const faqs = [
    { q: "What is ECAT?", a: "ECAT (Engineering College Admission Test) is conducted by UET Lahore for admission to engineering programs in Punjab. It covers Mathematics, Physics, Chemistry, and English." },
    { q: "What is the UET merit formula?", a: "UET Lahore Fall 2026 formula: 33% ECAT + 50% FSc Part-I + 17% Matric. Different weightages may apply for other campuses." },
    { q: "What is a good ECAT score for UET CS?", a: "For Computer Engineering at UET, an ECAT score above 130/200 is generally competitive." },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: "UET Merit Calculator" }]} />
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Calculator className="h-6 w-6" /></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">UET Merit Calculator 2026</h1>
              <p className="text-sm text-slate-500">Calculate UET Lahore aggregate using official ECAT weightage formula</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">How UET Merit is Calculated</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            UET (University of Engineering & Technology) Lahore uses ECAT as the primary admission test. The official UET merit formula is:
          </p>
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-sm text-emerald-800 mb-4">
            Aggregate = (ECAT × 33%) + (FSc Part-I × 50%) + (Matric × 17%)
          </div>
          <p className="text-slate-600 leading-relaxed">
            ECAT covers Mathematics, Physics, Chemistry, and English. UET has multiple campuses including Lahore (main), Kala Shah Kaku, and others.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Enter Your Marks</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input label="ECAT Score (out of 400)" type="number" min={0} max={400} value={ecat || ""} onChange={(e) => setEcat(parseFloat(e.target.value) || 0)} placeholder="e.g. 280" />
                  <Input label="FSc Part-I Percentage (%)" type="number" min={0} max={100} value={fsc || ""} onChange={(e) => setFsc(parseFloat(e.target.value) || 0)} placeholder="e.g. 82" />
                  <Input label="Matric Percentage (%)" type="number" min={0} max={100} value={matric || ""} onChange={(e) => setMatric(parseFloat(e.target.value) || 0)} placeholder="e.g. 88" />
                  <Button onClick={calculate} className="w-full" size="lg">Calculate UET Aggregate</Button>
                </div>
              </CardContent>
            </Card>
            {result && (
              <Card className="mt-6">
                <CardHeader><CardTitle>Your UET Aggregate</CardTitle></CardHeader>
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
                    <p className="text-xs text-amber-800"><strong>Note:</strong> This is an estimate. UET merit varies by program. Always verify from the official UET website.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>UET Merit Formula</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>ECAT Test</span><span className="font-bold">33%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>FSc Part-I</span><span className="font-bold">50%</span></div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Matric</span><span className="font-bold">17%</span></div>
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
