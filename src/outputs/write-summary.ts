import * as core from "@actions/core";
import { Result } from "../types.js";

export async function writeSummary(result: Result) {
  const displayPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  await core.summary
    .addHeading("total dependencies")
    .addTable([
      [
        { data: "type", header: true },
        { data: "count", header: true },
      ],
      ["total", `${result.totalDependencyCount}`],
    ])
    .addHeading("outdated dependencies")
    .addTable([
      [
        { data: "type", header: true },
        { data: "count", header: true },
      ],
      ["major", `${result.outdateMajorCount}`],
      ["minor", `${result.outdateMinorCount}`],
      ["patch", `${result.outdatePatchCount}`],
      ["total", `${result.outdateTotalCount}`],
    ])

    .addHeading("outdated dependencies percentage")
    .addTable([
      [
        { data: "type", header: true },
        { data: "percentage", header: true },
      ],
      ["major", displayPercentage(result.outdateMajorPercentage)],
      ["minor", displayPercentage(result.outdateMinorPercentage)],
      ["patch", displayPercentage(result.outdatePatchPercentage)],
      ["total", displayPercentage(result.outdateTotalPercentage)],
    ])
    .write();
}
