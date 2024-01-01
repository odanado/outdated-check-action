import { checkOutdate } from "./check-outdate.js";
import { convertResult } from "./convert-result.js";
import { getInputs } from "./inputs/get-inputs.js";
import { setOutput } from "./outputs/set-output.js";
import { writeSummary } from "./outputs/write-summary.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const checkResults = await checkOutdate({ packageManager, cwd });

  console.log(checkResults);

  const result = convertResult(checkResults);

  console.log(result);

  setOutput(result);
  await writeSummary(result);
}

run();
