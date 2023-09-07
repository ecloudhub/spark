import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextReveal as TextRevealProps } from "../../types/text";
import SplitType from "split-type";
import "./TextReveal.scss";

export default function TextReveal({
  children,
  duration = 3,
  start = "top 90%",
  delay = 0
}: TextRevealProps) {
  // Rrgister scroll trigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef<HTMLDivElement>(null);

  const splitLines = () => {
    SplitType.create(ref.current ?? "", {
      types: "lines",
      tagName: "div",
    });
  };

  useEffect(() => {
    splitLines();

    const lines = ref.current?.querySelectorAll(".line");
    const textTimeline = gsap.timeline();

    ScrollTrigger.create({
      // main scroll trigger
      trigger: ref.current,
      start: start,
      animation: textTimeline
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
            delay: delay
          },
          ">-90%"
        );
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, [children]);

  return (
    <div className="spark-text-reveal" ref={ref}>
      {children}
    </div>
  );
}
