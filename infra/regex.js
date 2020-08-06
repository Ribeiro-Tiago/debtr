module.exports.versionWithDate = /v[0-9].[0-9].[0-9] \([0-9]{2}\/[0-9]{2}\/[0-9]{4}\)/;

module.exports.versionWithV = /v[0-9].[0-9].[0-9]/;

module.exports.versionHasDate = /v[0-9].[0-9].[0-9] \([0-9]\/[0-9]\/[0-9]\)/;

module.exports.pkgJsonVersion = /"version": "[0-9]+.[0-9]+.[0-9]+"/;

module.exports.buildGradle = {
  code: /versionCode [0-9]+/,
  name: /versionName ".*"/,
};
