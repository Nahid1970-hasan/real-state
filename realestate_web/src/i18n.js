import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

const ns = ['translation'];
const supportedLngs = ['en','bn'];

i18n.use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        //debug: true, 
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: { useSuspense: false },
        defaultNS: 'translation',
        ns,
        supportedLngs,
        backend: {          
	  loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        initImmediate: false,
    });
    i18n.services.formatter.add("DATE_HUGE", (value, lng, options) => { 
          return DateTime.fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime.DATE_HUGE);
        });
export default i18n;



