import { name as enGBName } from "../i18n/en";
import { name as ptPTName } from "../i18n/pt";
import { name as esEsName } from "../i18n/es";

import { SupportedLocales } from "../types";

export const locales = [
  { key: SupportedLocales.en, name: enGBName },
  { key: SupportedLocales.pt, name: ptPTName },
  { key: SupportedLocales.es, name: esEsName },
];
