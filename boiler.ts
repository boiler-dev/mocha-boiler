import { join } from "path"
import { GenerateBoiler } from "boiler-dev"

export const generate: GenerateBoiler = async ({
  files,
  cwdPath,
}) => {
  const actions = []

  for (const file of files) {
    const { name } = file

    if (name === "expect.ts") {
      const { source } = file

      actions.push({
        action: "write",
        path: join(cwdPath, "test", name),
        source,
      })
    }

    if (name === "mocharc.json") {
      const { source } = file

      actions.push({
        action: "write",
        path: join(cwdPath, ".mocharc.json"),
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
