#!/usr/bin/env node

const { Apkup } = require("apkup");
const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");

const { versionWithV } = require("./regex");

const getChangelog = () => {
  const results = readFileSync(resolve(__dirname, "../CHANGELOG"), {
    encoding: "utf-8",
  });

  return results.split(versionWithV)[1];
};

const deploy = () => {
  console.log("[>] Validating inputs");
  const AAB_PATH = resolve(
    __dirname,
    "../android/app/build/outputs/bundle/release/app-release.aab",
  );

  if (!existsSync(AAB_PATH)) {
    throw new Error(`Path to .aab file is invalid: ${AAB_PATH}`);
  }

  const { GAPI_KEY: private_key, GAPI_EMAIL: client_email } = process.env;
  if (!private_key || !client_email) {
    throw new Error(`environment variables are invalid`);
  }

  console.log("[>] Getting changelog for en-GB release notes");

  const changelog = getChangelog();

  let releaseNotes;
  if (changelog.length > 500) {
    console.warn(
      `[!] Skipping release notes, they're too large (${changelog.length}/500)`,
    );
  } else {
    releaseNotes = [{ language: "en-GB", text: changelog }];
  }

  console.log("[>] Starting deployment");

  return new Apkup({ client_email, private_key }).upload(AAB_PATH, {
    track: "production",
    releaseNotes,
  });
};

deploy()
  .then((data) => console.log(`Version ${data.versionCode} deployed!`))
  .catch((err) => {
    console.error(err);
    throw err;
  });
