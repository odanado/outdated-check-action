import child_process from "node:child_process";
import {
  GetDependencyInfo,
  ListDependencies,
  PackageManager,
} from "./types.js";

export async function listDependencies({
  packageManager,
  cwd,
}: {
  packageManager: PackageManager;
  cwd: string;
}): Promise<ListDependencies> {
  const stdout = child_process.execSync(
    `${packageManager} list --depth=0 --json`,
    { encoding: "utf8", cwd }
  );
  return JSON.parse(stdout);
}

export async function getDependencyInfo({
  packageManager,
  packageName,
  cwd,
}: {
  packageManager: PackageManager;
  packageName: string;
  cwd: string;
}): Promise<GetDependencyInfo> {
  const stdout = child_process.execSync(
    `${packageManager} info ${packageName} --json`,
    { encoding: "utf8", cwd }
  );
  return JSON.parse(stdout);
}
