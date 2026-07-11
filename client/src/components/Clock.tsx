import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFullDateTime, getCurrentDates, getTimeString } from '@/lib/hijri';

export default function Clock() {
  const { language } = useLanguage();
  const [dateTime, setDateTime] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Update immediately
    const updateClock = () => {
      const now = new Date();
      const fullDateTime = getFullDateTime(language as 'ar' | 'en');
      const timeString = getTimeString(now, language as 'ar' | 'en');
      setDateTime(fullDateTime);
      setTime(timeString);
    };

    updateClock();

    // Update every second
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border py-3 px-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>{dateTime}</span>
        </div>
        <div className="text-accent font-mono font-semibold">
          {time}
        </div>
      </div>
    </div>
  );
}
