import { name as enGBName } from "../i18n/en_GB";
import { name as ptPTName } from "../i18n/pt_PT";

import { SupportedLocales } from "../types";

export const locales = [
  { key: SupportedLocales.en_GB, name: enGBName, flag: ":gb:" },
  { key: SupportedLocales.pt_PT, name: ptPTName, flag: ":flag-pt:" },
];
