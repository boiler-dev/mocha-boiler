import { join } from "path"
import { GenerateBoiler, InstallBoiler } from "boiler-dev"

export const install: InstallBoiler = async ({
  cwdPath,
}) => {
  const actions = []

  actions.push({
    action: "npmInstall",
    dev: true,
    source: ["@types/mocha", "expect", "mocha", "ts-node"],
  })

  actions.push({
    action: "merge",
    path: join(cwdPath, "tsconfig.base.json"),
    source: { compilerOptions: { types: ["mocha"] } },
  })

  return actions
}

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

  return actions
}
