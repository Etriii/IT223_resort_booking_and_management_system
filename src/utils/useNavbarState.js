// useDropdownState.js
import { useState, useEffect } from 'react';

export default function useNavbarState(key = "sideNavOpen") {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem(key) === "true");

  useEffect(() => {
    localStorage.setItem(key, isOpen);
  }, [isOpen, key]);

  return [isOpen, setIsOpen];
}
