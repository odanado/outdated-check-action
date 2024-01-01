import { expect, test } from "vitest";
import { convertResult } from "./convert-result.js";
import { CheckResult } from "./types.js";

test("convertResult", () => {
  const checkResults = [
    {
      name: "react",
      version: "17.0.2",
      currentVersion: "17.0.3",
      releaseType: "patch",
    },
    {
      name: "react-dom",
      version: "17.0.2",
      currentVersion: "17.1.0",
      releaseType: "minor",
    },
    {
      name: "typescript",
      version: "4.3.5",
      currentVersion: "5.0.1",
      releaseType: "major",
    },
  ] satisfies CheckResult[];

  const result = convertResult(checkResults);

  expect(result.totalDependenciesCount).toBe(3);
  expect(result.outdatedMajorDependenciesCount).toBe(1);
  expect(result.outdatedMinorDependenciesCount).toBe(1);
  expect(result.outdatedPatchDependenciesCount).toBe(1);
  expect(result.outdatedDependenciesCount).toBe(3);

  expect(result.outdatedDependenciesPercentage).toBe(1);
  expect(result.outdatedMajorDependenciesPercentage).toBeCloseTo(1 / 3);
  expect(result.outdatedMinorDependenciesPercentage).toBeCloseTo(1 / 3);
  expect(result.outdatedPatchDependenciesPercentage).toBeCloseTo(1 / 3);
});
