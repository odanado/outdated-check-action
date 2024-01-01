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

  expect(result.totalDependencyCount).toBe(3);
  expect(result.outdateTotalCount).toBe(3);
  expect(result.outdateMajorCount).toBe(1);
  expect(result.outdateMinorCount).toBe(1);
  expect(result.outdatePatchCount).toBe(1);

  expect(result.outdateTotalPercentage).toBe(1);
  expect(result.outdateMajorPercentage).toBeCloseTo(1 / 3);
  expect(result.outdateMinorPercentage).toBeCloseTo(1 / 3);
  expect(result.outdatePatchPercentage).toBeCloseTo(1 / 3);
});
