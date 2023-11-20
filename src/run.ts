import { check, countReleaseType, getInputs } from "./index.js";

async function run() {
  const { packageManager, cwd } = getInputs();

  const results = await check({ packageManager, cwd });

  console.log(results);
  const count = countReleaseType(results);

  console.log(count);
}

run();
