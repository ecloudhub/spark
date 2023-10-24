import React, { useRef, useState } from "react";
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
  const [documentHeight, setDocumentHeight] = useState<number>(0);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const { windowWidth } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!isDesktop) return;

    const docuElement = document.documentElement;
    const resizeObserver = new ResizeObserver(() => {
      setDocumentHeight(docuElement.scrollHeight);
    });
    resizeObserver.observe(docuElement);

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
        pin: true,
        scrub: scrub,
        animation: timeline,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    return () => {
      if (ctx) {
        ctx.revert();
        resizeObserver.disconnect();
      }
    };
  }, [isDesktop, windowWidth, documentHeight]);

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
