import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: (event?: MouseEvent) => void, // Change the signature to accept an optional event
  active: boolean = true
) => {
  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback(e);  // Pass the event to the callback
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, active]);
};

export default useClickOutside;