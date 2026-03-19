export type ButtonPropsBasics = {
  children?: React.ReactNode;
  className?: string;
};

// Choose between button and a elements.
export type Button = ButtonPropsBasics &
  (
    | (JSX.IntrinsicElements["button"] & { as?: "button" })
    | (JSX.IntrinsicElements["a"] & { as: "a" })
  );

export type MagneticButton = ButtonPropsBasics & {
  // If you want to use another button. Otherwise it will use the Button component.
  button?: React.ReactElement;
  // To determine how much it will move. Default: 0.5.
  movement?: number;
} & (
    | (JSX.IntrinsicElements["button"] & { as?: "button" })
    | (JSX.IntrinsicElements["a"] & { as: "a" })
  );

export type ElasticButton = ButtonPropsBasics & {
  // If you want to use another button. Otherwise it will use the Button component.
  button?: React.ReactElement;
  // Custom html usually with an icon. Default: <div class="spark-elastic__icon"></div>.
  icon?: React.ReactElement;
} & (
    | (JSX.IntrinsicElements["button"] & { as?: "button" })
    | (JSX.IntrinsicElements["a"] & { as: "a" })
  );
