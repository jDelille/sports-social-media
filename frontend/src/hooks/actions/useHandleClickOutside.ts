import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  active: boolean = true
) => {
  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, active]);
};

export default useClickOutside;