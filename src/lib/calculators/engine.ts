import { CalculatorResult } from "./types";

interface CourseInput {
  grade_point: number;
  credit_hours: number;
}

export function calculateCGPA(courses: CourseInput[]): CalculatorResult {
  const totalPoints = courses.reduce((sum, c) => sum + c.grade_point * c.credit_hours, 0);
  const totalHours = courses.reduce((sum, c) => sum + c.credit_hours, 0);

  if (totalHours === 0) {
    return { value: 0, unit: "CGPA", explanation: "Total credit hours cannot be zero." };
  }

  const cgpa = totalPoints / totalHours;

  return {
    value: Math.round(cgpa * 100) / 100,
    unit: "CGPA",
    explanation: `Total grade points: ${totalPoints.toFixed(2)} | Total credit hours: ${totalHours} | CGPA = ${totalPoints.toFixed(2)} / ${totalHours} = ${cgpa.toFixed(2)}`,
    breakdown: courses.map((c, i) => ({
      label: `Course ${i + 1} (${c.credit_hours} CH)`,
      value: c.grade_point * c.credit_hours,
    })),
  };
}

export function calculateGPA(courses: CourseInput[]): CalculatorResult {
  return calculateCGPA(courses);
}

export function calculatePercentage(params: {
  cgpa?: number;
  marks_obtained?: number;
  total_marks?: number;
}): CalculatorResult {
  if (params.cgpa !== undefined && params.cgpa > 0) {
    const percentage = (params.cgpa - 0.5) * 100;
    return {
      value: Math.round(percentage * 100) / 100,
      unit: "%",
      explanation: `HEC Formula: (${params.cgpa} - 0.5) × 100 = ${percentage.toFixed(2)}%`,
    };
  }

  if (params.marks_obtained !== undefined && params.total_marks !== undefined && params.total_marks > 0) {
    const percentage = (params.marks_obtained / params.total_marks) * 100;
    return {
      value: Math.round(percentage * 100) / 100,
      unit: "%",
      explanation: `(${params.marks_obtained} / ${params.total_marks}) × 100 = ${percentage.toFixed(2)}%`,
    };
  }

  return { value: 0, unit: "%", explanation: "Please provide valid input values." };
}

export function calculateMarksAverage(marks: number[]): CalculatorResult {
  if (marks.length === 0) {
    return { value: 0, unit: "marks", explanation: "Please provide at least one mark." };
  }

  const total = marks.reduce((sum, m) => sum + m, 0);
  const average = total / marks.length;
  const maxMarks = Math.max(...marks);
  const minMarks = Math.min(...marks);

  return {
    value: Math.round(average * 100) / 100,
    unit: "marks",
    explanation: `Sum: ${total} | Subjects: ${marks.length} | Average: ${average.toFixed(2)}`,
    breakdown: [
      { label: "Total", value: total },
      { label: "Highest", value: maxMarks },
      { label: "Lowest", value: minMarks },
    ],
  };
}

export function calculateAttendance(params: {
  total_classes: number;
  classes_attended: number;
  required_percentage: number;
}): CalculatorResult {
  if (params.total_classes === 0) {
    return { value: 0, unit: "%", explanation: "Total classes cannot be zero." };
  }

  const currentPercentage = (params.classes_attended / params.total_classes) * 100;
  const remainingClasses = params.total_classes - params.classes_attended;
  const canMiss = Math.max(0, Math.floor((params.classes_attended / (params.required_percentage / 100)) - params.total_classes));

  return {
    value: Math.round(currentPercentage * 100) / 100,
    unit: "%",
    explanation: `Attended: ${params.classes_attended}/${params.total_classes} = ${currentPercentage.toFixed(1)}% | Required: ${params.required_percentage}%`,
    breakdown: [
      { label: "Current Attendance", value: Math.round(currentPercentage * 100) / 100 },
      { label: "Classes Missed", value: remainingClasses },
      { label: "Can Still Miss", value: canMiss },
    ],
  };
}

export function calculateMDCATAggregate(params: {
  matric_marks: number;
  fsc_marks: number;
  mdcat_marks: number;
}): CalculatorResult {
  const aggregate = params.matric_marks * 0.10 + params.fsc_marks * 0.40 + params.mdcat_marks * 0.50;

  return {
    value: Math.round(aggregate * 100) / 100,
    unit: "%",
    explanation: `(10% × ${params.matric_marks}) + (40% × ${params.fsc_marks}) + (50% × ${params.mdcat_marks}) = ${params.matric_marks * 0.10} + ${params.fsc_marks * 0.40} + ${params.mdcat_marks * 0.50} = ${aggregate.toFixed(2)}%`,
    breakdown: [
      { label: "Matric (10%)", value: Math.round(params.matric_marks * 0.10 * 100) / 100 },
      { label: "FSc (40%)", value: Math.round(params.fsc_marks * 0.40 * 100) / 100 },
      { label: "MDCAT (50%)", value: Math.round(params.mdcat_marks * 0.50 * 100) / 100 },
    ],
  };
}

