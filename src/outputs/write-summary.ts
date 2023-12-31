import * as core from "@actions/core";
import { Result } from "../types.js";

export async function writeSummary(result: Result) {
  const displayPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  await core.summary
    .addHeading("summary")
    .addTable([
      [
        { data: "type", header: true },
        { data: "count", header: true },
      ],
      ["total", `${result.totalDependenciesCount}`],
      ["outdated", `${result.outdatedDependenciesCount}`],
      ["latest", `${result.latestDependenciesCount}`],
    ])
    .addHeading("outdated dependencies")
    .addTable([
      [
        { data: "type", header: true },
        { data: "count", header: true },
      ],
      ["major", `${result.outdatedMajorDependenciesCount}`],
      ["minor", `${result.outdatedMinorDependenciesCount}`],
      ["patch", `${result.outdatedPatchDependenciesCount}`],
      ["total", `${result.outdatedDependenciesCount}`],
    ])

    .addHeading("outdated dependencies percentage")
    .addTable([
      [
        { data: "type", header: true },
        { data: "percentage", header: true },
      ],
      ["major", displayPercentage(result.outdatedMajorDependenciesPercentage)],
      ["minor", displayPercentage(result.outdatedMinorDependenciesPercentage)],
      ["patch", displayPercentage(result.outdatedPatchDependenciesPercentage)],
      ["total", displayPercentage(result.outdatedDependenciesPercentage)],
    ])
    .write();
}
