import en_GB, { name as enGBName } from "./en_GB";
import pt_PT, { name as ptPTName } from "./pt_PT";
import { SupportedLocales } from "../types/context";

export { en_GB, pt_PT };

export const metadata = [
  { key: SupportedLocales.en_GB, name: enGBName, flag: ":gb:" },
  { key: SupportedLocales.pt_PT, name: ptPTName, flag: ":flag-pt:" },
];
