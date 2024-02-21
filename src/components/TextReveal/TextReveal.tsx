import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextReveal as TextRevealProps } from "../../types/text";
import SplitType from "split-type";
import "./TextReveal.scss";
import {
  useIsomorphicLayoutEffect,
  useMediaQuery,
  useWindowSize,
} from "../../hooks";
import { breakpoints } from "../../config/variables";

export default function TextReveal({
  children,
  duration = 3,
  start = "top 90%",
  scrub = false,
  toggleActions = "play none none none",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { windowWidth } = useWindowSize();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  const splitLines = () => {
    SplitType.create(ref.current ?? "", {
      types: "lines",
      tagName: "div",
    });
  };

  useIsomorphicLayoutEffect(() => {
    let ctx: any = null;
    let timer: any = null;

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      timer = setTimeout(() => {
        splitLines();

        const lines = ref.current?.querySelectorAll(".line");
        const textTimeline = gsap.timeline();

        textTimeline.to(ref.current, { opacity: 1, duration: 0 });

        ScrollTrigger.create({
          // main scroll trigger
          trigger: ref.current,
          start: start,
          toggleActions,
          scrub,
          animation: textTimeline,
        });

        if (lines) {
          lines.forEach((line) => {
            const wrapper = document.createElement("div");

            wrapper.classList.add("spark-text-reveal__container");
            wrapper.append(line);

            ref?.current?.append(wrapper);

            line.classList.add("spark-text-reveal__content");

            textTimeline.to(
              line,
              {
                duration: duration,
                y: 0,
                rotate: 0,
                ease: "expo.out",
                delay: delay,
              },
              ">-90%"
            );
          });
        }
      }, 500);
    }, ref);

    return () => {
      ScrollTrigger.killAll();

      if (ctx) {
        ctx.revert();
        ctx = null;
      }

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [windowWidth, isDesktop]);

  return (
    <div className="spark-text-reveal" ref={ref}>
      {children}
    </div>
  );
}