export function calculateECATAggregate(params: {
  matric_marks: number;
  fsc_marks: number;
  ecat_marks: number;
}): CalculatorResult {
  const aggregate = params.matric_marks * 0.10 + params.fsc_marks * 0.40 + params.ecat_marks * 0.50;

  return {
    value: Math.round(aggregate * 100) / 100,
    unit: "%",
    explanation: `(10% × ${params.matric_marks}) + (40% × ${params.fsc_marks}) + (50% × ${params.ecat_marks}) = ${aggregate.toFixed(2)}%`,
    breakdown: [
      { label: "Matric (10%)", value: Math.round(params.matric_marks * 0.10 * 100) / 100 },
      { label: "FSc (40%)", value: Math.round(params.fsc_marks * 0.40 * 100) / 100 },
      { label: "ECAT (50%)", value: Math.round(params.ecat_marks * 0.50 * 100) / 100 },
    ],
  };
}

export function calculateNUMSAggregate(params: {
  matric_marks: number;
  fsc_marks: number;
  nums_test_marks: number;
}): CalculatorResult {
  const aggregate = params.matric_marks * 0.10 + params.fsc_marks * 0.40 + params.nums_test_marks * 0.50;

  return {
    value: Math.round(aggregate * 100) / 100,
    unit: "%",
    explanation: `(10% × ${params.matric_marks}) + (40% × ${params.fsc_marks}) + (50% × ${params.nums_test_marks}) = ${aggregate.toFixed(2)}%`,
    breakdown: [
      { label: "Matric (10%)", value: Math.round(params.matric_marks * 0.10 * 100) / 100 },
      { label: "FSc (40%)", value: Math.round(params.fsc_marks * 0.40 * 100) / 100 },
      { label: "NUMS Test (50%)", value: Math.round(params.nums_test_marks * 0.50 * 100) / 100 },
    ],
  };
}

export function calculateMeritAggregate(params: {
  matric_marks: number;
  fsc_marks: number;
  entry_test_marks: number;
  matric_weight: number;
  fsc_weight: number;
  test_weight: number;
}): CalculatorResult {
  const totalWeight = params.matric_weight + params.fsc_weight + params.test_weight;
  const aggregate =
    (params.matric_marks * params.matric_weight +
      params.fsc_marks * params.fsc_weight +
      params.entry_test_marks * params.test_weight) /
    totalWeight;

  return {
    value: Math.round(aggregate * 100) / 100,
    unit: "%",
    explanation: `(${params.matric_marks}×${params.matric_weight}% + ${params.fsc_marks}×${params.fsc_weight}% + ${params.entry_test_marks}×${params.test_weight}%) / ${totalWeight}% = ${aggregate.toFixed(2)}%`,
    breakdown: [
      { label: `Matric (${params.matric_weight}%)`, value: Math.round(params.matric_marks * params.matric_weight / totalWeight * 100) / 100 },
      { label: `FSc (${params.fsc_weight}%)`, value: Math.round(params.fsc_marks * params.fsc_weight / totalWeight * 100) / 100 },
      { label: `Entry Test (${params.test_weight}%)`, value: Math.round(params.entry_test_marks * params.test_weight / totalWeight * 100) / 100 },
    ],
  };
}

export function calculateEntryTestAggregate(params: {
  matric_marks: number;
  fsc_marks: number;
  test_marks: number;
}): CalculatorResult {
  const aggregate = params.matric_marks * 0.10 + params.fsc_marks * 0.40 + params.test_marks * 0.50;

  return {
    value: Math.round(aggregate * 100) / 100,
    unit: "%",
    explanation: `(10% × ${params.matric_marks}) + (40% × ${params.fsc_marks}) + (50% × ${params.test_marks}) = ${aggregate.toFixed(2)}%`,
    breakdown: [
      { label: "Matric (10%)", value: Math.round(params.matric_marks * 0.10 * 100) / 100 },
      { label: "Intermediate (40%)", value: Math.round(params.fsc_marks * 0.40 * 100) / 100 },
      { label: "Entry Test (50%)", value: Math.round(params.test_marks * 0.50 * 100) / 100 },
    ],
  };
}
