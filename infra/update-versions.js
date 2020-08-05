#!/usr/bin/env node

const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const {
  versionWithDate,
  versionWithV,
  pkgJsonVersion,
  buildGradle,
} = require("./regex");
const pkgjson = require("../package.json");

const getToday = () => {
  const addLeadZero = (num) => `0${num}`.substr(-2);
  const d = new Date();

  return `${addLeadZero(d.getDate())}/${addLeadZero(
    d.getMonth() + 1,
  )}/${d.getFullYear()}`;
};

const updateChangelogDateAndGetVersion = () => {
  const path = join(__dirname, "../CHANGELOG");
  let changelog = readFileSync(path, { encoding: "utf-8" });

  const [version] = changelog.match(versionWithV);

  if (versionWithDate.test(changelog)) {
    console.log("> updating changelog date");
    changelog = changelog.replace(version, `${version} (${getToday()})`);
  }

  writeFileSync(path, changelog);

  return version.split("v")[1];
};

const updatePackageJsonVersion = (version) => {
  console.log(`[>] Updating package.json version to ${version}`);

  const json = pkgjson.replace(pkgJsonVersion, `"version": "${version}"`);

  writeFileSync(path, json);
};

const updateBuildGradleVersion = (version) => {
  const path = join(__dirname, "../android/app/build.gradle");
  let gradle = readFileSync(path, { encoding: "utf-8" });

  const versionCode = version.replace(/\./g, "");

  console.log(`[>] replacing build.gradle version code to ${versionCode}`);

  gradle = gradle.replace(buildGradle.code, `versionCode ${versionCode}`);

  console.log(`[>] replacing build.gradle version name to ${version}`);
  gradle = gradle.replace(buildGradle.name, `versionName "${version}"`);

  writeFileSync(path, gradle);
};

const update = () => {
  const version = updateChangelogDateAndGetVersion();

  updatePackageJsonVersion(version);
  updateBuildGradleVersion(version);
};

update();
