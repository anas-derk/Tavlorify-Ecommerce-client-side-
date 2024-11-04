import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import svTranslation from "./sv.translation.json";

i18next.use(initReactI18next).init({
    resources: {
        sv: { translation: svTranslation },
    },
    lng: "sv",
    fallbackLng: "en",
});

export default i18next;