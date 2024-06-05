import { useEffect, useRef, useState } from "react";

const useDynamicMenuPosition = (isOpen: boolean, onClose: () => void) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openUpwards, setOpenUpwards] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const menuElement = menuRef.current;
      if (menuElement) {
        const menuRect = menuElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate space below the menu button
        const spaceBelow = viewportHeight - menuRect.bottom;

        // Calculate space above the menu button
        const spaceAbove = menuRect.top;

        // Set whether to open upwards or downwards
        if (spaceBelow < menuElement.offsetHeight && spaceAbove > menuElement.offsetHeight) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false);
        }
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return { menuRef, openUpwards };
};

export default useDynamicMenuPosition;