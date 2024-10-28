import { I18n } from "i18n-js";
import eng from "./languages/eng";
import spn from "./languages/spanish";

const i18n = new I18n({
  eng,
  spn,
});

i18n.locale = 'eng';
i18n.enableFallback = true; 
export default i18n;
