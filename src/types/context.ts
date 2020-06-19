import { en_GB as i18nFile } from "../i18n";

export enum SupportedLocales {
  en_GB = "en_GB",
  pt_PT = "pt_PT",
}

export type I18n = typeof i18nFile;

export interface I18nContext {
  i18n: I18n;
  setI18n: React.Dispatch<React.SetStateAction<I18n>>;
}
