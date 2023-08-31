import React, { useRef } from "react";
import { TextReader as TextReaderProps } from "../../types/text";
import SplitType from "split-type";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { breakpoints } from "../../config/variables";
import { useWindowSize } from "../../hooks/useWindowSize";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicEffect";
import { gsap } from "gsap";
import "./TextReader.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function TextReader({
  text,
  triggerRef,
  start = "top 30%",
  responsive = true,
  withMask = false,
  onComplete,
}: TextReaderProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  const splitLines = () => {
    if (withMask) {
      const text = SplitType.create(textRef.current ?? "", {
        types: "lines",
        tagName: "span",
      });
      text.lines?.forEach((line) => {
        let mask = document.createElement("span");

        mask.className = "line-mask";

        line.appendChild(mask);
        line.style.position = "relative";
      });
    } else {
      SplitType.create(textRef.current ?? "", {
        types: "words",
        tagName: "span",
      });
    }
  };

  gsap.registerPlugin(ScrollTrigger);

  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  const { windowWidth, windowHeight } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    let ctx: any = null;

    if (isDesktop || responsive) {
      splitLines();

      ctx = gsap.context(() => {
        if (withMask) {
          const lines = textRef.current?.querySelectorAll(".line");

          lines?.forEach((line, index) => {
            const timeline = gsap.timeline();
            const mask = line.querySelector(".line-mask");

            timeline.to(mask, { x: "100%" }, "mask");

            ScrollTrigger.create({
              trigger: line,
              start: start,
              end: () => `+=${line.clientHeight + 100}`,
              scrub: 1,
              animation: timeline,
              invalidateOnRefresh: true,
              onUpdate: ({ progress, direction }) => {
                if (!onComplete) return;

                if (progress >= 1 && direction === 1) {
                  onComplete(true);
                } else {
                  onComplete(false);
                }
              },
            });
          });
        } else {
          const words = textRef.current?.querySelectorAll(".word");
          const timeline = gsap.timeline();

          words?.forEach((word) => {
            timeline.to(word, { opacity: 1 });
          });

          ScrollTrigger.create({
            trigger: textRef.current,
            start: start,
            pin: triggerRef.current ? triggerRef.current : true,
            scrub: 1,
            animation: timeline,
            invalidateOnRefresh: true,
            onUpdate: ({ progress, direction }) => {
              if (!onComplete) return;

              if (progress >= 1 && direction === 1) {
                onComplete(true);
              } else {
                onComplete(false);
              }
            },
          });
        }
      }, textRef);
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isDesktop, triggerRef.current, windowWidth, windowHeight]);

  return (
    <p
      className={`text-reader ${!responsive ? "showOnMobile" : undefined}`}
      ref={textRef}
    >
      {text}
    </p>
  );
}
