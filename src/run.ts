import { check, convertResult, getInputs, writeSummary } from "./index.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const checkResults = await check({ packageManager, cwd });

  console.log(checkResults);

  const result = convertResult(checkResults);

  console.log(result);

  await writeSummary(result);
}

run();
