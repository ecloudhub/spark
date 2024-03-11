import React, { useRef } from "react";
import { HPin as HPinProps } from "../../types/pin";
import { breakpoints } from "../../config/variables";
import "./HPin.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  useDocumentHeight,
  useIsomorphicLayoutEffect,
  useMediaQuery,
  useWindowSize,
} from "../../hooks";

export default function HPin({
  children,
  triggerRef,
  pin = true,
  scrub = 0.3,
  start = "center center",
  end = "bottom top",
  markers = false,
  spacing = "1rem",
  sideSpacing = "0",
  startPos = "20%",
  endPos = 1.1,
}: HPinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const { windowWidth } = useWindowSize();
  const docuHeight = useDocumentHeight();

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!isDesktop) return;

    const ctx = gsap.context(() => {
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
        pin: pin,
        scrub: scrub,
        animation: timeline,
        markers: markers,
      });
    }, containerRef);

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isDesktop, windowWidth, docuHeight]);

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
