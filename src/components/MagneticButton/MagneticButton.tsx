import React, { forwardRef, useRef } from "react";
import gsap from "gsap";
import "./MagneticButton.scss";
import { MagneticButton as MagneticButtonProps } from "../../types/button";
import Button from "../Button/Button";

const MagneticButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  MagneticButtonProps
>(function ForwardedMagneticButton(props, ref) {
  const { children, className = "", button, movement = 0.5, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const magnetize = (e: any) => {
    const container = containerRef.current;

    if (!container) return;

    const dimensions = container.getBoundingClientRect();
    const relX = e.pageX - dimensions.left;
    const relY = e.pageY - dimensions.top;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    gsap.to(buttonRef.current, {
      duration: 0.3,
      x: (relX - dimensions.width / 2) * movement,
      y: (relY - dimensions.height / 2 - scrollTop) * movement,
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

  const clonedButton = button ? (
    React.cloneElement(button, { ref: buttonRef, ...rest })
  ) : (
    <Button ref={buttonRef as any} {...rest}>
      {children}
    </Button>
  );

  return (
    <div
      className={`spark-magnetic ${className}`}
      ref={containerRef}
      onMouseMove={magnetize}
      onMouseOut={demagnetize}
    >
      {clonedButton}
    </div>
  );
});

export default MagneticButton;
