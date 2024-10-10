import { useRef } from "react";

export const useSmoothScroll = <T extends HTMLElement>(): [
  React.RefObject<T>,
  () => void
] => {
  const elementRef = useRef<T>(null);

  const scrollToElement = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return [elementRef, scrollToElement];
};
