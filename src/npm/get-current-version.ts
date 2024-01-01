import * as npmUtils from "../npm-utils.js";
import { PackageManager } from "../types.js";

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
