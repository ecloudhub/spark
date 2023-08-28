export type ButtonPropsBasics = {
  children?: React.ReactNode;
  className?: string;
};

export type Button = ButtonPropsBasics &
  (
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" })
  );


export interface MagneticButton extends ButtonPropsBasics {
  movement?: number;
}
