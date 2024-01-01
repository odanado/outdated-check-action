import { Result } from "../types.js";

const getMetrics = (): Result => {
  const result: Result = {
    totalDependenciesCount: Number.parseInt(
      process.env["TOTAL_DEPENDENCIES_COUNT"]!
    ),

    outdatedDependenciesCount: Number.parseInt(
      process.env["OUTDATED_DEPENDENCIES_COUNT"]!
    ),
    latestDependenciesCount: Number.parseInt(
      process.env["LATEST_DEPENDENCIES_COUNT"]!
    ),

    outdatedDependenciesPercentage: Number.parseFloat(
      process.env["OUTDATED_DEPENDENCIES_PERCENTAGE"]!
    ),
    latestDependenciesPercentage: Number.parseFloat(
      process.env["LATEST_DEPENDENCIES_PERCENTAGE"]!
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
