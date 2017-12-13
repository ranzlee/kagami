var shell = require("shelljs");

shell.cp("-R", ".env.prod.config", "dist/.env.config");
