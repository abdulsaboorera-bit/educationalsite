export { calculators, getCalculatorBySlug, getCalculatorsByCategory, getAllCalculatorSlugs } from "./definitions";
export type { CalculatorDefinition, CalculatorResult, CalculatorField } from "./types";
export {
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
} from "./engine";
