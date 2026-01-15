// Bootstrap file to register module aliases before loading the app
// This must be a .js file to avoid TypeScript compilation reordering

const moduleAlias = require("module-alias")
const path = require("path")

// Register @ alias to point to the dist directory
moduleAlias.addAliases({
	"@": path.join(__dirname, "..", "dist")
})

// Now load the main application
require("../dist/index.js")
