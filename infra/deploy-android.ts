// @ts-ignore
import playup from "playup";
import { join } from "path";
import { readFileSync, existsSync } from "fs";

import configs from "./google-api.json";
import { versionWithV } from "./regex";

interface Response {
  packageName: string;
  versionCode: string;
}

const getChangelog = () => {
  const results = readFileSync(join(__dirname, "../CHANGELOG"), {
    encoding: "utf-8",
  });

  return results.split(versionWithV)[1];
};

export default () => {
  const AAB_PATH = join(
    __dirname,
    "../android/app/build/bundle/release/app-relase.aab",
  );

  if (!existsSync(AAB_PATH)) {
    throw `Path to .aab file is invalid: ${AAB_PATH}`;
  }

  const { private_key, client_email } = configs;

  if (!private_key || !client_email) {
    throw `environment variables are invalid`;
  }

  const publisher = playup({ client_email, private_key });

  publisher
    .upload(AAB_PATH, {
      recentChanges: {
        "en-UK": getChangelog(),
      },
    })
    .then(function ({ packageName, versionCode }: Response) {
      console.log(" > %s version %d is up!", packageName, versionCode);
    });
};
