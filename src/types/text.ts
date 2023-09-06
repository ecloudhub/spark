import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { StartEndFunc } from "./misc";

export interface TextReveal {
  children: ReactNode;
  duration?: number | string;
  start?: string | number | StartEndFunc;
  delay?: number;
}

export interface TextReader {
  text: string;
  triggerRef: RefObject<HTMLDivElement>;
  start?: string | number | StartEndFunc;
  responsive?: boolean;
  withMask?: boolean;
  onComplete?: Dispatch<SetStateAction<boolean>>;
}
