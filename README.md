# Spark

## Introduction

Spark is our React component library.

<br/>

## Installation

1. Create a personal access token [here](https://github.com/settings/tokens) (with ```repo``` and ```write:packages``` permissions).
2. Create or edit -if you already have it- the file ```.npmrc``` in your home directory like: ```~/.npmrc``` and add the following information: 
```
registry=https://registry.npmjs.org/
@chispahub:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
```
replacing ```YOUR_AUTH_TOKEN``` with the token you just created in the first step.

3. Ask [Ju](https://github.com/juciccio) to give you access to the pacakge.
4. Run ```npm i @chispahub/spark```

<br />

## Folder Structure

- **/src:** @ChispaHub/spark's raw code.

<br />

## Spark in use

- [@ChispaHub/Pyro](https://github.com/ChispaHub/pyro) Our starter kit.

<br />

## Components
Most of the components work with ```ScrollTrigger``` from ```GSAP``` so check their [docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger/) for detailed info.

### Button
Just a default button
```tsx
type Button = {
  children?: React.ReactNode;
  className?: string;
  // Choose between button and a element. Default: button.
  as?: JSX.IntrinsicElements["a"] & { as?: "a" } | JSX.IntrinsicElements["button"] & { as: "button" }
};
```

### Magnetic Button
When the cursor is near the button this one will follow it a little.
```tsx
type MagneticButton = {
  children?: React.ReactNode;
  className?: string;
  // Choose between button and a elements.
  as?: JSX.IntrinsicElements["a"] & { as?: "a" } | JSX.IntrinsicElements["button"] & { as: "button" }
  // If you want to use another button. Otherwise it will use the Button component.
  button?: React.ReactElement;
  // To determine how much it will move. Default: 30.
  movement?: number;  
};
```

### Text Reader
Display text gradually as user scroll.
```tsx
interface TextReader {
  // The text you want to display gradually.
  text: string;
  // The element that will be pinned.
  pinRef: RefObject<HTMLDivElement>;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "top 30%".
  start?: string | number | StartEndFunc;
  // If true it will animate on both desktop and mobile otherwise it will animate only on desktop. Default: true.
  responsive?: boolean;
  // Change the animation style. If true the component will not be pinned. Default: false.
  withMask?: boolean;
  // A callback for when the progress has completed.
  onComplete?: Dispatch<SetStateAction<boolean>>;
}
```

### Text Reveal
Display text with a fancy animation when is inside the current viewport.
```tsx
interface TextReveal {
  // Headings, paragraph tags or just text
  children: ReactNode;
  // The duration of the animation in seconds. Default: 3.
  duration?: number | string;
  // String | Number | Function - Determines the starting position of the ScrollTrigger. Default: "top 90%".
  start?: string | number | StartEndFunc;
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

## Authors

This toolkit is curated and maintained by the Chispa Lab team:

- Julian Ciccioli ([juciccio](https://www.linkedin.com/in/juciccio/)) – [Chispa Lab](https://chispalab.com)
