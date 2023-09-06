import { RefObject } from "react";
import { StartEndFunc } from "./misc";

// Pin section and move content horizontally
export interface HPin {
  // Each child element will be put in row.
  children: React.ReactNode;
  // To choose which element will be pinned. Default: the component itself.
  triggerRef?: RefObject<HTMLDivElement>;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "center center".
  start?: string | number | StartEndFunc;
  // Boolean | Number - Links the progress of the animation directly to the scrollbar so it acts like a scrubber. Default: 0.3.
  scrub?: boolean | number;
  // Spacing between each child element. Default: "1rem".
  spacing?: string;
  // The space at each side of the component. Will be used to calculate padding and margin on mobile. Default: "0".
  sideSpacing?: string;
  // Starting position of the first element. Default: "20%".
  startPos?: string | number;
  // The space left between the last element and the end of the viewport horizontally. Default: 1.1.
  endPos?: number;
};
