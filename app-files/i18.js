import i18n from "i18next";
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/ar";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

const resources = {
  ar: {
    translation: {
      "No results found": "لم يتم العثور على نتائج",
      "Home Screen": "الصفحة الرئيسية",
      "Favorite Screen": "الصفحة المفضلة",
      "Search Screen": "صفحة البحث",
      "Settings Screen": "صفحة الاعدادات",
      "Confirm Logout": "تأكيد تسجيل خروج",
      "Are you sure you want to log out?": "هل انت متأكد انك تريد الخروج",
      Cancel: "إلغاء",
      Yes: "نعم",
      "Confirm Action": "تآكيد العمل",
      "Are you sure you want to remove all favorites?":
        "هل انت متأكد من حذف جميع قائمة المفضلة",
      "No favorites yet.": "ليس هناك مفضلة للأن",
      Search: "بحث",
      Details: "التفاصيل",
      "Select Language": "اختر اللغة",
      "Choose your preferred language:": "اختر اللغة التي تفضلها",
      Arabic: "العربية",
      English: "الانجليزية",
      Home: "الرئيسية",
      Favorite: "المفضلة",
      Search: "البحث",
      Settings: "الاعدادات",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback to English if no translation exists
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
