import { ReactNode } from "react";

type StartEndFunc = (self: ScrollTrigger) => string | number;

interface RangeObject {
  min?: number;
  max?: number;
}

export interface TextReveal {
  children: ReactNode;
  duration?: number | string;
  start?: string | number | StartEndFunc;
  delay?: number;
}
