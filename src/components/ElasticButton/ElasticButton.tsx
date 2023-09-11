import React, { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ElasticButton as ElasticButtonProps } from "../../types/button";
import "./ElasticButton.scss";

const ElasticButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ElasticButtonProps
>(function ForwardedElasticButton(props, ref) {
  const {
    children,
    className = "",
    as: Component = "button",
    button,
    icon = <div className="spark-elastic__icon"></div>,
    ...rest
  } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  const Icon = () => {
    return icon;
  };

  const clonedButton = button ? (
    React.cloneElement(button, { className: "spark-elastic__button" })
  ) : (
    <div className="spark-elastic__button">{children}</div>
  );

  return (
    <Component
      ref={ref as any}
      className={`spark-elastic ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...(rest as any)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isHover ? "hover" : "idle"}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            damping: 7,
            stiffness: 300,
            restDelta: 0.1,
          }}
        >
          {isHover && <Icon />}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={isHover ? "hover" : "idle"}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          {clonedButton}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={isHover ? "hover" : "idle"}
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            damping: 7,
            stiffness: 300,
            restDelta: 0.1,
          }}
        >
          {!isHover && <Icon />}
        </motion.div>
      </AnimatePresence>
    </Component>
  );
});

export default ElasticButton;
