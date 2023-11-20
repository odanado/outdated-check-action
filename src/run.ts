import { check, countReleaseType, getInputs } from "./index.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const results = await check({ packageManager, cwd });

  const count = countReleaseType(results);

  console.log(count);
}

run();
