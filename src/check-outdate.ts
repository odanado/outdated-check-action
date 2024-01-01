import { diff } from "semver";
import { listDependencies } from "./npm/list-dependencies.js";
import { getCurrentVersion } from "./npm/get-current-version.js";
import { CheckResult, PackageManager, ListDependencies } from "./types.js";

export async function checkOutdate({
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

  const results = Object.keys(dependencies).map((name: string) => {
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
