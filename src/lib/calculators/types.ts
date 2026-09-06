export interface CalculatorField {
  id: string;
  label: string;
  type: "number" | "select" | "text";
  placeholder?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  help_text?: string;
}

export interface CalculatorDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  fields: CalculatorField[];
  formula: string;
  formula_description: string;
  example: {
    inputs: Record<string, number | string>;
    result: number;
    explanation: string;
  };
  faq: { question: string; answer: string }[];
  meta_title: string;
  meta_description: string;
}

export interface CalculatorResult {
  value: number;
  unit: string;
  explanation: string;
  breakdown?: { label: string; value: number }[];
}
