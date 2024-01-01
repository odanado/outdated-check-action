import { beforeEach, expect, test, vi } from "vitest";
import { listDependencies } from "./list-dependencies.js";
import * as npmUtils from "../npm-utils.js";

import * as mockData from "../test-utils/mock-data.js";

vi.mock("../npm-utils.js", () => {
  return {
    listDependencies: vi.fn(),
  };
});

beforeEach(() => {
  vi.mocked(npmUtils.listDependencies).mockImplementation(
    mockData.listDependencies
  );
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
