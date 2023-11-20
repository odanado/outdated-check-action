import * as core from "@actions/core";
import { diff } from "semver";

import * as npmUtils from "./npm-utils.js";
import { PackageManager, ListDependencies, CheckResult } from "./types.js";

function isPackageManager(
  packageManager: string
): packageManager is PackageManager {
  return ["npm", "yarn", "pnpm"].includes(packageManager);
}

function getInputs() {
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
    dependencies: ListDependencies["dependencies"],
    type: "dependencies" | "devDependencies"
  ) =>
    Object.fromEntries(
      Object.keys(dependencies).map((name) => [
        name,
        { version: dependencies[name].version, type },
      ])
    );
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

export function countReleaseType(results: CheckResult[]) {
  const count = (releaseType: "major" | "minor" | "patch") =>
    results.filter((result) => result.releaseType === releaseType).length;
  return {
    major: count("major"),
    minor: count("minor"),
    patch: count("patch"),
  };
}

async function run() {
  const { packageManager, cwd } = getInputs();

  const results = await check({ packageManager, cwd });

  const count = countReleaseType(results);

  console.log(count);
}

if (module.children) {
  run();
}
