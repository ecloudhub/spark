# Spark

## Introduction

Spark is our React component library.

<br/>

## Installation

Run `npm i ecloud-spark`

<br />

## Folder Structure

- **/src:** @ecloudHub/spark's raw code.

<br />

## Spark in use

- [@ecloudHub/Flame](https://flame-eta.vercel.app/).

<br />

## Components

Most of the components work with `ScrollTrigger` from `GSAP` so check their [docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger/) for detailed info.

### Menu

```tsx
interface Menu {
  // Element to toggle the menu state
  button?: React.ReactElement;
  // Menu content
  children: ReactNode;
  // Menu will be visible or hidden based on isOpen value. Default: false.
  isOpen?: boolean;
  // To show or hide the overlay. Default: false.
  withOverlay?: boolean;
  // To close menu on overlay click. Default: true.
  closeOnOverlayClick?: boolean;
  // For customization purposes you can pass classes to the menu container. Default: ''.
  menuClass?: string;
  // For customization purposes you can pass classes to the body. Default: ''.
  bodyClass?: string;
  // For customization purposes you can pass classes to the overlay. Default: ''.
  overlayClass?: string;
  // Menu alignment. Default: 'left'.
  alignment?: "left" | "right";
  // The function the overlay will execute on click
  onClose: Dispatch<SetStateAction<boolean>>;
}
```

### Button

Just a default button

```tsx
type Button = {
  children?: React.ReactNode;
  className?: string;
  // Choose between button and a element. Default: button.
  as?:
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" });
};
```

### Magnetic Button

When the cursor is near the button this one will follow it a little.

```tsx
type MagneticButton = {
  children?: React.ReactNode;
  className?: string;
  // Choose between button and a elements.
  as?:
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" });
  // If you want to use another button. Otherwise it will use the Button component.
  button?: React.ReactElement;
  // To determine how much it will move. Default: 0.5.
  movement?: number;
};
```

### Elastic Button

A button with an "elastic" movement on hover.

```tsx
type ElasticButton = {
  children?: React.ReactNode;
  className?: string;
  // Choose between button and a elements.
  as?:
    | (JSX.IntrinsicElements["a"] & { as?: "a" })
    | (JSX.IntrinsicElements["button"] & { as: "button" });
  // If you want to use another button. Otherwise it will use the Button component look & feel.
  button?: React.ReactElement;
  // Custom html. Default: <div class="spark-elastic__icon"></div>.
  icon?: React.ReactElement;
};
```

### Ribbons

Two ribbons sliding non-stop.

```tsx
interface Ribbons {
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
```

### Text Reader

Display text gradually as user scroll.

```tsx
interface TextReader {
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
  // Change the animation style. If true the component will not be pinned. Default: true.
  withMask?: boolean;
  // A callback for when the progress has completed.
  onComplete?: Dispatch<SetStateAction<boolean>>;
}
```

### Text Reveal

Display text with a fancy animation when it's inside the current viewport.

```tsx
interface TextReveal {
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
```

### HPin

Pin a section and move content horizontally.

```tsx
interface HPin {
  // Each child element will be put in row.
  children: React.ReactNode;
  // To choose which element will be pinned. Default: the component itself.
  triggerRef?: RefObject<HTMLDivElement>;
  // String | Number | Function - Determines the starting position of the ScrollTrigger.
  start?: string | number | StartEndFunc;
  // String | Number | Function - Determines the ending position of the ScrollTrigger. Default: "bottom top".
  end?: string | number | StartEndFunc;
  // Pin section. Default: true.
  pin?: boolean;
  // Boolean | Number - Links the progress of the animation directly to the scrollbar so it acts like a scrubber.
  scrub?: boolean | number;
  // Spacing between each child element.
  spacing?: string;
  // The space at each side of the component. Will be used to calculate padding and margin on mobile.
  sideSpacing?: string;
  // Starting position of the first element.
  startPos?: string | number;
  // The space left between the last element and the end of the viewport horizontally.
  endPos?: number;
}
```

### VPin

Pin a section and move content vertically.

```tsx
interface VPin {
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
```

### VOverlap

Overlap images while scrolling through blocks of content

```tsx
interface VOverlap {
  // Array of images to be displayed on the side. Each position must have a object with at least an "url" property.
  images: Img[];
  // An array with each element to be displayed on the right.
  content: React.ReactElement[];
  // You can change images wrapper styles using the class "spark-voverlap-img-wrapper" or another one by changing this option.
  imagesWrapperClass?: string;
  // In order to hide content images on mobile and show them on desktop you can do it by adding the "voverlap-content-img" class to each image or whatever you want changing this option
  contentImgClass?: string;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "top 70%".
  start?: string | number | StartEndFunc;
  // Space between each item: the first position is for desktop the other one for mobile.
  gap?: [number, number];
}
```

## Hooks

This library also expose some useful hooks:

### useIsomorphicLayoutEffect

A helper hook for scheduling a layout effect with a fallback to a regular effect for environments where layout effects should not be used.

```tsx
useIsomorphicLayoutEffect(() => {}, []);
```

### useWindowSize

It returns window width and height. The values are updated on window `change` and `resize` events.

```tsx
const { windowWidth, windowHeight } = useWindowSize();
```

### useMediQuery

A React hook that detects whether a media query is true or false.

```tsx
const isDesktop = useMediaQuery(`(min-width: 992px)`);
```

## Authors

This toolkit is curated and maintained by the ecloud team:

- Julian Ciccioli ([juciccio](https://www.linkedin.com/in/juciccio/)) – [ecloud](https://ecloud.agency)
