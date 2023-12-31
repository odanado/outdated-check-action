import * as core from "@actions/core";
import { diff } from "semver";

import * as npmUtils from "./npm-utils.js";
import {
  PackageManager,
  ListDependencies,
  CheckResult,
  Count,
} from "./types.js";

function isPackageManager(
  packageManager: string
): packageManager is PackageManager {
  return ["npm", "yarn", "pnpm"].includes(packageManager);
}

export function getInputs() {
  const packageManager = core.getInput("package-manager");
  if (!isPackageManager(packageManager)) {
    throw new Error(`Invalid package manager: ${packageManager}`);
  }

  const cwd = core.getInput("cwd");
  return { packageManager, cwd };
}

export async function listDependencies({
  packageManager,
  cwd,
}: {
  packageManager: PackageManager;
  cwd: string;
}) {
  const data = await npmUtils.listDependencies({ packageManager, cwd });
  const convertNameToVersion = (
    dependencies: ListDependencies["dependencies"] | null,
    type: "dependencies" | "devDependencies"
  ) => {
    if (!dependencies) {
      return {};
    }
    return Object.fromEntries(
      Object.keys(dependencies).map((name) => [
        name,
        { version: dependencies[name].version, type },
      ])
    );
  };

  return {
    ...convertNameToVersion(data.dependencies, "dependencies"),
    ...convertNameToVersion(data.devDependencies, "devDependencies"),
  };
}

export async function getCurrentVersion({
  packageManager,
  packageName,
  cwd,
}: {
  packageManager: PackageManager;
  packageName: string;
  cwd: string;
}) {
  const data = await npmUtils.getDependencyInfo({
    packageManager,
    packageName,
    cwd,
  });
  return data.version;
}

export async function check({
  packageManager,
  cwd,
}: {
  packageManager: PackageManager;
  cwd: string;
}): Promise<CheckResult[]> {
  const dependencies = await listDependencies({ packageManager, cwd });

  const currentVersions: { [name: string]: string } = {};

  for (const name of Object.keys(dependencies)) {
    const version = await getCurrentVersion({
      packageManager,
      packageName: name,
      cwd,
    });
    currentVersions[name] = version;
  }

  const results = Object.keys(dependencies).map((name) => {
    const version = dependencies[name].version;
    const currentVersion = currentVersions[name];

    const releaseType = diff(version, currentVersion);

    return {
      name,
      version,
      currentVersion,
      releaseType,
    };
  });

  return results;
}

export function countReleaseType(results: CheckResult[]): Count {
  const count = (releaseType: "major" | "minor" | "patch") =>
    results.filter((result) => result.releaseType === releaseType).length;
  return {
    total: results.length,
    major: count("major"),
    minor: count("minor"),
    patch: count("patch"),
  };
}

export async function writeSummary(count: Count) {
  await core.summary
    .addHeading("Not updated dependencies")
    .addTable([
      [
        { data: "type", header: true },
        { data: "count", header: true },
      ],
      ["total", `${count.total}`],
      ["major", `${count.major}`],
      ["minor", `${count.minor}`],
      ["patch", `${count.patch}`],
    ])
    .write();
  // major: not updated count, total count, percentage
  // minor: not updated count, total count, percentage
  // patch: not updated count, total count, percentage
  // all: not updated count, total count, percentage
}
