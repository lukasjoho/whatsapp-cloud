import { z } from "zod";

/**
 * Supported WhatsApp template languages
 * Based on WhatsApp Cloud API supported language codes
 */
export const templateLanguageSchema = z.enum([
  "af", // Afrikaans
  "sq", // Albanisch
  "ar", // Arabisch
  "ar_EG", // Arabisch (Ägypten)
  "ar_AE", // Arabisch (Vereinigte Arabische Emirate)
  "ar_LB", // Arabisch (LBN)
  "ar_MA", // Arabisch (MAR)
  "ar_QA", // Arabisch (QAT)
  "az", // Aserbaidschanisch
  "be_BY", // Belarussisch
  "bn", // Bengalisch
  "bn_IN", // Bengali (IND)
  "bg", // Bulgarisch
  "ca", // Katalanisch
  "zh_CN", // Chinesisch (CHN)
  "zh_HK", // Chinesisch (HKG)
  "zh_TW", // Chinesisch (TAI)
  "hr", // Kroatisch
  "cs", // Tschechisch
  "da", // Dänisch
  "prs_AF", // Dari
  "nl", // Niederländisch
  "nl_BE", // Niederländisch (BEL)
  "en", // Englisch
  "en_GB", // Englisch (UK)
  "en_US", // Englisch (USA)
  "en_AE", // Englisch (Vereinigte Arabische Emirate)
  "en_AU", // Englisch (AUS)
  "en_CA", // Englisch (Kanada)
  "en_GH", // Englisch (GHA)
  "en_IE", // English (IRL)
  "en_IN", // Englisch (Indien)
  "en_JM", // Englisch (JAM)
  "en_MY", // Englisch (MYS)
  "en_NZ", // Englisch (Neuseeland)
  "en_QA", // Englisch (QAT)
  "en_SG", // Englisch (SGP)
  "en_UG", // Englisch (UGA)
  "en_ZA", // Englisch (ZAF)
  "et", // Estnisch
  "fil", // Filipino
  "fi", // Finnisch
  "fr", // Französisch
  "fr_BE", // Französisch (BEL)
  "fr_CA", // Französisch (Kanada)
  "fr_CH", // Französisch (CHE)
  "fr_CI", // Französisch (CIV)
  "fr_MA", // Französisch (MAR)
  "ka", // Georgisch
  "de", // Deutsch
  "de_AT", // Deutsch (Österreich)
  "de_CH", // Deutsch (CHE)
  "el", // Griechisch
  "gu", // Gujarati
  "ha", // Hausa
  "he", // Hebräisch
  "hi", // Hindi
  "hu", // Ungarisch
  "id", // Indonesisch
  "ga", // Irisch
  "it", // Italienisch
  "ja", // Japanisch
  "kn", // Kannada
  "kk", // Kasachisch
  "rw_RW", // Kinyarwanda
  "ko", // Koreanisch
  "ky_KG", // Kirgisisch (Kirgisistan)
  "lo", // Laotisch
  "lv", // Lettisch
  "lt", // Litauisch
  "mk", // Mazedonisch
  "ms", // Malaiisch
  "ml", // Malayalam
  "mr", // Marathi
  "nb", // Norwegisch
  "ps_AF", // Paschtunisch
  "fa", // Persisch
  "pl", // Polnisch
  "pt_BR", // Portugiesisch (BR)
  "pt_PT", // Portugiesisch (POR)
  "pa", // Panjabi
  "ro", // Rumänisch
  "ru", // Russisch
  "sr", // Serbisch
  "si_LK", // Sinhala
  "sk", // Slowakisch
  "sl", // Slowenisch
  "es", // Spanisch
  "es_AR", // Spanisch (ARG)
  "es_CL", // Spanisch (CHL)
  "es_CO", // Spanisch (Kolumbien)
  "es_CR", // Spanisch (CRI)
  "es_DO", // Spanisch (DOM)
  "es_EC", // Spanisch (ECU)
  "es_HN", // Spanisch (Honduras)
  "es_MX", // Spanisch (MEX)
  "es_PA", // Spanisch (PAN)
  "es_PE", // Spanisch (Peru)
  "es_ES", // Spanisch (SPA)
  "es_UY", // Spanisch (URY)
  "sw", // Swahili
  "sv", // Schwedisch
  "ta", // Tamil
  "te", // Telugu
  "th", // Thai
  "tr", // Türkisch
  "uk", // Ukrainisch
  "ur", // Urdu
  "uz", // Usbekisch
  "vi", // Vietnamesisch
  "zu", // Zulu
]);
