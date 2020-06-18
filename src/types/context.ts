export type SupportedLanguage = "en_GB" | "pt_PT";

export interface I18n {
  [key: string]: string;
}

export interface I18nContext {
  i18n: I18n;
  setI18n: React.Dispatch<React.SetStateAction<I18n>>;
}
