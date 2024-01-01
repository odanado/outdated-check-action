import { Result } from "../types.js";

const getMetrics = (arg: string): Result => {
  const data = JSON.parse(arg);
  const result: Result = {
    totalDependencyCount: data["total-dependency-count"],
    outdateTotalCount: data["outdate-total-count"],
    outdateMajorCount: data["outdate-major-count"],
    outdateMinorCount: data["outdate-minor-count"],
    outdatePatchCount: data["outdate-patch-count"],
    outdateTotalPercentage: data["outdate-total-percentage"],
    outdateMajorPercentage: data["outdate-major-percentage"],
    outdateMinorPercentage: data["outdate-minor-percentage"],
    outdatePatchPercentage: data["outdate-patch-percentage"],
  };

  for (const [key, value] of Object.entries(result)) {
    if (value === undefined) {
      throw new Error(`"${key}" is undefined`);
    }
  }

  return result;
};

const result = getMetrics(process.argv[2]);

console.log({ result });
