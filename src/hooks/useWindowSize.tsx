import { throttle } from "lodash";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicEffect";

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    const resizeWatcher = throttle(updateSize, 50);

    window.addEventListener("resize", resizeWatcher);
    window.addEventListener("change", resizeWatcher);

    resizeWatcher();

    return () => {
      window.removeEventListener("resize", resizeWatcher);
      window.removeEventListener("change", resizeWatcher);
    };
  }, []);

  return { windowWidth, windowHeight };
};
