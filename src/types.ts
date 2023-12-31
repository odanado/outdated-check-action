import { ReleaseType } from "semver";

export type PackageManager = "npm" | "yarn" | "pnpm";

// tiny typing
export type ListDependencies = {
  name: string;
  dependencies: {
    [name: string]: {
      version: string;
    };
  };
  devDependencies: {
    [name: string]: {
      version: string;
      resolved: string;
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

export type Count = {
  total: number;
  major: number;
  minor: number;
  patch: number;
};
