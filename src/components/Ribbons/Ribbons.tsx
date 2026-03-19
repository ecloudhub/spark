import React, { useEffect, useRef } from "react";
import { Ribbons as RibbonsProps } from "../../types/ribbon";
import Marquee from "react-fast-marquee";
import { useWindowSize } from "../../hooks";
import "./Ribbons.scss";

export default function Ribbons({
  children,
  bottomDirection = "left",
  topDirection = "right",
  speed = 50,
  pauseOnHover = false,
  containerClass = "",
  ribbonClass = "",
}: RibbonsProps) {
  const ribbonsRef = useRef<HTMLDivElement>(null);
  const ribbonRef1 = useRef<HTMLDivElement>(null);

  const { windowHeight, windowWidth } = useWindowSize();

  const setRibbonsHeight = () => {
    const boundingBox = ribbonRef1.current?.getBoundingClientRect();
    if (ribbonsRef.current) {
      ribbonsRef.current.style.height = boundingBox?.height + "px";
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setRibbonsHeight();
    });

    if (ribbonRef1.current) {
      resizeObserver.observe(ribbonRef1.current);
    }

    setRibbonsHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [windowHeight, windowWidth]);

  return (
    <div className={`spark-ribbons ${containerClass}`} ref={ribbonsRef}>
      <div className={`spark-ribbon ${ribbonClass}`} ref={ribbonRef1}>
        <Marquee
          direction={bottomDirection}
          speed={speed}
          pauseOnHover={pauseOnHover}
          gradient={false}
          autoFill
        >
          {children}
        </Marquee>
      </div>
      <div className={`spark-ribbon ${ribbonClass && ribbonClass}`}>
        <Marquee
          direction={topDirection}
          speed={speed}
          pauseOnHover={pauseOnHover}
          gradient={false}
          autoFill
        >
          {children}
        </Marquee>
      </div>
    </div>
  );
}
