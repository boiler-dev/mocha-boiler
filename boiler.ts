import { join } from "path"
import { InstallBoiler } from "boiler-dev"

export const installBoiler: InstallBoiler = async ({
  destDir,
  files,
}) => {
  const actions = []

  for (const file of files) {
    const { name } = file

    if (name === "expect.ts") {
      const { source } = file

      actions.push({
        action: "write",
        path: join(destDir, "test", name),
        source,
      })
    }

    if (name === "mocharc.json") {
      const { source } = file

      actions.push({
        action: "write",
        path: join(destDir, ".mocharc.json"),
        source,
      })
    }
  }

  actions.push({
    action: "npmInstall",
    dev: true,
    source: ["@types/mocha", "expect", "mocha", "ts-node"],
  })

  return actions
}
