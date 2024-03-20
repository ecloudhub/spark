import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { StartEndFunc } from "./misc";

export interface TextReveal {
  // Headings, paragraph tags or just text
  children: ReactNode;
  // The duration of the animation in seconds. Default: 3.
  duration?: number | string;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "top 90%".
  start?: string | number | StartEndFunc;
  // Boolean | Number - Links the progress of the animation directly to the scrollbar so it acts like a scrubber. Default: false.
  scrub?: boolean | number;
  // String - Determines how the linked animation is controlled at the 4 distinct toggle places - onEnter, onLeave, onEnterBack, onLeaveBack, in that order. Default: "play none none none".
  toggleActions?: string;
  // Amount of delay in seconds before the animation should begin. Default: 0;
  delay?: number;
}

export interface TextReader {
  // The text you want to display gradually.
  text: string;
  // The color of the text
  textColor?: string;
  // The color of the text before being read
  textColorIdle?: string;
  // Pin section. Default: true.
  pin?: boolean;
  // The element that will be pinned.
  pinRef: RefObject<HTMLDivElement>;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "top 30%".
  start?: string | number | StartEndFunc;
  // String | Number | Function - Determines the ending position of the ScrollTrigger. Default: "bottom top".
  end?: string | number | StartEndFunc;
  // If true it will animate on both desktop and mobile otherwise it will animate only on desktop. Default: true.
  responsive?: boolean;
  // Change the animation style. Default: false.
  withMask?: boolean;
  // A callback for when the progress has completed.
  onComplete?: Dispatch<SetStateAction<boolean>>;
}
