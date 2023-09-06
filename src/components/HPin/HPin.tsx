import React, { useRef } from "react";
import { HPin as HPinProps } from "../../types/pin";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { breakpoints } from "../../config/variables";
import { useWindowSize } from "../../hooks/useWindowSize";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicEffect";
import "./HPin.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HPin({
  children,
  triggerRef,
  scrub = 0.3,
  start = "center center",
  spacing = "1rem",
  sideSpacing = "0",
  startPos = "20%",
  endPos = 1.1,
}: HPinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const { windowWidth, windowHeight } = useWindowSize();

  gsap.registerPlugin(ScrollTrigger);

  useIsomorphicLayoutEffect(() => {
    let ctx: any = null;

    if (isDesktop) {
      ctx = gsap.context(() => {
        const timeline = gsap.timeline();
        const containerWidth = containerRef.current?.scrollWidth ?? "90%";
        let amountToScroll = windowWidth - Number(containerWidth) * endPos;

        timeline.fromTo(
          containerRef.current,
          { x: startPos },
          { x: amountToScroll, duration: 10 }
        );

        ScrollTrigger.create({
          trigger: triggerRef?.current
            ? triggerRef.current
            : containerRef.current,
          start: start,
          pin: true,
          scrub: scrub,
          animation: timeline,
          invalidateOnRefresh: true,
        });
      }, containerRef);
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isDesktop, windowWidth, windowHeight]);

  return (
    <div
      className="hpin"
      ref={containerRef}
      style={{
        gap: spacing,
        margin: `0 calc(${!isDesktop ? sideSpacing : 0} * -1)`,
        padding: `0 ${!isDesktop ? sideSpacing : 0}`,
      }}
    >
      {children}
    </div>
  );
}
