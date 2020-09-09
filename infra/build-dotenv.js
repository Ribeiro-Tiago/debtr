const setup = () => {
  const envVars = Object.entries(process.env).filter(([key]) => {
    return key.includes("DOTENV_");
  });

  if (!envVars.length) {
    return;
  }

  const { writeFileSync } = require("fs");
  const { resolve } = require("path");

  writeFileSync(
    resolve(__dirname, "../.env"),
    envVars
      .map(([key, value]) => `${key.split("DOTENV_")[1]}=${value}`)
      .join("\n"),
  );
};

setup();
