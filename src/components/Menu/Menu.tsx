import React from "react";
import { Menu as MenuProps } from "../../types/menu";
import "./Menu.scss";
import { AnimatePresence, motion } from "framer-motion";

export default function Menu({
  button,
  children,
  isOpen = false,
  withOverlay = false,
  closeOnOverlayClick = true,
  menuClass = "",
  bodyClass = "",
  overlayClass = "",
  alignment = "left",
  onClose,
}: MenuProps) {
  const clonedButton = button
    ? React.cloneElement(button, {
        className: "spark-menu__btn",
      })
    : null;

  return (
    <div
      className={`spark-menu ${
        alignment === "right" ? "is-right" : undefined
      } ${isOpen ? "is-open" : undefined} ${menuClass}`}
    >
      {clonedButton}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={`spark-menu__body ${bodyClass}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  ease: "anticipate",
                  scale: {
                    duration: 0.3,
                    delay: 0.2,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.2,
                  },
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: {
                  scale: {
                    duration: 0.3,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
              key="body"
            >
              <motion.div
                initial={{ opacity: 0, y: "50%" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.6,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    delay: 0,
                  },
                }}
              >
                {children}
              </motion.div>
            </motion.div>
            {withOverlay && (
              <motion.div
                className={`spark-menu__overlay ${overlayClass}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    opacity: {
                      delay: 0.4,
                    },
                  },
                }}
                onClick={closeOnOverlayClick ? () => onClose(false) : undefined}
                style={{ cursor: closeOnOverlayClick ? "pointer" : "default" }}
              ></motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
