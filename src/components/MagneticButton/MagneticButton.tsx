import React, { forwardRef, useRef } from "react";
import gsap from "gsap";
import "./MagneticButton.scss";
import { MagneticButton as MagneticButtonProps } from "../../types/button";
import Button from "../Button/Button";

const MagneticButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  MagneticButtonProps
>(function ForwardedMagneticButton(props, ref) {
  const { children, movement = 30, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const magnetize = (e: any) => {
    const container = containerRef.current;

    if (!container) return;

    let relX = e.pageX - window.scrollX - container?.offsetLeft;
    let relY = e.pageY - window.scrollY - container?.offsetTop;

    gsap.to(buttonRef.current, {
      duration: 0.3,
      x:
        ((relX - container?.clientWidth / 2) / container?.clientWidth) *
        movement,
      y:
        ((relY - container?.clientHeight / 2) / container?.clientHeight) *
        movement,
      ease: "expo.out",
    });
  };

  const demagnetize = () => {
    gsap.to(buttonRef.current, {
      duration: 0.4,
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      className="spark-magnetic"
      ref={containerRef}
      onMouseMove={magnetize}
      onMouseOut={demagnetize}
    >
      <Button ref={buttonRef as any} {...rest}>
        {children}
      </Button>
    </div>
  );
});

export default MagneticButton;
