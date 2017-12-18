var shell = require("shelljs");

shell.cp("-R", ".env.dev.config", "dist/.env.config");
shell.cp("-R", "certificate.pem", "dist/certificate.pem");
shell.cp("-R", "key.pem", "dist/key.pem");
