import React, { useRef } from "react";
import { TextReader as TextReaderProps } from "../../types/text";
import SplitType from "split-type";
import { breakpoints } from "../../config/variables";
import { gsap } from "gsap";
import "./TextReader.scss";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  useIsomorphicLayoutEffect,
  useMediaQuery,
  useWindowSize,
} from "../../hooks";

export default function TextReader({
  text,
  textColor = "black",
  textColorIdle = "rgba(0, 0, 0, 0.5)",
  pin = true,
  pinRef,
  start = "top 30%",
  end = "bottom top",
  responsive = true,
  withMask = false,
  highlight = false,
  highlightColor = "",
  onComplete,
}: TextReaderProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  const splitLines = () => {
    if (withMask) {
      const text = SplitType.create(textRef.current ?? "", {
        types: "lines",
        tagName: "span",
        lineClass: `line ${highlight ? "highlight" : ""}`,
      });
      if (isDesktop || responsive) {
        text.lines?.forEach((line) => {
          line.style.backgroundImage = `linear-gradient(to right, ${
            highlight ? highlightColor : textColor
          } 0%, 
            ${
              highlight ? highlightColor : textColor
            } 50%, ${textColorIdle} 50%, ${textColorIdle} 100%)`;
        });
      }
    } else {
      SplitType.create(textRef.current ?? "", {
        types: "words",
        tagName: "span",
      });
    }
  };

  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  const { windowWidth } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    let ctx: any = null;

    if (textRef.current) {
      textRef.current.style.opacity = "1";
    }

    gsap.registerPlugin(ScrollTrigger);

    if (isDesktop || responsive) {
      splitLines();

      ctx = gsap.context(() => {
        if (withMask) {
          const lines = textRef.current?.querySelectorAll<HTMLElement>(".line");
          const timeline = gsap.timeline();

          lines?.forEach((line) => {
            if (highlight) {
              line.style.display = "inline-block";
              line.style.width = "auto";
              line.style.color = textColor;
            }

            timeline.to(line, { backgroundPosition: "0% 0%" });
          });

          timeline.to(textRef.current, { z: 0, duration: 1 });

          ScrollTrigger.create({
            trigger: pinRef.current,
            start: start,
            end: end,
            pin: pin ? (pinRef.current ? pinRef.current : true) : false,
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
        } else {
          const words = textRef.current?.querySelectorAll(".word");
          const timeline = gsap.timeline();

          words?.forEach((word) => {
            timeline.to(word, { opacity: 1 });
          });

          timeline.to(textRef.current, { z: 0, duration: 1 });

          ScrollTrigger.create({
            trigger: pinRef.current,
            start: start,
            end: end,
            pin: pin ? (pinRef.current ? pinRef.current : true) : false,
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
  }, [isDesktop, pinRef.current, windowWidth]);

  return (
    <p
      className={`spark-text-reader ${
        !responsive ? "showOnMobile" : undefined
      }`}
      ref={textRef}
    >
      {text}
    </p>
  );
}
