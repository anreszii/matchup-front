import i18n from "i18next";

import ru from "./translations/ru.json";
import en from "./translations/en.json";

i18n.init({
  compatibilityJSON: "v3",
  lng: "ru",
  resources: {
    ru,
    en,
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
