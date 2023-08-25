import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  href?: string;
  movement?: number;
}