import { expect, test, vi } from "vitest";
import {
  listDependencies,
  getCurrentVersion,
  check,
  convertResult,
} from "./index.js";
import { satisfies } from "semver";
import { CheckResult } from "./types.js";

vi.mock("./npm-utils.js", () => {
  return {
    listDependencies: () => {
      return {
        dependencies: {
          react: {
            version: "17.0.2",
          },
          "react-dom": {
            version: "17.0.2",
          },
        },
        devDependencies: {
          typescript: {
            version: "4.3.5",
          },
        },
      };
    },
    getDependencyInfo: ({ packageName }: { packageName: string }) => {
      const versions: { [x: string]: string } = {
        react: "17.0.3",
        "react-dom": "17.1.0",
        typescript: "5.0.1",
      };
      return {
        name: packageName,
        version: versions[packageName],
      };
    },
  };
});

test("listDependencies", async () => {
  const dependencies = await listDependencies({
    packageManager: "npm",
    cwd: ".",
  });
  expect(dependencies.react).toEqual({
    version: "17.0.2",
    type: "dependencies",
  });
  expect(dependencies["react-dom"]).toEqual({
    version: "17.0.2",
    type: "dependencies",
  });
  expect(dependencies.typescript).toEqual({
    version: "4.3.5",
    type: "devDependencies",
  });
});

test("getCurrentVersion", async () => {
  const version = await getCurrentVersion({
    packageManager: "npm",
    packageName: "react",
    cwd: ".",
  });
  expect(version).toBe("17.0.3");
});

test("check", async () => {
  const results = await check({ packageManager: "npm", cwd: "." });
  expect(results).toEqual([
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
  ]);
});
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
