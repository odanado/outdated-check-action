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
  totalDependencyCount: number;

  outdateTotalCount: number;
  outdateMajorCount: number;
  outdateMinorCount: number;
  outdatePatchCount: number;

  outdateTotalPercentage: number;
  outdateMajorPercentage: number;
  outdateMinorPercentage: number;
  outdatePatchPercentage: number;
};
