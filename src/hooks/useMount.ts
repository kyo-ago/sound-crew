import { useEffect, useRef } from "react";

export const useMount = (fn: () => void) => {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    fn();
  }, []);
};
