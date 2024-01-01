import { Result } from "../types.js";

const getMetrics = (): Result => {
  const result: Result = {
    totalDependencyCount: Number.parseInt(
      process.env["TOTAL_DEPENDENCY_COUNT"]!
    ),
    outdateTotalCount: Number.parseInt(process.env["OUTDATE_TOTAL_COUNT"]!),
    outdateMajorCount: Number.parseInt(process.env["OUTDATE_MAJOR_COUNT"]!),
    outdateMinorCount: Number.parseInt(process.env["OUTDATE_MINOR_COUNT"]!),
    outdatePatchCount: Number.parseInt(process.env["OUTDATE_PATCH_COUNT"]!),
    outdateTotalPercentage: Number.parseFloat(
      process.env["OUTDATE_TOTAL_PERCENTAGE"]!
    ),
    outdateMajorPercentage: Number.parseFloat(
      process.env["OUTDATE_MAJOR_PERCENTAGE"]!
    ),
    outdateMinorPercentage: Number.parseFloat(
      process.env["OUTDATE_MINOR_PERCENTAGE"]!
    ),
    outdatePatchPercentage: Number.parseFloat(
      process.env["OUTDATE_PATCH_PERCENTAGE"]!
    ),
  };

  for (const [key, value] of Object.entries(result)) {
    if (value === undefined) {
      throw new Error(`"${key}" is undefined`);
    }
  }

  return result;
};

const result = getMetrics();

console.log({ result });
