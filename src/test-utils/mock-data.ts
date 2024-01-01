import { ListDependencies } from "../types.js";
export const listDependencies = () => {
  const data = {
    dependencies: {
      react: {
        version: "17.0.2",
      },
      "react-dom": {
        version: "17.0.2",
      },
    },
    devDependencies: {
      typescript: {
        version: "4.3.5",
      },
    },
  } satisfies ListDependencies;
  return Promise.resolve(data);
};

export const getDependencyInfo = ({ packageName }: { packageName: string }) => {
  const versions: { [x: string]: string } = {
    react: "17.0.3",
    "react-dom": "17.1.0",
    typescript: "5.0.1",
  };
  return Promise.resolve({
    name: packageName,
    version: versions[packageName],
  });
};
