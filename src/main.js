import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import * as countries from "i18n-iso-countries";
import vueCountryRegionSelect from "vue-country-region-select";
import Vue2TouchEvents from 'vue2-touch-events'
import vSelect from "vue-select";

let locale = localStorage.getItem("lang");
const userLang = navigator.language || navigator.userLanguage; 

if (locale === null) {
  if(userLang){
    locale = userLang[0]+userLang[1];
    localStorage.setItem("lang", locale);
  }else{
    locale = "en";
    localStorage.setItem("lang", "en");
  }
  
}

const i18n = createI18n({
  legacy: false,
  locale,
  messages: {
    en: {
      welcome_page: {
        welcome_to: "Welcome to",
        this_is_made_exclusively_to:"This is made exclusively to",
        read_the_terms_of_use:"Read the terms of use"
      },
      email: "E-Mail",
      name: "Name",
      birthday: "Date of birth",
      country: "Country",
      city: "City",
      gender: "Gender",
      day: "Day",
      month: "Month",
      year: "Year",
      reportTitle:
        "Thank you for taking the time to finish our personality test. Here's your final report.",
      finishTest: "Please finish your test",
      emailSent: "E-mail sent",
      emailConfirmed: "E-mail confirmed",
      resetPassword: "Password reset",
      noAccount: "Don't have an account?",
      compatibilityReport: "Compatibility Report",
      compatibilityDescription: "To view your compatibility report with another person you have to enter his code",
      compatibilityPopupTitle: "Enjoy your compatibility report",
      yourCode: "This is your CODE",
      viewReportButton: "VIEW COMPATIBILITY REPORT",
      sameCode: "Please enter someone else's code",
      compatibilityError: "Compatibility report already sent",
      passwordEmailSent: "We have sent you an e-mail to set a password",
      unconfirmed: "Please verify your e-mail (check your inbox)",
      noOceanError: "Please take the personality test first",
      resendLink: "Resend login link",
      invalidCode: "Invalid code",
      compatibilityTaken: "Compatibility report already generated",
      personalitySubject: "Your personality test results",
      newPassword: "New password",
      resendCode: "Resend code",
      validateEmail: "Please enter a valid email",
      enterCode: "Enter Code",
      validateName: "Please enter a valid name",
      validateCountry: "Please enter a valid country",
      validateCity: "Please enter a valid city",
      validateBirthday: "Please enter a valid birthday",
      password: "Password",
      validatePassword: "Please enter a valid password (at least 8 characters)",
      fullName: "Full Name",
      enterName: "Please enter a name",
      login: "Login",
      loginError: "Error logging in",
      signupError: "Email already exists",
      emailVerify: "Please verify your e-mail",
      signupSuccess: "Sign up successful. Check your e-mail",
      signUp: "Sign Up",
      personalityTaken: "Personality test already taken",
      close: "Close",
      yourResults: "Your test result",
      personalityPopupTitle: "Enjoy your personality test",
      incompleteError: "You need to finish answering all the questions first!",
      submit: "Submit",
      incomplete: "Please fill out this field.",
      male: "Male",
      female: "Female",
      back: "Back",
      next: "Next",
      other: "Other",
      selectGender: "Select gender",
      resendEmail: "Resend login e-mail",
      personalityTest: "Personality Test",
      hAgree: "Strongly Agree",
      mAgree: "Agree",
      sAgree: "Somewhat Agree",
      hDisagree: "Strongly Disagree",
      mDisagree: "Disagree",
      sDisagree: "Somewhat Disagree",
      question_number: "Question Number {n}",
      of: "of"
    },
    fr: {
      welcome_page: {
        welcome_to: "Bienvenue sur",
        this_is_made_exclusively_to:"Ceci est fait exclusivement pour",
        read_the_terms_of_use:"Lisez les conditions d'utilisation"
      },
      email: "E-Mail",
      name: "Nom complet",
      birthday: "Date de naissance",
      country: "Pays",
      city: "Ville",
      gender: "Genre",
      day: "Jour",
      month: "Mois",
      year: "Année",
      reportTitle:
        "Merci d'avoir pris le temps de terminer notre test de personnalité. Voici votre rapport final.",
      finishTest: "Veuillez d'abord finir votre test",
      emailSent: "E-mail envoyé",
      emailConfirmed: "E-mail verifié",
      resetPassword: "Réinitialisation du mot de passe",
      noAccount: "Vous n'avez pas de compte?",
      compatibilityReport: "Rapport de compatibilité",
      compatibilityDescription: "Entrez le code de quelqu'un d'autre pour obtenir votre rapport de compatibilité",
      compatibilityPopupTitle: "Profitez de votre rapport de compatibilité",
      yourCode: "Votre code",
      viewReportButton: "VOIR LE RAPPORT DE COMPATIBILITÉ",
      sameCode: "Please enter someone else's code",
      compatibilityError: "Rapport de compatibilité déjà envoyé",
      passwordEmailSent: "Nous vous avons envoyé un e-mail pour définir un mot de passe",
      unconfirmed: "Veuillez vérifier votre e-mail (vérifiez votre boîte de réception)",
      noOceanError: "Veuillez d'abord passer le test de personnalité",
      resendLink: "Renvoyer le lien de connexion",
      invalidCode: "Code invalide",
      compatibilityTaken: "Code invalide",
      personalitySubject: "Les résultats de votre test de personnalité",
      newPassword: "Nouveau mot de passe",
      resendCode: "Renvoyer le code",
      validateEmail: "Veuillez saisir un e-mail valide",
      enterCode: "Entrez le code",
      validateName: "Veuillez saisir un nom valide",
      validateCountry: "Veuillez saisir un pays valide",
      validateCity: "Veuillez saisir une ville valide",
      validateBirthday: "Veuillez saisir une date d'anniversaire valide",
      password: "Mot de passe",
      validatePassword:
        "Veuillez saisir un mot de passe valide (au moins 8 caractères)",
      fullName: "Nom complet",
      enterName: "Veuillez saisir un nom",
      login: "S'identifier",
      loginError: "Erreur de connexion",
      signupError: "L'email existe déjà",
      emailVerify: "Please verify your e-mail",
      signupSuccess: "Inscription réussie. Vérifiez votre e-mail",
      signUp: "S'inscrire",
      personalityTaken: "Test de personnalité déjà passé",
      close: "Fermer",
      yourResults: "Votre résultat de test",
      personalityPopupTitle: "Profitez de votre test de personnalité",
      incompleteError:
        "Vous devez d'abord finir de répondre à toutes les questions!",
      submit: "Soumettre",
      incomplete: "Veuillez remplir ce champ.",
      male: "Mâle",
      female: "Femelle",
      back: "Retour",
      next: "Suivant",
      other: "Autre",
      selectGender: "Votre genre",
      resendEmail: "Renvoyer l'e-mail de connexion",
      personalityTest: "Test de personnalité",
      hAgree: "Tout à fait d'accord",
      mAgree: "D'accord",
      sAgree: "Un peu d'accord",
      hDisagree: "Pas du tout d'accord",
      mDisagree: "Pas d'accord",
      sDisagree: "Un peu pas d'accord",
      question_number: "Question Numéro {n}",
      of: "de"
    },
    ar: {
      welcome_page: {
        welcome_to: "مرحبا بك في",
        this_is_made_exclusively_to:"هذا مصنوع حصريا ل",
        read_the_terms_of_use:"اقرأ شروط الاستخدام"
      },
      email: "البريد الإلكتروني",
      name: "الاسم الكامل",
      birthday: "تاريخ الولادة",
      country: "البلد",
      city: "المدينة",
      gender: "الجنس",
      day: "يوم",
      month: "شهر",
      year: "سنة",
      reportTitle:
        "شكرًا لك على الوقت الذي قضيته في إنهاء اختبار الشخصية. هذا هو تقريرك النهائي.",
      finishTest: "الرجاء اجتياز اختبارك أولا",
      emailSent: "أرسل البريد الإلكتروني",
      emailConfirmed: "تم تأكيد البريد الإلكتروني",
      resetPassword: "إعادة تعيين كلمة المرور",
      noAccount: "ليس لديك حساب؟",
      compatibilityReport: "تقرير التوافق",
      compatibilityDescription: "أدخل رمز شخص آخر للحصول على تقرير التوافق الخاص بك",
      yourCode: "الكود الخاص بك",
      sameCode: "الرجاء إدخال رمز شخص آخر",
      compatibilityError: "تم إرسال تقرير التوافق بالفعل",
      passwordEmailSent: "لقد أرسلنا لك بريدًا إلكترونيًا لتعيين كلمة مرور",
      unconfirmed: "يرجى التحقق من بريدك الإلكتروني (تحقق من صندوق الوارد الخاص بك)",
      noOceanError: "يرجى إجراء اختبار الشخصية أولاً",
      resendLink: "إعادة إرسال رابط تسجيل الدخول",
      invalidCode: "الرمز غير صحيح",
      compatibilityTaken: "الرمز غير صحيح",
      personalitySubject: "نتائج اختبار شخصيتك",
      newPassword: "كلمة سر جديدة",
      resendCode: "أعد إرسال الرمز",
      validateEmail: "يرجى إدخال البريد الإلكتروني الصحيح",
      enterCode: "ادخل الرمز",
      validateName: "يرجى إدخال الاسم الصحيح",
      validateCountry: "يرجى إدخال البلد الصحيح",
      validateCity: "يرجى إدخال المدينة الصحيحة",
      validateBirthday: "يرجى إدخال تاريخ الولادة الصحيح",
      password: "كلمه السر",
      validatePassword: "الرجاء إدخال كلمة مرور صالحة (8 أحرف على الأقل)",
      fullName: "الاسم الكامل",
      enterName: "الرجاء إدخال اسم",
      login: "تسجيل الدخول",
      loginError: "خطأ في تسجيل الدخول",
      signupError: "البريد الالكتروني موجود",
      emailVerify: "يرجى التحقق من البريد الإلكتروني الخاص بك",
      signupSuccess: "الاشتراك بنجاح. تحقق من بريدك الالكتروني",
      signUp: "سجل",
      personalityTaken: "تم إجراء اختبار الشخصية بالفعل",
      close: "أغلق",
      yourResults: "نتيجة الاختبار الخاصة بك",
      incompleteError: "أنت بحاجة إلى إنهاء الإجابة على جميع الأسئلة أولاً!",
      submit: "إرسال",
      incomplete: "الرجاء ملء هذه الخانة.",
      male: "ذكر",
      female: "أنثى",
      back: "عودة",
      next: "التالى",
      other: "آخر",
      selectGender: "حدد الجنس",
      resendEmail: "إعادة إرسال البريد الإلكتروني",
      personalityTest: "اختبار الشخصية",
      hAgree: "موافق تماما",
      mAgree: "موافق",
      sAgree: "موافق قليلا",
      hDisagree: "غير موافق قطعا",
      mDisagree: "غير موافق",
      sDisagree: "غير موافق قليلا",
      question_number: "سؤال عدد {n}",
      of: "من"
    },
  },
});

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
countries.registerLocale(require("i18n-iso-countries/langs/ar.json"));

const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(vueCountryRegionSelect)
  .use(Vue2TouchEvents)
  .mixin({
    data() {
      return {
        get apiUrl() {
          return "https://lovester.net/backend/public/api/";
          // return "http://localhost:8000/api/";
        },
      };
    },
  });
  app.component("v-select", vSelect )

app.mount("#app");
