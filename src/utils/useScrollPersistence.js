import { useEffect } from 'react';

export default function useScrollPersistence(key = 'scrollY') {
  useEffect(() => {
    const storedY = localStorage.getItem(key);
    if (storedY) {
      window.scrollTo(0, parseInt(storedY));
    }

    const saveScroll = () => {
      localStorage.setItem(key, window.scrollY);
    };

    window.addEventListener('beforeunload', saveScroll);
    return () => {
      window.removeEventListener('beforeunload', saveScroll);
      saveScroll(); // persist on unmount
    };
  }, [key]);
}
