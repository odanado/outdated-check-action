import { beforeEach, expect, test, vi } from "vitest";
import { getCurrentVersion } from "./get-current-version.js";
import * as npmUtils from "../npm-utils.js";
import * as mockData from "../test-utils/mock-data.js";

vi.mock("../npm-utils.js", () => {
  return {
    getDependencyInfo: vi.fn(),
  };
});

beforeEach(() => {
  vi.mocked(npmUtils.getDependencyInfo).mockImplementation(
    mockData.getDependencyInfo
  );
});

test("getCurrentVersion", async () => {
  const version = await getCurrentVersion({
    packageManager: "npm",
    packageName: "react",
    cwd: ".",
  });
  expect(version).toBe("17.0.3");
});
