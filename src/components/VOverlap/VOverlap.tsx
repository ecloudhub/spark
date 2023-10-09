import React, { useEffect, useRef, useState } from "react";
import { VOverlap as VOverlapProps } from "../../types/overlap";
import { breakpoints } from "../../config/variables";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./VOverlap.scss";
import {
  useIsomorphicLayoutEffect,
  useMediaQuery,
  useWindowSize,
} from "../../hooks";

gsap.registerPlugin(ScrollTrigger);

export default function VOverlap({
  images,
  content,
  imagesWrapperClass = "spark-voverlap-img-wrapper",
  contentImgClass = "voverlap-content-img",
  start = "top 70%",
  gap = [288, 80],
}: VOverlapProps) {
  const overlapRef = useRef<HTMLDivElement>(null);
  const overlapAsideRef = useRef<HTMLDivElement>(null);
  const [documentHeight, setDocumentHeight] = useState<number>(0);

  const { windowWidth } = useWindowSize();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  // Animate on scroll
  useIsomorphicLayoutEffect(() => {
    let ctx: any = null;

    if (isDesktop) {
      // center images wrapper
      const aside = overlapAsideRef.current;

      if (aside) {
        aside.style.top = `calc((100% - ${aside.clientHeight}px) / 2)`;
      }

      // animation
      ctx = gsap.context(() => {
        const docuElement = document.documentElement;

        const resizeObserver = new ResizeObserver(() => {
          setDocumentHeight(docuElement.scrollHeight);
        });
        resizeObserver.observe(docuElement);

        const slides = overlapRef?.current?.querySelectorAll(
          ".voverlap-content-item"
        );

        slides?.forEach((slide, index) => {
          const image: any = overlapRef?.current?.querySelectorAll(
            ".spark-voverlap-img"
          )[index];

          ScrollTrigger.create({
            trigger: slide,
            id: `slide-${index + 1}`,
            start: start,
            end: () => `+=${slide.clientHeight + gap[0]}`,
            toggleActions: "play reverse none reverse",
            toggleClass: { targets: slide, className: "active" },
            invalidateOnRefresh: true,
            onLeave: () => {
              if (index + 1 !== slides.length) {
                image.classList.add("active");
              }
            },
            onEnterBack: () => {
              image.classList.remove("active");
            },
          });
        });
      }, overlapRef);
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isDesktop, windowWidth, documentHeight]);

  // Hide content images on desktop
  useEffect(() => {
    const images = document.querySelectorAll<HTMLElement>(
      `.${contentImgClass}`
    );

    if (!isDesktop) {
      images.forEach((image) => {
        image.style.display = "block";
      });
    } else {
      images.forEach((image) => {
        image.style.display = "none";
      });
    }
  }, [isDesktop]);

  return (
    <div className="spark-voverlap" ref={overlapRef}>
      {isDesktop && (
        <div className="spark-voverlap__aside" ref={overlapAsideRef}>
          {images.length && (
            <div
              className={`spark-voverlap__img-wrapper ${imagesWrapperClass}`}
            >
              {images.map((image, index) => (
                <img
                  className="spark-voverlap__img spark-voverlap-img"
                  src={image.url}
                  alt={image.alt ? image.alt : ""}
                  key={index}
                  style={{ zIndex: images.length - index }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {content && (
        <div
          className="spark-voverlap__content"
          style={{ gap: `${isDesktop ? gap[0] : gap[1]}px` }}
        >
          {content.map((item, index) => (
            <div className="voverlap-content-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
