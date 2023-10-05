import { Img, StartEndFunc } from "./misc";

// Vertical Overlap
export interface VOverlap {
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
