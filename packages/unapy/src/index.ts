/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config"

import Core from "@/Core"

const moduleAlias = require("module-alias")
const path = require("path")

// Register module aliases before any other imports (must use require, not import)
moduleAlias.addAliases({
	"@": path.join(__dirname),
})

Core.boot()
