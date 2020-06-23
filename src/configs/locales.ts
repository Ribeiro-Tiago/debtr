import { name as enGBName } from "../i18n/en";
import { name as ptPTName } from "../i18n/pt";

import { SupportedLocales } from "../types";

export const locales = [
  { key: SupportedLocales.en, name: enGBName, flag: ":gb:" },
  { key: SupportedLocales.pt, name: ptPTName, flag: ":flag-pt:" },
];
