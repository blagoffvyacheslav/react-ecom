import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const element = ref?.current;

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
