import { CheckResult, Result } from "./types.js";

export function convertResult(results: CheckResult[]): Result {
  const count = (releaseType: "major" | "minor" | "patch") =>
    results.filter((result) => result.releaseType === releaseType).length;

  const totalDependenciesCount = results.length;

  const outdatedMajorDependenciesCount = count("major");
  const outdatedMinorDependenciesCount = count("minor");
  const outdatedPatchDependenciesCount = count("patch");
  const outdatedTotalDependenciesCount =
    outdatedMajorDependenciesCount +
    outdatedMinorDependenciesCount +
    outdatedPatchDependenciesCount;

  const outdatedMajorDependenciesPercentage =
    outdatedMajorDependenciesCount / outdatedTotalDependenciesCount;
  const outdatedMinorDependenciesPercentage =
    outdatedMinorDependenciesCount / outdatedTotalDependenciesCount;
  const outdatedPatchDependenciesPercentage =
    outdatedPatchDependenciesCount / outdatedTotalDependenciesCount;

  const outdatedTotalDependenciesPercentage =
    outdatedTotalDependenciesCount / totalDependenciesCount;

  return {
    totalDependenciesCount,
    outdatedMajorDependenciesCount,
    outdatedMinorDependenciesCount,
    outdatedPatchDependenciesCount,
    outdatedTotalDependenciesCount,
    outdatedMajorDependenciesPercentage,
    outdatedMinorDependenciesPercentage,
    outdatedPatchDependenciesPercentage,
    outdatedTotalDependenciesPercentage,
  };
}
