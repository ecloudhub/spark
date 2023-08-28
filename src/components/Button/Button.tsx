import React, { forwardRef } from "react";
import "./Button.scss";
import { Button as ButtonProps } from "../../types/button";

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function ForwardedButton(props, ref) {
    const {
      children,
      className,
      as: Component = "button",
      ...rest
    } = props;

    return (
      <Component
        ref={ref as any}
        className="spark-button"
        {...(rest as any)}
      >
        {children}
      </Component>
    );
  }
);

export default Button;
