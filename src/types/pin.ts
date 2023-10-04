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
  // String | Number | Function - Determines the ending position of the ScrollTrigger. Default: "bottom top".
  end?: string | number | StartEndFunc;
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

// Pin section and move content vertically
export interface VPin {
  // this will be the content at the left such as a title with a text.
  children: React.ReactNode;
  // Each item will be put vertically in a column.
  items: React.ReactElement;
  // The space between each item. Default: "1rem".
  itemsSpacing?: string;
  // The minimum space between the children elements and the items. Default: "2rem".
  contentGap?: string;
  // The space between the pinned content and the top of the viewport. Default: 6.25rem;
  topGap?: string;
}
