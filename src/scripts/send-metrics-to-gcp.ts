import { Result } from "../types.js";

const getMetrics = (): Result => {
  const result: Result = {
    totalDependenciesCount: Number.parseInt(
      process.env["TOTAL_DEPENDENCIES_COUNT"]!
    ),

    outdatedTotalDependenciesCount: Number.parseInt(
      process.env["OUTDATED_TOTAL_DEPENDENCIES_COUNT"]!
    ),
    outdatedMajorDependenciesCount: Number.parseInt(
      process.env["OUTDATED_MAJOR_DEPENDENCIES_COUNT"]!
    ),
    outdatedMinorDependenciesCount: Number.parseInt(
      process.env["OUTDATED_MINOR_DEPENDENCIES_COUNT"]!
    ),
    outdatedPatchDependenciesCount: Number.parseInt(
      process.env["OUTDATED_PATCH_DEPENDENCIES_COUNT"]!
    ),

    outdatedTotalDependenciesPercentage: Number.parseFloat(
      process.env["OUTDATED_TOTAL_DEPENDENCIES_PERCENTAGE"]!
    ),
    outdatedMajorDependenciesPercentage: Number.parseFloat(
      process.env["OUTDATED_MAJOR_DEPENDENCIES_PERCENTAGE"]!
    ),
    outdatedMinorDependenciesPercentage: Number.parseFloat(
      process.env["OUTDATED_MINOR_DEPENDENCIES_PERCENTAGE"]!
    ),
    outdatedPatchDependenciesPercentage: Number.parseFloat(
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
