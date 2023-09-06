export type ButtonPropsBasics = {
  children?: React.ReactNode;
  className?: string;
};

// Choose between button and a elements.
export type Button = ButtonPropsBasics &
  (
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" })
  );

export type MagneticButton = ButtonPropsBasics & {
  // If you want to use another button. Otherwise it will use the Button component.
  button?: React.ReactElement;
  // To determine how much it will move. Default: 30.
  movement?: number;  
} & (
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" })
  );
