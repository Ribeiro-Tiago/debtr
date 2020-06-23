#!/usr/bin/env node

import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import {
  versionWithDate,
  versionWithV,
  pkgJsonVersion,
  buildGradle,
} from "./regex";

const getToday = () => {
  const addLeadZero = (num: number) => `0${num}`.substr(-2);
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
    changelog = changelog.replace(version, `${version} (${getToday()})`);
  }

  writeFileSync(path, changelog);

  return version.split("v")[1];
};

const updatePackageJsonVersion = (version: string) => {
  const path = join(__dirname, "../package.json");
  let json = readFileSync(path, { encoding: "utf-8" });

  json = json.replace(pkgJsonVersion, `"version": "${version}"`);

  writeFileSync(path, json);
};

const updateBuildGradleVersion = (version: string) => {
  const path = join(__dirname, "../android/app/build.gradle");
  let gradle = readFileSync(path, { encoding: "utf-8" });

  gradle = gradle.replace(
    buildGradle.code,
    `versionCode ${version.replace(".", "")}`,
  );
  gradle = gradle.replace(buildGradle.name, `versionName "${version}"`);

  writeFileSync(path, gradle);
};

const update = () => {
  const version = updateChangelogDateAndGetVersion();

  updatePackageJsonVersion(version);
  updateBuildGradleVersion(version);
};

update();
