var shell = require("shelljs");

shell.cp("-R", ".env.dev.config", "dist/.env.config");
