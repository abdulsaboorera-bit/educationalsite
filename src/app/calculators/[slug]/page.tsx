"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCalculatorBySlug } from "@/lib/calculators/definitions";
import {
  calculateCGPA,
  calculateGPA,
  calculatePercentage,
  calculateMarksAverage,
  calculateAttendance,
  calculateMDCATAggregate,
  calculateECATAggregate,
  calculateNUMSAggregate,
  calculateMeritAggregate,
  calculateEntryTestAggregate,
} from "@/lib/calculators/engine";
import { CalculatorResult } from "@/lib/calculators/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calculator, Copy, Check, Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const CALCULATOR_MAP: Record<string, (inputs: Record<string, number>) => CalculatorResult> = {
  cgpa: (inputs) => {
    const courses = [];
    for (let i = 1; i <= (inputs.courses || 1); i++) {
      courses.push({
        grade_point: inputs[`grade_${i}`] || 0,
        credit_hours: inputs[`hours_${i}`] || 3,
      });
    }
    return calculateCGPA(courses);
  },
  gpa: (inputs) => {
    const courses = [];
    for (let i = 1; i <= (inputs.courses || 1); i++) {
      courses.push({
        grade_point: inputs[`grade_${i}`] || 0,
        credit_hours: inputs[`hours_${i}`] || 3,
      });
    }
    return calculateGPA(courses);
  },
  percentage: (inputs) =>
    calculatePercentage({
      cgpa: inputs.cgpa || undefined,
      marks_obtained: inputs.marks_obtained || undefined,
      total_marks: inputs.total_marks || undefined,
    }),
  marks: (inputs) => {
    const marks = [];
    for (let i = 1; i <= (inputs.subjects || 1); i++) {
      marks.push(inputs[`subject_${i}`] || 0);
    }
    return calculateMarksAverage(marks);
  },
  attendance: (inputs) =>
    calculateAttendance({
      total_classes: inputs.total_classes || 0,
      classes_attended: inputs.classes_attended || 0,
      required_percentage: inputs.required_percentage || 75,
    }),
  "mdcat-aggregate": (inputs) =>
    calculateMDCATAggregate({
      matric_marks: inputs.matric_marks || 0,
      fsc_marks: inputs.fsc_marks || 0,
      mdcat_marks: inputs.mdcat_marks || 0,
    }),
  "ecat-aggregate": (inputs) =>
    calculateECATAggregate({
      matric_marks: inputs.matric_marks || 0,
      fsc_marks: inputs.fsc_marks || 0,
      ecat_marks: inputs.ecat_marks || 0,
    }),
  "nums-aggregate": (inputs) =>
    calculateNUMSAggregate({
      matric_marks: inputs.matric_marks || 0,
      fsc_marks: inputs.fsc_marks || 0,
      nums_test_marks: inputs.nums_test_marks || 0,
    }),
  merit: (inputs) =>
    calculateMeritAggregate({
      matric_marks: inputs.matric_marks || 0,
      fsc_marks: inputs.fsc_marks || 0,
      entry_test_marks: inputs.entry_test_marks || 0,
      matric_weight: inputs.matric_weight || 10,
      fsc_weight: inputs.fsc_weight || 40,
      test_weight: inputs.test_weight || 50,
    }),
  "entry-test-aggregate": (inputs) =>
    calculateEntryTestAggregate({
      matric_marks: inputs.matric_marks || 0,
      fsc_marks: inputs.fsc_marks || 0,
      test_marks: inputs.test_marks || 0,
    }),
};

