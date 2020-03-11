import { join } from "path"
import { ActionBoiler } from "boiler-dev"

export const install: ActionBoiler = async () => {
  const actions = []

  actions.push({
    action: "npmInstall",
    dev: true,
    source: ["@types/mocha", "expect", "mocha", "ts-node"],
  })

  return actions
}

export const generate: ActionBoiler = async () => {
  const actions = []

  actions.push({
    action: "write",
    path: ".mocharc.json",
    sourcePath: "mocharc.json",
  })

  actions.push({
    action: "write",
    path: "test/expect.ts",
    sourcePath: "tsignore/expect.ts",
  })

  actions.push({
    action: "merge",
    path: "package.json",
    source: { scripts: { test: "mocha" } },
  })

  actions.push({
    action: "merge",
    path: "tsconfig.base.json",
    source: { compilerOptions: { types: ["mocha"] } },
  })

  return actions
}
