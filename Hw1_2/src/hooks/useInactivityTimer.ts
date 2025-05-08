import { useEffect } from 'react';

export const useInactivityTimer = (timeout: number, onTimeout: () => void) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(onTimeout, timeout);
    };

    const events = ['mousedown', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => document.addEventListener(event, resetTimer));
    
    resetTimer();

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [timeout, onTimeout]);
}; 