/**
 * Hijri Calendar Conversion Library
 * Converts Gregorian dates to Islamic Hijri dates
 */

export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

const hijriMonths = {
  ar: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الثانية',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ],
  en: [
    'Muharram',
    'Safar',
    'Rabi al-awwal',
    'Rabi al-thani',
    'Jumada al-awwal',
    'Jumada al-thani',
    'Rajab',
    'Sha\'ban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qi\'dah',
    'Dhu al-Hijjah',
  ],
};

const gregorianMonths = {
  ar: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const daysOfWeek = {
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

/**
 * Convert Gregorian date to Hijri date
 * Based on the algorithm by Reingold and Dershowitz
 */
export function gregorianToHijri(date: Date): HijriDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let N = day + Math.floor(30.6001 * (month + 1)) - Math.floor(30.6001 * 1) + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) - 621557;

  let Q = Math.floor(N / 10631);
  N = N % 10631;

  let R = Math.floor(N / 325);
  if (R === 4) R = 3;

  N = N % 325;

  let S = Math.floor(N / 30);
  if (S === 11) S = 10;

  const hijriDay = N % 30 + 1;
  const hijriMonth = S + 1;
  const hijriYear = Q * 30 + R * 5 + S + 1;

  return {
    year: hijriYear,
    month: hijriMonth,
    day: hijriDay,
  };
}

/**
 * Format Hijri date as string
 */
export function formatHijriDate(hijriDate: HijriDate, language: 'ar' | 'en' = 'ar'): string {
  const monthName = hijriMonths[language][hijriDate.month - 1];
  return `${hijriDate.day} ${monthName} ${hijriDate.year}`;
}

/**
 * Format Gregorian date as string
 */
export function formatGregorianDate(date: Date, language: 'ar' | 'en' = 'ar'): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthName = gregorianMonths[language][month];
  return `${day} ${monthName} ${year}`;
}

/**
 * Get day of week name
 */
export function getDayOfWeek(date: Date, language: 'ar' | 'en' = 'ar'): string {
  const dayIndex = date.getDay();
  return daysOfWeek[language][dayIndex];
}

/**
 * Get current date in both Gregorian and Hijri formats
 */
export function getCurrentDates(language: 'ar' | 'en' = 'ar') {
  const now = new Date();
  const hijri = gregorianToHijri(now);

  return {
    gregorian: formatGregorianDate(now, language),
    hijri: formatHijriDate(hijri, language),
    dayOfWeek: getDayOfWeek(now, language),
    date: now,
  };
}

/**
 * Get time string with AM/PM
 */
export function getTimeString(date: Date, language: 'ar' | 'en' = 'ar'): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Get full formatted date and time
 */
export function getFullDateTime(language: 'ar' | 'en' = 'ar') {
  const now = new Date();
  const hijri = gregorianToHijri(now);
  const dayOfWeek = getDayOfWeek(now, language);
  const gregorianDate = formatGregorianDate(now, language);
  const hijriDate = formatHijriDate(hijri, language);
  const time = getTimeString(now, language);

  if (language === 'ar') {
    return `${dayOfWeek} - ${gregorianDate} | ${hijriDate} | ${time}`;
  } else {
    return `${dayOfWeek} - ${gregorianDate} | ${hijriDate} | ${time}`;
  }
}
