import { beforeEach, expect, test, vi } from "vitest";
import { checkOutdate } from "./check-outdate.js";
import * as npmUtils from "./npm-utils.js";
import * as mockData from "./test-utils/mock-data.js";

vi.mock("./npm-utils.js", () => {
  return {
    listDependencies: vi.fn(),
    getDependencyInfo: vi.fn(),
  };
});

beforeEach(() => {
  vi.mocked(npmUtils.listDependencies).mockImplementation(
    mockData.listDependencies
  );
  vi.mocked(npmUtils.getDependencyInfo).mockImplementation(
    mockData.getDependencyInfo
  );
});

test("checkOutdate", async () => {
  const results = await checkOutdate({ packageManager: "npm", cwd: "." });
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
