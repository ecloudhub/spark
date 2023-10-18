import { ReactNode } from "react";

export type RibbonDir = "left" | "right" | undefined;

export interface Ribbons {
  // The children rendered inside each ribbon
  children: ReactNode | ReactNode[];
  // The direction the ribbon at the top slides. Default: right.
  topDirection?: RibbonDir;
  // The direction the ribbon at the bottom slides. Default: left.
  bottomDirection?: RibbonDir;
  // Ribbon speed calculated as pixels/second. Default: 50.
  speed?: number;
  // Whether to pause the ribbon when hovered
  pauseOnHover?: boolean;
  // Container class for customization purposes
  containerClass?: string;
  // Each ribbon class for customization purposes
  ribbonClass?: string;
}
