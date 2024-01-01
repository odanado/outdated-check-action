import { CheckResult, Result } from "./types.js";

export function convertResult(results: CheckResult[]): Result {
  const count = (releaseType: "major" | "minor" | "patch") =>
    results.filter((result) => result.releaseType === releaseType).length;

  const totalDependenciesCount = results.length;

  const outdatedMajorDependenciesCount = count("major");
  const outdatedMinorDependenciesCount = count("minor");
  const outdatedPatchDependenciesCount = count("patch");
  const outdatedDependenciesCount =
    outdatedMajorDependenciesCount +
    outdatedMinorDependenciesCount +
    outdatedPatchDependenciesCount;
  const latestDependenciesCount =
    totalDependenciesCount - outdatedDependenciesCount;

  const outdatedMajorDependenciesPercentage =
    outdatedDependenciesCount !== 0
      ? outdatedMajorDependenciesCount / outdatedDependenciesCount
      : 0;
  const outdatedMinorDependenciesPercentage =
    outdatedDependenciesCount !== 0
      ? outdatedMinorDependenciesCount / outdatedDependenciesCount
      : 0;
  const outdatedPatchDependenciesPercentage =
    outdatedDependenciesCount !== 0
      ? outdatedPatchDependenciesCount / outdatedDependenciesCount
      : 0;

  const outdatedDependenciesPercentage =
    outdatedDependenciesCount / totalDependenciesCount;
  const latestDependenciesPercentage =
    latestDependenciesCount / totalDependenciesCount;

  return {
    totalDependenciesCount,
    outdatedDependenciesCount,
    latestDependenciesCount,
    outdatedDependenciesPercentage,
    latestDependenciesPercentage,
    outdatedMajorDependenciesCount,
    outdatedMinorDependenciesCount,
    outdatedPatchDependenciesCount,
    outdatedMajorDependenciesPercentage,
    outdatedMinorDependenciesPercentage,
    outdatedPatchDependenciesPercentage,
  };
}
