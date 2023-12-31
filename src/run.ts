import {
  check,
  convertResult,
  countReleaseType,
  getInputs,
  writeSummary,
} from "./index.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const checkResults = await check({ packageManager, cwd });

  console.log(checkResults);
  const count = countReleaseType(checkResults);

  console.log(count);

  await writeSummary(count);

  console.log(convertResult(checkResults));
}

run();
