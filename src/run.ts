import { checkOutdate } from "./check-outdate.js";
import { convertResult } from "./convert-result.js";
import { getInputs } from "./inputs/get-inputs.js";
import { setOutput } from "./outputs/set-output.js";
import { writeSummary } from "./outputs/write-summary.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const checkResults = await checkOutdate({ packageManager, cwd });

  const result = convertResult(checkResults);

  setOutput(result);
  await writeSummary(result);
}

run();
