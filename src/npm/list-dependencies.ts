import * as npmUtils from "../npm-utils.js";
import { ListDependencies, PackageManager } from "../types.js";

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
