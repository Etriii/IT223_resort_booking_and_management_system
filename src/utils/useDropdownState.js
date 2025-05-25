// useDropdownState.js
import { useState, useEffect } from 'react';

export default function useDropdownState(key = "profileDropdownOpen") {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem(key) === "true");

  useEffect(() => {
    localStorage.setItem(key, isOpen);
  }, [isOpen, key]);

  return [isOpen, setIsOpen];
}