export default function CalculatorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const calc = getCalculatorBySlug(slug);

  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const handleCalculate = useCallback(() => {
    const calcFn = CALCULATOR_MAP[slug];
    if (calcFn) {
      setResult(calcFn(inputs));
    }
  }, [slug, inputs]);

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.value} ${result.unit}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!calc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Calculator Not Found</h1>
          <p className="text-slate-500 mb-4">The calculator you are looking for does not exist.</p>
          <Link href="/calculators" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View All Calculators
          </Link>
        </div>
      </div>
    );
  }

  const courseCount = inputs.courses || 1;
  const subjectCount = inputs.subjects || 1;

  const renderDynamicFields = () => {
    if (slug === "cgpa" || slug === "gpa") {
      return (
        <>
          <Input
            label="Number of Courses"
            type="number"
            min={1}
            max={50}
            value={inputs.courses || ""}
            onChange={(e) => setInputs({ ...inputs, courses: parseInt(e.target.value) || 1 })}
            placeholder="e.g. 6"
            required
          />
          {Array.from({ length: courseCount }, (_, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Input
                label={`Course ${i + 1} - Grade Point`}
                type="number"
                step={0.01}
                min={0}
                max={4}
                value={inputs[`grade_${i + 1}`] || ""}
                onChange={(e) => setInputs({ ...inputs, [`grade_${i + 1}`]: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 3.7"
                required
              />
              <Input
                label={`Course ${i + 1} - Credit Hours`}
                type="number"
                min={1}
                max={6}
                value={inputs[`hours_${i + 1}`] || ""}
                onChange={(e) => setInputs({ ...inputs, [`hours_${i + 1}`]: parseInt(e.target.value) || 3 })}
                placeholder="e.g. 3"
                required
              />
            </div>
          ))}
        </>
      );
    }

    if (slug === "marks") {
      return (
        <>
          <Input
            label="Number of Subjects"
            type="number"
            min={1}
            max={20}
            value={inputs.subjects || ""}
            onChange={(e) => setInputs({ ...inputs, subjects: parseInt(e.target.value) || 1 })}
            placeholder="e.g. 8"
            required
          />
          {Array.from({ length: subjectCount }, (_, i) => (
            <Input
              key={i}
              label={`Subject ${i + 1} Marks`}
              type="number"
              min={0}
              value={inputs[`subject_${i + 1}`] || ""}
              onChange={(e) => setInputs({ ...inputs, [`subject_${i + 1}`]: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 85"
              required
            />
          ))}
        </>
      );
    }

    return calc.fields.map((field) => (
      <Input
        key={field.id}
        label={field.label}
        type={field.type}
        min={field.min}
        max={field.max}
        step={field.step}
        value={inputs[field.id] || ""}
        onChange={(e) => setInputs({ ...inputs, [field.id]: parseFloat(e.target.value) || 0 })}
        placeholder={field.placeholder}
        required={field.required}
        help_text={field.help_text}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Calculators", href: "/calculators" },
              { label: calc.name },
            ]}
          />
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{calc.name}</h1>
              <p className="text-sm text-slate-500">{calc.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {renderDynamicFields()}
                  <Button onClick={handleCalculate} className="w-full" size="lg">
                    Calculate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result */}
            {result && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Result</CardTitle>
                    <Button variant="ghost" size="sm" onClick={handleCopyResult}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {result.value} <span className="text-lg font-medium text-slate-500">{result.unit}</span>
                    </div>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto">{result.explanation}</p>
                  </div>
                  {result.breakdown && result.breakdown.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-slate-900">Breakdown</h4>
                      {result.breakdown.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                          <span className="text-sm text-slate-600">{item.label}</span>
                          <span className="text-sm font-medium text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Formula */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-emerald-600" />
                  Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm text-slate-700 mb-3">
                  {calc.formula}
                </div>
                <p className="text-sm text-slate-600">{calc.formula_description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Example */}
            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-3">{calc.example.explanation}</p>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-sm text-emerald-800">
                    Result: <strong>{calc.example.result}</strong>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            {calc.faq.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-emerald-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {calc.faq.map((faq, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setShowFaq(showFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-50"
                        >
                          {faq.question}
                          {showFaq === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        {showFaq === i && (
                          <div className="px-3 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-2">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disclaimer */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This calculator provides estimates based on the formulas provided. Always verify calculations with your institution&apos;s official guidelines.
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
