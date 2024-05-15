import type {Config} from "jest"

const config: Config = {
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node", 
    reporters: ["default"]
}

export default config
