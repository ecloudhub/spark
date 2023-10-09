import React, { useRef } from "react";
import { HPin as HPinProps } from "../../types/pin";
import { breakpoints } from "../../config/variables";
import "./HPin.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  useIsomorphicLayoutEffect,
  useMediaQuery,
  useWindowSize,
} from "../../hooks";

export default function HPin({
  children,
  triggerRef,
  scrub = 0.3,
  start = "center center",
  end = "bottom top",
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
          { x: amountToScroll }
        );

        ScrollTrigger.create({
          trigger: triggerRef?.current
            ? triggerRef.current
            : containerRef.current,
          start: start,
          end: end,
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
      className="spark-hpin"
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
