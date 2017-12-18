var shell = require("shelljs");

shell.cp("-R", ".env.prod.config", "dist/.env.config");
shell.cp("-R", "certificate.pem", "dist/certificate.pem");
shell.cp("-R", "key.pem", "dist/key.pem");
