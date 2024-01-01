import { CheckResult, Result } from "./types.js";

export function convertResult(results: CheckResult[]): Result {
  const count = (releaseType: "major" | "minor" | "patch") =>
    results.filter((result) => result.releaseType === releaseType).length;

  const totalDependencyCount = results.length;

  const outdateMajorCount = count("major");
  const outdateMinorCount = count("minor");
  const outdatePatchCount = count("patch");
  const outdateTotalCount =
    outdateMajorCount + outdateMinorCount + outdatePatchCount;

  const outdateMajorPercentage = outdateMajorCount / totalDependencyCount;
  const outdateMinorPercentage = outdateMinorCount / totalDependencyCount;
  const outdatePatchPercentage = outdatePatchCount / totalDependencyCount;
  const outdateTotalPercentage = outdateTotalCount / totalDependencyCount;

  return {
    totalDependencyCount,
    outdateTotalCount,
    outdateMajorCount,
    outdateMinorCount,
    outdatePatchCount,
    outdateTotalPercentage,
    outdateMajorPercentage,
    outdateMinorPercentage,
    outdatePatchPercentage,
  };
}
