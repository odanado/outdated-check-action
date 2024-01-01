import * as core from "@actions/core";
import { Result } from "../types.js";

export function setOutput(result: Result) {
  core.setOutput("total-dependency-count", result.totalDependencyCount);

  core.setOutput("outdate-total-count", result.outdateTotalCount);
  core.setOutput("outdate-major-count", result.outdateMajorCount);
  core.setOutput("outdate-minor-count", result.outdateMinorCount);
  core.setOutput("outdate-patch-count", result.outdatePatchCount);

  core.setOutput("outdate-total-percentage", result.outdateTotalPercentage);
  core.setOutput("outdate-major-percentage", result.outdateMajorPercentage);
  core.setOutput("outdate-minor-percentage", result.outdateMinorPercentage);
  core.setOutput("outdate-patch-percentage", result.outdatePatchPercentage);
}
