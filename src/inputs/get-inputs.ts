import * as core from "@actions/core";
import { PackageManager } from "../types.js";

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
