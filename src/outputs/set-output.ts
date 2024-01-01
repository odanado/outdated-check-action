import * as core from "@actions/core";
import { Result } from "../types.js";

export function setOutput(result: Result) {
  core.setOutput("total-dependencies-count", result.totalDependenciesCount);

  core.setOutput(
    "outdated-dependencies-count",
    result.outdatedDependenciesCount
  );
  core.setOutput("latest-dependencies-count", result.latestDependenciesCount);

  core.setOutput(
    "outdated-dependencies-percentage",
    result.outdatedDependenciesPercentage
  );
  core.setOutput(
    "latest-dependencies-percentage",
    result.latestDependenciesPercentage
  );

  core.setOutput(
    "outdated-major-dependencies-count",
    result.outdatedMajorDependenciesCount
  );
  core.setOutput(
    "outdated-minor-dependencies-count",
    result.outdatedMinorDependenciesCount
  );
  core.setOutput(
    "outdated-patch-dependencies-count",
    result.outdatedPatchDependenciesCount
  );

  core.setOutput(
    "outdated-major-dependencies-percentage",
    result.outdatedMajorDependenciesPercentage
  );
  core.setOutput(
    "outdated-minor-dependencies-percentage",
    result.outdatedMinorDependenciesPercentage
  );
  core.setOutput(
    "outdated-patch-dependencies-percentage",
    result.outdatedPatchDependenciesPercentage
  );
}
