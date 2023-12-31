import { ReleaseType } from "semver";

export type PackageManager = "npm" | "yarn" | "pnpm";

// tiny typing
export type ListDependencies = {
  dependencies: {
    [name: string]: {
      version: string;
    };
  };
  devDependencies: {
    [name: string]: {
      version: string;
    };
  };
};

// tiny typing
export type GetDependencyInfo = {
  name: string;
  version: string;
};

export type CheckResult = {
  name: string;
  version: string;
  currentVersion: string;
  releaseType: ReleaseType | null;
};

export type Result = {
  totalDependenciesCount: number;

  outdatedDependenciesCount: number;
  latestDependenciesCount: number;

  outdatedDependenciesPercentage: number;
  latestDependenciesPercentage: number;

  outdatedMajorDependenciesCount: number;
  outdatedMinorDependenciesCount: number;
  outdatedPatchDependenciesCount: number;

  outdatedMajorDependenciesPercentage: number;
  outdatedMinorDependenciesPercentage: number;
  outdatedPatchDependenciesPercentage: number;
};
